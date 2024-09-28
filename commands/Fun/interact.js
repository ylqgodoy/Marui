const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("interact")
    .setDescription("Displays an interaction with a user")
    .addUserOption((option) => option
        .setName("target")
        .setDescription("target")
        .setRequired(true)
    ).addStringOption((option) => option
        .setName("interaction")
        .setDescription("interaction")
        .setRequired(true)
        .addChoices(
            {name: "hug", value: "hug"},
            {name: "cuddle", value: "cuddle"},
            {name: "tickle", value: "tickle"},
            {name: "pat", value: "pat"},
            {name: "poke", value: "poke"},
            {name: "kiss", value: "kiss"},
            {name: "slap", value: "slap"}
        )
    ),
    async execute(client, interaction) {
        const target = interaction.options.get("target")
        const target_i = interaction.options.get("interaction").value

        if(interaction.user.id != target.user.id){
            const image = await fetch(`https://api.nekos.dev/api/v3/images/sfw/gif/${target_i}/`)
            .then(response => response.json())
            .catch(() => {
                throw "Failed to fetch response"
            })

            client.basicEmbed({
                type: "reply",
                title: `${target_i}`,
                desc: `<@!${interaction.user.id}> ${target_i == "kiss" ? target_i + "e" : target_i}s <@!${target.user.id}>`,
                image: `${image.data.response.url}`
            }, interaction)
        } else {
            client.basicEmbed({
                type: "reply",
                title: ":(",
                desc: "Sorry for being alone.. let me hug you! :3",
                image: `https://cdn.nekos.life/v3/sfw/gif/hug/hug_039.gif`
            }, interaction)
        }
    }
}