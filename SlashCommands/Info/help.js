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
        .setDescription(`**${client.user.username} is the Next Generation of Ticket Creations! With \\☁️ Powerful Systems, Quick Database, Optimized \\🎫 Multiple Ticket Systems, and much more!**`)
        .addField("\u200b", "🔰 **__Information Commands:__**")
        .addField("`help`", "*View the bot's commands*")
        .addField("`stats`", "*View the bot's Statistics*")
        .addField("`invite`", "*Invite **"+client.user.username+"** to your server*")
        .addField("`Discord`", "*Join AP Ticket Tool Discord!*")
        
        .addField("\u200b", "⚙️ **__Configuration Commands:__**")
        .addField("`ticket-setup`", "*Setup the Ticket System*")
        .addField("`ticket-logs`", "*Setup the Ticket-Logs Channel*")
        
        .addField("\u200b", "👑 **__Owner Commands:__**")
        .addField("`allservers`", "*View All the Servers the Bot is in*")
        .addField("`manage_bot`", "*Change/edit/stop the bot*")
      .setFooter(`Created By Sashazox`, interaction.guild.iconURL())
      return interaction.followUp({ embeds: [embed] })
    },
};
