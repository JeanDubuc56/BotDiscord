const { Channel } = require('../config.json');

module.exports = (bot) => {
    let prompt = process.openStdin();

    prompt.addListener("data", res => {
        let x = res.toString().trim().split(/ +/g)
            bot.channels.resolve('450072610949038083').send(x.join(" "));
        });
    }