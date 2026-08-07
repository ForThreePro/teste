import axios from 'axios'
import FormData from 'form-data'

let handler = async (m, { conn, usedPrefix, command }) => {
    const quoted = m.quoted || m
    const mime = quoted.mimetype || ""
    let start = Date.now() // PARA MEDIR TIEMPO

    if (!/image\/(png|jpe?g|webp)/i.test(mime)) {
        await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } })
        return conn.sendMessage(m.chat, {
            text: `🖼️ Responde a una imagen con *${usedPrefix + command}* para quitar el fondo.`
        })
    }

    try {
        await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key } })

        const buffer = await quoted.download()
        const ext = mime.split("/")[1] || "png"
        const randomName = `bg_${Math.random().toString(36).slice(2)}.${ext}`

        const form = new FormData()
        form.append("image", buffer, randomName)
        form.append("format", "png")
        form.append("model", "v1")

        const headers = {
            ...form.getHeaders(),
            accept: "application/json, text/plain, */*",
            "x-client-version": "web",
            "x-locale": "en"
        }

        const res = await axios.post("https://api2.pixelcut.app/image/matte/v1", form, {
            headers,
            responseType: "arraybuffer"
        })

        let time = ((Date.now() - start) / 1000).toFixed(2)
        
        let caption = `✅ *Fondo eliminado*

⏱️ *Tiempo:* ${time} segundos
📎 *Formato:* PNG
🔧 *Modelo:* v1`

        await conn.sendMessage(m.chat, {
            image: res.data,
            caption
        })

        await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } })

    } catch (e) {
        console.error('Error:', e.message)
        await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } })
        await conn.sendMessage(m.chat, {
            text: `⚠️ Ocurrió un error. La API puede estar saturada, intenta de nuevo.`
        })
    }
}

handler.help = ['bgremover']
handler.tags = ['tools']
handler.command = /^bgremover|removebg|nobg$/i
handler.limit = false

export default handler