'use client'; // Reikalinga Next.js App Router interaktyvumui (useState)

import { useEffect, useState } from 'react';
import TicketCard from './components/TicketCard';
import ListGroup from './components/ListGroup';
// 3. Pagrindinis puslapio komponentas
export default function Home() {
  // React Būsena (useState) bandymams
  const [seatCounts, setSeatCounts] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
      fetch('/api/tickets')
          .then(response => response.json())
          .then(data => {
              setSeatCounts([
                  data.takenSeatsCount,
                  data.freeSeatsCount,
                  data.totalSeatsCount
              ]);
          })
          .catch(error => console.error(error));
  }, []);
  const [ticketsCount, setTicketsCount] = useState<number>(1950);
  const items = [
    'Arena',
    'Ozas',
    'Pliusai'
  ];

  const handleSelectItem = (item: string) => {
    console.log(`Selected item: ${item}`);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 text-white p-6 gap-6">
      <div className="text-center space-y-2">
        <h1 className="text-5xl font-black tracking-tight text-red-600 sm:text-6xl">
          TICKETS APP
        </h1>
        <p className="text-neutral-400">
          Vilniaus „Ryto“ bilietų stebėjimo ir statistikos sistema.
        </p>
      </div>

      <div>
        <ListGroup items={items} heading="Vietos" onSelectItem={handleSelectItem} />
      </div>

      {/* Naudojame sukurtus React komponentus */}
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl justify-center items-center">
        <TicketCard title="BC Rytas vs Žalgiris" available={ticketsCount} taken={6471} />
        <TicketCard title="BC Rytas vs ZK" available={seatCounts[1]} taken={seatCounts[0]} />
      </div>

      {/* Interaktyvus mygtukas useState pasitikrinimui */}
      <div className="flex gap-2 mt-4">
        <button 
          onClick={() => setTicketsCount(ticketsCount - 1)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl transition cursor-pointer"
        >
          Nupirkti bilietą (-1)
        </button>
        <button 
          onClick={() => setTicketsCount(1950)}
          className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold py-2 px-4 rounded-xl transition cursor-pointer"
        >
          Atstatyti
        </button>
      </div>
    </main>
  );
}