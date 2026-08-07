import axios from 'axios'
import FormData from 'form-data'

const api = axios.create({ baseURL: 'https://api4g.iloveimg.com' })

const getTaskId = async () => {
    const { data: html } = await axios.get('https://www.iloveimg.com/id/hapus-latar-belakang')
    const token = html.match(/ey[a-zA-Z0-9?%-_/]+/g)?.[1]
    if (!token) throw 'Token expirado'
    api.defaults.headers.post['authorization'] = `Bearer ${token}`
    return html.match(/taskId = '(\w+)/)?.[1]
}

const removeBg = async (imageBuffer) => {
    const taskId = await getTaskId()
    const fileName = `img_${Date.now()}.jpg`
    const form = new FormData()
    form.append('file', imageBuffer, fileName)
    form.append('task', taskId)

    await api.post('/v1/upload', form, { headers: form.getHeaders() })

    const form2 = new FormData()
    form2.append('task', taskId)
    form2.append('server_filename', fileName)

    const { data } = await api.post('/v1/removebackground', form2, {
        headers: form2.getHeaders(),
        responseType: 'arraybuffer'
    })
    return data
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let start = Date.now()
    let buffer

    if (text) {
        await m.react('⏳')
        const { data } = await axios.get(text, { responseType: 'arraybuffer' })
        buffer = Buffer.from(data)
    } else {
        let q = m.quoted || m
        let mime = (q.msg || q).mimetype || ''
        if (!/image/.test(mime)) return m.reply(`Responde a imagen o manda link: *${usedPrefix + command} url*`)
        await m.react('⏳')
        buffer = await q.download()
    }

    try {
        const result = await removeBg(buffer)
        let time = ((Date.now() - start) / 1000).toFixed(2)
        await conn.sendFile(m.chat, result, 'nobg.png', `✅ *Listo*\n⏱️ ${time}s`, m)
        await m.react('✅')
    } catch (e) {
        await m.react('❌')
        m.reply(`⚠️ Error: ${e.message || 'API caida'}`)
    }
}

handler.help = ['nobg <link>']
handler.tags = ['tools']
handler.command = /^(nobg|rembg|removebg)$/i
handler.limit = true

export default handler