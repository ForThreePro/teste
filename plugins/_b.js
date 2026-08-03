let handler = async (m, { conn, command, text, participants }) => {

    // ===== PLANTILLA PARA MENCIONAR =====
    let who = m.mentionedJid[0]
            || m.quoted?.sender
            || (conn.parseMention(text)[0])
            || (text.replace(/[^0-9]/g, '') + '@s.whatsapp.net')

    if (who === '@s.whatsapp.net' ||!who) who = null

    let necesitaPersona = ['pelea','cachetear','curar','robar','matar','insultar'].includes(command)

    if (necesitaPersona &&!who) {
        return m.reply(`❌ *Error 404* ❌\nTienes que:\n1. *Tocar @* y elegir a la persona\n2. *Responder* al mensaje +.comando\n3..comando 519123456`)
    }

    let user = `@${m.sender.split('@')[0]}`
    let target = who? `@${who.split('@')[0]}` : user

    // ===== COMANDOS DE JUEGOS =====
    const juegos = {
        pelea: [
            `⚔️ *${user} reta a duelo a ${target}* ⚔️\nResultado: ${target} perdió 100 de vida 💀`,
            `🥊 *${user} vs ${target}*\nGanador: ${user} por KO 🔥`,
            `💥 ${user} le mete una paliza a ${target}\n${target} quedó en el piso`
        ],
        cachetear: [
            `👋 *${user} ZAS! cachetea a ${target}* 👋\n${target} quedó mareado`,
            `💢 ${user} le mete tremenda cachetada a ${target} por noob`,
            `😡 *SLAP* ${user} → ${target}\nDaño crítico x2`
        ],
        curar: [
            `💊 *${user} cura a ${target}* 💊\n+100 de vida recuperada ❤️`,
            `✨ ${user} usa poción en ${target}\n${target} está full HP`,
            `🩹 ${user} venda a ${target}\nYa no sangra bro`
        ],
        robar: [
            `🤲 *${user} le robó todo a ${target}* 🤲\n${target} se quedó en 0`,
            `💰 ${user} asaltó a ${target}\nBotín: $999999`,
            `🦹 ${user} le sacó la cartera a ${target}\nCorre que viene la poli`
        ],
        matar: [
            `🔪 *${user} eliminó a ${target}* 🔪\nF por ${target}`,
            `💀 ${user} hizo 1 tiro a la cabeza a ${target}\nHS`,
            `☠️ ${user} *te bajó* ${target}\nRespawn en 3...2...1`
        ],
        insultar: [
            `🤡 ${user} a ${target}: Eres más perdido que señal de wifi en el baño`,
            `💀 ${user} a ${target}: Tu IQ es negativo, felicidades`,
            `🐒 ${user} a ${target}: Pareces lag en forma de persona`,
            `🧠 ${user} a ${target}: Te faltan neuronas y te sobra cara`,
            `📉 ${user} a ${target}: Eres el error 404 de la evolución`
        ]
    }

    if (!juegos[command]) return

    let res = juegos[command][Math.floor(Math.random() * juegos[command].length)]
    await conn.reply(m.chat, res, m, { mentions: [who, m.sender] })
    await conn.sendMessage(m.chat, { react: { text: '🎮', key: m.key } })
}

handler.help = [
'pelea @usuario',
'cachetear @usuario',
'curar @usuario',
'robar @usuario',
'matar @usuario',
'insultar @usuario'
]
handler.tags = ['juegos']
handler.command = ['pelea','cachetear','curar','robar','matar','insultar']
handler.group = true

export default handler