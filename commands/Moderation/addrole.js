const { SlashCommandBuilder } = require("@discordjs/builders")
const { PermissionsBitField } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("addrole")
    .setDescription("Adds an role to a user")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageRoles)
    .addUserOption((option) => option
        .setName("target")
        .setDescription("target user")
        .setRequired(true)
    )
    .addRoleOption((option) => option
        .setName("role")
        .setDescription("target role")
        .setRequired(true)
    ),
    async execute(client, interaction) {
        const target = interaction.options.get("target")
        const role = interaction.options.get("role")

        if(role.role.name != "@everyone"){
            try{
                await target.member.roles.add(role.value)

                client.basicEmbed({
                    type: "reply",
                    desc: `\`${interaction.user.tag}\` added <@&${role.value}> to \`${target.user.tag}\``
                }, interaction)
            } catch(err){
                client.errEmbed({type: "reply", title: "Error", desc: `\`\`\`${err.rawError.message}\`\`\``}, interaction)
            }
        }  else{
            client.errEmbed({type: "reply", title: "Error", desc: `You cant add the @everyone role to a user`}, interaction)
        }
    }
}