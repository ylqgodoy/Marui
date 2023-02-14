const { SlashCommandBuilder} = require("@discordjs/builders")
const { ActionRowBuilder, StringSelectMenuBuilder, ComponentType } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows Help"),
    async execute(client, interaction) {
        const folders = [
            ...new Set(client.commands.map(cmd => cmd.Folder))
        ]

        const modules = folders.map((folder) => {
            const getCommands = client.commands.filter(cmd => cmd.Folder === folder).map(cmd => {
                return{
                    name: cmd.data.name,
                    description: cmd.data.description
                }
            })

            return{
                folder: folder,
                commands: getCommands
            }
        })

        const emojis = {
            Fun: "🎡",
            Information: "🌎",
            NSFW: "🔞",
            VALORANT: "<:rem:767509808525738026>",
            Moderation: "🛡️",
            Bot: "🤖"
        }

        const SelectMenu = (state) => [
            new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setCustomId(`help-menu`)
					.setPlaceholder('Select a category')
                    .setDisabled(state)
                    .addOptions(
                    modules.map((module) => {
                        return{
                            label: module.folder,
                            value: module.folder,
                            description: `Commands from ${module.folder} module`,
                            emoji: emojis[module.folder]
                        }
                    })
                )
			)
        ]

        const help_msg = await client.basicEmbed({
            type: "reply",
            components: SelectMenu(false),
            ephemeral: true,
            title: "Help-Menu",
            desc: "Please use the Select Menu below to get information about a module.\n`Note: Interactable disables after 15 seconds`\n\u200b",
            footer: {iconURL: `${interaction.user.displayAvatarURL() || interaction.user.defaultAvatarURL}`, text: `Help-Menu requested by ${interaction.user.tag}`},
            fields: [
                {name: "Bot Links:", value: "• [Github](https://github.com/MonkiisHere)\n• [Steam](https://steamcommunity.com/id/DevMonki/)"}
            ]
        }, interaction)

        const col = help_msg.createMessageComponentCollector({componentType: ComponentType.StringSelect, time: 15000})

        col.on("collect", async(i) => {
            const [folder] = i.values
            const module = modules.find(x => x.folder === folder)

            client.basicEmbed({
                type: "update",
                title: `${emojis[module.folder]}・${module.folder}`,
                fields: module.commands.map((cmd) => {
                    return{
                        name: `\`/${cmd.name}\``,
                        value: cmd.description
                    }
                }),
                footer: {iconURL: `${interaction.user.displayAvatarURL() || interaction.user.defaultAvatarURL}`, text: `Help-Menu requested by ${interaction.user.tag}`},
            }, i)
        })

        col.on("end", async() => interaction.editReply({components: SelectMenu(true)}))
    }
}