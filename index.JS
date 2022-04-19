const Discord = require('discord.js');
const config = require('./config.json');
const command = require('./command.js')
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
require('dotenv').config()


client.on('ready', () => {
  console.log('Bots Successfuly Online')
  client.user.setActivity("pran code me", { type: "WATCHING"});
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
    if (message.member.hasPermission('ADMINISTRATOR', 'MANAGE_MESSAGES')) {
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results)
      })
    }
  })

  command(client, 'status', (message) => {
    const content = message.content.replace('!status ', '')
    if (message.member.hasPermission('ADMINISTRATOR', 'MANAGE_WEBHOOKS'))
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
  if (message.member.hasPermission('ADMINISTRATOR', 'MANAGE_CHANNELS'))
  message.guild.channels
    .create(name, {
      type: 'text',
    })
    .then((channel) => {
      const categoryId = '-1'
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

command(client, 'ban', (message) => {
  const { member, mentions } = message

  const tag = `<@${member.id}>`

  if (
    member.hasPermission('ADMINISTRATOR') ||
    member.hasPermission('BAN_MEMBERS')
  ) {
    const target = mentions.users.first()
    if (target) {
      const targetMember = message.guild.members.cache.get(target.id)
      targetMember.ban()
      message.channel.send(`${tag} This user has BANNED they cannot rejoin`)
    } else {
      message.channel.send(`${tag} Please tell someone for me to ban`)
    }
  } else {
    message.channel.send(
      `${tag} You Have NO PERMITION PEASENT`
    )
  }
})

command(client, 'kick', (message) => {
  const { member, mentions } = message

  const tag = `<@${member.id}>`

  if (
    member.hasPermission('ADMINISTRATOR') ||
    member.hasPermission('KICK_MEMBERS')
  ) {



    const target = mentions.users.first()
    if (target) {
      const targetMember = message.guild.members.cache.get(target.id)
      targetMember.kick()
      message.channel.send(`${tag} this user is now kicked to they can rejoin`)
    } else {
      message.channel.send(`${tag} Please tell someone for me to Kick!`)
    }
  } else {
    message.channel.send(
      `${tag} You Have NO PERMITION PEASENT`
    )
  }
})

command(client, ['help','hl'], (message)=> {
  message.channel.send('commands: !help brings up this| !hl also brings up this| !ctc {CHANNELNAME} creates a channel| !status {STATUS} changes the bots status| !ping the bot will say "pong! | !invite: give an invite link to the actul bot"')
})  

command(client, ['credits', 'cd'], (message) => {
message.channel.send('creator:praneethprogamer , learner:praneethprogamer , helper: Windows 11 ')
})

command(client, ['invite'], (message) => {
  message.channel.send('Invite The Bot HERE: https://discord.com/api/oauth2/authorize?client_id=959463038111588392&permissions=8&scope=bot ')
})

client.login(process.env.TOKEN); 
