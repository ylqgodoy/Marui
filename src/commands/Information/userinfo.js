const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Displays information about a user")
    .addUserOption((option) => option
        .setName("target")
        .setDescription("target")
        .setRequired(true)
    ),
    async execute(client, interaction){
        const target = interaction.options.get("target")

        client.basicEmbed({
            type: "reply",
            thumbnail: `${target.user.displayAvatarURL() || target.user.defaultAvatarURL}`,
            fields: [
                {name: `${target.user.tag}`, value: `(${target.user.id})`, inline: false},
                {name: `Created at`, value: `<t:${Math.round(target.user.createdTimestamp / 1000)}:d>`, inline: true},
                {name: `Avatar Url`, value: `[Link](${target.user.displayAvatarURL({size: 1024}) || target.user.defaultAvatarURL})`, inline: true},
                {name: `\u200b`, value: `\u200b`, inline: true},
                {name: `Joined at`, value: `${target.member ? "<t:" + Math.round(target.member.joinedTimestamp / 1000) + ":d>" : "None"}`, inline: true},
                {name: `Server Roles`, value: `${target.member ? target.member.roles.cache.size - 1 : "None"}`, inline: true},
                {name: `\u200b`, value: `\u200b`, inline: true},
                {name: `Bot`, value: `${target.user.bot ? "Yes" : "No"}`, inline: true},
                {name: `Verified`, value: `${target.user.verified ? "Yes" : "No"}`, inline: true},
                {name: `MFA`, value: `${target.user.mfaEnabled ? "Yes" : "No"}`, inline: true}    
            ],
            footer: {iconURL: `${interaction.user.displayAvatarURL() || interaction.user.defaultAvatarURL}`, text: `User Information requested by ${interaction.user.tag}`}
        }, interaction)
    }
}
