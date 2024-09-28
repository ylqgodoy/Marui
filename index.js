require("dotenv").config()
const fs = require("fs")
const { Client, Collection, GatewayIntentBits } = require("discord.js")

const client = new Client({
    intents: [        
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers
    ]
})

client.commands = new Collection()

const handlers = fs.readdirSync("./src/handlers").filter(file => file.endsWith(".js"))

process.on('unhandledRejection', error => {
	console.error(`Unhandled promise rejection: ${error}`);
});

for(file of handlers){
    require(`./handlers/${file}`)(client)
}

client.login(process.env.token)