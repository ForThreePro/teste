let handler = async (m, { conn, command, text }) => {
  // 1. Buscar a quien medir
  let who = m.mentionedJid[0] || m.quoted?.sender
  if (!who && text) {
    let match = text.match(/@(\d+)/)
    if (match) who = match[1] + '@s.whatsapp.net'
  }

  let yo = m.sender
  if (!who) return m.reply(`💕 *Uso:*.compatibilidad @usuario\n*Ejemplo:*.compatibilidad @Romi2 🥺`)
  if (who === yo) return m.reply(`🌸 *Contigo mismo tienes 10/10 de amor propio*`)

  // 2. Generar del 1 al 10
  let compatibilidad = Math.floor(Math.random() * 10) + 1;
  let corazones = '❤️'.repeat(compatibilidad) + '🖤'.repeat(10 - compatibilidad)

  // 3. Frases según el puntaje
  let estado, consejo
  if(compatibilidad <= 3){
    estado = '🌧️ *BAJA COMPATIBILIDAD*'
    consejo = 'Mejor como amigos. No se fuercen 🥺'
  } else if(compatibilidad <= 6){
    estado = '⛅ *COMPATIBILIDAD MEDIA*'
    consejo = 'Hay química, pero necesitan hablar más 💬'
  } else if(compatibilidad <= 9){
    estado = '☀️ *ALTA COMPATIBILIDAD*'
    consejo = 'Se ven muy bien juntos. Denle una oportunidad 🤍'
  } else {
    estado = '🔥 *ALMAS GEMELAS*'
    consejo = 'Están hechos el uno para el otro. No lo suelten 💍'
  }

  // 4. Sacar nombres
  let nameYo = await conn.getName(yo) || 'Tú'
  let nameWho = await conn.getName(who) || 'Desconocido'
  let numYo = yo.split('@')[0]
  let numWho = who.split('@')[0].replace(/[^0-9]/g, '')

  // 5. Mensaje final
  let txt = `ᯇ 💘 𝗖𝗢𝗠𝗣𝗔𝗧𝗜𝗕𝗜𝗟𝗜𝗗𝗔𝗗 𝗕𝗢𝗧 💘 ୧

꒰ ◞⁺⊹ ．@${numYo} y @${numWho}

*${nameYo}* + *${nameWho}*

*Puntaje:* *${compatibilidad}/10*
${corazones}

${estado}

──愛 *𝗖𝗢𝗡𝗦𝗘𝗝𝗢 𝗗𝗘𝗟 𝗖𝗨𝗣𝗜𝗗𝗢* ╏ 🕊️
"${consejo}"

> *El destino está en sus manos* ✨`

  await conn.sendMessage(m.chat, {
    text: txt,
    mentions: [yo, who] // ESTO HACE QUE LOS @ SE PINTEN
  }, { quoted: m })
}

handler.help = ['compatibilidad *@usuario*']
handler.tags = ['love']
handler.command = /^(compatibilidad|love10|love1-10)$/i
handler.group = true
export default handler