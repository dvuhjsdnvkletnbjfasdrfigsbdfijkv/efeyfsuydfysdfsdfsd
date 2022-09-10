const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "discord",
    description: "KARMA PORN | KARMA GIF invite link",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Loading..`);

      const emb = new MessageEmbed()
      .setColor(client.config.color.main)
      .setTitle(`𝐊 Δ 𝐑 𝐌 Δ Ticket`)
      .setDescription(`**𝐊 Δ 𝐑 𝐌 Δ: https://discord.gg/C7sxCgh7**`)
      .setThumbnail({iconeURL: ('https://cdn.discordapp.com/attachments/987778608401621002/1018206529289195660/20220910_213653.gif')})
      .setImage(`https://cdn.discordapp.com/attachments/987778608401621002/1018206528169320569/20220910_213822.gif`) 
      .setFooter(`𝐊 Δ 𝐑 𝐌 Δ`) 

      const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
				.setURL(`https://discord.gg/7PezfvX6VC`)
				.setLabel('𝐊 Δ 𝐑 𝐌 Δ Porn')
				.setStyle('LINK'),
        new MessageButton()
				.setURL(`https://discord.gg/zGD7nBg2Sq`)
				.setLabel('𝐊 Δ 𝐑 𝐌 Δ GIF')
				.setStyle('LINK'),
			);
      
      setTimeout(() => {
        msg.edit({ content: ` `, embeds: [emb], components: [row] });
      }, 500);
    },
};
