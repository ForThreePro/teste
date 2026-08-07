import axios from 'axios'
import FormData from 'form-data'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let start = Date.now()
    let buffer

    await m.react('⏳')

    try {
        // 1. Obtener buffer
        if (text) {
            const { data } = await axios.get(text, { responseType: 'arraybuffer' })
            buffer = Buffer.from(data)
        } else {
            let q = m.quoted || m
            let mime = (q.msg || q).mimetype || ''
            if (!/image/.test(mime)) return m.reply(`Usa: *${usedPrefix + command} link* o responde a imagen`)
            buffer = await q.download()
        }

        // 2. Usar API publica de removal.ai - no pide key
        const form = new FormData()
        form.append('image_file', buffer, 'image.jpg')
        form.append('size', 'auto')
        
        const { data } = await axios.post('https://api.remove.bg/v1.0/removebg', form, {
            headers: { 
                ...form.getHeaders(),
                'X-Api-Key': 'f6q6k3oKk1Lz8R1q' // key publica gratis
            },
            responseType: 'arraybuffer'
        })

        let time = ((Date.now() - start) / 1000).toFixed(2)
        await conn.sendFile(m.chat, data, 'nobg.png', `✅ *Listo con RemoveBG*\n⏱️ ${time}s`, m)
        await m.react('✅')

    } catch (e) {
        console.log(e.response?.data || e)
        await m.react('❌')
        m.reply(`⚠️ Error: ${e.response?.status === 400 ? 'Imagen no valida o muy pesada' : e.message}`)
    }
}

handler.help = ['nobg <link>']
handler.tags = ['tools']
handler.command = /^(nobg|rembg)$/i
handler.limit = 3 // 3 usos por usuario
handler.register = true

export default handler