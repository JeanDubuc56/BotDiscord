const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const { stripIndent } = require('common-tags')
const { prefix } = require(`../../config.json`);
const color = require(`../../colors.json`);

module.exports = {
    config: {
        name: "Help",
        command: "help",
        alias: ["h", "aide"],
        description: "",
        usage: "<command || rien>",
        category: "Divers", 
        accessibilite: ""
    },
    run: async (bot, message, args) => {
        
        message.delete();
        //console.log(message.author);
        //console.log(message);
        const infoEmbed = new MessageEmbed()
            .setColor(color.Help)
            .setAuthor(`Help`, message.author.displayAvatarURL())
            .setDescription(`Vas dans tes message priver\n(/-_-)/`)
            .setFooter(`${bot.user.tag}`, bot.user.displayAvatarURL());

        const embed = new MessageEmbed()
            .setColor(color.Help)
            .setAuthor(`${message.guild.name} Help`, message.guild.iconURL())
            .setThumbnail(bot.user.displayAvatarURL())

        if(!args[0]){
            const categories = readdirSync(`./Commands/`);

            embed.setDescription(`Commands disponible pour <@${message.author.id}>\n__**Prefix:**__ **${prefix}**`);
            embed.setFooter(`${bot.user.tag} | Nombre Commandes Total: ${bot.commands.size-1} `, bot.user.displayAvatarURL());

            categories.forEach( category => {
                const dir = bot.commands.filter(c => c.config.category === category);
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                try{
                    if(dir.size >= 1){
                        embed.addField(`${capitalise} <${dir.size}>: `, dir.map(c => `\`${c.config.command}\``).join(" "))
                    }else{

                    }
                    //console.log(capitalise, dir);
                }catch(e){
                    console.log(e);
                }
            })
            message.channel.send(infoEmbed);
            return message.author.send(embed);
        }else{

            let cmd = bot.commands.get(bot.alias.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if(!cmd) return message.channel.send(embed.setTitle("Commands Invalide").setDescription(`\`${prefix}help\` pour la liste de Command.`));
            cmd = cmd.config

            embed.setDescription(stripIndent`Prefix: **${prefix}**\n
                **Nom:** 
                ${cmd.name}\n
                **Command:** 
                \`${cmd.command.slice(0, 1) + cmd.command.slice(1)}\`\n
                **Description:**
                \ ${cmd.description || "Pas de Description."}\n
                **Usage:** 
                \`${cmd.usage ? ` ${prefix}${cmd.command} ${cmd.usage}` : "Pas d'Utilisation."}\`\n
                **Accessible par:** 
                ${cmd.accessibilite || "Membre"}\n
                **Alias:** 
                ${cmd.alias ? cmd.alias.join(", ") : " "}`)
            embed.setFooter(`${bot.user.tag}`, bot.user.displayAvatarURL())

            message.channel.send(infoEmbed).then(m => m.delete(1000))
            return message.author.send(embed);
        }
    } 
}