import "dotenv/config";

async function SeatCount() {
    const eventId = "WT6HN4GNJX";
    const sectors = [
      { id: "73011", title: "126" },
      { id: "73010", title: "125" },
      { id: "73019", title: "124" },
      { id: "73018", title: "123" },
      { id: "73017", title: "122" },
      { id: "80008", title: "121" },
      { id: "73015", title: "120" },
      { id: "81809", title: "119" },
      { id: "73013", title: "118" },
      { id: "73012", title: "117" },
      { id: "72969", title: "116" },
      { id: "72963", title: "115" },
      { id: "72938", title: "114" },
      { id: "72937", title: "113" },
      { id: "72936", title: "112" },
      { id: "72934", title: "111" },
      { id: "79993", title: "110" },
      { id: "72931", title: "109" },
      { id: "72930", title: "108" },
      { id: "87884", title: "107" },
      { id: "87885", title: "107 apacia" },
      { id: "83567", title: "106" },
      { id: "83566", title: "105" },
      { id: "83565", title: "104" },
      { id: "83564", title: "103" },
      { id: "83563", title: "102" },
      { id: "84222", title: "101" },
      { id: "72935", title: "401" },
      { id: "72968", title: "402" },
      { id: "72970", title: "403" },
      { id: "72971", title: "404" },
      { id: "72972", title: "405" },
      { id: "72973", title: "406" },
      { id: "76570", title: "407" },
      { id: "72975", title: "408" },
      { id: "72976", title: "409" },
      { id: "72977", title: "410" },
      { id: "72978", title: "411" },
      { id: "72979", title: "412" },
      { id: "72980", title: "413" },
      { id: "72981", title: "414" },
      { id: "72982", title: "415" },
      { id: "72983", title: "416" },
      { id: "72984", title: "417" },
      { id: "72985", title: "418" },
      { id: "72986", title: "419" },
      { id: "72987", title: "420" },
      { id: "72988", title: "421" },
      { id: "72989", title: "422" },
      { id: "72990", title: "423" },
      { id: "72991", title: "424" },
      { id: "72992", title: "425" },
      { id: "72993", title: "426" },
      { id: "72994", title: "427" },
      { id: "72995", title: "428" },
      { id: "94921", title: "VIP loze 38" },
      { id: "83548", title: "Parteris 2 (už galinės linijos)" },
      { id: "76814", title: "8 random vietos" },
      { id: "78670", title: "courtside" },
    ];

    
    let takenSeatsCount = 0;
    let freeSeatscount = 0;
    let totalSeatsCount = 0;

    for(const element of sectors) {
      const url = `https://www.bilietai.lt/api/v1/store/events/${eventId}/sections/${element.id}/seat-map?language=lit`;

      const response = await fetch(url, {
          headers: {
              "Accept": "application/json",
              "Cookie": process.env.BILIETAI_COOKIE ?? "",
              "User-Agent": "Mozilla/5.0"
          }
      });
      type parsedResponse = {
          stageX: string,
          stageY: string,
          stageType: string,
          displayMapInPlaces: string,
          seatMapTickets: [
            {
              ticketId: number,
              seatId: number,
              row: string,
              place: string,
              priceClass: number,
              status: number,
              x: number,
              y: number
            }
          ]
      };
      const data: parsedResponse = JSON.parse(await response.text());

      let takenSectorSeatsCount = 0;
      let freeSectorSeatsCount = 0;
      let totalSectorSeatsCount = 0;
      for (const seat of data.seatMapTickets) {

          if (seat.status === 0) {
              takenSeatsCount++;
              takenSectorSeatsCount++;
          }
          else {
              freeSeatscount++;
              freeSectorSeatsCount++;
          }

          totalSeatsCount++;
          totalSectorSeatsCount++;
      }

      console.log(`Sector ${element.title} - Taken: ${takenSectorSeatsCount}, Free: ${freeSectorSeatsCount}, Total: ${totalSectorSeatsCount}`);

    };


    console.log("Taken Seats:", takenSeatsCount);
    console.log("Free Seats:", freeSeatscount);
    console.log("Total Seats:", totalSeatsCount);

    //console.log("Body:", data);

    return [takenSeatsCount, freeSeatscount, totalSeatsCount];
}


type SeatCounts = {
    takenSeatsCount: number;
    freeSeatsCount: number;
    totalSeatsCount: number;
};

let cachedCounts: SeatCounts | null = null;
let cacheExpiresAt = 0;
let requestInProgress: Promise<SeatCounts> | null = null;

export async function GET() {
    if (cachedCounts && Date.now() < cacheExpiresAt) {
        return Response.json(cachedCounts);
    }

    if (!requestInProgress) {
        requestInProgress = SeatCount()
            .then(([taken, free, total]) => {
                const counts = {
                    takenSeatsCount: taken,
                    freeSeatsCount: free,
                    totalSeatsCount: total
                };

                cachedCounts = counts;
                cacheExpiresAt = Date.now() + 60_000;

                return counts;
            })
            .finally(() => {
                requestInProgress = null;
            });
    }

    const counts = await requestInProgress;

    return Response.json(counts);
}
