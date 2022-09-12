const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const {
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
  Permissions
} = require(`discord.js`);
const db = require(`quick.db`)

module.exports = {
    name: "ticket-logs",
    description: "ست کردن لاگ سیستم",
    premium: true,
    options: [
    {
        name: "system",
        description: "لاگ سیستم رو انتخاب کنید.",
        type: "STRING",
        required: true,
        choices: [
          { name: `تیکت سیستم 1`, value: `1` },
          { name: `تیکت سیستم 2`, value: `2` },
          { name: `تیکت سیستم 3`, value: `3` },
          { name: `تیکت سیستم 4`, value: `4` },
          { name: `تیکت سیستم 5`, value: `5` },
          { name: `تیکت سیستم 6`, value: `6` },
          { name: `تیکت سیستم 7`, value: `7` },
          { name: `تیکت سیستم 8`, value: `8` },
          { name: `تیکت سیستم 9`, value: `9` },
          { name: `تیکت سیستم 10`, value: `10` },
          { name: `تیکت سیستم 11`, value: `11` },
          { name: `تیکت سیستم 12`, value: `12` },
          { name: `تیکت سیستم 13`, value: `13` },
          { name: `تیکت سیستم 14`, value: `14` },
          { name: `تیکت سیستم 15`, value: `15` },
          { name: `تیکت سیستم 16`, value: `Beta` },
        ]
      },
      {
          name: "channel",
          description: "ticket-logs channel",
          type: "CHANNEL",
          channelTypes: ["GUILD_TEXT"],
          required: true,
      }
    ], 
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      let s = interaction.options.getString('system');
      let channel = interaction.options.getChannel("channel");
const role = db.get(`adminrole_${interaction.guild.id}${s}`);

      if(!role) return interaction.followUp(`${client.emoji.wrong} **قبل ست کردن لاگ تیکت سیستم رو ست کنید**`)
      if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.followUp({ content: `${client.emoji.wrong} **شما نمیتونید از این کامند استفاده کنید.**`, ephemeral: true})


      const panel = new MessageEmbed()
      .setColor(client.config.color.main)
      .setTitle(`تیکت لاگ برای \` ${s}. تیکت سیستم \``)
      .setDescription(`این چنل برای لاگ تیکت ها ست شد.`)
      .setThumbnail(`https://cdn.discordapp.com/attachments/987778608401621002/1018206529289195660/20220910_213653.gif`)
      .setImage(`https://cdn.discordapp.com/attachments/987778608401621002/1018206528169320569/20220910_213822.gif`)
      .setFooter({text: `𝐊 Δ 𝐑 𝐌 Δ`, iconURL: (`https://cdn.discordapp.com/attachments/987778608401621002/1018206529289195660/20220910_213653.gif`)})

     
      
      interaction.followUp({ content: `${client.emoji.correct} ست شد **${channel.name} (${channel.id}) به عنوان چنل تیکت.**` })

      db.set(`ticketlogs_${interaction.guild.id}`, channel)
      client.channels.cache.get(channel.id).send({ embeds: [panel] })
    },
};