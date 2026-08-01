import uploadImage from '../lib/uploadImage.js'
import { sticker } from '../lib/sticker.js'
import fetch from 'node-fetch'

const NUMEROS_AUTORIZADOS = ['528621029907', '5218621029907', '51927174369']

let handler = async (m, { conn, text, usedPrefix, command }) => {
    const numeroQueUso = m.sender.split('@')[0]
    if (!NUMEROS_AUTORIZADOS.includes(numeroQueUso)) return m.reply('❌ ACCESO DENEGADO')

    let user = global.db.data.users[m.sender]
    let packname = user.packname || global.packname
    let author = user.author || global.author

    let q = m.quoted? m.quoted : m
    let mime = (q.msg || q).mimetype || ''

    await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

    try {
        let buffer
        if (/image/.test(mime) &&!/webp/.test(mime)) {
            buffer = await q.download()
        } else if (text && isUrl(text)) {
            let res = await fetch(text)
            buffer = await res.buffer()
        } else {
            return m.reply(`*Uso:*\n1. Responde a una imagen con *${usedPrefix + command}*\n2. O manda *${usedPrefix + command} https://link.jpg*`)
        }

        // INTENTAR CON 3 APIS DIFERENTES
        let urlFinal = await removeBgWithFallback(buffer)
        if (!urlFinal) throw new Error('Todas las APIs fallaron')

        // 1. Enviar imagen PNG
        await conn.sendMessage(m.chat, {
            image: { url: urlFinal },
            caption: `✅ *Fondo eliminado exitosamente*`
        }, { quoted: m })

        // 2. Enviar como sticker
        let stiker = await sticker(false, urlFinal, packname, author)
        await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true)

        await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

    } catch (e) {
        console.error(e)
        await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
        m.reply(`❌ *ERROR* ❌\nNo se pudo quitar el fondo.\n*Motivo:* ${e.message}\n\n*Tip:* Usa imágenes claras con buen contraste`)
    }
}

// FUNCION CON 3 APIS DE RESPALDO
async function removeBgWithFallback(buffer) {
    const apis = [
        // API 1: removebg.one
        async (buf) => {
            let FormData = (await import('form-data')).default
            let form = new FormData()
            form.append('file', buf, { filename: 'image.jpg' })
            let res = await fetch('https://removebg.one/api/predict/v2', {
                method: 'POST', body: form, headers: form.getHeaders()
            })
            let json = await res.json()
            return json.data?.cutoutUrl
        },
        // API 2: ootaizumi
        async (buf) => {
            let url = await uploadImage(buf)
            let res = await fetch(`https://api.ootaizumi.web.id/tools/removebg?imageUrl=${encodeURIComponent(url)}`)
            let json = await res.json()
            return json.status? json.result : null
        },
        // API 3: bg.removal.ai
        async (buf) => {
            let url = await uploadImage(buf)
            let res = await fetch(`https://bg.removal.ai/api/removebg?url=${encodeURIComponent(url)}`)
            let json = await res.json()
            return json.data?.result_url
        }
    ]

    for (let api of apis) {
        try {
            let result = await api(buffer)
            if (result) return result
        } catch (e) {
            console.log('API falló, probando siguiente...')
        }
    }
    return null
}

const isUrl = (text) => /^(https?):\/\/[^\s/$.?#]+\.(jpe?g|png)$/i.test(text)
handler.help = ['removebg', 'rmbg']
handler.tags = ['tools']
handler.command = /^(s?removebg|rmbg)$/i
handler.limit = true
handler.group = true

export default handler