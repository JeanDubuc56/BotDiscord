const { readdirSync } = require('fs')
const { prefix } = require('../config.json')

module.exports = (bot) => {
    const load = dirs => {
        const commands = readdirSync(`./Commands/${dirs}/`).filter(d => d.endsWith('.js'));
        console.log(`\n**********|/${dirs}\\|**********`);
        for(let file of commands) {
            let pull = require(`../Commands/${dirs}/${file}`);
            console.log(`${file} \t( ${prefix}${pull.config.command} )\tChargé ! ☄️`);

            bot.commands.set(pull.config.command, pull)
            if(pull.config.alias) pull.config.alias.forEach(a => bot.alias.set(a, pull.config.command));
        };
    };
    ["Divers", "Stats", "Music", "Moderation", "Dev"].forEach(x => load(x));
}