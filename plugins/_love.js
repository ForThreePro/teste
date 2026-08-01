let handler = async (m, { conn, command }) => {
  let who = m.mentionedJid[0] || m.quoted?.sender
  if (!who && m.text) {
    let match = m.text.match(/@(\d+)/)
    if (match) who = match[1] + '@s.whatsapp.net'
  }

  if (!who) return m.reply(`💕 *Uso:*.love @usuario\n*Etiqueta a la persona que quieres medir* 🥺`)
  let yo = m.sender
  if (who === yo) return m.reply(`🌸 *A ti mismo te amas mucho, pero mejor mide con alguien más*`)

  // TRUCO: Mandamos un "ping" para que WhatsApp cargue el contacto
  await conn.sendPresenceUpdate('composing', m.chat)
  await new Promise(r => setTimeout(r, 500))

  let nameYo = await conn.getName(yo)
  let nameUser = await conn.getName(who)

  // Si aún no tiene nombre, usa el número bonito
  if(!nameYo) nameYo = yo.split('@')[0]
  if(!nameUser) nameUser = who.split('@')[0]

  let porcentaje = Math.floor(Math.random() * 101);

  if(command == 'love' || command == 'amor' || command == 'compatibilidad'){
    let frase = porcentaje < 30? '🌸 *NOS CUIDAMOS COMO AMIGOS*' : porcentaje < 60? '💌 *HAY ALGO BONITO ENTRE USTEDES*' : porcentaje < 85? '🤍 *SE HACEN MUCHO BIEN JUNTOS*' : '💍 *ESTÁN HECHOS EL UNO PARA EL OTRO*'
    let detallito = porcentaje < 30? 'A veces el mejor amor es el de amigos 💫' : porcentaje < 60? 'Denle tiempo... las cosas bonitas florecen lento 🥺' : porcentaje < 85? 'Se nota que se quieren mucho. Cuídense 🤍' : 'Prométanse ser felices juntos siempre ✨'

    await conn.sendMessage(m.chat, {
      text: `ᯇ 💕 𝗖𝗨𝗣𝗜𝗗𝗢 𝗕𝗢𝗧 💕 ୧

꒰ ◞⁺⊹ ．*${nameYo}* y *${nameUser}*

*Compatibilidad:* *${porcentaje}%* 💘

${frase}

──愛 *𝗠𝗘𝗡𝗦𝗔𝗝𝗜𝗧𝗢* ╏ 🕊️
"${detallito}"

> *Que el amor los encuentre bonito* 🌙`,
      mentions: [yo, who]
    }, {quoted: m})
  }
}

handler.help = ['love *@usuario*']
handler.tags = ['love']
handler.command = /^(love|amor|compatibilidad)$/i
handler.group = true
export default handler