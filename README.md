# button_puppeteer

The purpose of this script is to compare 2 or more domains & their shared subpages, and return a CSV list of all anchor tags with class= primary button. This script is useful when duplicating a website and confirming that button links match without having to manually compare each subpage. Of course, the user can change the query selector to their intended purpose if they wish to compare something other than anchor tags. This script can then be ran from the CLI with <code>node scrape.js</code>
<hr>
This script uses Puppeteer to pull anchor tag data from multiple domains & URLs. <br/> 
See https://pptr.dev/ 
<br/>
<br/>
Puppeteer must be installed after cloning the repo. Run <code>npm install puppeteer</code>
<br/>
<br/>
A note: One seemingly common issue encountered is <code>[Bug]: Error retrieving document: Error: Could not find Chrome</code>
<br/>
The solution is to change the default cache directory of Puppeteer by creating a config file. You will then need to uninstall and reinstall Puppeteer to resolve. Instructions here: https://pptr.dev/guides/configuration#changing-the-default-cache-directory
<hr>
This script also uses the json2csv library to output the scraped data into a CSV file. 
<br />
See https://github.com/zemirco/json2csv
<br />
<br />
json2csv library must also be installed after cloning the repo. Run <code>npm install json2csv</code>
