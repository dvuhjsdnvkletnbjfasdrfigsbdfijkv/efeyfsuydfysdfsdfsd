const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "karma",
    description: "ساپورت سرور",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Loading..`);

      const emb = new MessageEmbed()
      .setColor(client.config.color.main)
      .setTitle(`${client.user.username}`)
      .setDescription(`**𝐊 Δ 𝐑 𝐌 Δ https://discord.gg/x6TZyyxaTq**`)
      .setThumbnail(`https://media.discordapp.net/attachments/987778608401621002/1018206529289195660/20220910_213653.gif`)
      .setImage(`https://cdn.discordapp.com/attachments/987778608401621002/1018206528169320569/20220910_213822.gif`) 
      .setFooter(`𝐊 Δ 𝐑 𝐌 Δ`) 

      const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
				.setURL(`https://discord.gg/x6TZyyxaTq`)
				.setLabel('𝐊 Δ 𝐑 𝐌 Δ GIF')
				.setStyle('LINK'),
        new MessageButton()
				.setURL(`https://discord.gg/x6TZyyxaTq`)
				.setLabel('𝐊 Δ 𝐑 𝐌 Δ PORN')
				.setStyle('LINK'),
			);
      
      setTimeout(() => {
        msg.edit({ content: ` `, embeds: [emb], components: [row] });
      }, 500);
    },
};
