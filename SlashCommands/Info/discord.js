const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "discord",
    description: "ساپورت سرور",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Loading..`);

      const emb = new MessageEmbed()
      .setColor(client.config.color.main)
      .setTitle(`Join ${client.user.username} support server`)
      .setDescription(`**[support server https://discord.gg/x6TZyyxaTq]()**`)
      .setThumbnail(client.user.displayAvatarURL({ dynamic : true }))
      .setImage(`https://cdn.discordapp.com/attachments/1001283718356418660/1017242884442959972/Apokolips_Ticket.gif`) 
      .setFooter(`Apokolips TM`) 

      const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
				.setURL(`https://discord.gg/x6TZyyxaTq`)
				.setLabel('Apokolips TM')
				.setStyle('LINK'),
			);
      
      setTimeout(() => {
        msg.edit({ content: ` `, embeds: [emb], components: [row] });
      }, 500);
    },
};
