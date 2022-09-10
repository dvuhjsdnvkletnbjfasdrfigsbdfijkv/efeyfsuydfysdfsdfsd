const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
    name: "help",
    description: "مشاهده کامند های بات",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      const embed = new MessageEmbed()
      .setTitle(`𝐊 Δ 𝐑 𝐌 Δ Ticket Tool`)
      .setColor(client.config.color.main)
        .setDescription(`**${client.user.username}**`)
        .addField("\u200b", "🔰 **__command haye bot:__**")
        .addField("`help`", "*list command haye bot*")
        .addField("`stats`", "*moshahede stats bot*")
        .addField("`invite`", "*Invite dadan **"+client.user.username+"** be server*")
        .addField("`Discord`", "*link invite 𝐊 Δ 𝐑 𝐌 Δ GIF | 𝐊 Δ 𝐑 𝐌 Δ PORN*")
        
        .addField("\u200b", "⚙️ **__Command haye ticket:__**")
        .addField("`ticket-setup`", "*Setup kardan ticket system*")
        .addField("`ticket-logs`", "*Setup kardan log system*")
        
        .addField("\u200b", "**__𝐊 Δ 𝐑 𝐌 Δ Developer Commands:__**")
        .addField("`allservers`", "*esm server hayi ke bot dakheleshon hast*")
        .addField("`manage_bot`", "*Manage kardan bot, Change dadan esme bot, change dadan prof bot, shutdown kardan bot*")
        .setImage(`https://cdn.discordapp.com/attachments/987778608401621002/1018206528169320569/20220910_213822.gif`) 
      .setFooter(`𝐊 Δ 𝐑 𝐌 Δ`, interaction.guild.iconURL('https://cdn.discordapp.com/attachments/987778608401621002/1018206529289195660/20220910_213653.gif'))
      return interaction.followUp({ embeds: [embed] })
    },
};
