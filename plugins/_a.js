import fetch from 'node-fetch'
import FormData from 'form-data'

// PON EL NUMERO DEL ADMIN AQUÍ
const ADMIN = '51927174369'

const APIS = [
    'bzCVvJUG2sRhDB3gwDZEZfDp',
    'vfFJNa8MThy7J1EVKvPSv9eo',
    'sarB51ABXcvLMRpQFkE1QA4f',
    'MJ1CaPUipeqyVC7HW8HqkXJE',
    '4AvZ9znyHsMFveZ4yBPW4T9z'
]

let apiIndex = 0
let solicitudes = new Map()

let handler = async (m, { conn, usedPrefix, command, args }) => {
    let q = m.quoted? m.quoted : m
    let mime = (q.msg || q).mimetype || ''

    if (command === 'removebg') {
        if (!mime ||!mime.startsWith('image/')) return m.reply(`Responde a una imagen con: *${usedPrefix}removebg*`)
        return procesar(m, conn, q, 'preview')
    }

    if (command === 'removebg1') {
        if (!mime ||!mime.startsWith('image/')) return m.reply(`Responde a una imagen con: *${usedPrefix}removebg1*`)
        let buffer = await q.download()
        let id = Date.now().toString()
        solicitudes.set(id, { buffer, user: m.sender, chat: m.chat })

        await conn.sendMessage(ADMIN + '@s.whatsapp.net', {
            text: `📩 *NUEVA SOLICITUD HD*
*Usuario:* @${m.sender.split('@')[0]}
*ID:* ${id}

.aceptarhd ${id} = Aprobar
.rechazarhd ${id} = Rechazar`,
            mentions: [m.sender]
        })
        return m.reply(`📩 *Solicitud enviada al admin*\nEspera aprobación. ID: ${id}`)
    }

    if (command === 'aceptarhd') {
        if (m.sender.split('@')[0]!== ADMIN) return
        let id = args[0]
        let sol = solicitudes.get(id)
        if (!sol) return m.reply('❌ ID no encontrado')
        await m.reply('✅ Aprobado. Procesando HD...')
        await procesar(sol, conn, { download: () => sol.buffer }, 'hd')
        solicitudes.delete(id)
        return
    }

    if (command === 'rechazarhd') {
        if (m.sender.split('@')[0]!== ADMIN) return
        let id = args[0]
        if (solicitudes.has(id)) {
            solicitudes.delete(id)
            return m.reply(`❌ Solicitud ${id} rechazada`)
        }
    }
}

async function procesar(m, conn, q, modo) {
    try {
        await m.react('⏳')
        let buffer = await q.download()
        let imgBuffer = await removeBg(buffer, modo)
        await m.react('✅')

        let tipoMsg = modo === 'hd'? '🔥 HD Aprobado' : '💎 Preview Gratis'

        // TRUCO 1: Enviar como documento + jpegThumbnail null
        // TRUCO 2: Si quieres que se vea en el chat, usa sticker
        await conn.sendMessage(m.chat, {
            document: imgBuffer,
            fileName: `nobg_${Date.now()}.png`,
            mimetype: 'image/png',
            caption: `✅ *Fondo eliminado*\n*Modo:* ${tipoMsg}`,
            jpegThumbnail: null // ESTO EVITA QUE WHATSAPP LO CONVIERTA A JPG
        }, { quoted: m })

        // OPCIONAL: También mandarlo como sticker transparente
        // await conn.sendMessage(m.chat, { sticker: imgBuffer }, { quoted: m })

    } catch (error) {
        console.error(error)
        await m.react('❌')
        m.reply(`❌ *ERROR:* ${error.message}`)
    }
}

async function removeBg(buffer, modoElegido) {
    let intentos = 0
    while(intentos < APIS.length) {
        let key = APIS[apiIndex]
        try {
            let form = new FormData()
            form.append('image_file', buffer)
            form.append('size', modoElegido)

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
    throw new Error(`Todas las 5 keys están sin créditos`)
}

handler.help = ['removebg', 'removebg1']
handler.tags = ['tools', 'ai']
handler.command = /^(removebg|removebg1|aceptarhd|rechazarhd)$/i
handler.limit = true
export default handler