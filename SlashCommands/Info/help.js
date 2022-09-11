const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
    name: "help",
    description: "مشاهده کامند های بات",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      /*let categories = [];

      readdirSync("./SlashCommands/").forEach((dir) => {
        const commands = readdirSync(`./SlashCommands/${dir}/`).filter((file) => file.endsWith(".js"));

        const cmds = commands.map((command) => {
          let file = require(`../../SlashCommands/${dir}/${command}`);
          if (!file.name) return "`COMMAND IS WIP`";
          let name = file.name.replace(".js", "");
          return `\`${name}\``;
        });
        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "WIP 🦺" : cmds.join(" "),
        };

        categories.push(data);
      }); */

      const embed = new MessageEmbed()
      .setTitle(`AP Ticket Tool | Powerful Tickets`)
      .setColor(client.config.color.main)
      //.addFields(categories)
        .setDescription(`**${client.user.username} beta version**`)
        .addField("\u200b", "🔰 **__command haye bot:__**")
        .addField("`help`", "*list command haye bot*")
        .addField("`stats`", "*moshahede stats bot*")
        .addField("`invite`", "*Invite dadan **"+client.user.username+"** be server*")
        .addField("`Discord`", "*link invite support server*")
        
        .addField("\u200b", "⚙️ **__Command haye ticket:__**")
        .addField("`ticket-setup`", "*Setup kardan ticket system*")
        .addField("`ticket-logs`", "*Setup kardan log system*")
        
        .addField("\u200b", "**__Apokolips Developer Commands:__**")
        .addField("`allservers`", "*esm server hayi ke bot dakheleshon hast*")
        .addField("`manage_bot`", "*Manage kardan bot, Change dadan esme bot, change dadan prof bot, shutdown kardan bot*")
        .setImage(`https://cdn.discordapp.com/attachments/1001283718356418660/1014885689088815144/Ticket_Help.gif`) 
      .setFooter(`Apokolips TM`, interaction.guild.iconURL())
      return interaction.followUp({ embeds: [embed] })
    },
};
