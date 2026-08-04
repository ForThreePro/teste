let handler = async (m, { conn, command, usedPrefix, text, isAdmin, isBotAdmin }) => {

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

 ⤷ ┇ 𝗘𝗥𝗥𝗢𝗥 ：✿ 。

──愛 *PERMISOS INSUFICIENTES* ╏ ❄️
⚠️ ➛ Solo admins pueden usar este comando

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`)

    // ===== 1. CAMBIAR DESCRIPCION =====
    if (command === 'gpdesc') {
        if (!isBotAdmin) return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚠️꒷

 ⤷ ┇ 𝗘𝗥𝗥𝗢𝗥 ：✿ 。

──愛 *PERMISOS INSUFICIENTES* ╏ ❄️
⚠️ ➛ Necesito ser admin para cambiar la descripción

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`)

        if (!text) return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🍒꒷

 ⤷ ┇ 𝗖𝗔𝗠𝗕𝗜𝗔𝗥 𝗗𝗘𝗦𝗖𝗥𝗜𝗣𝗖𝗜𝗢𝗡 ：✿ 。

──愛 *USO CORRECTO* ╏ 💥
🍒 ➛ ${usedPrefix}gpdesc [texto]
🍒 ➛ Ejemplo: ${usedPrefix}gpdesc Bienvenidos al grupo

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`)

        await conn.groupUpdateDescription(m.chat, text)
        return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🍒꒷

 ⤷ ┇ 𝗗𝗘𝗦𝗖𝗥𝗜𝗣𝗖𝗜𝗢𝗡 𝗔𝗖𝗧𝗨𝗔𝗟𝗜𝗭𝗔𝗗𝗔 ：✿ 。

  ꒱ ׁ. ᘏ 𝗘𝗫𝗜𝗧𝗢 ׅ 𝆬 ָ֢ ෆ
🍒 ➛ La descripción del grupo fue cambiada

──愛 *NUEVA DESCRIPCION* ╏ 📝
🍒 ➛ ${text}

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> "Las reglas del grupo se han reescrito" 
━━━━━━━━━━━`)
    }

    // ===== 2. CAMBIAR NOMBRE =====
    if (command === 'gpname') {
        if (!isBotAdmin) return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚠️꒷

 ⤷ ┇ 𝗘𝗥𝗥𝗢𝗥 ：✿ 。

──愛 *PERMISOS INSUFICIENTES* ╏ ❄️
⚠️ ➛ Necesito ser admin para cambiar el nombre

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`)

        if (!text) return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🍒꒷

 ⤷ ┇ 𝗖𝗔𝗠𝗕𝗜𝗔𝗥 𝗡𝗢𝗠𝗕𝗥𝗘 ：✿ 。

──愛 *USO CORRECTO* ╏ 💥
🍒 ➛ ${usedPrefix}gpname [nombre]
🍒 ➛ Ejemplo: ${usedPrefix}gpname Guerreros Z

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`)

        if (text.length > 25) return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚠️꒷

 ⤷ ┇ 𝗘𝗥𝗥𝗢𝗥 ：✿ 。

──愛 *LIMITE EXCEDIDO* ╏ ❄️
⚠️ ➛ El nombre no puede pasar de 25 caracteres

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`)

        await conn.groupUpdateSubject(m.chat, text)
        return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🍒꒷

 ⤷ ┇ 𝗡𝗢𝗠𝗕𝗥𝗘 𝗔𝗖𝗧𝗨𝗔𝗟𝗜𝗭𝗔𝗗𝗢 ：✿ 。

  ꒱ ׁ. ᘏ 𝗘𝗫𝗜𝗧𝗢 ׅ 𝆬 ָ֢ ෆ
🍒 ➛ El nombre del grupo fue cambiado

──愛 *NUEVO NOMBRE* ╏ 🏷️
🍒 ➛ ${text}

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> "Un nuevo nombre, un nuevo poder" ⚡
━━━━━━━━━━━`)
    }

}

handler.help = ['gpdesc', 'gpname']
handler.tags = ['group']
handler.command = /^(gpdesc|gpname)$/i
handler.group = true
handler.admin = true
export default handler