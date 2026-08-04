let handler = async (m, { conn }) => {
  try {
    const grupoID = m.chat

    await conn.groupRevokeInvite(grupoID)

    const nuevoEnlace = await conn.groupInviteCode(grupoID)
    const enlaceCompleto = 'https://chat.whatsapp.com/' + nuevoEnlace

    await conn.reply(m.sender, 
`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🛡️꒷

 ⤷ ┇ 𝗣𝗥𝗢𝗧𝗢𝗖𝗢𝗟𝗢 𝗘𝗝𝗘𝗖𝗨𝗧𝗔𝗗𝗢 ：✿ 。
꒰ ◞⁺⊹ ．Barrera restaurada •

  ꒱ ׁ. ᘏ 𝗥𝗘𝗣𝗢𝗥𝗧𝗘 𝗗𝗘 𝗦𝗘𝗚𝗨𝗥𝗜𝗗𝗔𝗗 ׅ 𝆬 ָ֢ ෆ
🛡️ ➛ Enlace Anterior: *REVOCADO* 🔻
🛡️ ➛ Nuevo Enlace: ${enlaceCompleto}
🛡️ ➛ Estado: *Sistema Seguro* ✅
🛡️ ➛ Ki: *Barrera Restaurada*

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *"El acceso anterior ha sido destruido"* 💥
━━━━━━━━━━━`, 
      m, { detectLink: true })

    await conn.reply(m.chat, `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🛡️꒷

 ⤷ ┇ 𝗘𝗡𝗟𝗔𝗖𝗘 𝗥𝗘𝗦𝗧𝗔𝗕𝗟𝗘𝗖𝗜𝗗𝗢 ：✿ 。

──愛 *𝗔𝗗𝗩𝗘𝗥𝗧𝗘𝗡𝗖𝗜𝗔* ╏ ⚠️
🛡️ ➛ El enlace anterior ya no funciona
🛡️ ➛ Solo el nuevo enlace tiene poder
🛡️ ➛ Los intrusos fueron bloqueados

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *"Nueva barrera ki activada"* ⚡
━━━━━━━━━━━`, m)

  } catch (error) {
    console.error(error)
    await m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚠️꒷

 ⤷ ┇ 𝗘𝗥𝗥𝗢𝗥 𝗖𝗥𝗜𝗧𝗜𝗖𝗢 ：✿ 。

──愛 *𝗗𝗘𝗧𝗔𝗟𝗟𝗘* ╏ ❄️
⚠️ ➛ ${error.message}

──愛 *𝗦𝗢𝗟𝗨𝗖𝗜𝗢𝗡* ╏ 💥
⚠️ ➛ Verifica que el bot sea admin
⚠️ ➛ Necesita permisos para romper barreras

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`)
  }
}

handler.help = ['revoke']
handler.tags = ['group']
handler.command = ['revoke', 'restablecer']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler