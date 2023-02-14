const { SlashCommandBuilder } = require("@discordjs/builders")
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Create a verify self-role message")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageRoles)
    .addRoleOption((option) => option
        .setName("role")
        .setDescription("The verify role")
        .setRequired(true)
    ),
    async execute(client, interaction){
        const role = interaction.options.get("role")

        if(role.role.name == "@everyone") return client.errEmbed({type: "reply", ephemeral: true, title: "Error", desc: `You cant use @everyone as verify self-role`}, interaction)

        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setLabel("Verify")
            .setCustomId(`verify ${role.value}`)
            .setStyle(ButtonStyle.Success)
        )

        client.basicEmbed({
            type: "reply",
            title: "Verify",
            desc: "Click the button to verify",
            color: "#286c3c",
            components: [button]
        }, interaction)
    }
}