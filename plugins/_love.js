let handler = async (m, { conn, command }) => {
  // 1. Primero busca menciones
  let users = m.mentionedJid || []

  // 2. Si no hay, busca si respondió a alguien
  if(!users.length && m.quoted) users.push(m.quoted.sender)

  // 3. Si no hay, busca en el texto @123456
  if(!users.length && m.text) {
    let match = m.text.match(/@(\d+)/g)
    if(match) users = match.map(v => v.replace('@','') + '@s.whatsapp.net')
  }

  let who = users[0] // agarramos el primero que menciono
  let yo = m.sender

  if (!who) return m.reply(`💕 *Uso:*.love @usuario\n*Etiqueta a la persona que quieres medir* 🥺`)
  if (who === yo) return m.reply(`🌸 *A ti mismo te amas mucho, pero mejor mide con alguien más*`)

  let porcentaje = Math.floor(Math.random() * 101);

  if(command == 'love' || command == 'amor' || command == 'compatibilidad'){
    let frase = porcentaje < 30? '🌸 *NOS CUIDAMOS COMO AMIGOS*' : porcentaje < 60? '💌 *HAY ALGO BONITO ENTRE USTEDES*' : porcentaje < 85? '🤍 *SE HACEN MUCHO BIEN JUNTOS*' : '💍 *ESTÁN HECHOS EL UNO PARA EL OTRO*'
    let detallito = porcentaje < 30? 'A veces el mejor amor es el de amigos 💫' : porcentaje < 60? 'Denle tiempo... las cosas bonitas florecen lento 🥺' : porcentaje < 85? 'Se nota que se quieren mucho. Cuídense 🤍' : 'Prométanse ser felices juntos siempre ✨'

    let jidYo = yo.split('@')[0]
    let jidWho = who.split('@')[0]

    let txt = `ᯇ 💕 𝗖𝗨𝗣𝗜𝗗𝗢 𝗕𝗢𝗧 💕 ୧

꒰ ◞⁺⊹ ．@${jidYo} y @${jidWho}

*Compatibilidad:* *${porcentaje}%* 💘

${frase}

──愛 *𝗠𝗘𝗡𝗦𝗔𝗝𝗜𝗧𝗢* ╏ 🕊️
"${detallito}"

> *Que el amor los encuentre bonito* 🌙`

    await conn.sendMessage(m.chat, {
      text: txt,
      mentions: [yo, who] // <- aquí pasamos los 2 para que los pinte
    }, { quoted: m })
  }
}

handler.help = ['love *@usuario*']
handler.tags = ['love']
handler.command = /^(love|amor|compatibilidad)$/i
handler.group = true
export default handler