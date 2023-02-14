module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        if(!interaction.isCommand()) return

        const command = client.commands.get(interaction.commandName)

        if(!command) return
        if(!interaction.guild) return client.errEmbed({type: "reply", ephemeral: true, title: "Error", desc: `Bot commands are only available in servers`}, interaction)
        if(command.devOnly && interaction.user.id != "399301340326789120") return client.errEmbed({type: "reply", title: "Error", desc: `The \`/${command.data.name}\` command is only available for developers`}, interaction)
        if(command.nsfw && !interaction.channel.nsfw) return client.errEmbed({type: "reply", title: "Error", desc: `The \`/${command.data.name}\` command is only available in NSFW-Channel's`}, interaction)

        try{
            await command.execute(client, interaction)
        } catch(err){
            console.error(err)

            if(interaction.deferred || interaction.replied) {
                client.errEmbed({
                    type: "editReply",
                    title: "Error",
                    desc: `An error occured while executing \`/${command.data.name}\` command:\n\`\`\`${err}\`\`\``
                }, interaction)
            } else {
                client.errEmbed({
                    type: "reply",
                    title: "Error",
                    desc: `An error occured while executing \`/${command.data.name}\` command:\n\`\`\`${err}\`\`\``
                }, interaction)
            }
        }
    }
}