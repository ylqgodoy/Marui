const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("8ball")
    .setDescription("Ask 8ball a question")
    .addStringOption((option) => option
        .setName('question')
        .setMaxLength(100)
        .setMinLength(8)
        .setDescription("The question you want to ask")
        .setRequired(true)
    ),
    async execute(client, interaction) {
        const question = interaction.options.get('question').value

        const answer_list = ["Yes definitely", "Why you asking me this?", "Yes", "No", "yesse", "ye", "Im not gonna answer this", "Maybe..", "No.. just no", "YEEEEEES", "Ask again later", "||Yes||", "||No||", "My sources say no", "I dont know", "No way.", "Dont ask me again", "?"]

        client.basicEmbed({
            type: "reply",
            title: "🔮・8Ball",
            fields: [
                {name: "Question", value: `${question}`},
                {name: "Answer", value: `${answer_list[Math.floor(Math.random() * answer_list.length)]}`}
            ]
        }, interaction)
    }
}