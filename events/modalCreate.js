const { Modal, TextInputComponent, showModal } = require('discord-modals')
const client = require("../index.js")
const { Formatters } = require('discord.js');
const { MessageEmbed } = require("discord.js")
const discordTranscripts = require('discord-html-transcripts');
const db = require(`quick.db`)
client.on('modalSubmit', async (modal) => {
  if(modal.customId === `close-modal`) {
  const logs = db.get(`ticketlogs_${modal.guild.id}`) || null;
    const firstResponse = modal.getTextInputValue('closeText-modal')
    const attachment = await discordTranscripts.createTranscript(modal.channel);
    const opener = db.get(`Ticketopener_${modal.channel.id}`)
                    
        const embed = new MessageEmbed()
        .setColor(client.config.color.purple)
        .setTitle(`درحال بستن تیکت...`)
        .setDescription(`*...تیکت تا 5 ثانیه دیگر بسته میشود*`)
        .setFooter({text: `Action tavasot ${modal.user.username}`, iconURL: (`https://cdn.discordapp.com/attachments/987778608401621002/1018206529289195660/20220910_213653.gif`)})

        modal.reply({ embeds: [embed] })
            setTimeout(() => {
                    modal.channel.delete();
                }, 1000 * 4.3);
    
        const tcopener = modal.guild.members.cache.get(opener.id)
        const closed = new MessageEmbed()
    .setTitle(`تیکت بسته شد`)
          .setColor(`WHITE`)
          .setThumbnail(`https://cdn.discordapp.com/attachments/987778608401621002/1018206529289195660/20220910_213653.gif`)
          .addField(`**تیکت باز شده توسط:**`, `\`\`\`\n${tcopener.user.tag} (${tcopener.user.id})\n\`\`\``)
    .addField(`**بسته شده توسط:**`, `\`\`\`\n${modal.user.tag} (${modal.user.id})\n\`\`\``)
    .addField(`**دلیل بستن تیکت:**`, `${Formatters.codeBlock('markdown', firstResponse) || "`دلیلی نوشته نشده`"}`)
    .setThumbnail(`https://cdn.discordapp.com/attachments/987778608401621002/1018206529289195660/20220910_213653.gif`)
    .setFooter({text: `𝐊 Δ 𝐑 𝐌 Δ`, iconURL: (`https://cdn.discordapp.com/attachments/987778608401621002/1018206529289195660/20220910_213653.gif`)})
        

    //tcopener.send({ embeds: [closed], files: [attachment]}).catch(() => {});
    client.channels.cache.get(logs.id).send({ embeds: [closed], files: [attachment]})
  }
})