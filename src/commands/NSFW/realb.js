const { SlashCommandBuilder, codeBlock } = require("@discordjs/builders")
const realb = require("../../api/realb")
const realb1 = new realb()

module.exports = {
    nsfw: true,
    data: new SlashCommandBuilder()
    .setName("rb")
    .setDescription("Displays porn image(s)")
    .addStringOption((option) => option
        .setName("keyword")
        .setDescription("Category")
        .setMinLength(3)
        .setRequired(true)
    ).addNumberOption((option) => option
        .setName("amount")  
        .setDescription("The amount of images (Limit: 1-5)")
        .setMaxValue(5)
        .setMinValue(1)
        .setRequired(true)
    ),
    async execute(client, interaction) {
        const keyword = interaction.options.get("keyword").value
        const amount = interaction.options.get("amount").value

        await interaction.deferReply()
        const images = await realb1.getImages(keyword, amount)

        await interaction.editReply(codeBlock("js", `🔞 Realbooru - "/rb ${keyword} ${amount}"`) + `\n${images.join('\n')}`)
    }
}