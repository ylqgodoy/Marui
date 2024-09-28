const { SlashCommandBuilder, codeBlock } = require("@discordjs/builders")
const rule34 = require("../../api/rule34")
const rule34_1 = new rule34()

module.exports = {
    nsfw: true,
    data: new SlashCommandBuilder()
    .setName("rl34")
    .setDescription("Displays rule34 image(s)")
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
        const images = await rule34_1.getImages(keyword, amount)

        await interaction.editReply(codeBlock("js",`🔞 Rule34 - "/rl34 ${keyword} ${amount}"`) + `\n${images.join('\n')}`)
    }
}