const fs = require("fs")

module.exports = (client) => {
    const EventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"))

    EventFiles.forEach(EventFile => {
        const event = require(`../events/${EventFile}`)
        client.on(event.name, (...args) => event.execute(...args, client))
    })
}
