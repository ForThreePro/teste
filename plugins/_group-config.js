let handler = async (m, { conn, isAdmin, command }) => {
    if (!m.isGroup) return m.reply(`*🐉 GOKU PREM BOT 🐉*\n\n*❌ Este comando solo funciona en grupos*`)
    if (!isAdmin) return m.reply(`*🐉 GOKU PREM BOT 🐉*\n\n*❌ Solo admins pueden usar este comando*`)

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
        if(e.message.includes('not-admin')) {
            return m.reply(`*🐉 GOKU PREM BOT 🐉*\n\n*❌ Necesito ser admin para hacer eso*`)
        }
        await m.reply(`*❌ ERROR:* ${e.message}`)
    }
}

handler.help = ['abrir', 'cerrar']
handler.tags = ['group']
handler.command = ['abrir', 'cerrar', 'open', 'close']
handler.admin = true
// handler.botAdmin = false  <-- LO QUITAMOS PARA QUE NO BUGUEE
export default handler