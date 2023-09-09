# button_puppeteer


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
