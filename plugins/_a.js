import fetch from 'node-fetch'
import FormData from 'form-data'

// PON TUS 5 KEYS NUEVAS AQUÍ
const APIS = [
    'bzCVvJUG2sRhDB3gwDZEZfDp',
    'vfFJNa8MThy7J1EVKvPSv9eo',
    'sarB51ABXcvLMRpQFkE1QA4f',
    'MJ1CaPUipeqyVC7HW8HqkXJE',
    '4AvZ9znyHsMFveZ4yBPW4T9z'
]

let apiIndex = 0

let handler = async (m, { conn, usedPrefix, command, args }) => {
    try {
        let q = m.quoted? m.quoted : m
        let mime = (q.msg || q).mimetype || ''

        if (!mime ||!mime.startsWith('image/'))
            return m.reply(`*Uso:* Responde a una imagen con *${usedPrefix + command} hd* o *${usedPrefix + command} preview*`)

        let modo = args[0] || 'hd' // por defecto HD
        if (!['hd','preview'].includes(modo)) modo = 'hd'

        await m.react('⏳')
        let buffer = await q.download()
        let imgBuffer = await removeBg(buffer, modo)

        let tipoMsg = modo === 'hd'? '🔥 HD' : '💎 Preview Gratis'

        // ENVIAR COMO DOCUMENTO PARA QUE NO PIERDA TRANSPARENCIA
        await conn.sendMessage(m.chat, {
            document: imgBuffer,
            fileName: `nobg_${Date.now()}.png`,
            mimetype: 'image/png',
            caption: `✅ *Fondo eliminado*\n*Modo:* ${tipoMsg}\n*API:* #${apiIndex}/5`
        }, { quoted: m })

        await m.react('✅')

    } catch (error) {
        console.error(error)
        await m.react('❌')
        m.reply(`❌ *ERROR:* ${error.message}`)
    }
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
            if(res.status === 402) console.log(`Key ${apiIndex + 1} sin créditos`)
        } catch(e){}

        apiIndex = (apiIndex + 1) % APIS.length
        intentos++
    }
    throw new Error(`Todas las 5 keys están sin créditos`)
}

handler.help = ['removebg']
handler.tags = ['tools', 'ai']
handler.command = /^(removebg|rmbg|nobg)$/i
handler.limit = 10
export default handler