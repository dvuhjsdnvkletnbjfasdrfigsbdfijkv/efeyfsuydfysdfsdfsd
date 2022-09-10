const client = require("../index");
const { MessageEmbed } = require('discord.js')

client.on('messageCreate', async(message) => {

  if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`){
    return message.reply(`**سلام __${message.author.username}__, شما میتونین از طریق *\`/\`* از کامند های بات استفاده کنید.**\n ↳  *از \`/help\` استفاده کنید برای مشاهده کامند های بات.*`)
  }

})