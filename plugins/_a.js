import uploadImage from '../lib/uploadImage.js'
import { sticker } from '../lib/sticker.js'
import fetch from 'node-fetch'

const NUMEROS_AUTORIZADOS = ['528621029907', '5218621029907', '51927174369'] // sin +

let handler = async (m, { conn, text, usedPrefix, command }) => {
    const numeroQueUso = m.sender.split('@')[0]

    // SEGURIDAD
    if (!NUMEROS_AUTORIZADOS.includes(numeroQueUso)) {
        return m.reply(`❌ *ACCESO DENEGADO* ❌

╭─「 *SEGURIDAD* 」─╮
│ *Tu numero detectado:* ${numeroQueUso}
╰─────────────
> *No tienes permisos* 😿`)
    }

    let user = global.db.data.users[m.sender]
    let packname = user.packname || global.packname
    let author = user.author || global.author

    let q = m.quoted? m.quoted : m
    let mime = (q.msg || q).mimetype || ''

    await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

    try {
        let json
        let urlFinal

        // CASO 1: Respondes a una imagen
        if (/image/.test(mime) &&!/webp/.test(mime)) {
            let buffer = await q.download()
            let media = await uploadImage(buffer)
            let res = await fetch(`https://btch.us.kg/removebg?url=${media}`)
            json = await res.json()
            urlFinal = json.result?.urls

        // CASO 2: Pasas un link directo
        } else if (text && isUrl(text)) {
            let res = await fetch(`https://btch.us.kg/removebg?url=${text.trim()}`)
            json = await res.json()
            urlFinal = json.result?.urls

        } else {
            return m.reply(`*Uso:*\n1. Responde a una imagen con *${usedPrefix + command}*\n2. O manda *${usedPrefix + command} https://link.jpg*`)
        }

        if (!urlFinal) throw new Error('La API no devolvió resultado')

        // 1. Enviar imagen PNG
        await conn.sendMessage(m.chat, {
            image: { url: urlFinal },
            caption: `✅ *Fondo eliminado exitosamente*\n> © Super Bot`
        }, { quoted: m })

        // 2. Enviar como sticker
        let stiker = await sticker(false, urlFinal, packname, author)
        await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true)

        await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

    } catch (e) {
        console.error(e)
        await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
        m.reply(`❌ *ERROR* ❌\nLa API falló o la imagen no se pudo procesar.\n*Detalle:* ${e.message}`)
    }
}

const isUrl = (text) => {
    return /^(https?):\/\/[^\s/$.?#]+\.(jpe?g|png)$/i.test(text)
}

handler.help = ['removebg', 'rmbg']
handler.tags = ['tools']
handler.command = /^(s?removebg|rmbg)$/i
handler.limit = true
handler.group = true

export default handler