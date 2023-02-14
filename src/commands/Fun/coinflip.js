const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("coinflip")
    .setDescription("Flip a coin")
    .addStringOption((option) => option
        .setName('coinside')
        .setDescription("Coin Side")
        .setRequired(true)
        .addChoices(
            {name: "Tail", value: "Tail"},
            {name: "Head", value: "Head"}
        )
    ),
    async execute(client, interaction) {
        const coinside = interaction.options.get('coinside').value
        const coin_side = ["Head", "Tail"]

        const result = coin_side[Math.floor(Math.random() * coin_side.length)]

        if(coinside == result){
            client.basicEmbed({
                type: "reply",
                title: "🪙・Coinflip",
                fields: [
                    {name: "Coin Side", value: `${coinside}=${result}`},
                    {name: "Result", value: ` You Won`}
                ]
            }, interaction)
        } else {
            client.basicEmbed({
                type: "reply",
                title: "🪙・Coinflip",
                fields: [
                    {name: "Coin Side", value: `${coinside}≠${result}`},
                    {name: "Result", value: ` You Lost`}
                ]
            }, interaction)
        }
    }
}