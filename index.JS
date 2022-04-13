const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

console.log('booting...')
console.log('done booting....')
console.log('starting bot')
console.log('Bots On')
console.log('logging token')
console.log('successfully logged token')
console.log('checking token')
console.log('tokens right')
console.log('starting bot code')

const Discord = require('discord.js');
const config = require('./config.json');
const command = require('./command.js')
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
require('dotenv').config()


client.on('ready', () => {
  console.log('Bot Successfully Started!')

  command(client, 'ping', (message) => {
    message.channel.send('Pong!!!!!!')
  })

  command(client, 'servers', (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send(
        `${guild.name} has a total of ${guild.memberCount} members`
      )
    })
  })

  command(client, ['cc', 'clearchannel'], (message) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results)
      })
    }
  })

  command(client, 'status', (message) => {
    const content = message.content.replace('!status ', '')

    client.user.setPresence({
      activity: {
        name: content,
        type: 1,
      },
    })
  })
})

command(client, ['rules'], (message) => {
  message.channel.send('1. no spaming 2.no bot abuseing 3.all these rules are FAKE 4. u dont need to follow these')
})

command(client, 'ctc', (message) => {
  const name = message.content.replace('!ctc ', '')

  message.guild.channels
    .create(name, {
      type: 'text',
    })
    .then((channel) => {
      const categoryId = '719799253706342421'
      channel.setParent(categoryId)
    })
})

command(client, 'createvoicechannel', (message) => {
  const name = message.content.replace('!createvoicechannel ', '')

  message.guild.channels
    .create(name, {
      type: 'voice',
    })
    .then((channel) => {
      const categoryId = '719799253706342421'
      channel.setParent(categoryId) 
      channel.setUserLimit(10)
    })
})

command(client, ['help','hl'], (message)=> {
  message.channel.send('commands: !help brings up this| !hl also brings up this| !ctc {CHANNELNAME} creates a channel| !status {STATUS} changes the bots status| !ping the bot will say "pong!"')
})

client.login(process.env.TOKEN); 
