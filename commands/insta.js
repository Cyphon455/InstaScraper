const _ = require('underscore');
const puppeteer = require('puppeteer');
const Discord = require('discord.js');


module.exports = {
	name: 'insta',
	description: 'weed!',
	execute(message, match) {
		if (isValidHttpUrl(match)) {
			getInstaURL(match).then((url) => {

				// inside a command, event listener, etc.
				const exampleEmbed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Some title')
				.setURL('https://discord.js.org/')
				.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
				.setDescription('Some description here')
				.setThumbnail('https://i.imgur.com/wSTFkRM.png')
				.addFields(
					{ name: 'Regular field title', value: 'Some value here' },
					{ name: '\u200B', value: '\u200B' },
					{ name: 'Inline field title', value: 'Some value here', inline: true },
					{ name: 'Inline field title', value: 'Some value here', inline: true },
				)
				.addField('Inline field title', 'Some value here', true)
				.setImage(url)
				.setTimestamp()
				.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

				message.channel.send(exampleEmbed);
			});
		}
	},
};

function isValidHttpUrl(string) {
	let url;
	
	try {
	  url = new URL(string);
	} catch (_) {
	  return false;  
	}
  
	return url.protocol === "http:" || url.protocol === "https:";
  }

async function getInstaURL(instaurl) {
	// const browser = await puppeteer.launch({headless: false});
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4427.0 Safari/537.36')

	// Got to insta page.
	await page.goto(instaurl);

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

	// HTML decode the match.
	const url = _.unescape(match[2]);

	// Go to match.
	// await page.goto(url);

	// Write data in 'Output.txt' . 
	// fs.writeFile('output.html', htmldata, (err) => { 
		
	//     // In case of a error throw err. 
	//     if (err) throw err; 
	// }) 

	await browser.close();
	return url;
}