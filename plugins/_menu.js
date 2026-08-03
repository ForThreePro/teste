import moment from 'moment-timezone'
import os from 'os'
moment.locale('es') // fecha en español

const CATEGORY_META = {
config: 'CONFIG',
main: 'MAIN',
tools: 'TOOLS',
owner: 'OWNER',
sorteos: 'SORTEOS',
fun: 'FUN',
joda: 'JODA',
ff: 'FF',
buscadores: 'SEARCH',
descargas: 'DOWNLOADER',
grupo: 'GRUPOS',
group: 'GRUPO',
gacha: 'GROUP',
ia: 'IA',
info: 'INFO',
sticker: 'STICKER',
}

// Iconos aesthetic por categoria. Si no existe usa uno random
const ICONOS_CATEGORIA = {
config: '⚙️', owner: '☕', fun: '🎋', ff: '🍃', buscadores: '🔎',
descargas: '🌷', grupo: '🍒', grupos: '🍒', gacha: '👥', ia: '💭',
info: '☁️', sticker: '🎐', main: '🌸', tools: '🧩', sorteos: '🎁', joda: '😂'
}

let handler = async (m, { conn }) => {
try {
await conn.sendMessage(m.chat, { react: { text: '⚡', key: m.key } })

const fecha = moment.tz('America/Lima').format('dddd')
const fecha2 = moment.tz('America/Lima').format('DD [de] MMMM [de] YYYY')
const hora = moment.tz('America/Lima').format('hh:mm:ss a')
const uptime = process.uptime()
const horas = Math.floor(uptime / 3600)
const minutos = Math.floor((uptime % 3600) / 60)
const segundos = Math.floor(uptime % 60)
const ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
const totalram = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2)
const pluginsCount = Object.values(global.plugins || {}).filter(p =>!p?.disabled).length
const totalUsers = Object.keys(global.db.data.users || {}).length

// DETECTA TODAS LAS CATEGORIAS AUTOMATICO
const byTag = {}
for (const plugin of Object.values(global.plugins || {})) {
  if (plugin.disabled) continue
  const tags = Array.isArray(plugin.tags)? plugin.tags : (plugin.tags? [plugin.tags] : [])
  const helps = Array.isArray(plugin.help)? plugin.help : (plugin.help? [plugin.help] : [])
  for (const tag of tags) {
    const t = tag.toLowerCase()
    if (!byTag[t]) byTag[t] = new Set()
    for (const h of helps) if (typeof h === 'string' && h.trim()) byTag[t].add(h.trim())
  }
}

const userName = m.pushName || 'Usuario'
const IMG_MENU = 'https://files.evogb.win/INtgbw.jpg'

let menuTexto = `ᯇ 𝗕𝗜𝗘𝗡𝗩𝗘𝗡𝗜𝗗𝗢 : ୧

 ⤷ ┇ version ﹒ 3.0 DBZ ：✿ 。
꒰ ◞⁺⊹ ．online public •

 ꒱ ׁ. ᘏ 𝘂𝘀𝘂𝗮𝗿𝗶𝗼 ׅ 𝆬 ָ֢ ෆ
🦦 ࣪ ꕀ @${userName}. ˚. ᵎᵎ
> Este es el menu de *SON GOKU PREM* (𝐏𝐫𝐞𝐦-𝐁𝐨𝐭)

──愛 *SYSTEM* ╏ 💀
*ONLINE*: ${horas}h ${minutos}m ${segundos}s

 ׅ 埃斯 : 𝖨𝗇𝖿𝗈 ﹙ 🌑 ﹚
> ﹒ @owner ─ creador
      ᶻz　*${totalUsers}* users　⋌

© ❛ *system*. android
名 ─ *ram:* ${ram}mb / ${totalram}gb﹔
𖡎 ָ֢ ‍ँ 𝆬 ׅ ׁ ꕀ ׁ ׅ.

> ❍ 𝖣𝗂𝗌𝖿𝗋𝗎𝗍𝖺 𝖽𝖾 𝗅𝗈𝗌 𝖼𝗈𝗆𝖺𝗇𝖽𝗈𝗌 𝗊𝗎𝖾 𝖾𝗅 𝖻𝗈𝗍 𝗈𝖿𝗋𝖾𝖼𝖾 𝗉𝖺𝗋𝖺 𝗍𝗂

`

// Ordena: primero las que están en CATEGORY_META, luego las nuevas
const tagsOrdenados = Object.keys(byTag).sort((a, b) => {
  const aIn = CATEGORY_META[a]? 0 : 1
  const bIn = CATEGORY_META[b]? 0 : 1
  return aIn - bIn
})

for (const tag of tagsOrdenados) {
  const set = byTag[tag]
  if (!set || set.size === 0) continue
  const cmds = [...set].sort()

  const nombreCat = CATEGORY_META[tag] || tag.toUpperCase()
  const icono = ICONOS_CATEGORIA[tag] || '🌟'

  menuTexto += `.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.${icono}꒷\n`
  for (const c of cmds) {
    menuTexto += ` ${icono} ➛.${c}\n`
  }
  menuTexto += ` ㅤ└──.✦ ── ⊰ ̟!!.✦. ˙\n\n`
}

menuTexto += `*━━━━━━━━━━━━━━*
*BOT*: SON GOKU PREM
*CREADOR*: Whois Yallico
*VERSION*: 3.0 DBZ
*FECHA*: ${fecha}, ${fecha2} | ${hora}

> "Conectado al sistema. Domina o muere"
*━━━━━━━━━━━━━━*`

await conn.sendMessage(m.chat, {
  image: { url: IMG_MENU },
  caption: menuTexto.trim(),
  mentions: [m.sender]
}, { quoted: m })

} catch (e) {
await conn.sendMessage(m.chat, { text: `*❌ SYSTEM ERROR*: ${e.message}` }, { quoted: m })
}
}

handler.help = ['menu']
handler.tags = ['info']
handler.command = ['menu', 'help', 'menudbz']

export default handler