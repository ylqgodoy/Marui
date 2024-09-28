const { SlashCommandBuilder } = require("@discordjs/builders")
const { PermissionsBitField, ActionRowBuilder, ButtonBuilder, ComponentType, ButtonStyle } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans an user from server")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers)
    .addUserOption((option) => option
        .setName("target")
        .setDescription("target user")
        .setRequired(true)
    ),
    async execute(client, interaction){
        const target = interaction.options.get("target")

        const Buttons = (state) => new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`confirm`)
                    .setLabel("Confirm")
                    .setStyle(ButtonStyle.Success)
                    .setDisabled(state),
                new ButtonBuilder()
                    .setCustomId(`cancel`)
                    .setLabel("Cancel")
                    .setStyle(ButtonStyle.Danger)
                    .setDisabled(state)                  
            )

        if(target.member){
            if(target.member.moderatable){
                ban_user(client, interaction, target, Buttons)
            } else {
                client.errEmbed({type: "reply", desc: `The action for ${target.user.tag} can't be processed because the bot is lacking permissions`}, interaction)
            }
        } else {
            const banList = await interaction.guild.bans.fetch()
            if(!banList.get(target.user.id)){
                ban_user(client, interaction, target, Buttons)
            } else {
                client.errEmbed({type: "reply", desc: `The action for ${target.user.tag} can't be processed because the user is already banned`}, interaction)           
            }
        } 
    }
}

const ban_user = async function(client, interaction, target, components){
    const ban_msg = await client.basicEmbed({
        type: "reply",
        components: [components(false)],
        desc: `Are you sure you want to ban <@!${target.user.id}>`,
        footer: {text: "Note: Interactable disables after 15 seconds"}
    }, interaction)  

    const col = ban_msg.createMessageComponentCollector({filter: i => i.user.id === interaction.user.id, componentType: ComponentType.Button, time: 15000})
    col.on("collect", async(i) => {
        switch(i.customId){
            case "confirm":
                await interaction.guild.members.ban(target.user.id)
                client.basicEmbed({type: "update", components: [components(true)], desc: `<@!${i.user.id}> banned <@!${target.user.id}>`}, i)
                break
            case "cancel":
                client.basicEmbed({type: "update", components: [components(true)], desc: "The process has been canceled"}, i)
                break
        }
    })
    col.on("end", async() => await interaction.editReply({components: [components(true)]}))
    col.on("ignore", async(i) => client.errEmbed({type: "reply", ephemeral: true, desc: `You cant use this menu.`}, i))
}