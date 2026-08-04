let handler = async (m, { conn, text, isAdmin, isOwner, command }) => {
    if (!m.isGroup) return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚔️꒷

 ⤷ ┇ 𝗘𝗥𝗥𝗢𝗥 𝗗𝗘 𝗔𝗖𝗖𝗘𝗦𝗢 ：✿ 。

──愛 *PLANO INCORRECTO* ╏ ❄️
⚔️ ➛ Este comando solo funciona en grupos
⚔️ ➛ No funciona en el plano privado

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`)

    if (!isAdmin &&!isOwner) return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚔️꒷

 ⤷ ┇ 𝗔𝗖𝗖𝗘𝗦𝗢 𝗗𝗘𝗡𝗘𝗚𝗔𝗗𝗢 ：✿ 。

──愛 *PERMISOS KI* ╏ ❄️
⚔️ ➛ Solo administradores del grupo
⚔️ ➛ Necesitas rango de guardian

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`)

    let mentioned = await m.mentionedJid
    let who = mentioned.length > 0
     ? mentioned[0]
        : m.quoted
     ? m.quoted.sender
        : text
     ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        : false

    if (!who) {
        return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚔️꒷

 ⤷ ┇ 𝗜𝗡𝗦𝗧𝗥𝗨𝗖𝗜𝗢𝗡 ：✿ 。

──愛 *USO CORRECTO* ╏ ❄️
⚔️ ➛ Etiqueta o cita al usuario
⚔️ ➛ Ejemplo: ${command} @usuario

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`)
    }

    const groupInfo = await conn.groupMetadata(m.chat)
    const ownerGroup = groupInfo.owner || m.chat.split('-')[0] + '@s.whatsapp.net'
    const ownerBot = global.owner[0][0] + '@s.whatsapp.net'
    const protectedOwners = global.owner.map(o => o[0] + '@s.whatsapp.net')
    const targetName = global.db.data.users[who]?.name || await conn.getName(who)

    if (who === conn.user.jid || who === ownerGroup || who === ownerBot || protectedOwners.includes(who)) {
        return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚠️꒷

 ⤷ ┇ 𝗕𝗔𝗥𝗥𝗘𝗥𝗔 𝗗𝗜𝗩𝗜𝗡𝗔 ：✿ 。

──愛 *SEGURIDAD* ╏ ❄️
⚠️ ➛ No se puede silenciar al Maestro
⚠️ ➛ El ki del owner es muy poderoso

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`)
    }

    let chat = global.db.data.chats[m.chat]
    if (!chat.mutedUsers) chat.mutedUsers = []

    if (/^(mute|silenciar)$/i.test(command)) {
        if (chat.mutedUsers.includes(who)) {
            return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚔️꒷

 ⤷ ┇ 𝗔𝗩𝗜𝗦𝗢 𝗗𝗘𝗟 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 ：✿ 。

  ꒱ ׁ. ᘏ 𝗘𝗦𝗧𝗔𝗗𝗢 ׅ 𝆬 ָ֢ ෆ
⚔️ ➛ ${targetName} ya esta en la *Habitacion del Tiempo*
⚔️ ➛ No puede hablar desde ahi

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`)
        }

        chat.mutedUsers.push(who)
        await global.db.write()

        await conn.reply(
            m.chat,
            `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚔️꒷

 ⤷ ┇ 𝗨𝗦𝗨𝗔𝗥𝗜𝗢 𝗦𝗜𝗟𝗘𝗡𝗖𝗜𝗔𝗗𝗢 ：✿ 。
꒰ ◞⁺⊹ ．Sello activado •

  ꒱ ׁ. ᘏ 𝗥𝗘𝗣𝗢𝗥𝗧𝗘 ׅ 𝆬 ָ֢ ෆ
⚔️ ➛ Usuario: ${targetName}
⚔️ ➛ Estado: *Encerrado en la Habitacion del Tiempo*
⚔️ ➛ Por: @${m.sender.split('@')[0]}

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *"Su voz fue sellada. Nadie lo escuchara"* 🔇
━━━━━━━━━━━`,
            m,
            { mentions: [who, m.sender] }
        )
    } else {
        if (!chat.mutedUsers.includes(who)) {
            return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚔️꒷

 ⤷ ┇ 𝗔𝗩𝗜𝗦𝗢 𝗗𝗘𝗟 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 ：✿ 。

  ꒱ ׁ. ᘏ 𝗘𝗦𝗧𝗔𝗗𝗢 ׅ 𝆬 ָ֢ ෆ
⚔️ ➛ ${targetName} no esta silenciado
⚔️ ➛ Aun puede hablar libremente

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`)
        }

        chat.mutedUsers = chat.mutedUsers.filter(u => u!== who)
        await global.db.write()

        await conn.reply(
            m.chat,
            `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚔️꒷

 ⤷ ┇ 𝗨𝗦𝗨𝗔𝗥𝗜𝗢 𝗟𝗜𝗕𝗘𝗥𝗔𝗗𝗢 ：✿ 。
꒰ ◞⁺⊹ ．Sello removido •

  ꒱ ׁ. ᘏ 𝗥𝗘𝗣𝗢𝗥𝗧𝗘 ׅ 𝆬 ָ֢ ෆ
⚔️ ➛ Usuario: ${targetName}
⚔️ ➛ Estado: *Liberado de la Habitacion del Tiempo*
⚔️ ➛ Por: @${m.sender.split('@')[0]}

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *"Su voz ha sido restaurada"* 🔊
━━━━━━━━━━━`,
            m,
            { mentions: [who, m.sender] }
        )
    }
}

handler.before = async function (m, { conn, chat, isBotAdmin }) {
    if (!m.isGroup || m.fromMe) return false
    if (!isBotAdmin) return false
    if (!chat.mutedUsers ||!Array.isArray(chat.mutedUsers)) return false

    if (chat.mutedUsers.includes(m.sender)) {
        try {
            await conn.sendMessage(m.chat, { delete: m.key })
            await conn.sendMessage(m.chat, { react: { text: '🔇', key: m.key } })
        } catch (e) {
            console.error(e)
        }
        return true
    }

    return false
}

handler.help = ['mute @user', 'unmute @user', 'silenciar @user']
handler.tags = ['group']
handler.command = /^(mute|silenciar|unmute|desilenciar)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler