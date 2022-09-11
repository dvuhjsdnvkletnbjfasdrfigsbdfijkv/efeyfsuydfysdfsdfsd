const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "invite",
    description: "لینک اینوایت بات",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Loading..`);

      const emb = new MessageEmbed()
      .setColor(client.config.color.main)
      .setTitle(`${client.user.username}`)
      .setDescription(`بعد از اینوایت دادن بات از کامند **/help** استفاده کنید برای مشاهده کامند های بات.`)
      .setThumbnail(client.user.displayAvatarURL({ dynamic : true }))
      .setImage(`https://cdn.discordapp.com/attachments/1001283718356418660/1017242884442959972/Apokolips_Ticket.gif`) 
      .setFooter(`Apokolips TM`) 

      const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
				.setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
				.setLabel('Instant')
				.setStyle('LINK'),
			);
      
      setTimeout(() => {
        msg.edit({ content: ` `, embeds: [emb], components: [row] });
      }, 500);
    },
};
