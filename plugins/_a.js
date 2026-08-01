import fetch from 'node-fetch'
import FormData from 'form-data'
import sharp from 'sharp'

// PON TUS 5 KEYS NUEVAS AQUÍ
const APIS = [
    'bzCVvJUG2sRhDB3gwDZEZfDp', // remove.bg 1
    'vfFJNa8MThy7J1EVKvPSv9eo', // remove.bg 2
    'sarB51ABXcvLMRpQFkE1QA4f', // remove.bg 3
    'MJ1CaPUipeqyVC7HW8HqkXJE', // remove.bg 4
    '4AvZ9znyHsMFveZ4yBPW4T9z' // remove.bg 5
]

let apiIndex = 0
let procesos = new Map() // guarda la imagen temporal

let handler = async (m, { conn, usedPrefix, command, args }) => {
    let q = m.quoted? m.quoted : m

    // PASO 1: Si responde a imagen, muestra botones
    if (q.mimetype && q.mimetype.startsWith('image/') &&!args[0]) {
        let buffer = await q.download()
        let id = Date.now().toString()
        procesos.set(id, buffer) // guardamos la imagen

        let { width, height } = await sharp(buffer).metadata()

        return conn.sendButton(m.chat, `
╭─「 🎨 *REMOVE BG PRO* 」
│
│ *Resolución:* ${width}x${height}px
│ *Elige la calidad:*
│
│ 🔥 *HD*: Tamaño original | Gasta 1 crédito
│ 💎 *Preview*: 625x400px | Gratis
│
╰─────────────────`,
        'Elige un modo',
        [['🔥 HD', `.removebg hd ${id}`], ['💎 Preview', `.removebg preview ${id}`]],
        m)
    }

    // PASO 2: Si presiona botón, procesa
    if (args[0] && args[1]) {
        let modo = args[0] // hd o preview
        let id = args[1]
        let buffer = procesos.get(id)

        if (!buffer) return m.reply('❌ La imagen expiró. Vuelve a responderla.')
        procesos.delete(id)

        try {
            await m.react('⏳')
            let imgBuffer = await removeBg(buffer, modo)
            await m.react('✅')

            let tipoMsg = modo === 'auto'? '🔥 HD Normal' : '💎 Preview Gratis'
            let caption = `╭─「 ✅ *FONDO ELIMINADO* 」
│
│ *Modo:* ${tipoMsg}
│ *API Usada:* #${apiIndex}/5
│
╰─────────────────`

            await conn.sendFile(m.chat, imgBuffer, `nobg_${Date.now()}.png`, caption, m)

        } catch (error) {
            console.error(error)
            await m.react('❌')
            m.reply(`❌ ${error.message}`)
        }
        return
    }

    // Si no responde a imagen
    return m.reply(`Responde a una imagen con: *${usedPrefix + command}*`)
}

async function removeBg(buffer, modoElegido) {
    let modo = modoElegido === 'hd'? 'auto' : 'preview'
    let intentos = 0

    while(intentos < APIS.length) {
        let key = APIS[apiIndex]
        try {
            let form = new FormData()
            form.append('image_file', buffer)
            form.append('size', modo)

            let res = await fetch('https://api.remove.bg/v1.0/removebg', {
                method: 'POST',
                headers: { 'X-Api-Key': key },
                body: form,
                timeout: 30000
            })

            if(res.ok) {
                let result = await res.buffer()
                apiIndex = (apiIndex + 1) % APIS.length
                return result
            }
        } catch(e){}

        apiIndex = (apiIndex + 1) % APIS.length
        intentos++
    }
    throw new Error(`Todas las 5 keys están sin créditos en modo ${modo}`)
}

handler.help = ['removebg']
handler.tags = ['tools', 'ai']
handler.command = /^(removebg|rmbg|nobg)$/i
handler.limit = 10
export default handler