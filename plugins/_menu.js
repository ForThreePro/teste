import moment from 'moment-timezone'
import os from 'os'
moment.locale('es') // fecha en español

const CATEGORY_META = {
config: 'CONFIG', main: 'MAIN', tools: 'TOOLS', owner: 'OWNER',
sorteos: 'SORTEOS', fun: 'FUN', joda: 'JODA', ff: 'FF',
buscadores: 'SEARCH', descargas: 'DOWNLOADER', grupo: 'GRUPOS',
group: 'GRUPO', gacha: 'GROUP', ia: 'IA', info: 'INFO', sticker: 'STICKER',
}

// EMOJI FIJO POR CATEGORIA - AGREGA AQUI LAS NUEVAS
const ICONOS_CATEGORIA = {
config: '⚙️', owner: '☕', fun: '🎋', ff: '🍃', buscadores: '🔎',
descargas: '🌷', grupo: '🍒', grupos: '🍒', gacha: '👥', ia: '💭',
info: '☁️', sticker: '🎐', main: '🌸', tools: '🧩', sorteos: '🎁', joda: '😂',
rpg: '💸', anime: '🍥', game: '🪩', nsfw: '🦑', canvas: '🫟',
effects: '🌪️', frases: '🍯', reg: '🪸', shop: '🪎', socket: '🪷',
image: '🌳', internet: '📡', onoff: '⚙️', dzm: '🎨'
}

let handler = async (m, { conn }) => {
try {
await conn.sendMessage(m.chat, { react: { text: '🐉', key: m.key } })

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

// INICIO
let menuTexto = `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

⤷ ┇ 𝐕𝐄𝐑𝐒𝐈𝐎𝐍 ﹒ 3.0 DBZ ：✿ 。
꒰ ◞⁺⊹ ．estado: *EN LINEA* • ${horas}h ${minutos}m

  ꒱ ׁ. ᘏ 𝗨𝗦𝗨𝗔𝗥𝗜𝗢 𝗔𝗖𝗧𝗜𝗩𝗢 ׅ 𝆬 ָ֢ ෆ
🦦 ࣪ ꕀ @${userName}. ˚. ᵎᵎ
> *Bienvenido al sistema Saiyan*

──愛 *INFORMACION DEL BOT* ╏ 💥
*Usuarios*: ${totalUsers} | *Comandos*: ${pluginsCount}
*Owner*: @whois.yallico
*Numero*: +51 927 174 369

 ׅ 埃斯 : 𝖲𝖨𝖲𝖳𝖤𝖬𝖠 ﹙ 🌑 ﹚
> ﹒ RAM: ${ram}mb / ${totalram}gb
      ᶻz　*${fecha}* ─ ${fecha2} ─ ${hora}　⋌

© ❛ *ping*. ${Math.round(performance.now())}ms
名 ─ *modo:* public﹔

> ❍ 𝖴𝗌𝖺. 𝖺𝗇𝗍𝖾𝗌 𝖽𝖾 𝖼𝖺𝖽𝖺 𝖼𝗈𝗆𝖺𝗇𝖽𝗈 𝗉𝖺𝗋𝖺 𝖺𝖼𝗍𝗂𝗏𝖺𝗋𝗅𝗈

`

const tagsOrdenados = Object.keys(byTag).sort((a, b) => {
  const aIn = CATEGORY_META[a]? 0 : 1
  const bIn = CATEGORY_META[b]? 0 : 1
  return aIn - bIn
})

for (const tag of tagsOrdenados) {
  const set = byTag[tag]
  if (!set || set.size === 0) continue
  const cmds = [...set].sort()

  // SIEMPRE DICE PREM EN EL TITULO
  const icono = ICONOS_CATEGORIA[tag] || '📁'

  menuTexto += `.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.${icono}꒷\n`
  for (const c of cmds) {
    menuTexto += ` ${icono} ➛.${c}\n`
  }
  menuTexto += ` ㅤ└──.✦ ── ⊰ ̟!!.✦. ˙\n\n`
}

// FINAL
menuTexto += `━━━━━━━━━━━
🐉 *SON GOKU PREM BOT* 🐉
*Owner*: @whois.yallico
*Contacto*: +51 927 174 369
*Version*: 3.0 DBZ
*Power*: Nivel Dios

> "No subestimes mi poder... o serás polvo" ⚡
━━━━━━━━━━━`

await conn.sendMessage(m.chat, {
  image: { url: IMG_MENU },
  caption: menuTexto.trim(),
  mentions: [m.sender]
}, { quoted: m })

} catch (e) {
await conn.sendMessage(m.chat, { text: `*❌ ERROR DE SISTEMA*: ${e.message}` }, { quoted: m })
}
}

handler.help = ['menu']
handler.tags = ['info']
handler.command = ['menu', 'help', 'menudbz']

export default handler
