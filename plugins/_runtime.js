let handler = async (m, { conn }) => {
    let uptime = clockString(process.uptime() * 1000)
    let power = Math.floor(Math.random() * 9000) + 1000
    
    let txt = `╭─🐉─❒ *『 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 』* ❒─🐉─╮
│ ⚡ *¡RUNTIME SAIYAJIN!* ⚡
│
│ *Tiempo activo:* *${uptime}*
│ *Nivel de poder:* *${power.toLocaleString()}* 📈
│ *Estado:* *¡Entrenando en la habitación del tiempo!* 💪
│ *Fecha:* *${new Date().toLocaleString('es-PE')}*
│
│ > *¡KA-ME-HA-ME-HAAAA!* 🟦
╰─────────────────────────🐉`

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