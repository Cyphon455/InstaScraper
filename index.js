const fs = require('fs');
const Discord = require('discord.js');
const dotenv = require('dotenv');
const { prefix } = require('./config.json');


dotenv.config();

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    

    // if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.author.bot) return;

    console.log(message.content);
    
    if (message.content.includes('instagram.com/p/')) {
        const reg = /(https:\/\/www.instagram.com\/p\/\w+\/)/g
        const match = reg.exec(message.content);

        try {
            client.commands.get('insta').execute(message, match[0]);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
    }

    // const args = message.content.slice(prefix.length).trim().split(' ');
    // const command = args.shift().toLowerCase();

    // if (!client.commands.has(command)) return;

    
});

client.login(process.env.TOKEN);

