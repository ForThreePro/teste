let handler = async (m, { conn }) => {
    if (m.fromMe) return
    if (m.quoted?.mtype !== 'stickerMessage') return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🍟꒷

 ⤷ ┇ 𝗘𝗥𝗥𝗢𝗥 ：✿ 。

──愛 *USO INCORRECTO* ╏ ❄️
🍟 ➛ Responde a un sticker con:.toimg
🍟 ➛ Ejemplo: Responde a un sticker y úsalo

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`)

    try {
        await m.react('⏳')
        let buffer = await m.quoted.download()

        await conn.sendMessage(m.chat, {
            image: buffer,
            caption: `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🍟꒷

 ⤷ ┇ 𝗖𝗢𝗡𝗩𝗘𝗥𝗦𝗜𝗢𝗡 𝗖𝗢𝗠𝗣𝗟𝗘𝗧𝗔 ：✿ 。
꒰ ◞⁺⊹ ．Sticker a Imagen •

  ꒱ ׁ. ᘏ 𝗘𝗦𝗧𝗔𝗗𝗢 ׅ 𝆬 ָ֢ ෆ
🍟 ➛ Formato: *PNG/JPG*
🍟 ➛ Estado: *Convertido exitosamente* ✅

──愛 *SISTEMA* ╏ 💥
🍟 ➛ Sticker convertido a imagen

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *"Transformacion instantanea"* ⚡
━━━━━━━━━━━`
        }, { quoted: m })
        
        await m.react('✅')

    } catch (e) {
        console.log(e)
        await m.react('❌')
        m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚠️꒷

 ⤷ ┇ 𝗘𝗥𝗥𝗢𝗥 𝗗𝗘 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 ：✿ 。

──愛 *FALLA* ╏ ❄️
⚠️ ➛ No se pudo convertir el sticker
⚠️ ➛ Intenta con otro sticker

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`)
    }
}

handler.help = ['toimg']
handler.tags = ['tools']
handler.command = ['toimg']
export default handler