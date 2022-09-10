const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const mongoose = require("mongoose");
const chalk = require("chalk");
const Discord = require('discord.js');
const client = require(`./index.js`);
const config = require("../config.json");
const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
  
  
    const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }
    });
    
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));

    const slashCommands = await globPromise(`${process.cwd()}/SlashCommands/*/*.js`);
    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
      const file = require(value);
      if (!file?.name) return;
      client.slashCommands.set(file.name, file);
      arrayOfSlashCommands.push(file);
    }); 

    
    client.on("messageCreate", async (message, user) => {
      if(message.content.startsWith(`${client.config.prefix}deploy`)) {
        try {
        if(!message.member.permissions.has("MANAGE_GUILD")) {
        return message.reply(`**shoma nmitonin az command \`Deploy\` estefade konid**\n> ** \`${arrayOfSlashCommands.length}\`| ${client.user.username}**`);
      }
      let themsg = await message.reply(`**Attempting to set the GUILD Slash Commands in \`${message.guild.name}\`...**`)
await client.application.commands.set(arrayOfSlashCommands).then((slashCommandsData) => {
      themsg.edit(`${client.emoji.correct} **Loading \`${slashCommandsData.size} Slash-Commands\`** (\`${slashCommandsData.map(d => d.options).flat().length} Subcommands\`) in ${message.guild.name}`);
        }).catch((e) => {
          console.log(e)
          themsg.edit(`**bot nmitone slash command haro dakhel ${message.guild.name} load kone**\n\n**ehtemalan bot perm kafi baraye create slash command nadare. bot ro ba in link dobare invite konid:**\n> https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
        });
        }
     catch (e) {
      console.log(String(e.stack))
      return message.channel.send({
        embeds: [new Discord.MessageEmbed()
          .setColor(`RED`)
          .setTitle(`ارور`)
          .setDescription(`احتمالا یک قسمت از کد به درستی اجرا نشده بات رو ریستارت کنید`)
        ]
      })
     }
      }
    })
      

    client.on('guildCreate', async (guild) => {
   await client.application.commands.set(arrayOfSlashCommands);
   return console.log(`بات به سرور  ${guild.name} اینوایت شد و اسلش کامند ها شروع به ساختن شدن اگه بات پرم کافی داشته باشه`)
    })
}

