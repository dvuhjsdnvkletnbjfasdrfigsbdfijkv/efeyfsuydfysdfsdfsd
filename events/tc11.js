const { MessageEmbed } = require("discord.js")
const {
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
  Permissions
} = require(`discord.js`);
const { Modal, TextInputComponent, showModal } = require('discord-modals')
const client = require("../index.js")
const discordTranscripts = require('discord-html-transcripts');
const colors = require("colors")
const db = require('quick.db')
const s = `11`;
client.on("interactionCreate", async (interaction) => {

  const role = db.get(`adminrole_${interaction.guild.id}${s}`);
  const cat = db.get(`category_${interaction.guild.id}${s}`) || null;
  const logs = db.get(`ticketlogs_${interaction.guild.id}`) || null;
  const message = db.get(`ticketmsg_${interaction.guild.id}${s}`) || null;

if(!interaction.isButton() && !interaction.isSelectMenu()) return;
      const wait = require('util').promisify(setTimeout);

      if(interaction.customId == `create_ticket${s}`) {
          const tcname = db.fetch(`ticketname_${interaction.guild.id}`)
                       .replace(/{user}/g, interaction.user.username)
                       
        console.log("Ticket Creation - GUILD: "+interaction.guild.name+" | OPENER: "+interaction.user.tag+"".green.dim)
        if(!interaction.guild.me.permissions.has("MANAGE_CHANNELS")) return interaction.reply({ content: `**بات پرم کافی برای ساخت تیکت نداره.**\n> *چک کنید که بات پرم \`MANAGE_CHANNELS\` رو داشته باشه*`, ephemeral: true })
        var nameer = `${tcname || `ticket-${interaction.user.username}`}`
                var checkTickets = interaction.guild.channels.cache.find(c => c.name == nameer.split(' ').join('-').toLocaleLowerCase());
                if (checkTickets) {
                  const embed = new MessageEmbed()
        .setColor(client.config.color.purple)
        .setTitle(`شما یک تیکت باز دارید.`)
        .setDescription(`***تیکت شما: ${checkTickets}. لطفا اول این تیکت رو ببندید.***`)
        .setFooter(`Apokolips TM`, interaction.guild.iconURL())
                   return interaction.reply({ embeds: [embed], ephemeral: true})
                 } 
                const reasons = new MessageActionRow()
        .addComponents([
          new MessageButton()
          .setLabel(`View Possible Reasons`)
          .setStyle(`PRIMARY`)
          .setCustomId(`error_reasons`)
          
        ])
         await interaction.reply({ content: `**درحال ساخت تیکت شما(ممکنه چند ثانیه طول بکشه)...**`, ephemeral: true })
        interaction.guild.channels.create(`${tcname || `ticket-${interaction.user.username}`}`, {
                    permissionOverwrites: [{
                            id: interaction.user.id,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                        },
                        {
                            id: require('quick.db').fetch(`adminrole_${interaction.guild.id}${s}`),
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                        }, {
                            id: interaction.guild.roles.everyone,
                            deny: ["VIEW_CHANNEL"]
                        }
                    ],
                    type: 'text',
                    parent: cat,
                    topic: `📨 Ticket for: ${interaction.user.tag} (${interaction.user.id})`
                }).catch(() => {
          interaction.editReply({ content: `**ساخت تیکت شما به مشکل خورد.**\n> *ErrCode: \`hHa_8\`*`, components: [reasons], ephemeral: true })
                }).then(async function(channel) {
                  db.set(`Ticketopener_${channel.id}`, interaction.user);
                await wait(1000)
                await interaction.editReply({ content: `**تیکت شما ساخته شد ${channel}**`, ephemeral: true })
                  
        const embed = new MessageEmbed()
        .setColor(client.config.color.yellow)
        .setAuthor(`Ticket for: ${interaction.user.tag}`, interaction.user.displayAvatarURL(), `https://sashazox.ml/`)
        .setDescription(`${message || `**تیکت شما باز شد لطفا صبور باشید تا رسیدگی شود.**`}`)
        .setThumbnail(interaction.guild.iconURL())
        const embed2 = new MessageEmbed()
        .setColor(client.config.color.main)
        .setAuthor(`استف ها به زودی به درخواست شما رسیدگی میکنن.`, `https://cdn.discordapp.com/emojis/833101350623117342.gif?size=512`)
        .setDescription(`> *لطفا صبر کنید تا یک استف با رول <@&${role}> تیکت شما رو اکسپت کند*`)
        .setFooter(`ارور: ${interaction.guild.shardId}`, interaction.guild.iconURL())

        const buttons = new MessageActionRow()
        .addComponents([,
          new MessageButton()
          .setStyle(`PRIMARY`)
          .setEmoji(`📝`)
          .setLabel(`بک آپ گرفتن از تیکت`)
          .setCustomId(`transcript_ticket${s}`),
          new MessageButton()
          .setStyle(`LINK`)
          .setEmoji(`🔶`)
          .setLabel(`Apokolips TM`)
          .setURL(`https://discord.gg/x6TZyyxaTq`)
        ])
          const row = new MessageActionRow()
          .addComponents([
            new MessageSelectMenu()
			      .setCustomId('tck_options')
			      .setPlaceholder('برای انتخاب گزینه کلیک کنید')
			      .addOptions([
              { label: `ᴀᴘᴏᴋᴏʟɪᴘꜱ | ᴅᴇʟᴇᴛᴇ ᴛɪᴄᴋᴇᴛ`, description: `اگه کارتون تموم شده تیکت رو دیلیت کنید`, value: `delete_ticket${s}`, emoji: `🗑️`},
              { label: `ᴀᴘᴏᴋᴏʟɪᴘꜱ | ʟᴏᴄᴋ ᴛɪᴄᴋᴇᴛ`, description: `تیکت برای یوسر معمولی هاید میشه`, value: `close_ticket${s}`, emoji: `🔒`},
              { label: `ᴀᴘᴏᴋᴏʟɪᴘꜱ | ᴘɪɴ ᴛɪᴄᴋᴇᴛ`, description: `پین کردن تیکت های مهم`, value: `pin_ticket${s}`, emoji: `📌`},
              { label: `ᴀᴘᴏᴋᴏʟɪᴘꜱ | ᴀᴄᴄᴇᴘᴛ ᴛɪᴄᴋᴇᴛ`, description: `تیکت برای شما اکسپت میشه`, value: `claim_ticket${s}`, emoji: `✅` },
              
            ]),
          ])


        channel.send({ content: `**${interaction.user}** | **<@&${role}>**`, embeds: [embed, embed2], components: [buttons, row] }).then(msg => {
              msg.pin();
                    })
                    });
                    } else if(interaction.values == `close_ticket${s}`) {
       
        const norole = new MessageEmbed()
        .setColor(client.config.color.red)
        .setTitle(`شما باید رول ادمین داشته باشید تا بتونید تیکت رو منیج کنید`)
        .setDescription(`***شما باید رول<@&${role}> داشته باشید تا بتونید این تیکت رو دیلیت کنید***`)
        .setFooter(`Apokolips TM\nارور: ${interaction.guild.shardId}`, interaction.guild.iconURL())
                      if(!interaction.member.roles.cache.has(role)) {
                        return interaction.reply({ embeds: [norole], ephemeral: true})
                      }
        const opener = db.get(`Ticketopener_${interaction.channel.id}`)
       
       const tcopener = interaction.guild.members.cache.get(opener.id);  interaction.channel.permissionOverwrites.edit(require('quick.db').fetch(`adminrole_${interaction.guild.id}${s}`), {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true,
        })
        interaction.channel.permissionOverwrites.edit(opener.id, {
          SEND_MESSAGES: false,
          VIEW_CHANNEL: false,
        })
        await interaction.deferUpdate({ ephemeral: false }).catch(() => {});
        
        const embed = new MessageEmbed()
        .setColor(client.config.color.success)
        .setTitle(`تیکت قفل شد`)
        .setDescription(`**یوزر از تیکت حذف شد <@${require(`quick.db`).fetch(`Ticketopener_${interaction.channel.id}`).id}>**\n*این یوزر دیگه نمیتونه تیکت رو ببینه.*`)
        .setFooter(`ارور: ${interaction.guild.shardId}`, interaction.guild.iconURL())

        interaction.channel.send({ embeds: [embed] })

        //tcopener.send({ content: `**تیکت شما توسط \`${interaction.user.tag}\` قفل شد.**`})

      }  else if (interaction.values == `pin_ticket${s}`) {
        const opener = db.get(`Ticketopener_${interaction.channel.id}`)
                      const tcname = db.fetch(`ticketname_${interaction.guild.id}`)
                       .replace(/{user}/g, opener.username)
        const pinned = db.get(`pinned_${interaction.channel.id}`);
        const norole = new MessageEmbed()
        .setColor(client.config.color.red)
        .setTitle(`شما باید رول ادمین داشته باشید تا بتونید تیکت رو منیج کنید`)
        .setDescription(`***شما باید رول<@&${role}> داشته باشید تا بتونید این تیکت رو پین کنید***`)
        .setFooter(`Apokolips TM\nارور: ${interaction.guild.shardId}`, interaction.guild.iconURL())
                      if(!interaction.member.roles.cache.has(role)) {
                        return interaction.reply({ embeds: [norole], ephemeral: true})
                      }
         const alreadypinned = new MessageEmbed()
        .setColor(client.config.color.red)
        .setTitle(`این تیکت قبلا پین شده`)
        .setFooter(`Apokolips TM\nارور: ${interaction.guild.shardId}`, interaction.guild.iconURL())

        if(pinned) return interaction.reply({ embeds: [alreadypinned], ephemeral: true})
        
        interaction.channel.setName(`📌・${tcname || `ticket-${opener.username}`}`)
        const embed = new MessageEmbed()
        .setColor(client.config.color.success)
        .setTitle(`📌 تیکت پین شد`)
        .setDescription(`> ***یوزر ${interaction.user} تیکت رو پین کرد ***`)
        .setFooter(`خطا: ${interaction.guild.shardId}`, interaction.guild.iconURL())
        db.set(`pinned_${interaction.channel.id}`, "pinned")
        interaction.channel.send({ embeds: [embed] })
        await interaction.deferUpdate({ ephemeral: false }).catch(() => {});
      } else if(interaction.values == `delete_ticket${s}`) {
         const norole = new MessageEmbed()
        .setColor(client.config.color.red)
        .setTitle(`شما باید رول ادمین داشته باشید تا بتونید تیکت رو منیج کنید`)
        .setDescription(`***شما باید رول <@&${role}> داشته باشید تا بتونید این تیکت رو دیلیت کنید***`)
        .setFooter(`Apokolips TM\nارور: ${interaction.guild.shardId}`, interaction.guild.iconURL())
                      if(!interaction.member.roles.cache.has(role)) {
                        return interaction.reply({ embeds: [norole], ephemeral: true})
                      }
        const modal = new Modal()
.setCustomId(`close-modal`)
.setTitle(`Close: ${interaction.channel.name}`)
.addComponents([
  new TextInputComponent()
  .setCustomId('closeText-modal')
  .setLabel('دلیل دیلیت کردن تیکت رو وارد کنید')
  .setStyle('LONG')
  .setMinLength(1)
  .setMaxLength(500)
  .setPlaceholder('دلیل رو اینجا وارد کنید')
  .setRequired(true)
]);
      
    showModal(modal, {
      client: client,
      interaction: interaction 
    })
        
        
                   
        
      } else if(interaction.customId == `transcript_ticket${s}`) {
        const attachment = await discordTranscripts.createTranscript(interaction.channel);
        

        interaction.reply({ content: `**Transcript of: \`${interaction.channel.name}\`**`, files: [attachment] , ephemeral: true})
      } else if (interaction.values == `claim_ticket${s}`) {
        const claimed = db.get(`claimed_${interaction.channel.id}`);
        const user = db.get(`Ticketopener_${interaction.channel.id}`);
        
        const norole = new MessageEmbed()
        .setColor(client.config.color.red)
        .setTitle(`شما باید رول ادمین داشته باشید تا بتونید تیکت رو منیج کنید`)
        .setDescription(`***شما باید رول <@&${role}> داشته باشید تا بتونید این تیکت رو اکسپت کنید***`)
        .setFooter(`Apokolips TM\nارور: ${interaction.guild.shardId}`, interaction.guild.iconURL())

        const rolebutuser = new MessageEmbed()
        .setColor(client.config.color.red)
        .setTitle(`شما نمیونین تیکت خودتون رو اکسپت کنید`)
        .setDescription(`***شما رول <@&${role}> دارید ولی خودتون این تیکت رو باز کردید***`)
        .setFooter(`Apokolips TM\nارور: ${interaction.guild.shardId}`, interaction.guild.iconURL())

        const alreadyclaimed = new MessageEmbed()
        .setColor(client.config.color.red)
        .setTitle(`یکی زودتر از شما این تیکت رو اکسپت کرده`)
        .setFooter(`Apokolips TM\nارور: ${interaction.guild.shardId}`, interaction.guild.iconURL())
        
        if(!interaction.member.roles.cache.has(role)) {
                        return interaction.reply({ embeds: [norole], ephemeral: true})
                      }
        if(claimed) return interaction.reply({ embeds: [alreadyclaimed], ephemeral: true})
        if(user.id == interaction.user.id) return interaction.reply({ embeds: [rolebutuser], ephemeral: true})
        const embed = new MessageEmbed()
        .setAuthor(`یوزر ${interaction.user.username} این تیکت رو اکسپت کرد`, interaction.user.displayAvatarURL())
        .setColor(client.config.color.main)
        .setFooter(`Apokolips TM\nارور: ${interaction.guild.shardId}`, interaction.guild.iconURL())

        const embed2 = new MessageEmbed()
        .setColor(client.config.color.main)
        .setAuthor(`${interaction.user.tag} ᴀᴘᴏᴋᴏʟɪᴘꜱ ꜱᴛᴀꜰꜰ`, interaction.user.displayAvatarURL(), `https://discord.gg/x6TZyyxaTq`)
        .setDescription(`> _**${interaction.user.username}** این تیکت رو اکسپت کرد._`)
        .setFooter(`ارور: ${interaction.guild.shardId}`)

        db.set(`claimed_${interaction.channel.id}`, "claimed")
        interaction.message.edit({ embeds: [interaction.message.embeds[0], embed2]})
        interaction.reply({ embeds: [embed] })
      } 


})
