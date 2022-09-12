const { Client, CommandInteraction } = require("discord.js");
const Discord = require(`discord.js`)
const glob = require("glob")
module.exports = {
    name: "manage_bot",
    description: "فقط کسایی که داخل بات Whitelist هستن میتونین از این کامند استفاده کنن",
    type: 'CHAT_INPUT',
    premium: true,
    
    run: async (client, interaction, args) => {

      if(!client.config.developers.includes(interaction.user.id)) return interaction.followUp(`**شما نمیتونین از این کامند استفاده کنید.**`)

      
        let clientapp = client.application ? await client.application.fetch().catch(e => false) : false;
    let guild = client.guilds.cache.get("905075946426613760")
    
    const control = new Discord.MessageEmbed()
      .setColor(client.config.color.main)
      .setAuthor(`${client.user.username} | Bot-Control-Panel`, client.user.displayAvatarURL())
      .setThumbnail(`https://cdn.discordapp.com/attachments/987778608401621002/1018206529289195660/20220910_213653.gif`)
      .setImage(`https://cdn.discordapp.com/attachments/987778608401621002/1018206528169320569/20220910_213822.gif`)
      .setDescription(`**Bot-File-Path:**
\`\`\`yml
${process.cwd()}
\`\`\`
**Host-Server:**
\`\`\`yml
${String(Object.values(require(`os`).networkInterfaces()).reduce((r, list) => r.concat(list.reduce((rr, i) => rr.concat(i ?.family === `IPv4` && !i ?.internal && i ?.address || []), [])), [])).split(".")[3]} IPv4
\`\`\`
${clientapp ? `**Bot-Application-Information:**
\`\`\`yml
Bot Username: ${clientapp.name} 
${clientapp.owner.discriminator ? "Application-Owner: " + clientapp.owner.tag : "Application-Team: " + clientapp.owner.name + "\nApplication-Members: " + clientapp.owner.members.map(uid => `${uid.user.tag}`).join(", ") + "\nTeam-Owner: " + `${guild.members.cache.get(clientapp.owner.ownerId) && guild.members.cache.get(clientapp.owner.ownerId).user ? guild.members.cache.get(clientapp.owner.ownerId).user.tag : clientapp.owner.ownerId}`} 
Icon: ${clientapp.iconURL()}
\`\`\`
**About me:**
\`\`\`yml
${clientapp.description ? clientapp.description : "About me baraye bot neveshte nashode"}
\`\`\``
          : ""}
`)
      .setFooter({text: `𝐊 Δ 𝐑 𝐌 Δ`, iconURL: (`https://cdn.discordapp.com/attachments/987778608401621002/1018206529289195660/20220910_213653.gif`)})
      
      interaction.followUp({ embeds: [control], components: [
        new Discord.MessageActionRow()
          .addComponents(
            new Discord.MessageSelectMenu()
			  .setCustomId('manage_bot')
			  .setPlaceholder(`Apokolips Select Menu`)
			  .addOptions([
          { label: `Shutdown`, description: `خاموش کردن بات (Whitelist)`, value: `stop_client`, emoji: `905426273952739329` },
          { label: `Rename Bot`, description: `تغییر دادن اسم بات (Whitelist)`, value: `rename_client`, emoji: `📝` },
          { label: `Change Avatar`, description: `تغییر دادن پروفایل بات (Whitelist)`, value: `changeav_client`, emoji: `📸` },
          { label: `Restart`, description: `ریستارت دادن بات (Sashazox)`, value: `restart_client`, emoji: `💫` },
          { label: `Host Console`, description: `دسترسی به کنسول بات (Sashazox)`, value: `console_client`, emoji: `💻` },
          { label: `Data Base`, description: `دسترسی و انجام تغییرات داخل دیتا بیس بات (Sashazox)`, value: `data_client`, emoji: `📂` },
          { label: `License renewal`, description: `تمدید لایسنس بات (Sashazox)`, value: `tamdid_client`, emoji: `💵` },
          { label: `Revoke License`, description: `دیسیبل کردن لایسنس برای سرور (Sashazox)`, value: `revoke_client`, emoji: `🧨` },
        ]),
			)
      ]})
      }

}

