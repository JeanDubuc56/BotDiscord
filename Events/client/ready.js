const { ErelaClient, Utils } = require('erela.js');
const config = require('../../config.json');

module.exports = bot => {
    console.log(`\n✅\t\"${bot.user.username}\" est connecté ! bip bip boup c:\t✅\n`);
    //console.log(bot);
    
    /*
    bot.music = new ErelaClient(bot, config.nodes);
    bot.music.on("nodeError", console.log);
    bot.music.on("nodeConnect", () => console.log("Nouveau Node Connecter"));
    bot.music.on("queueEnd", player => {
        player.textChannel.send("Queue Terminer !");
        return bot.music.players.destroy(player.guild.id)
    });
    bot.music.on("trackStart", ({textChannel}, {title, duration}) => textChannel.send(`Now playing: **${title}** \`${Utils.formatTime(duration, true)}\``).then(m => m.delete(15000)));
    */

    bot.levels = new Map()   
        .set("none", 0.0)
        .set("low", 0.10)
        .set("medium", 0.15)
        .set("high", 0.25);
    
    let statuses = [
        //`${bot.guilds.size} Serveurs !`,
        //`plus de ${bot.users.size} utilisateur !`,
        `${config.prefix}help`,
        `Made in Confinement`
    ]
    
    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "PLAYING"});
        
    }, 10000)
}