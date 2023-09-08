const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();

  try {
    const domains = ['https://www.example.com', 'https://www.test.com'];
    const paths = ['/page1', '/page2', '/page3']; // Add more paths as needed

    const allAnchorData = [];

    for (const domain of domains) {
      for (const path of paths) {
        const url = domain + path;
        const page = await browser.newPage();
        await page.goto(url);

        const anchorData = await page.evaluate(url => {
          const anchorTags = Array.from(document.querySelectorAll('a.btn-primary'));
          return anchorTags.map(tag => {
            return {
              url: url,
              href: tag.getAttribute('href'),
              text: tag.textContent.trim()
            };
          });
        }, url);

        allAnchorData.push(...anchorData);
        await page.close();
      }
    }

    // Specify the output file path
    const outputFile = 'output.json';

    // Write the extracted data to the output file as JSON
    fs.writeFileSync(outputFile, JSON.stringify(allAnchorData, null, 2));

    console.log(`Anchor data written to ${outputFile}`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
