const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
    name: "help",
    description: "مشاهده کامند های بات",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      const embed = new MessageEmbed()
      .setTitle(`𝐊 Δ 𝐑 𝐌 Δ Ticket`)
      .setColor(client.config.color.main)
        .setDescription(`> **Command haye bot**
\`\`\`diff
-/Help
list command haye bot
\`\`\`
\`\`\`diff
-/Stats
moshahede stats bot
\`\`\`
\`\`\`diff
-/Invite
link invite bot
\`\`\`
\`\`\`diff
-/Karma
link invite karma gif
link invite karma porn
\`\`\`
> **Command haye ticket**
\`\`\`diff
-/Ticket-setup
setup kardan ticket system
\`\`\`
\`\`\`diff
-/Ticket-logs
setup kardan log system
\`\`\`
> **𝐊 Δ 𝐑 𝐌 Δ Developer Commands**
\`\`\`diff
-/Allservers
moshahede ems server hayi ke bot dakheleshon hast
\`\`\`
\`\`\`diff
-/Manage_bot
manage kardan bot, change dadan esm bot, change dadan prof bot, shutdown kardan bot
\`\`\`
`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/987778608401621002/1018206529289195660/20220910_213653.gif`)
        .setImage(`https://cdn.discordapp.com/attachments/987778608401621002/1018206528169320569/20220910_213822.gif`) 
      .setFooter({text:`𝐊 Δ 𝐑 𝐌 Δ`, iconURL: ('https://cdn.discordapp.com/attachments/987778608401621002/1018206529289195660/20220910_213653.gif')})
      return interaction.followUp({ embeds: [embed] })
    },
};
