const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    devOnly: true,
    data: new SlashCommandBuilder()
    .setName("setpresence")
    .setDescription("(Dev Only) Sets the presence of bot")
    .addStringOption((option) => option
        .setName("activity")
        .setDescription("The text of the bot's activity")
        .setRequired(true)
    ).addStringOption((option) => option
        .setName("activitytype")
        .setDescription("The bots status type")
        .setRequired(true)
        .addChoices({name: "Listening" , value: "2"}, {name: "Competing", value: "5"}, {name: "Playing", value: "0"}, {name: "Watching", value: "3"})
    ).addStringOption((option) => option
        .setName("activitystatus")
        .setDescription("The bots presence type")
        .setRequired(true)
        .addChoices({name: "online" , value: "online"}, {name: "idle", value: "idle"}, {name: "do not disturb", value: "dnd"})
    ),
    async execute(client, interaction){
        const Activity = interaction.options.get("activity").value
        const activityType = interaction.options.get("activitytype").value
        const activityStatus = interaction.options.get("activitystatus").value

        client.user.setPresence({activities: [{ name: Activity, type: parseInt(activityType) }], status: activityStatus})
        client.basicEmbed({
            ephemeral: true,
            type: "reply",
            title: "🤖・Bot Presence",
            fields: [
                {name: "Activity", value: `${Activity}`, inline: true},
                {name: "Type", value: `${activityType}`, inline: true},
                {name: "Presence", value: `${activityStatus}`, inline: true},
            ]
        }, interaction)
    }
}