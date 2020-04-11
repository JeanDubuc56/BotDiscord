
const { Client, Collection } = require('discord.js');
const { TOKEN } = require('./config.json');
const bot = new Client({disableEveryone: true});

["commands", "alias"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./Handlers/${x}`)(bot));

bot.login(TOKEN);
