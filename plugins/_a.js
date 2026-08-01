import fetch from 'node-fetch'
import FormData from 'form-data'

const NUMEROS_AUTORIZADOS = ['528621029907', '5218621029907', '51927174369']

// PON TUS 5 KEYS NUEVAS AQUÍ
const APIS = [
    'bzCVvJUG2sRhDB3gwDZEZfDp', // remove.bg 1
    'vfFJNa8MThy7J1EVKvPSv9eo', // remove.bg 2
    'sarB51ABXcvLMRpQFkE1QA4f', // remove.bg 3
    'MJ1CaPUipeqyVC7HW8HqkXJE', // remove.bg 4
    '4AvZ9znyHsMFveZ4yBPW4T9z' // remove.bg 5
]

let apiIndex = 0

let handler = async (m, { conn, usedPrefix }) => {
    const numeroQueUso = m.sender.split('@')[0]
    if (!NUMEROS_AUTORIZADOS.includes(numeroQueUso)) return m.reply('❌ ACCESO DENEGADO')

    try {
        await m.react('🕓')
        let q = m.quoted? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!mime ||!mime.startsWith('image/')) return m.reply(`Responde a una imagen con: ${usedPrefix}removebg`)

        let buffer = await q.download()
        let imgBuffer = await removeBg(buffer)

        await conn.sendFile(m.chat, imgBuffer, `nobg_${Date.now()}.png`, `✅ *Fondo eliminado* | API: ${apiIndex + 1}/5`, m)
        await m.react('✅')

    } catch (error) {
        console.error(error)
        await m.react('❌')
        m.reply(`❌ *ERROR* ❌\n${error.message}\n\n*Se agotaron los créditos de las 5 keys*`)
    }
}

async function removeBg(buffer) {
    let intentos = 0
    while(intentos < APIS.length) {
        let key = APIS[apiIndex]
        try {
            let form = new FormData()
            form.append('image_file', buffer)
            form.append('size', 'auto')

            let res = await fetch('https://api.remove.bg/v1.0/removebg', {
                method: 'POST',
                headers: { 'X-Api-Key': key },
                body: form,
                timeout: 30000
            })

            if(res.ok) {
                apiIndex = (apiIndex + 1) % APIS.length // rota para la siguiente
                return await res.buffer()
            }
            if(res.status === 402) { // sin créditos
                console.log(`Key ${apiIndex + 1} sin créditos`)
            }
        } catch(e){
            console.log(`Key ${apiIndex + 1} falló`)
        }

        apiIndex = (apiIndex + 1) % APIS.length
        intentos++
    }
    throw new Error('Todas las 5 keys están sin créditos o fallaron')
}

handler.help = ['removebg']
handler.tags = ['tools', 'ai']
handler.command = /^(removebg|rmbg|nobg)$/i
handler.limit = true
export default handler