let handler = async (m, { conn, isAdmin, command }) => {
    if (!m.isGroup) return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚠️꒷

 ⤷ ┇ 𝗘𝗥𝗥𝗢𝗥 ：✿ 。

──愛 *ACCESO DENEGADO* ╏ ❄️
⚠️ ➛ Este comando solo funciona en grupos

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`)

    if (!isAdmin) return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚠️꒷

 ⤷ ┇ 𝗘𝗥𝗢𝗥 ：✿ 。

──愛 *PERMISOS INSUFICIENTES* ╏ ❄️
⚠️ ➛ Solo admins pueden usar este comando

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`)

    try {
        if(command === 'abrir' || command === 'open'){
            await conn.groupSettingUpdate(m.chat, 'not_announcement')
            await conn.sendMessage(m.chat, { react: { text: '⚡', key: m.key } })

            let txt = `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🍒꒷

 ⤷ ┇ 𝗚𝗥𝗨𝗣𝗢 𝗟𝗜𝗕𝗘𝗥𝗔𝗗𝗢 ：✿ 。
꒰ ◞⁺⊹ ．Modo Chat Abierto •

  ꒱ ׁ. ᘏ 𝗘𝗦𝗧𝗔𝗗𝗢 ׅ 𝆬 ָ֢ ෆ
🍒 ➛ Estado: *🔓 ABIERTO*
🍒 ➛ Poder: *Ki al 100%* ⚡
🍒 ➛ Admin: @${m.sender.split('@')[0]}

──愛 *SISTEMA* ╏ 💥
🍒 ➛ Todos pueden hablar ahora

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *"¡El poder de Goku liberó el chat!"*
━━━━━━━━━━━`

            await conn.reply(m.chat, txt, m, { mentions: [m.sender] })

        } else if(command === 'cerrar' || command === 'close'){
            await conn.groupSettingUpdate(m.chat, 'announcement')
            await conn.sendMessage(m.chat, { react: { text: '🔥', key: m.key } })

            let txt = `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🍒꒷

 ⤷ ┇ 𝗚𝗥𝗨𝗣𝗢 𝗕𝗟𝗢𝗤𝗨𝗘𝗔𝗗𝗢 ：✿ 。
꒰ ◞⁺⊹ ．Modo Anuncios Activado •

  ꒱ ׁ. ᘏ 𝗘𝗦𝗧𝗔𝗗𝗢 ׅ 𝆬 ָ֢ ෆ
🍒 ➛ Estado: *🔒 CERRADO*
🍒 ➛ Poder: *Modo Dios* 🔥
🍒 ➛ Admin: @${m.sender.split('@')[0]}

──愛 *SISTEMA* ╏ ❄️
🍒 ➛ Solo admins pueden hablar

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *"¡KAME HAME HAAAA! Silencio total"*
━━━━━━━━━━━`

            await conn.reply(m.chat, txt, m, { mentions: [m.sender] })
        }
    } catch (e) {
        console.error(e)
        if(e.message.includes('not-admin')) {
            return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚠️꒷

 ⤷ ┇ 𝗘𝗥𝗢𝗥 ：✿ 。

──愛 *PERMISOS INSUFICIENTES* ╏ ❄️
⚠️ ➛ Necesito ser admin para hacer eso

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`)
        }
        await m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚠️꒷

 ⤷ ┇ 𝗘𝗥𝗥𝗢𝗥 𝗗𝗘 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 ：✿ 。

──愛 *FALLA* ╏ ❄️
⚠️ ➛ ${e.message}

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`)
    }
}

handler.help = ['abrir', 'cerrar']
handler.tags = ['group']
handler.command = ['abrir', 'cerrar', 'open', 'close']
handler.admin = true
// handler.botAdmin = false  <-- LO QUITAMOS PARA QUE NO BUGUEE
export default handler