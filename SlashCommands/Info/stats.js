const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
    name: "stats",
    description: "مشاهده استیت بات",
    cooldown: 5,
    type: 'CHAT_INPUT',

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {


      interaction.followUp({ content: `تعداد سرور های درحال منیج: **${client.guilds.cache.size}** , تعداد یوزر ها: **${client.users.cache.size}** & ارورها: ** ${interaction.guild.shardId}**` })
    }
}