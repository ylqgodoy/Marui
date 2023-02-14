const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Displays information about the bot"),
    async execute(client, interaction) {
        const msg = await interaction.deferReply({fetchReply: true})

        client.basicEmbed({
            type: "editReply",
            title: "🤖・Bot Info",
            thumbnail: `${client.user.displayAvatarURL()}`,
            fields: [
                { name: "Bot Name", value: `${client.user.username}`, inline: true},
                { name: "Bot Id", value: `${client.user.id}`, inline: true},
                { name: "Created at", value: `<t:${Math.round(client.user.createdTimestamp / 1000)}:d>`, inline: true},
                { name: "Bot Owner", value: `<@!1064354841901666334>`, inline: true},
                { name: "Bot Latency", value: `${msg.createdTimestamp - interaction.createdTimestamp}`, inline: true},
                { name: "Websocket Latency", value: `${client.ws.ping}`, inline: true},
                { name: "Bot Version", value: `${require(`${process.cwd()}/package.json`).version}`, inline: true}, 
                { name: "Discord.js Version", value: `${require("discord.js/package.json").version}`, inline: true}, 
                { name: "Node.js Version", value: `${process.version}`, inline: true}, 
                { name: "Started since", value: `<t:${Math.round(Date.now() / 1000)}:d>`, inline: true},
                { name: `Commands (${client.commands.size})`, value: `Dev Commands: **${client.commands.filter(cmd => cmd.devOnly === true).size}**\nUser Commands: **${client.commands.filter(cmd => cmd.devOnly !== true).size}**`, inline: true},
                { name: "Servers", value: `${client.guilds.cache.size}`, inline: true}
            ],
            footer: {iconURL: `${interaction.user.displayAvatarURL() || interaction.user.defaultAvatarURL}`, text: `Bot Information requested by ${interaction.user.tag}`}
        }, interaction)
    }
}