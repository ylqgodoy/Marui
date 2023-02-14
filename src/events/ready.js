const { ActivityType } = require("discord.js");

module.exports = {
    name: "ready",
    async execute(client) {
        client.user.setPresence({activities: [{ name: `/help`, type: ActivityType.Listening}], status: 'idle',});
        console.log(`${client.user.tag} Bot Iniciado! | Estou em: ${client.guilds.cache.size} servidores!`)
    }
}