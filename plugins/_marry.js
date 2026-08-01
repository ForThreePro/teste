let handler = async (m, { conn, usedPrefix, command }) => {
    let who = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : null

    // ===== IMAGENES =====
    // Boda: Pareja tierna abrazada
    const IMG_CASAMIENTO = 'https://files.evogb.win/zu9HrE.jpg'
    // Divorcio: Corazón roto lluvia
    const IMG_DIVORCIO = 'https://files.evogb.win/bftECK.jpg'

    global.db.data.users[m.sender] = global.db.data.users[m.sender] || { pareja: null }

    const sendMedia = async (chat, url, caption, mentions) => {
        return conn.sendMessage(chat, {
            image: { url: url },
            caption: caption,
            mentions: mentions
        }, { quoted: m })
    }

    // ===== CASARSE =====
    if (command == 'marry' || command == 'casar') {
        if (!who) return m.reply(`💍 *Uso:* ${usedPrefix}marry @usuario\n*Etiqueta a la persona que amas* 🥺`)
        if (who === m.sender) return m.reply('🙄 *El amor propio es bonito, pero no cuenta xd*')

        global.db.data.users[who] = global.db.data.users[who] || { pareja: null }
        let user = global.db.data.users[m.sender]
        let target = global.db.data.users[who]

        if (user.pareja) return m.reply(`💍 *Ya tienes un corazón ocupado con @${user.pareja.split('@')[0]}*\n*Usa ${usedPrefix}divorcio si quieres soltar*`, null, { mentions: [user.pareja] })
        if (target.pareja) return m.reply(`💔 *@${who.split('@')[0]} ya le entregó su corazón a alguien*`, null, { mentions: [who] })

        // Casarlos
        user.pareja = who
        target.pareja = m.sender

        let fecha = new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' })

        let caption = `ᯇ 💒 𝗡𝗨𝗘𝗦𝗧𝗥𝗢 𝗔𝗠𝗢𝗥 𝗘𝗠𝗣𝗜𝗘𝗭𝗔 💒 ୧

꒰ ◞⁺⊹ ．🤍 *¡NOS CASAMOS!* 🤍

@${m.sender.split('@')[0]} 💕 @${who.split('@')[0]}

──愛 *𝗣𝗥𝗢𝗠𝗘𝗦𝗔* ╏ 💌
"Prometo cuidarte, hacerte reír en tus días tristes,
ser tu casa cuando el mundo pese,
y elegirte todos los días de mi vida"

──愛 *𝗡𝗨𝗘𝗦𝗧𝗥𝗢 𝗗𝗜𝗔* ╏ 🌸
📅 *${fecha}*
✨ *Desde hoy nuestros corazones laten al mismo ritmo*
🌙 *Dulces sueños juntos, aventuras de la mano*

> *Que el amor nos encuentre siempre* 💕🎉`

        return sendMedia(m.chat, IMG_CASAMIENTO, caption, [m.sender, who])
    }

    // ===== DIVORCIARSE =====
    if (command == 'divorcio' || command == 'divorce') {
        let user = global.db.data.users[m.sender]
        if (!user.pareja) return m.reply(`💔 *Tu corazón está libre*\n*Usa ${usedPrefix}marry @usuario para amar de nuevo*`)

        let pareja = user.pareja
        if (global.db.data.users[pareja].pareja!== m.sender) return m.reply(`⚠️ *Error en la DB*`)

        // Divorcio
        user.pareja = null
        global.db.data.users[pareja].pareja = null

        let caption = `ᯇ 🥀 𝗨𝗡 𝗔𝗠𝗢𝗥 𝗤𝗨𝗘 𝗧𝗘𝗥𝗠𝗜𝗡𝗔 🥀 ୧

꒰ ◞⁺⊹ ．😔 *NOS DESPEDIMOS* 😔

@${m.sender.split('@')[0]} 💔 @${pareja.split('@')[0]}

──愛 *𝗨𝗟𝗧𝗜𝗠𝗔 𝗖𝗔𝗥𝗧𝗔* ╏ 💌
"A veces amar también es soltar...
Gracias por las risas, por las noches hablando,
por enseñarme que el amor existe.
No funcionó, pero fuiste bonito mientras duró"`

──愛 *𝗥𝗘𝗖𝗨𝗘𝗥𝗗𝗢* ╏ 🍂
*Nos quisimos bien, pero la vida decidió diferente*
*Guardo lo bonito y dejo ir el dolor*

> *Ojalá ambos encontremos paz* 🕊️ *Cuídate mucho*`

        return sendMedia(m.chat, IMG_DIVORCIO, caption, [m.sender, pareja])
    }
}

handler.help = ['marry @usuario', 'divorcio']
handler.tags = ['love']
handler.command = /^(marry|casar|divorcio|divorce)$/i
handler.group = true

export default handler