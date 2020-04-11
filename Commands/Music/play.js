const { Utils } = require('erela.js');
const {MessageEmbed} = require('discord.js');
const couleur = require('../../colors.json');


module.exports = {
    config: {
        name: "Play",
        command: "play",
        description: "Comming Soon",
        usage: "<music>",
        category: "Music",
        alias: ["p"],
        accessibilite: "Membre"
        
    },
    run: async (bot, message, args) => {
        const { VoiceChannel } = message.member;
        if(!VoiceChannel) return message.channel.send("Tu dois etre dans un Channel Vocal c:");

        const permissions = VoiceChannel.permissions(bot, user);
        if(!permissions.has("CONNECT")) return message.channel.send("Je ne peux pas rejoindre ce channel vocal");
        if(!permissions.has("SPEAK")) return message.channel.send("Je ne peux pas parlé ce channel vocal");
    
        if(args[0]) return message.channel.send("Dj Envoie la music ");

        const player = bot.music.players.spawn({
            guild: message.guild,
            textChannel: message.channel,
            VoiceChannel
        });

        bot.music.search(args.join(" "), message.author).them(async res => {
            switch (res.loadType) {
                case "TRACK_LOADED":
                    player.queue.add(res.tracks[0]);
                    message.channel.send(` `);
                    if(!player.playing) player.play()
                    break;
                
                case "SEACH_RESULT":
                    let index = 1;
                    const tracks = res.tracks.slice(0, 5);
                    const pembed = new MessageEmbed()
                        .setAuthor(`Selection de Music`, message.author.displayAvatarURL())
                        .setDescription(tracks.map(video => `**${index++} -** ${video.title}`))
                        .setFooter("T\'as reponse dois etre evoyer dans les 30s.\nPour annuler \`cancel\` ");

                    await message.channel.send(pembed);

                    const collector = message.channel.createMessageCollctor( m => {
                        return m.author.id === message.author.id && new RegExp(`^([1-5 | cancel])$`, "i").test(m.content)
                    }, {time: 30000, max: 1});

                    collector.on("collect", m => {
                        if(/cancel/i.test(m.content)) return collector.stop("annuler")
                    });
                    break;

                case "PLAYLIST_LOADED":
                        res.playlist.tracks.forEach(track => player.queue.add(track));
                        const duration = Utils.formatTime(res.playlist.tracks.reduce((acc, cur) => ({duration: acc.duration + cur.duration})).duration, true);
                        message.channel.send(`Enqueuing \`${res.playlist.tracks.length}\` \`${duration}\` tracks in playlist \`${res.playlist.info.name}\``);
                        if(!player.playing) player.play()
                        break;

            }
        }).catch(err => message.channel.send(err.message))
    }
}
