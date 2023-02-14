const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Displays an users avatar")
    .addUserOption((option) => option
        .setName('target')
        .setDescription("target")
        .setRequired(true)
    ),
    async execute(client, interaction) {
        const target = interaction.options.get('target') 

        client.basicEmbed({
            type: `reply`,
            title: `Avatar of ${target.user.tag}`,
            url: `${target.user.displayAvatarURL({size: 1024})}`,
            image: `${target.user.displayAvatarURL({size: 1024})}`,
            footer: {iconURL: `${interaction.user.displayAvatarURL() || interaction.user.defaultAvatarURL}`, text: `Avatar requested by ${interaction.user.tag}`}
        }, interaction)
    }
}