let handler = async (m, { conn }) => {
    if (!m.quoted ||!m.quoted.isSticker) return m.reply(`*Responde a un sticker* 🍟`)
    let media = await m.quoted.download()
    await conn.sendFile(m.chat, media, 'img.png', '✅ *Sticker convertido a imagen*', m)
}
handler.help = ['toimg']
handler.tags = ['tools']
handler.command = ['toimg']
export default handler