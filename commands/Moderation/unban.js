const { SlashCommandBuilder } = require("@discordjs/builders")
const { PermissionsBitField, ActionRowBuilder, ButtonBuilder, ComponentType, ButtonStyle } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unbans an user from server")
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

        const banList = await interaction.guild.bans.fetch()
        if(banList.get(target.user.id)){
            const unban_msg = await client.basicEmbed({
                type: "reply",
                components: [Buttons(false)],
                desc: `Are you sure you want to unban <@!${target.user.id}>`,
                footer: {text: "Note: Interactable disables after 15 seconds"}
            }, interaction)     

            const col = unban_msg.createMessageComponentCollector({filter: i => i.user.id === interaction.user.id, componentType: ComponentType.Button, time: 15000, max: 1})
            col.on("collect", async(i) => {
                switch(i.customId){
                    case "confirm":
                        const isBanned = await interaction.guild.bans.fetch()
                        if(isBanned.get(target.user.id)){
                            await interaction.guild.members.unban(target.user.id)
                            client.basicEmbed({type: "update", components: [Buttons(true)], desc: `<@!${i.user.id}> unbanned <@!${target.user.id}>`}, i)
                        } else{
                            client.errEmbed({type: "update", components: [Buttons(true)], desc: `The action for ${target.user.tag} can't be processed because he isn't banned`}, i)
                        }
                        break
                    case "cancel":
                        client.basicEmbed({type: "update", components: [Buttons(true)], desc: "The process has been canceled"}, i)
                        break
                }
            })

            col.on("end", async() => await interaction.editReply({components: [Buttons(true)]}))
            col.on("ignore", async(i) => client.errEmbed({type: "reply", ephemeral: true, desc: `You cant use this menu.`}, i))
        }else{
            client.errEmbed({type: "reply", desc: `The action for ${target.user.tag} can't be processed because he isn't banned`}, interaction)
        }
    }
}