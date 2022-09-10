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
        .setFooter(`Action tavasot ${modal.user.username}\nارور: ${modal.guild.shardId}`, modal.guild.iconURL())

        modal.reply({ embeds: [embed] })
            setTimeout(() => {
                    modal.channel.delete();
                }, 1000 * 4.3);
    
        const tcopener = modal.guild.members.cache.get(opener.id)
        const closed = new MessageEmbed()
    .setTitle(`تیکت بسته شد`)
          .setColor(`WHITE`)
          .addField(`**تیکت باز شده توسط:**`, `\`\`\`\n${tcopener.user.tag} (${tcopener.user.id})\n\`\`\``)
    .addField(`**بسته شده توسط:**`, `\`\`\`\n${modal.user.tag} (${modal.user.id})\n\`\`\``)
    .addField(`**دلیل بستن تیکت:**`, `${Formatters.codeBlock('markdown', firstResponse) || "`دلیلی نوشته نشده`"}`)
    .setFooter(`بک آپ تیکت در فایل بالا قرار دارد.`)
        

    //tcopener.send({ embeds: [closed], files: [attachment]}).catch(() => {});
    client.channels.cache.get(logs.id).send({ embeds: [closed], files: [attachment]})
  }
})