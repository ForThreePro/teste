import crypto from "crypto"
import { FormData, Blob } from "formdata-node"
import { fileTypeFromBuffer } from "file-type"
import fetch from "node-fetch"

// TUS 5 KEYS DE REMOVE.BG
const APIS = [
    'bzCVvJUG2sRhDB3gwDZEZfDp',
    'vfFJNa8MThy7J1EVKvPSv9eo',
    'sarB51ABXcvLMRpQFkE1QA4f',
    'MJ1CaPUipeqyVC7HW8HqkXJE',
    '4AvZ9znyHsMFveZ4yBPW4T9z'
]
let apiIndex = 0

let handler = async (m, { conn, args }) => {
  let q = m.quoted? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime ||!mime.startsWith('image/')) return conn.reply(m.chat, `*❌ USA EL COMANDO BIEN ❌*
*━━━━━━━━━━━━━━━*

╭─「 🐉 REMOVE BG 」─╮
│ *Responde a una IMAGEN*
│ *Uso:*.rbg hd = HD 1 credito
│ *Uso:*.rbg = Preview gratis
╰─────────────────╯`, m)

  try {
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

    let modo = args[0] === 'hd'? 'auto' : 'preview' // hd = 1 credito, preview = gratis
    let media = await q.download()

    await conn.reply(m.chat, `🎨 *Procesando imagen en modo:* ${modo === 'auto'? '🔥 HD' : '💎 Preview'}...\n☁️ *Subiendo a la nube...*`, m)

    // 1. QUITAR FONDO
    let sinFondo = await removeBg(media, modo)

    // 2. SUBIR A LA NUBE
    let link = await myCloud(sinFondo)
    if (!link.success) throw new Error('Error al subir a evogb')

    let txt = `*✅ FONDO ELIMINADO CON ÉXITO*
*━━━━━━━━━━━━━━━━━━*

╭─「 🌟 RESULTADO 」─╮
│ *🔗 ENLACE:* ${link.url}
│ *📊 TAMAÑO:* ${formatBytes(sinFondo.length)}
│ *🎨 CALIDAD:* ${modo === 'auto'? 'HD Original' : 'Preview 625x400'}
│ *🆔 ID:* ${link.id}
│ *🛡️ SERVIDOR:* evogb.win
╰─────────────────╯

> *Descarga el link y ya tienes tu PNG transparente 100%*

*Tip:* Si ves fondo negro es solo la vista previa. Descárgalo.`

    await conn.reply(m.chat, txt, m)
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    await conn.reply(m.chat, `*❌ ERROR ❌*\n${e.message}`, m)
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

function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`
}

async function myCloud(content) {
  const fileType = await fileTypeFromBuffer(content)
  const ext = 'png' // Forzamos png para que sea transparente
  const mime = 'image/png'

  const formData = new FormData()
  const blob = new Blob([content], { type: mime })
  const fileName = `rbg_${crypto.randomBytes(5).toString("hex")}.${ext}`

  formData.append("file", blob, fileName)

  const response = await fetch("https://evogb.win/api/upload", {
    method: "POST",
    body: formData
  })

  if (!response.ok) throw new Error("Servidor de subida caido")

  return await response.json()
}

handler.help = ['rbg'];
handler.tags = ['tools', 'ai'];
handler.command = ['rbg'];
handler.limit = 10

export default handler