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

  if(command == 'love' || command == 'amor' || command == 'compatibilidad'){
    let frase = porcentaje < 30? '🌸 *NOS CUIDAMOS COMO AMIGOS*' : porcentaje < 60? '💌 *HAY ALGO BONITO ENTRE USTEDES*' : porcentaje < 85? '🤍 *SE HACEN MUCHO BIEN JUNTOS*' : '💍 *ESTÁN HECHOS EL UNO PARA EL OTRO*'
    let detallito = porcentaje < 30? 'A veces el mejor amor es el de amigos 💫' : porcentaje < 60? 'Denle tiempo... las cosas bonitas florecen lento 🥺' : porcentaje < 85? 'Se nota que se quieren mucho. Cuídense 🤍' : 'Prométanse ser felices juntos siempre ✨'

    // TRUCO: Intentamos sacar el nombre, si no hay usamos el numero
    let nameYo = await conn.getName(yo) || yo.split('@')[0]
    let nameWho = await conn.getName(who) || who.split('@')[0].replace(/[^0-9]/g, '')

    let jidYo = yo.split('@')[0].replace(/[^0-9]/g, '')
    let jidWho = who.split('@')[0].replace(/[^0-9]/g, '')

    let txt = `ᯇ 💕 𝗖𝗨𝗣𝗜𝗗𝗢 𝗕𝗢𝗧 💕 ୧

꒰ ◞⁺⊹ ．@${jidYo} y @${jidWho}

*Compatibilidad:* *${porcentaje}%* 💘

${frase}

──愛 *𝗠𝗘𝗡𝗦𝗔𝗝𝗜𝗧𝗢* ╏ 🕊️
"${detallito}"

> *Que el amor los encuentre bonito* 🌙`

    await conn.sendMessage(m.chat, {
      text: txt,
      mentions: [yo, who]
    }, { quoted: m })
  }
}

handler.help = ['love *@usuario*']
handler.tags = ['love']
handler.command = /^(love|amor|compatibilidad)$/i
handler.group = true
export default handler