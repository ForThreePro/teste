let handler = async (m, { conn, command }) => {
  let users = m.mentionedJid || []
  if(!users.length && m.quoted) users.push(m.quoted.sender)
  if(!users.length && m.text) {
    let match = m.text.match(/@(\d+)/g)
    if(match) users = match.map(v => v.replace('@','') + '@s.whatsapp.net')
  }

  let who = users[0]
  let yo = m.sender

  if (!who) return m.reply(`💕 *Uso:*.love @usuario\n*Etiqueta a la persona que quieres medir* 🥺`)
  if (who === yo) return m.reply(`🌸 *A ti mismo te amas mucho, pero mejor mide con alguien más*`)

  let porcentaje = Math.floor(Math.random() * 101);

  // FORZAMOS A QUE CARGUE LOS NOMBRES
  let [nameYo, nameWho] = await Promise.all([
    conn.getName(yo),
    conn.getName(who)
  ])
  
  // Si no hay nombre, usamos el pushName o el numero
  nameYo = nameYo || yo.split('@')[0]
  nameWho = nameWho || who.split('@')[0].replace(/[^0-9]/g, '')

  if(command == 'love' || command == 'amor' || command == 'compatibilidad'){
    let frase = porcentaje < 30? '🌸 *NOS CUIDAMOS COMO AMIGOS*' : porcentaje < 60? '💌 *HAY ALGO BONITO ENTRE USTEDES*' : porcentaje < 85? '🤍 *SE HACEN MUCHO BIEN JUNTOS*' : '💍 *ESTÁN HECHOS EL UNO PARA EL OTRO*'
    let detallito = porcentaje < 30? 'A veces el mejor amor es el de amigos 💫' : porcentaje < 60? 'Denle tiempo... las cosas bonitas florecen lento 🥺' : porcentaje < 85? 'Se nota que se quieren mucho. Cuídense 🤍' : 'Prométanse ser felices juntos siempre ✨'

    // CLAVE: Ponemos @ + numero limpio y pasamos mentionedJid
    let txt = `ᯇ 💕 𝗖𝗨𝗣𝗜𝗗𝗢 𝗕𝗢𝗧 💕 ୧

꒰ ◞⁺⊹ ．@${yo.split('@')[0]} y @${who.split('@')[0].replace(/[^0-9]/g, '')}

*Compatibilidad:* *${porcentaje}%* 💘
*${nameYo}* y *${nameWho}*

${frase}

──愛 *𝗠𝗘𝗡𝗦𝗔𝗝𝗜𝗧𝗢* ╏ 🕊️
"${detallito}"

> *Que el amor los encuentre bonito* 🌙`

    await conn.sendMessage(m.chat, {
      text: txt,
      mentions: [yo, who] // ESTO OBLIGA A WHATSAPP A PINTAR LOS @
    }, { quoted: m })
  }
}

handler.help = ['love *@usuario*']
handler.tags = ['love']
handler.command = /^(love|amor|compatibilidad)$/i
handler.group = true
export default handler