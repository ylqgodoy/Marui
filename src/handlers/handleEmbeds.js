const { EmbedBuilder } = require("discord.js")

module.exports = (client) => {
    client.tempEmbed = function() {
        return new EmbedBuilder()
            .setColor("#a48cc3")
    }

    client.errEmbed = function({
        embed: embed = client.tempEmbed(),
        title: title,
        desc: desc,
        color: color,
        type: type,
        components: components,
        ephemeral: ephemeral
    }, interaction){
        if(title) embed.setTitle(title)
        if(desc) embed.setDescription(desc)
        if(color){embed.setColor(color)}else{embed.setColor("#960915")}
            

        return client.sendEmbed({
            type: type,
            embeds: [embed],
            components: components,
            ephemeral: ephemeral
        }, interaction)
    }

    client.basicEmbed = function({
        embed: embed = client.tempEmbed(),
        title: title,
        desc: desc,
        color: color,
        image: image,
        url: url,
        author: author,
        thumbnail: thumbnail,
        footer: footer,
        fields: fields,
        type: type,
        components: components,
        ephemeral: ephemeral
    }, interaction){
        if(title) embed.setTitle(title)
        if(desc) embed.setDescription(desc)
        if(color) embed.setColor(color)
        if(image) embed.setImage(image)
        if(url) embed.setURL(url)
        if(fields) embed.addFields(fields)
        if(thumbnail) embed.setThumbnail(thumbnail)
        if(footer) embed.setFooter(footer)
        if(author) embed.setAuthor(author)

        return client.sendEmbed({
            type: type,
            embeds: [embed],
            components: components,
            ephemeral: ephemeral
        }, interaction)
    }

    client.sendEmbed = async function({
        type: type,
        embeds: [embeds],
        components: components,
        ephemeral: ephemeral
    }, interaction){
        switch(type){
            case "reply":
                return await interaction.reply({
                    embeds: [embeds],
                    components: components,
                    ephemeral: ephemeral
                }).catch((err) => {console.log("Reply Error:\n" + err)})
            case "editReply":
                return await interaction.editReply({
                    embeds: [embeds],
                    components: components,
                    ephemeral: ephemeral
                }).catch((err) => {console.log("EditReply Error:\n" + err)})
            case "update":
                return await interaction.update({
                    embeds: [embeds],
                    components: components
                }).catch((err) => {console.log("Update Error:\n" + err)})
        }
    }
}