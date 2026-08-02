let handler = async (m, { conn, text }) => {
    if (!text) return m.reply(`*Uso:* #fakewhatsapp Nombre | Tu texto fake\n*Ejemplo:* #fakewhatsapp Juan | Hola como estas?`)

    let [nombre,...texto] = text.split('|')
    if (!texto[0]) return m.reply(`*Falta el |*\n*Uso:* #fakewhatsapp Nombre | Tu texto fake`)

    nombre = nombre.trim()
    texto = texto.join('|').trim()

    let fake = `╭─「 📱 WHATSAPP FAKE 」─╮
│
│ *${nombre}* 🟢 En línea
│
│ ${texto}
│
╰─────────────────╯`

    await m.reply(fake)
}

handler.help = ['fakewhatsapp <nombre | texto>']
handler.tags = ['tools']
handler.command = ['fakewhatsapp', 'fakewa']
export default handler