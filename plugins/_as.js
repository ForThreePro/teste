import axios from 'axios'
import FormData from 'form-data'

const api = axios.create({ baseURL: 'https://api4g.iloveimg.com' })

const getTaskId = async () => {
    const { data: html } = await axios.get('https://www.iloveimg.com/id/hapus-latar-belakang')
    api.defaults.headers.post['authorization'] = `Bearer ${html.match(/ey[a-zA-Z0-9?%-_/]+/g)[1]}`
    return html.match(/taskId = '(\w+)/)[1]
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let start = Date.now()
    let buffer

    await m.react('⏳')

    try {
        if (text) {
            // Si es link, lo descarga
            const { data } = await axios.get(text, { responseType: 'arraybuffer' })
            buffer = Buffer.from(data)
        } else {
            // Si es imagen respondida
            let q = m.quoted || m
            let mime = (q.msg || q).mimetype || ''
            if (!/image/.test(mime)) return m.reply(`Usa: *${usedPrefix + command} link* o responde a imagen`)
            buffer = await q.download()
        }

        // 1. Obtener task
        const taskId = await getTaskId()
        const fileName = `img_${Date.now()}.jpg`
        
        // 2. Subir
        const form = new FormData()
        form.append('file', buffer, fileName)
        form.append('task', taskId)
        await api.post('/v1/upload', form, { headers: form.getHeaders() })

        // 3. Procesar
        const form2 = new FormData()
        form2.append('task', taskId)
        form2.append('server_filename', fileName)
        const { data: result } = await api.post('/v1/removebackground', form2, {
            headers: form2.getHeaders(),
            responseType: 'arraybuffer'
        })

        let time = ((Date.now() - start) / 1000).toFixed(2)
        await conn.sendFile(m.chat, result, 'nobg.png', `✅ *Listo*\n⏱️ ${time}s`, m)
        await m.react('✅')

    } catch (e) {
        console.log(e)
        await m.react('❌')
        m.reply(`⚠️ Error: ${e.message}`)
    }
}

handler.help = ['nobg <link>']
handler.tags = ['tools']
handler.command = /^(nobg|rembg)$/i
handler.limit = true

export default handler