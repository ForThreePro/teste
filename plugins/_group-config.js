let handler = async (m, { conn, isAdmin, command }) => {
    if (!m.isGroup) return m.reply(`*🐉 GOKU PREM BOT 🐉*\n\n*❌ Este comando solo funciona en grupos*`)
    if (!isAdmin) return m.reply(`*🐉 GOKU PREM BOT 🐉*\n\n*❌ Solo admins pueden usar este comando*`)

    let group = await conn.groupMetadata(m.chat)
    
    // FORMA SEGURA DE DETECTAR AL BOT
    let botNumber = conn.decodeJid(conn.user.id)
    let botAdmin = group.participants.find(p => p.id === botNumber)?.admin

    if (!botAdmin) return m.reply(`*🐉 GOKU PREM BOT 🐉*\n\n*❌ Necesito ser admin para hacer eso*\n\n*ID:* ${botNumber}`)

    try {
        if(command === 'abrir' || command === 'open'){
            await conn.groupSettingUpdate(m.chat, 'not_announcement')
            await conn.sendMessage(m.chat, { react: { text: '⚡', key: m.key } })

            let txt = `*🐉 GOKU PREM BOT 🐉*

╭─「 ⚡ GRUPO LIBERADO 」─╮
│
│ *ESTADO:* 🔓 Abierto
│ *PODER:* Ki al 100%
│ *ADMIN:* @${m.sender.split('@')[0]}
│
│ *Todos pueden hablar ahora*
╰────────────────────────╯

> *"¡El poder de Goku liberó el chat!"*`

            await conn.reply(m.chat, txt, m, { mentions: [m.sender] })

        } else if(command === 'cerrar' || command === 'close'){
            await conn.groupSettingUpdate(m.chat, 'announcement')
            await conn.sendMessage(m.chat, { react: { text: '🔥', key: m.key } })

            let txt = `*🐉 GOKU PREM BOT 🐉*

╭─「 🔥 GRUPO BLOQUEADO 」─╮
│
│ *ESTADO:* 🔒 Cerrado
│ *PODER:* Modo Dios
│ *ADMIN:* @${m.sender.split('@')[0]}
│
│ *Solo admins pueden hablar*
╰─────────────────────────╯

> *"¡KAME HAME HAAAA! Silencio total"*`

            await conn.reply(m.chat, txt, m, { mentions: [m.sender] })
        }
    } catch (e) {
        console.error(e)
        await m.reply(`*❌ ERROR:* ${e.message}`)
    }
}

handler.help = ['abrir', 'cerrar']
handler.tags = ['group']
handler.command = ['abrir', 'cerrar', 'open', 'close']
handler.admin = true
handler.botAdmin = true
export default handler