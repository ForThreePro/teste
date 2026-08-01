import crypto from "crypto"
import { FormData, Blob } from "formdata-node"
import { fileTypeFromBuffer } from "file-type"
import fetch from "node-fetch"

let handler = async (m, { conn }) => {
  let q = m.quoted? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime ||!mime.startsWith('image/')) return conn.reply(m.chat, `Responde a una imagen con: *.rbg*`, m)

  try {
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    let media = await q.download()

    await conn.reply(m.chat, `🎨 *Quitando fondo en modo Preview Gratis...*\n☁️ *Subiendo a la nube...*`, m)

    // USAR API GRATIS: remove.bg preview no gasta credito
    let sinFondo = await removeBgFree(media)
    let link = await myCloud(sinFondo)

    await conn.reply(m.chat, `*✅ LISTO*\n*🔗 LINK:* ${link.url}\n*Modo:* 💎 Preview Gratis Ilimitado`, m)
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

  } catch (e) {
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    await conn.reply(m.chat, `*❌ ERROR:* ${e.message}`, m)
  }
}

async function removeBgFree(buffer) {
    let form = new FormData()
    form.append('image_file', buffer)
    form.append('size', 'preview') // preview es gratis

    let res = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: { 'X-Api-Key': 'bzCVvJUG2sRhDB3gwDZEZfDp' }, // usa solo 1 key para preview
        body: form
    })
    if(!res.ok) throw new Error("API caida")
    return await res.buffer()
}

async function myCloud(content) {
  const fileType = await fileTypeFromBuffer(content)
  const ext = 'png'
  const formData = new FormData()
  formData.append("file", new Blob([content], { type: 'image/png' }), `rbg_${crypto.randomBytes(5).toString("hex")}.${ext}`)

  const response = await fetch("https://evogb.win/api/upload", { method: "POST", body: formData })
  if (!response.ok) throw new Error("Servidor caido")
  return await response.json()
}

handler.command = ['rbg'];
export default handler