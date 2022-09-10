const { Client, Collection } = require("discord.js");
const chalk = require("chalk");
const Discord = require(`discord.js`)
const colors = require("colors")
const Cluster = require('discord-hybrid-sharding');
const discordModals = require('discord-modals');
const { red, green, blue, magenta, cyan, white, gray, black } = require("chalk");
const client = new Client({
    shards: Cluster.data.SHARD_LIST, 
    shardCount: Cluster.data.TOTAL_SHARDS, 
    intents: 32767,
});
module.exports = client;


client.commands = new Collection();
client.slashCommands = new Collection();
const fs = require(`fs`);
client.config = require("./config.json");
client.emoji = require(`./emoji.json`)
client.cluster = new Cluster.Client(client)

client.on("ready" , () => {
    setInterval(() => {
        setTimeout(() => {
            client.user.setStatus('online')
        }, 1000)
        setTimeout(() => {
            client.user.setStatus('idle')
        }, 2000)
        setTimeout(() => {
            client.user.setStatus('dnd')
        }, 3000)
    }, 3000);
})

require("./handler")(client);
discordModals(client);

if(client.config.hostingweb == true) {
require("./webport")();
}


const glob = require("glob")
const fetch = require(`node-fetch`)
client.on("interactionCreate", async (btn) => {
  if (btn.values == "stop_client") {
    if(!client.config.developers.includes(btn.member.id)) return btn.reply({
      content: "شما نمیتونید از این کامند استفاده کنید.",
      ephemeral: true
    })
    try {
      btn.reply({
        content: "**در حال خاموش کردن بات...**",
        ephemeral: true
      })
      setTimeout(() => {
        process.exit()
      }, 5000)
    } catch (e) {
      btn.editReply({
        content: `${e}`
      })
    }
  }
  if (btn.values == "rename_client") {
    if(!client.config.developers.includes(btn.member.id)) return btn.reply({
      content: "شما نمیتونید از این کامند استفاده کنید.",
      ephemeral: true
    })
    let filter = (m) => m.author.id === btn.user.id;
    const collector = btn.channel.createMessageCollector({
      filter,
      max: 1
    })
    btn.reply({ content: "**اسم جدید بات رو وارد کنید.**",
        ephemeral: true})
    collector.on("end", (collected) => {
      const name = collected.first().content;
      if (!name) {
        return btn.reditReply({ content: `**اسمی وارد نشده.**`})
      }
      let beforename = client.user.username;
      client.user.setUsername(name)
        .then((user) => {
          message.delete()
          btn.editReply({ content: `✅ **اسم بات از ${client.user.username} به ${beforename} تغییر کرد.**`,
        ephemeral: true})
        })
        .catch((e) => {
          btn.editReply({ content: `${e}`,
        ephemeral: true})
        })
    })
  }
  if (btn.values == "changeav_client") {
    if(!client.config.developers.includes(btn.member.id)) return btn.reply({
      content: "شما نمیتونید از این کامند استفاده کنید.",
      ephemeral: true
    })
    let filter = (m) => m.author.id === btn.user.id;
    const collector = btn.channel.createMessageCollector({
      filter,
      max: 1
    })
    btn.reply({ content: "**عکس جدید بات رو ارسال کنید.**",
        ephemeral: true})
    collector.on("collect", async (msg) => {
        let url = msg.content;
      if(msg.content.includes(`https://`)) {
        btn.editReply({ content: "**درحال تغییر دادن پروفایل بات...**",
        ephemeral: true})
        
        await msg.delete()
        client.user.setAvatar(url)
          .then(user => {
            
              btn.editReply({ content: "✅ **پروفایل بات تغییر داده شد.**",
        ephemeral: true})
            
          }).catch((e) => {
          btn.editReply({ content: `${e}`,
        ephemeral: true})
        })
      } else {
        msg.delete()
        btn.editReply({ content: "❌ لینک عکس اشتباه است",
        ephemeral: true})
      }
    })
  }
})
client.login(process.env.token)
process.on('unhandledRejection', (reason, p) => {
    console.log('\n\n\n\n\n[🚩 Anti-Crash] unhandled Rejection:'.toUpperCase().red.dim);
    console.log(reason.stack.yellow.dim ? String(reason.stack).yellow.dim : String(reason).yellow.dim);
    console.log('=== unhandled Rejection ===\n\n\n\n\n'.toUpperCase().red.dim);
  });
  process.on("uncaughtException", (err, origin) => {
    console.log('\n\n\n\n\n\n[🚩 Anti-Crash] uncaught Exception'.toUpperCase().red.dim);
    console.log(err.stack.yellow.dim ? err.stack.yellow.dim : err.yellow.dim)
    console.log('=== uncaught Exception ===\n\n\n\n\n'.toUpperCase().red.dim);
  })
  process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log('[🚩 Anti-Crash] uncaught Exception Monitor'.toUpperCase().red.dim);
  });
  process.on('beforeExit', (code) => {
    console.log('\n\n\n\n\n[🚩 Anti-Crash] before Exit'.toUpperCase().red.dim);
    console.log(code.yellow.dim);
    console.log('=== before Exit ===\n\n\n\n\n'.toUpperCase().red.dim);
  });
  process.on('exit', (code) => {
    console.log('\n\n\n\n\n[🚩 Anti-Crash] exit'.toUpperCase().red.dim);
    console.log(code.yellow.dim);
    console.log('=== exit ===\n\n\n\n\n'.toUpperCase().red.dim);
  });
  process.on('multipleResolves', (type, promise, reason) => {
    console.log('\n\n\n\n\n[🚩 Anti-Crash] multiple Resolves'.toUpperCase().red.dim);
    console.log(type, promise, reason.yellow.dim);
    console.log('=== multiple Resolves ===\n\n\n\n\n'.toUpperCase().red.dim);
  });