const puppeteer = require('puppeteer');
const fs = require('fs');
const { Parser } = require('json2csv');

(async () => {
  const browser = await puppeteer.launch();

  try {
    const domains = [
      'https://www.example.com/', 
      'https://www.test.com/'
    ];
    const paths = [
      'path1',
      'path2',
      'path3'
      ]; // Add more paths as needed

    const allAnchorData = [];
    //array for scraped data to be pushed into

    for (const domain of domains) {
      for (const path of paths) {
        const url = domain + path;
        const page = await browser.newPage();
        await page.goto(url, {'timeout': 120000});
        //added timeout for pages with long loading times, lots of videos, etc.

        const anchorData = await page.evaluate((domain, path) => {
          //create an array of all anchor tags with class='btn-primary'
          const anchorTags = Array.from(document.querySelectorAll('a.btn-primary'));
          //return the array as JSON with selected content
          return anchorTags.map(tag => {
            return {
              //return both domain & path to compare differences
              domain: domain,
              path: path,
              href: tag.getAttribute('href'),
              text: tag.textContent.trim()
            };
          });
        }, domain, path);

        allAnchorData.push(...anchorData);
        await page.close();
      }
    }

  // Specify the output file path
  const outputFile = 'output.csv';

  // Convert JSON data to CSV format
  const json2csvParser = new Parser();
  const csv = json2csvParser.parse(allAnchorData);

  // Write the CSV data to the output file
  fs.writeFileSync(outputFile, csv);


    console.log(`Anchor data written to ${outputFile}`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();