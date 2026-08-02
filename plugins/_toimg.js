let handler = async (m, { conn }) => {
    // Evitar que el bot se responda a si mismo
    if (m.fromMe) return
    if (m.quoted.mtype !== 'stickerMessage') return m.reply(`*Responde a un sticker* 🍟`)

    try {
        let buffer = await m.quoted.download()
        
        await conn.sendMessage(m.chat, {
            image: buffer,
            caption: '✨ *Sticker convertido a imagen*'
        }, { quoted: m })

    } catch (e) {
        console.log(e)
        m.reply(`*Error:* No se pudo convertir 🍟`)
    }
}

handler.help = ['toimg']
handler.tags = ['tools']
handler.command = ['toimg']
handler.premium = false
export default handler