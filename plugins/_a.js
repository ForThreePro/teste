import fetch from 'node-fetch'
import FormData from 'form-data'

const NUMEROS_AUTORIZADOS = ['528621029907', '5218621029907', '51927174369']
const REMOVE_BG_KEY = 'p3x46vAvMtiCCHtoibgqgD3z' // tu key

let handler = async (m, { conn, usedPrefix }) => {
    const numeroQueUso = m.sender.split('@')[0]
    if (!NUMEROS_AUTORIZADOS.includes(numeroQueUso)) return m.reply('❌ ACCESO DENEGADO')

    try {
        await m.react('🕓')
        let q = m.quoted? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!mime ||!mime.startsWith('image/')) return m.reply(`Responde a una imagen con: ${usedPrefix}removebg`)

        let buffer = await q.download()
        
        // LLAMADA A REMOVE.BG
        let form = new FormData()
        form.append('image_file', buffer, { filename: 'image.jpg' })
        form.append('size', 'auto') // auto, preview, full
        form.append('bg_color', 'transparent')

        let res = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: { 'X-Api-Key': REMOVE_BG_KEY },
            body: form
        })

        if (!res.ok) {
            let err = await res.text()
            throw new Error(`remove.bg: ${res.status} - ${err}`)
        }

        let imgBuffer = await res.buffer() // ya viene PNG sin fondo

        await conn.sendFile(m.chat, imgBuffer, `nobg_${Date.now()}.png`, `✅ *Fondo eliminado con remove.bg Pro*`, m)
        await m.react('✅')

    } catch (error) {
        console.error(error)
        await m.react('❌')
        m.reply(`❌ *ERROR* ❌\n${error.message}\n\n*Créditos restantes:* Revisa en https://www.remove.bg/dashboard`)
    }
}

handler.help = ['removebg']
handler.tags = ['tools', 'ai']
handler.command = /^(removebg|rmbg|nobg)$/i
handler.limit = true
handler.group = true
export default handler