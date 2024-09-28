const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("genpw")
    .setDescription("Generates a password"),
    async execute(client, interaction){
        let pw = ""
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789$_*:;."

        const pw_length = 16;
        for(i = 0; i < pw_length; i++){
            pw += characters.charAt(Math.floor(Math.random() * characters.length))
        }
        
        client.basicEmbed({
            type: "reply",
            ephemeral: true,
            title: "Generate Password",
            fields: {name: "Your password", value: `${pw}`}
        }, interaction)
    }
}