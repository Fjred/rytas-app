import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());
// nothing works
async function testStealth() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  
  const page = await browser.newPage();
  await page.goto('https://www.bilietai.lt/renginiai/FEPK5EUJ2C/lkl-vilniaus-rytas-klaipedos-neptunas/seatmap');
  
  const data = await page.evaluate(() => {
    return fetch('https://www.bilietai.lt/api/v1/store/events/FEPK5EUJ2C/sections/72930/seat-map?language=lit')
      .then(r => r.json());
  });
  
  console.log(data);
  await browser.close();
}

testStealth();