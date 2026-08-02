import { sticker } from 'sticker-formatter' // si no lo tienes, bórralo
import { downloadContentFromMessage } from '@whiskeysockets/baileys'

let handler = async (m, { conn }) => {
    if (!m.quoted) return m.reply(`*Responde a un sticker* 🍟`)
    if (!m.quoted.isSticker) return m.reply(`*Eso no es un sticker* 🍟`)

    try {
        let mime = m.quoted.mimetype || 'image/webp'
        let buffer = await m.quoted.download()

        await conn.sendMessage(m.chat, {
            image: buffer,
            caption: '✅ *Sticker convertido a imagen*'
        }, { quoted: m })

    } catch (e) {
        console.log(e)
        m.reply(`*Error:* No se pudo convertir el sticker 🍟`)
    }
}

handler.help = ['toimg']
handler.tags = ['tools']
handler.command = ['toimg']
export default handler