let handler = async (m, { conn }) => {
    let uptime = clockString(process.uptime() * 1000)
    let power = Math.floor(Math.random() * 9000) + 1000
    let fecha = new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })

    let txt = `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚡꒷

 ⤷ ┇ 𝗥𝗨𝗡𝗧𝗜𝗠𝗘 𝗦𝗔𝗜𝗬𝗔𝗝𝗜𝗡 ：✿ 。
꒰ ◞⁺⊹ ．Sistema Activo •

  ꒱ ׁ. ᘏ 𝗘𝗦𝗧𝗔𝗗𝗢𝗦 ׅ 𝆬 ָ֢ ෆ
⚡ ➛ Tiempo activo: *${uptime}*
⚡ ➛ Nivel de poder: *${power.toLocaleString()}* 📈
⚡ ➛ Estado: *¡Entrenando en la habitación del tiempo!* 💪
⚡ ➛ Fecha: *${fecha}*

──愛 *BARRA DE KI* ╏ 🔥
⚡ ➛ [${'█'.repeat(Math.floor(power/1000))}${'░'.repeat(9 - Math.floor(power/1000))}] ${power.toLocaleString()}

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *"¡KA-ME-HA-ME-HAAAA!"* 🟦
━━━━━━━━━━━`

    await conn.reply(m.chat, txt, m)
}
handler.help = ['runtime', 'uptime', 'tiempo']
handler.tags = ['info']
handler.command = /^(runtime|uptime|tiempo)$/i
handler.group = true

export default handler

function clockString(ms) {
    let d = Math.floor(ms / 86400000)
    let h = Math.floor(ms / 3600000) % 24
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return [
        d ? d + 'd' : '',
        h ? h + 'h' : '',
        m ? m + 'm' : '',
        s ? s + 's' : ''
    ].filter(v => v).join(' ')
}