const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("roll")
        .setDescription("roll a dice"),
    async execute(client, interaction) {
        client.basicEmbed({
            type: "reply",
            title: "🎲 Roll Dice",
            desc: `${interaction.user.tag} threw a ${Math.floor(Math.random() * 6) + 1} (1-6)`
        }, interaction)
    }
}