import { exec } from 'child_process'
import { promisify } from 'util'
import { writeFile, unlink, readFile } from 'fs/promises'
import { join } from 'path'
import { tmpdir } from 'os'
import crypto from 'crypto'

const execPromise = promisify(exec)

let handler = async (m, { conn, command }) => {
    if (m.fromMe) return
    if (!m.quoted) return m.reply(`*Responde a un sticker* 🍟`)
    if (m.quoted.mtype !== 'stickerMessage') return m.reply(`*Responde a un sticker* 🍟`)

    let isAnimated = m.quoted.isAnimated

    try {
        if (command === 'toimg') {
            // COMANDO .toimg = SOLO IMAGEN
            if (isAnimated) return m.reply(`*Ese sticker es animado. Usa .tovid* 🎬`)
            
            let buffer = await m.quoted.download()
            await conn.sendMessage(m.chat, {
                image: buffer,
                caption: '✅ *Sticker convertido a imagen*'
            }, { quoted: m })

        } else if (command === 'tovid') {
            // COMANDO .tovid = SOLO VIDEO
            if (!isAnimated) return m.reply(`*Ese sticker no es animado. Usa .toimg* 🍟`)
            
            m.reply(`🎬 *Convirtiendo sticker animado...*`)
            let buffer = await m.quoted.download()
            let filename = join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
            let out = filename.replace('.webp', '.mp4')
            await writeFile(filename, buffer)
            await execPromise(`ffmpeg -i ${filename} -vf "scale=512:512:force_original_aspect_ratio=decrease,pad=512:512:(ow-iw)/2:(oh-ih)/2" -movflags faststart -pix_fmt yuv420p -vsync 0 ${out}`)
            let vidBuffer = await readFile(out)
            
            await conn.sendMessage(m.chat, {
                video: vidBuffer,
                caption: '✅ *Sticker animado convertido*',
                gifPlayback: true,
                mimetype: 'video/mp4'
            }, { quoted: m })
            
            await unlink(filename)
            await unlink(out)
        }

    } catch (e) {
        console.log(e)
        m.reply(`*Error:* No se pudo convertir. ¿Tienes ffmpeg instalado? 🍟`)
    }
}

handler.help = ['toimg', 'tovid']
handler.tags = ['tools']
handler.command = ['toimg', 'tovid'] // Los 2 comandos aquí
export default handler