const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "karma_porn",
    description: "Link invite 𝐊 Δ 𝐑 𝐌 Δ Porn",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Loading..`);

      const emb = new MessageEmbed()
      .setColor(client.config.color.main)
      .setTitle(`𝐊 Δ 𝐑 𝐌 Δ Servers`)
      .setDescription(`**[support server https://discord.gg/x6TZyyxaTq]()**`)
      .setThumbnail(`https://cdn.discordapp.com/attachments/987778608401621002/1018206529289195660/20220910_213653.gif`)
      .setImage(`https://cdn.discordapp.com/attachments/987778608401621002/1018206528169320569/20220910_213822.gif`) 
      .setFooter({text: `𝐊 Δ 𝐑 𝐌 Δ`, iconURL: (`https://cdn.discordapp.com/attachments/987778608401621002/1018206529289195660/20220910_213653.gif`)}) 

      const row = new MessageActionRow()
			.addComponents(
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
