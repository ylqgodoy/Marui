const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Displays information about the current server"),
    async execute(client, interaction){
        client.basicEmbed({
            type: "reply",
            thumbnail: `${interaction.guild.iconURL() || interaction.user.defaultAvatarURL}`,
            fields: [
                { name: `${interaction.guild.name}`, value: `(${interaction.guild.id})`, inline: false},
                { name: "Server Owner", value: `<@!${interaction.guild.ownerId}>`, inline: true},
                { name: "Server Level", value: `${interaction.guild.premiumTier}`, inline: true},
                { name: "Created", value: `<t:${Math.round(interaction.guild.createdTimestamp / 1000)}:d>`, inline: true},
                { name: `Channels (${interaction.guild.channels.cache.size})`, value: `Categories: **${interaction.guild.channels.cache.filter(c => c.type === 4).size}**\nText Channels: **${interaction.guild.channels.cache.filter(c => c.type === 0).size}**\nVoice Channels: **${interaction.guild.channels.cache.filter(c => c.type === 2).size}**`, inline: true},
                { name: "Member Count", value: `${interaction.guild.memberCount}`, inline: true},
                { name: "Roles", value: `${interaction.guild.roles.cache.size}`, inline: true}               
            ],
            footer: {iconURL: `${interaction.user.displayAvatarURL() || interaction.user.defaultAvatarURL}`, text: `Server Information requested by ${interaction.user.tag}`}
        }, interaction)
    }
}