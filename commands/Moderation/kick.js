const { SlashCommandBuilder } = require("@discordjs/builders")
const { PermissionsBitField } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks an user from server")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.KickMembers)
    .addUserOption((option) => option
        .setName("target")
        .setDescription("target user")
        .setRequired(true)
    ),
    async execute(client, interaction){
        const target = interaction.options.get("target")

        if(target.member){
            if(target.user.id != interaction.user.id){
                try{
                    await target.member.kick()

                    client.basicEmbed({
                        type: "reply",
                        desc: `<@!${interaction.user.id}> kicked <@!${target.user.id}>`
                    }, interaction)
                } catch (err){
                    client.errEmbed({type: "reply", title: "Error", desc: `\`\`\`${err.rawError.message}\`\`\``}, interaction)
                }
            } else {
                client.errEmbed({type: "reply", title: "Error", desc: "```Your not able to kick yourself```"}, interaction)
            }
        } else{
            client.errEmbed({type: "reply", title: "Error", desc: "```User not found```"}, interaction)
        }
    }
}