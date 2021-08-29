const client = new(require("discord.js").Client)
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const { Slash } = require("discord-slash-commands");
const slash = new Slash({ client: client })
const embed = new MessageEmbed();
let config = require('./config.json')


slash.on("create", (d) => {
    console.log(`Slash Commands are created`)
})

slash.on("command", async (command) => {
    if (command.name === "activities") {
        let channel = client.channels.cache.get(command.options.find(m => m.name === "channel").value);
        if (channel.type !== "voice") return command.callback("Channel must be a voice channel.")
        if (command.options.find(m => m.name === "type").value === "yt") {
            fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: config.YT_ID,
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(invite => {
                    embed.setTitle("Activity added!")
                    embed.setDescription(`**YouTube Together** to [${channel.name} **Click Me To Join**](https://discord.gg/${invite.code})`)
                    embed.setFooter(`Requested by ${command.author.username + "#" + command.author.discriminator}`)
                    embed.setColor(config.Embed_color)
                    command.callback({
                        embeds: embed
                    });
                })

        }
        if (command.options.find(m => m.name === "type").value === "pn") {
            fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: config.PN_ID,
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(invite => {
                    embed.setTitle("Activity added!")
                    embed.setDescription(`**Poker Night** to [${channel.name} **Click Me To Join**](https://discord.gg/${invite.code})`)
                    embed.setFooter(`Requested by ${command.author.username + "#" + command.author.discriminator}`)
                    embed.setColor(config.Embed_color)
                    command.callback({
                        embeds: embed
                    });
                })

        }
        if (command.options.find(m => m.name === "type").value === "bio") {
            fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: config.BIO_ID,
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(invite => {
                    embed.setTitle("Activity added!")
                    embed.setDescription(`**Betrayal.io** to [${channel.name} **Click Me To Join**](https://discord.gg/${invite.code})`)
                    embed.setFooter(`Requested by ${command.author.username + "#" + command.author.discriminator}`)
                    embed.setColor(config.Embed_color)
                    command.callback({
                        embeds: embed
                    });
                })

        }
        if (command.options.find(m => m.name === "type").value === "fio") {
            fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: config.FIO_ID,
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(invite => {
                    embed.setTitle("Activity added!")
                    embed.setDescription(`**Fishington.io** to [${channel.name} **Click Me To Join**](https://discord.gg/${invite.code})`)
                    embed.setFooter(`Requested by ${command.author.username + "#" + command.author.discriminator}`)
                    embed.setColor(config.Embed_color)
                    command.callback({
                        embeds: embed
                    });
                })

        }
    

    if (command.options.find(m => m.name === "type").value === "chess") {
        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                method: "POST",
                body: JSON.stringify({
                    max_age: 86400,
                    max_uses: 0,
                    target_application_id: config.CHESS_ID,
                    target_type: 2,
                    temporary: false,
                    validate: null
                }),
                headers: {
                    "Authorization": `Bot ${client.token}`,
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(invite => {
                embed.setTitle("Activity added!")
                embed.setDescription(`**Chess in the park** to [${channel.name} **Click Me To Join**](https://discord.gg/${invite.code})`)
                embed.setFooter(`Requested by ${command.author.username + "#" + command.author.discriminator}`)
                embed.setColor(config.Embed_color)
                command.callback({
                    embeds: embed
                });
            })

    }
 }
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)

    slash.create({
        guildOnly: false,
        data: {
            name: "activities",
            description: "Voice channel activities",
            options: [{
                    name: "channel",
                    description: "Select the voice channel",
                    required: true,
                    type: 7,
                },
                {
                    name: "type",
                    description: "Type of activity.",
                    required: true,
                    type: 3,
                    choices: [{
                            name: "YouTube Together",
                            value: "yt"
                        },
                        {
                            name: "Betrayal.io",
                            value: "bio"
                        },
                        {
                            name: "Poker Night",
                            value: "pn"
                        },
                        {
                            name: "Fishington.io",
                            value: "fio"
                        },
                        {
                            name: "Chess in the park",
                            value: "chess"
                        }
                    ]
                }
            ]
        }
    })
})

client.login(config.Token)