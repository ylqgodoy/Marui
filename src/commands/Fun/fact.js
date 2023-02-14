const { SlashCommandBuilder, codeBlock } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("fact")
        .setDescription("displays an useless fact"),
    async execute(client, interaction) {
        const fact = await fetch("https://uselessfacts.jsph.pl/random.json?language=en")
        .then(response => response.json())
        .catch(() => {
            throw "Failed to fetch response"
        })

        client.basicEmbed({
            type: "reply",
            title: "Fact",
            desc: `${codeBlock(fact.text)}`
        }, interaction)
    }
}
