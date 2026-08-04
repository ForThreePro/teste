import axios from 'axios'
import fetch from "node-fetch"
import yts from 'yt-search'

let handler = async (m, { conn, text, command, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🌳꒷

 ⤷ ┇ 𝗠𝗢𝗗𝗨𝗟𝗢 𝗗𝗘 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦 ：✿ 。
꒰ ◞⁺⊹ ．CAPSULA HORADORA • ENERGIA MAXIMA

  ꒱ ׁ. ᘏ 𝗬𝗢𝗨𝗧𝗨𝗕𝗘 ׅ 𝆬 ָ֢ ෆ
🌳 ➛.play nombre → Ki Audio MP3
🌳 ➛.play2 nombre → Ki Video MP4
🌳 ➛.ytmp3 link → Audio Directo
🌳 ➛.ytmp4 link → Video 720p

  ꒱ ׁ. ᘏ 𝗦𝗢𝗖𝗜𝗔𝗟 ׅ 𝆬 ָ֢ ෆ
🌳 ➛.spotify nombre → Musica
🌳 ➛.tiktok link → Video
🌳 ➛.tiktoksearch txt → Buscar
🌳 ➛.ig link → Instagram
🌳 ➛.fb link → Facebook
🌳 ➛.mediafire link → Archivo

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *POWERED BY KAME HOUSE* 🏠
━━━━━━━━━━━`, m)

    await m.react('⏳')
    const keyEvo = Buffer.from('ZWt1c2Fz', 'base64').toString('utf-8').split('').reverse().join('')
    const keySasuke = Buffer.from('c2FzdWtl', 'base64').toString('utf-8')

    try {
        // ===== PLAY / PLAY2 YOUTUBE BUSQUEDA =====
        if (/^(play|play2)$/i.test(command)) {
            let res = await yts(text)
            let vid = res.videos[0]
            if (!vid) throw 'YT_NOT_FOUND'

            await m.react('🔍')
            await m.react('⏳')

            let isVideo = command === 'play2'
            let apiUrl = isVideo
         ? `https://api.evogb.org/dl/ytmp4?url=${encodeURIComponent(vid.url)}&quality=720&key=${keySasuke}`
                : `https://api.evogb.org/dl/ytmp3?url=${encodeURIComponent(vid.url)}&key=${keySasuke}`

            let json = await (await fetch(apiUrl)).json()
            if (!json.status) throw 'YT_DL_ERROR'

            let cap = `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🌳꒷

 ⤷ ┇ 𝗬𝗢𝗨𝗧𝗨𝗕𝗘 ${isVideo? 'VIDEO' : 'AUDIO'} ：✿ 。
꒰ ◞⁺⊹ ．Extrayendo energia •

  ꒱ ׁ. ᘏ 𝗗𝗘𝗧𝗔𝗟𝗟𝗘𝗦 ׅ 𝆬 ָ֢ ෆ
🌳 ➛ Titulo: ${vid.title}
🌳 ➛ Duracion: ${vid.timestamp}
🌳 ➛ Autor: ${vid.author.name}
🌳 ➛ Vistas: ${vid.views.toLocaleString()}
🌳 ➛ Formato: ${isVideo? 'MP4 720p' : 'MP3 320kbps'}

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *Enviando con el poder de Shenlon* 💥
━━━━━━━━━━━`

            await conn.sendMessage(m.chat, { image: { url: 'https://files.evogb.win/INtgbw.jpg' }, caption: cap }, { quoted: m })
            await conn.sendMessage(m.chat, {
                [isVideo? 'video' : 'audio']: { url: json.data.dl },
                mimetype: isVideo? 'video/mp4' : 'audio/mpeg',
                fileName: `${vid.title}.${isVideo? 'mp4' : 'mp3'}`
            }, { quoted: m })
            return await m.react('✅')
        }

        // ===== YTMP3 / YTMP4 DIRECTO =====
        if (/^(ytmp3|ytmp4)$/i.test(command)) {
            let res = await yts(text)
            let vid = res.videos[0]
            if (!vid) throw 'YT_NOT_FOUND'

            await m.react('⏳')

            let isVideo = command === 'ytmp4'
            let apiUrl = isVideo
          ? `https://api.evogb.org/dl/ytmp4?url=${encodeURIComponent(vid.url)}&quality=720&key=${keySasuke}`
                : `https://api.evogb.org/dl/ytmp3?url=${encodeURIComponent(vid.url)}&key=${keySasuke}`

            let json = await (await fetch(apiUrl)).json()
            if (!json.status) throw 'YT_DL_ERROR'

            let cap = `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🌳꒷

 ⤷ ┇ 𝗬𝗧 ${isVideo? 'VIDEO' : 'AUDIO'} 𝗗𝗜𝗥𝗘𝗖𝗧𝗢 ：✿ 。

  ꒱ ׁ. ᘏ 𝗗𝗘𝗧𝗔𝗟𝗘𝗦 ׅ 𝆬 ָ֢ ෆ
🌳 ➛ Titulo: ${vid.title}
🌳 ➛ Formato: ${isVideo? 'MP4 720p' : 'MP3'}
🌳 ➛ Duracion: ${vid.timestamp}
🌳 ➛ Vistas: ${vid.views.toLocaleString()}

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *Descarga iniciada* ⚡
━━━━━━━━━━━`

            await conn.sendMessage(m.chat, { image: { url: 'https://files.evogb.win/INtgbw.jpg' }, caption: cap }, { quoted: m })
            await conn.sendMessage(m.chat, {
                [isVideo? 'video' : 'audio']: { url: json.data.dl },
                mimetype: isVideo? 'video/mp4' : 'audio/mpeg',
                fileName: `${vid.title}.${isVideo? 'mp4' : 'mp3'}`
            }, { quoted: m })
            return await m.react('✅')
        }

        // ===== SPOTIFY =====
        if (/^(spotify)$/i.test(command)) {
            let searchRes = await fetch(`https://api.evogb.org/search/spotify?query=${encodeURIComponent(text)}&key=${keySasuke}`)
            let searchData = await searchRes.json()
            if (!searchData.status ||!searchData.result[0]) throw 'SP_NOT_FOUND'

            await m.react('🔍')
            await m.react('⏳')

            let song = searchData.result[0]
            let dlRes = await fetch(`https://api.evogb.org/dl/spotify?url=${encodeURIComponent(song.link)}&key=${keySasuke}`)
            let dlData = await dlRes.json()
            if (!dlData.status) throw 'SP_DL_ERROR'

            let cap = `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.💭꒷

 ⤷ ┇ 𝗦𝗣𝗢𝗧𝗜𝗙𝗬 ：✿ 。

  ꒱ ׁ. ᘏ 𝗗𝗘𝗧𝗔𝗟𝗟𝗘𝗦 ׅ 𝆬 ָ֢ ෆ
💭 ➛ Titulo: ${dlData.data.name}
💭 ➛ Artista: ${dlData.data.artist}
💭 ➛ Album: ${dlData.data.album}
💭 ➛ Duracion: ${dlData.data.duration}
💭 ➛ Año: ${dlData.data.year}

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *Musica procesada* 🎵
━━━━━━━━━━━`

            await conn.sendMessage(m.chat, { image: { url: 'https://files.evogb.win/INtgbw.jpg' }, caption: cap }, { quoted: m })
            await conn.sendMessage(m.chat, { audio: { url: dlData.data.url }, mimetype: 'audio/mpeg', fileName: `${dlData.data.name}.mp3` }, { quoted: m })
            return await m.react('✅')
        }

        // ===== TIKTOK =====
        if (/^(tiktok|tiktoksearch)$/i.test(command)) {
            if (command === 'tiktoksearch') {
                let res = await (await fetch(`https://api.evogb.org/search/tiktok?query=${text}&key=${keySasuke}`)).json()
                let video = res.data[0]
                if (!video) throw 'TT_NOT_FOUND'

                let caption = `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🌳꒷

 ⤷ ┇ 𝗧𝗜𝗞𝗧𝗢𝗞 𝗦𝗘𝗔𝗥𝗖𝗛 ：✿ 。

  ꒱ ׁ. ᘏ 𝗗𝗘𝗧𝗔𝗟𝗟𝗘𝗦 ׅ 𝆬 ָ֢ ෆ
🌳 ➛ Titulo: ${video.title}
🌳 ➛ Autor: ${video.author.nickname}
🌳 ➛ Vistas: ${video.play_count.toLocaleString()}
🌳 ➛ Likes: ${video.digg_count.toLocaleString()}

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *Video encontrado* 📱
━━━━━━━━━━━`
                await conn.sendFile(m.chat, video.dl, 'tiktok.mp4', caption, m)
            } else {
                let res = await (await fetch(`https://api.evogb.org/dl/tiktok?url=${text}&key=${keySasuke}`)).json()
                let data = res.data
                if (!data) throw 'TT_DL_ERROR'

                let caption = `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🌳꒷

 ⤷ ┇ 𝗧𝗜𝗞𝗧𝗢𝗞 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗 ：✿ 。

  ꒱ ׁ. ᘏ 𝗗𝗘𝗧𝗔𝗟𝗘𝗦 ׅ 𝆬 ָ֢ ෆ
🌳 ➛ Titulo: ${data.title}
🌳 ➛ Autor: ${data.author.nickname}

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *Descarga completa* ✅
━━━━━━━━━━━`
                await conn.sendFile(m.chat, Array.isArray(data.dl)? data.dl[0] : data.dl, 'tiktok.mp4', caption, m)
            }
            return await m.react('✅')
        }

        // ===== INSTAGRAM =====
        if (/^(ig|instagram)$/i.test(command)) {
            const { data } = await axios.get(`https://api.evogb.org/dl/instagram?url=${encodeURIComponent(text)}&key=${keyEvo}`)
            if (!data.status) throw 'IG_ERROR'
            let media = data.data[0]
            let type = media.type === 'video'? 'VIDEO' : 'IMAGEN'

            let cap = `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🌳꒷

 ⤷ ┇ 𝗜𝗡𝗦𝗧𝗔𝗚𝗥𝗔𝗠 ：✿ 。

  ꒱ ׁ. ᘏ 𝗗𝗘𝗧𝗔𝗟𝗘𝗦 ׅ 𝆬 ָ֢ ෆ
🌳 ➛ Tipo: ${type}
🌳 ➛ Estado: Enviando

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *Contenido capturado* 📸
━━━━━━━━━━━`

            await conn.sendMessage(m.chat, {
                [media.type === 'video'? 'video' : 'image']: { url: media.url },
                mimetype: media.type === 'video'? 'video/mp4' : 'image/jpeg',
                caption: cap
            }, { quoted: m })
            return await m.react('✅')
        }

        // ===== FACEBOOK =====
        if (/^(fb|facebook)$/i.test(command)) {
            const { data } = await axios.get(`https://api.evogb.org/dl/facebook?url=${encodeURIComponent(text)}&key=${keyEvo}`)
            if (!data.status) throw 'FB_ERROR'
            let video = data.resultados[0]

            let cap = `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🌳꒷

 ⤷ ┇ 𝗙𝗔𝗖𝗘𝗕𝗢𝗞 ：✿ 。

  ꒱ ׁ. ᘏ 𝗗𝗘𝗧𝗔𝗟𝗘𝗦 ׅ 𝆬 ָ֢ ෆ
🌳 ➛ Calidad: ${video.calidad || 'HD'}
🌳 ➛ Estado: Enviando

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *Video extraido* 📘
━━━━━━━━━━━`

            await conn.sendMessage(m.chat, {
                video: { url: video.url },
                mimetype: 'video/mp4',
                caption: cap
            }, { quoted: m })
            return await m.react('✅')
        }

        // ===== MEDIAFIRE =====
        if (/^(mediafire|mf|mediafiredl)$/i.test(command)) {
            let response = await fetch(`https://api.evogb.org/dl/mediafire?url=${encodeURIComponent(text)}&key=${keySasuke}`)
            let result = await response.json()
            if (!result.status ||!result.data) throw 'MF_ERROR'

            let { name, size, date, dl } = result.data
            let caption = `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🌳꒷

 ⤷ ┇ 𝗠𝗘𝗗𝗜𝗔𝗙𝗜𝗥𝗘 ：✿ 。

  ꒱ ׁ. ᘏ 𝗗𝗘𝗧𝗔𝗟𝗘𝗦 ׅ 𝆬 ָ֢ ෆ
🌳 ➛ Nombre: ${name}
🌳 ➛ Tamaño: ${size}
🌳 ➛ Fecha: ${date}

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *Archivo extraido* 📦
━━━━━━━━━━━`

            await conn.sendFile(m.chat, dl, name, caption, m)
            return await m.react('✅')
        }

    } catch (e) {
        console.error(e)
        await m.react('❌')
        let msgs = {
            YT_NOT_FOUND: 'NO SE ENCONTRO EL VIDEO',
            YT_DL_ERROR: 'ERROR EN YOUTUBE',
            SP_NOT_FOUND: `NO HAY RESULTADOS: ${text}`,
            SP_DL_ERROR: 'ERROR EN SPOTIFY',
            TT_NOT_FOUND: 'NO HAY RESULTADOS TT',
            TT_DL_ERROR: 'ERROR EN TIKTOK',
            IG_ERROR: 'ERROR EN INSTAGRAM',
            FB_ERROR: 'ERROR EN FACEBOOK',
            MF_ERROR: 'ARCHIVO NO ENCONTRADO'
        }
        m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚠️꒷

 ⤷ ┇ 𝗘𝗥𝗢𝗥 𝗗𝗘 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 ：✿ 。

──愛 *FALLA DETECTADA* ╏ ❄️
⚠️ ➛ Detalle: ${msgs[e] || 'ERROR INESPERADO'}
⚠️ ➛ Accion: Verificar enlace

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`)
    }
}

handler.help = ['play', 'play2', 'ytmp3', 'ytmp4', 'spotify', 'tiktok', 'tiktoksearch', 'ig', 'fb', 'mediafire']
handler.tags = ['downloader']
handler.command = /^(play|play2|ytmp3|ytmp4|spotify|tiktok|tiktoksearch|ig|instagram|fb|facebook|mediafire|mf|mediafiredl)$/i

export default handler