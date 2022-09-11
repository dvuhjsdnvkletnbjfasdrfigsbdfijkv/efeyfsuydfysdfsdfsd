const client = require("../index.js")
client.on("interactionCreate", async (interaction) => {
  if(interaction.customId == "error_reasons") {
    interaction.reply({ content: "**دلایلی که احتمال داره این مشکل به وجود اومده باشه: \`hHa_8\`**\n```\n[-] رول تیکت ادمین دیلیت شده / بات نمیتونه به رول تیکت ادمین دسترستی داشته باشه\n[-] کتجوری تیکت دیلیت شده باشه\n[-] دیتابیس به مشکل خورده باشه یا ریستارت شده باشه\n[-] بات آپدیت شده یا ریستارت شده باشه\n[+] اگر هیچ کدام از این دلایل نبود به سازنده بات پیام بدید Sashazox#6666 (960568805791240212)\n Support Server: https://discord.gg/x6TZyyxaTq\n```", ephemeral: true })
  }
})