const puppeteer = require('puppeteer');
const fs = require('fs');
const _ = require('underscore');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    // const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4427.0 Safari/537.36')

    // Got to insta page.
    await page.goto('https://www.instagram.com/p/CL98zacJ6XS/');

    // Get the entire HTML data.
    const htmldata = await page.evaluate(() => document.querySelector('*').outerHTML);

    // const htmldata = fs.readFileSync('./output.html');

    // Construct a regex.
    let re = /(1080w" src="(https.+?)">)(<\/div>)/g;

    // Match with first ocurrence.
    const match = re.exec(htmldata);

    // matches.forEach(elmt => {
    //     console.log(elmt);
    // })

    console.log(match[2]);

    // HTML decode the match.
    const url = _.unescape(match[2]);

    // Go to match.
    await page.goto(url);

    // Write data in 'Output.txt' . 
    // fs.writeFile('output.html', htmldata, (err) => { 
        
    //     // In case of a error throw err. 
    //     if (err) throw err; 
    // }) 

    await browser.close();
})();