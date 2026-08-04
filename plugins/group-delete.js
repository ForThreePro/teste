let handler = async (m, { conn, usedPrefix, command }) => {

if (!m.quoted) return conn.reply(m.chat, `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚔️꒷

 ⤷ ┇ 𝗘𝗥𝗥𝗢𝗥 𝗗𝗘 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 ：✿ 。

──愛 *INSTRUCCION* ╏ ❄️
⚔️ ➛ Cita el mensaje que deseas eliminar
⚔️ ➛ Ejemplo: Responde al mensaje y usa .del

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`, m)

try {
    // Caso 1: Mensaje de otro usuario
    let key = m.quoted.vM.key
    await conn.sendMessage(m.chat, { delete: key })
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    await conn.reply(m.chat, `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚔️꒷

 ⤷ ┇ 𝗠𝗘𝗡𝗦𝗔𝗝𝗘 𝗘𝗟𝗜𝗠𝗜𝗡𝗔𝗗𝗢 ：✿ 。

  ꒱ ׁ. ᘏ 𝗘𝗫𝗜𝗧𝗢 ׅ 𝆬 ָ֢ ෆ
⚔️ ➛ Mensaje borrado exitosamente
⚔️ ➛ Admin: @${m.sender.split('@')[0]}

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *"El poder de Goku borro ese mensaje"* 💥
━━━━━━━━━━━`, m, { mentions: [m.sender] })

} catch (e) {
    // Caso 2: Fallback si falla
    try {
        let delet = m.quoted.vM.key
        await conn.sendMessage(m.chat, { delete: delet })
        await conn.sendMessage(m.chat, { react: { text: '💥', key: m.key } })
        await conn.reply(m.chat, `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚔️꒷

 ⤷ ┇ 𝗠𝗘𝗡𝗦𝗔𝗝𝗘 𝗘𝗟𝗜𝗠𝗜𝗡𝗔𝗗𝗢 ：✿ 。

  ꒱ ׁ. ᘏ 𝗘𝗫𝗜𝗧𝗢 ׅ 𝆬 ָ֢ ෆ
⚔️ ➛ Mensaje borrado con poder Saiyan
⚔️ ➛ Admin: @${m.sender.split('@')[0]}

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`, m, { mentions: [m.sender] })

    } catch {
        await m.react('❌')
        return conn.reply(m.chat, `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚠️꒷

 ⤷ ┇ 𝗙𝗔𝗟𝗟𝗢 𝗗𝗘 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 ：✿ 。

──愛 *NO SE PUDO ELIMINAR* ╏ ❄️
⚠️ ➛ Posibles causas:
⚠️ ➛ 1. No tengo permisos de admin
⚠️ ➛ 2. El mensaje es muy antiguo

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`, m)
    }
}}

handler.help = ['delete']
handler.tags = ['group']
handler.command = ['del','delete','d']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler