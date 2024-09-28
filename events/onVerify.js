module.exports = {
    name: "interactionCreate",
    async execute(interaction, client){
        if(!interaction.isButton() || interaction.customId.slice(0, 6) !== "verify") return
    
        try{
            await interaction.member.roles.add(interaction.customId.slice(7))

            client.basicEmbed({
                type: "reply",
                ephemeral: true,
                title: "Role added",
                desc: `Added <@&${interaction.customId.slice(7)}>`
            }, interaction)
        } catch(err){
            switch(err.rawError.message){
                case "Missing Permissions": 
                    client.errEmbed({
                        type: "reply",
                        ephemeral: true,
                        title: "Error",
                        desc: "The bot is lacking permissions to add the role"
                    }, interaction)
                    break;
                case "Unknown Role":
                    client.errEmbed({
                        type: "reply",
                        ephemeral: true,
                        title: "Error",
                        desc: "The bot couldn't find the role"
                    }, interaction)
                    break;
            }
        }

    }
}