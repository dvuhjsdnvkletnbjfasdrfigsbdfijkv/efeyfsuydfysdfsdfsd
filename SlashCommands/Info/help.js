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
        \`\`\`elm
        Help
        list command haye bot
        \`\`\`elm
        \`\`\`elm
        Stats
        moshahede stats bot
        \`\`\`elm
        \`\`\`elm
        Invite
        link invite bot
        \`\`\`elm
        Karma
        link invite karma gif
        link invite karma porn
        \`\`\`elm
        > **Command haye ticket**
        \`\`\`elm
        Ticket-setup
        setup kardan ticket system
        \`\`\`elm
        \`\`\`elm
        Ticket-logs
        setup kardan log system
        \`\`\`elm
        > **𝐊 Δ 𝐑 𝐌 Δ Developer Commands**
        \`\`\`elm
        Allservers
        moshahede ems server hayi ke bot dakheleshon hast
        \`\`\`elm
        Manage_bot
        manage kardan bot, change dadan esm bot, change dadan prof bot, shutdown kardan bot
        \`\`\`elm`)
        .setImage(`https://cdn.discordapp.com/attachments/987778608401621002/1018206528169320569/20220910_213822.gif`) 
      .setFooter({text:`𝐊 Δ 𝐑 𝐌 Δ`, iconURL: ('https://cdn.discordapp.com/attachments/987778608401621002/1018206529289195660/20220910_213653.gif')})
      return interaction.followUp({ embeds: [embed] })
    },
};
