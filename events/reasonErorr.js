const client = require("../index.js")
client.on("interactionCreate", async (interaction) => {
  if(interaction.customId == "error_reasons") {
    interaction.reply({ content: "**Here might be the reasons for the ErrCode: \`hHa_8\`**\n```\n[-] Admin Role Might have Been Deleted / Bot Can't Access the Role\n[-] Ticket Category Might be Deleted\n[-] Database had an Error And Didnt Save Admin Role\n[+] If None of these Reasons Please Contact Sashazox#6666 (960568805791240212)\n```", ephemeral: true })
  }
})