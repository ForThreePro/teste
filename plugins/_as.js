import axios from 'axios'

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    let start = Date.now()
    
    if (!/image\/(png|jpe?g|webp)/i.test(mime)) 
        return m.reply(`🖼️ Responde a una imagen con *${usedPrefix + command}*`)
        
    await m.react('⏳')
    
    try {
        const buffer = await q.download()
        
        // Subir a telegra.ph
        const FormData = (await import('form-data')).default
        const form = new FormData()
        form.append('file', buffer, 'img.jpg')
        const { data: up } = await axios.post('https://telegra.ph/upload', form, { headers: form.getHeaders() })
        const imgUrl = 'https://telegra.ph' + up[0].src
        
        // Quitar fondo con Neoxr
        const apikey = 'AXTjg9'
        const { data } = await axios.get(`https://api.neoxr.eu/api/nobg?image=${encodeURIComponent(imgUrl)}&apikey=${apikey}`)
        
        if (!data.status) throw data.message
        
        let time = ((Date.now() - start) / 1000).toFixed(2)
        await conn.sendFile(m.chat, data.data.image, 'nobg.png', `✅ *Listo*\n⏱️ *Tiempo:* ${time}s`, m)
        await m.react('✅')
        
    } catch (e) {
        await m.react('❌')
        m.reply(`⚠️ Error: ${e.message}`)
    }
}

handler.help = ['nobg']
handler.tags = ['tools']
handler.command = /^(nobg|removebg|rembg)$/i
handler.limit = true

export default handler