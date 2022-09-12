const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const {
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
  Permissions
} = require(`discord.js`);
const db = require(`quick.db`)

module.exports = {
    name: "ticket-setup",
    description: "ست کردن تیکت سیستم",
    premium: true,
    options: [
    {
        name: "system",
        description: "انتخاب کنید",
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
          description: "ticket-panel channel",
          type: "CHANNEL",
          channelTypes: ["GUILD_TEXT"],
          required: true,
      },
      
      {
            name: "role",
            description: "Admin Role to manage tickets",
            type: 8,
            required: true,
      },
      {
        name: "button_label",
        description: "Label for the button",
        type: "STRING",
        required: true,
      },
      {
        name: "embed_desc",
        description: "Message on prompt",
        type: "STRING",
        required: true,
      },
      {
        name: "ticket_open_msg",
        description: "Message on ticket-open [Use +n+ to add a space]",
        type: "STRING",
        required: true,
      },
      {
        name: "ticket_channel_name",
        description: "Name for the ticket channels {user} = Opener username",
        type: "STRING",
        required: false,
      },
      {
          name: "category",
          description: "ticket category",
          type: "CHANNEL",
          channelTypes: ["GUILD_CATEGORY"],
          required: false,
      },
      
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
      let category = interaction.options.getChannel("category");
      let role = interaction.options.getRole('role');
      let message = interaction.options.getString('embed_desc');
      let msg = interaction.options.getString('ticket_open_msg');
      let label = interaction.options.getString('button_label');
      let ticketname = interaction.options.getString('ticket_channel_name') || `ticket-{user}`;
      let check = await interaction.guild.channels.cache.get(channel.id);

      if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.followUp({ content: `${client.emoji.wrong} **شما نمیتونید از این کامند استفاده کنید.**`, ephemeral: true})

      if(!check) return interaction.followUp({ content: `args که ارائه می کنید یا کانال نیست یا بات نمیتونه کانال انتخاب شده رو ببینه.` })

      const panel = new MessageEmbed()
      .setColor(client.config.color.main)
      .setTitle(`Apokolips TM`)
      .setDescription(`${message || `Open a ticket for ${interaction.guild.name}`}`)
      .setFooter(`برای باز کردن تیکت روی دکمه زیر کلیک کنید.`, interaction.guild.iconURL())

      const button = new MessageActionRow()
      .addComponents([
        new MessageButton()
        .setLabel(label)
        .setStyle(`DANGER`)
        .setEmoji(`📨`)
        .setCustomId(`create_ticket${s}`)
      ])
      const embed = new MessageEmbed()
      .setColor(client.config.color.main)
      .setTitle(`تیکت سیستم ست شد`)
        .setDescription(`
\`\`\`diff
-ticket system shoma set shod, baraye set kardan log ha az command /ticket-logs estefade konid.
\`\`\`
\`\`\`bash
+ Ticket system set shod: ${s}. Ticket-System
+ Ticket Channel set shode: ${channel} (${channel.id})
+ Ticket Category:, **${category || `_\` Ticket Category set nashode \`_`}
+ Admin Role (Ticket Responder): ${role} (${role.id}
+ esm channel haye ticket: agar shoma ticket channel sabet entekhab nakarde bashid bot be sorat khodkar user kasi ke ticket baz karde ro mizare
baraye name channel (mesal: agar user sashazox ticket baz karde bashe name channel mishe ticket-sashazox)
+ Ticket Message (text roye panel embed): ${message || `Open a ticket for ${interaction.guild.name}`}
+ Ticket Message (text embed dakhel ticket baz shode): msg.split("+n+").join("\n")
\`\`\`
`)
      .setThumbnail(`https://cdn.discordapp.com/attachments/987778608401621002/1018206529289195660/20220910_213653.gif`)
      .setImage(`https://cdn.discordapp.com/attachments/987778608401621002/1018206528169320569/20220910_213822.gif`)
      .setFooter({text: `𝐊 Δ 𝐑 𝐌 Δ`, iconURL: (`https://cdn.discordapp.com/attachments/987778608401621002/1018206529289195660/20220910_213653.gif`)})
      
      db.set(`ticketmsg_${interaction.guild.id}${s}`, msg.split("+n+").join("\n"));
      if(category) db.set(`category_${interaction.guild.id}${s}`, category.id)
      db.set(`adminrole_${interaction.guild.id}${s}`, role.id);
      db.set(`ticketname_${interaction.guild.id}`, ticketname);
      interaction.followUp({ embeds: [embed] })

      client.channels.cache.get(channel.id).send({ embeds: [panel], components: [button] })
    },
};