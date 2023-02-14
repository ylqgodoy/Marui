const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    devOnly: true,
    data: new SlashCommandBuilder()
    .setName("shutdown")
    .setDescription("(Dev Only) Shutdowns the bot"),
    async execute(client, interaction) {
        await client.basicEmbed({
            type: "reply",
            ephemeral: true,
            title: "🤖・Bot Shutdown",
            desc: "Shutting down..."
        }, interaction)
        process.exit(0)
    }
}