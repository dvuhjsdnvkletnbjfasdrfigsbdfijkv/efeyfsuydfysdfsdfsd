 const { Client, MessageEmbed, CommandInteraction, MessageButton, MessageActionRow, MessageSelectMenu } = require("discord.js");

 module.exports = {
     name: "allservers",
     description: "فقط کسایی که داخل بات Whitelist هستن میتونین از این کامند استفاده کنن",
     run: async (client, interaction, args) => {
       let msg = await interaction.followUp({ content: `Fetching..` })

       if (!client.config.developers.includes(interaction.user.id)) return msg.edit({ content: `شما نمیتونین از این کامند استفاده کنید.**`, ephemeral: true})

       let array = []
       client.guilds.cache.forEach(async(x) => {
           array.push(`> **اسم سرور: ${x.name} | تعداد ممبر: ${x.memberCount}**`);
           return msg.edit(`${array.join("\n")}`)
       });
     },
 };