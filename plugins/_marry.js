import fetch from 'node-fetch'

let handler = async (m, { conn, command, text }) => {
  let yo = m.sender
  let who = m.quoted?.sender || m.mentionedJid[0]

  if(!global.db.data.casados) global.db.data.casados = {}
  let casados = global.db.data.casados

  // BUSCAR POR NOMBRE si no hay mention
  if(!who && text) {
    let nombreBuscado = text.replace(command, '').replace('@','').trim().toLowerCase()
    let group = await conn.groupMetadata(m.chat)
    let participante = group.participants.find(p => {
      let nombre = conn.getName(p.id) || p.id.split('@')[0]
      return nombre.toLowerCase().includes(nombreBuscado)
    })
    if(participante) who = participante.id
  }

  if(command == 'casar' || command == 'matrimonio'){
    if(!who) return m.reply(`💍 *Úsame así:* Responde a su mensaje con *.casar*\n*O*.casar @usuario\n*O*.casar Romi2 🥺`)
    if(who === yo) return m.reply(`🌸 *No te puedes casar contigo mismo precioso*`)
    if(casados[yo] || casados[who]) return m.reply(`😿 *Uno de los 2 ya tiene dueño*\nUsen *.divorcio* primero`)

    casados[yo] = who
    casados[who] = yo

    let nameYo = await conn.getName(yo) || 'Alguien'
    let nameWho = await conn.getName(who) || 'Alguien'
    let numYo = yo.split('@')[0]
    let numWho = who.split('@')[0]

    // Foto de boda random
    let img = await fetch('https://i.imgur.com/8Qf5Z9k.jpg').then(v => v.buffer())

    let txt = `ᯇ 💒 𝗕𝗢𝗗𝗔 𝗕𝗢𝗧 💒 ୧

@${numYo} 💍 @${numWho} *se casaron!*

"Hoy 2 corazones se unen para latir como uno solo.
Que su amor sea eterno, que se cuiden, se rían
y se elijan todos los días de su vida" 🤍

──愛 *𝗝𝗨𝗥𝗔𝗠𝗘𝗡𝗧𝗢* ╏ 🕊️
"Prometo amarte en las risas y en las lágrimas,
en lo bueno y en lo malo. Ser tu hogar"

> *Dios bendiga esta unión* ✨🎉`

    await conn.sendMessage(m.chat, {
      image: img,
      caption: txt,
      mentions: [yo, who]
    }, { quoted: m })
  }

  if(command == 'divorcio' || command == 'divorciar'){
    if(!casados[yo]) return m.reply(`😔 *No estás casado con nadie corazón*`)

    let pareja = casados[yo]
    let nameYo = await conn.getName(yo) || 'Alguien'
    let namePareja = await conn.getName(pareja) || 'Alguien'
    let numYo = yo.split('@')[0]
    let numPareja = pareja.split('@')[0]

    delete casados[yo]
    delete casados[pareja]

    let img = await fetch('https://i.imgur.com/3ZQZ9kL.jpg').then(v => v.buffer())

    let txt = `ᯇ 💔 𝗗𝗜𝗩𝗢𝗥𝗖𝗜𝗢 𝗕𝗢𝗧 💔 ୧

@${numYo} 💔 @${numPareja}

*${nameYo} y ${namePareja} se separaron*

"A veces el amor no basta...
Se despiden con respeto y guardan los bonitos recuerdos" 🥺

──愛 *𝗔𝗖𝗧𝗔* ╏ 🕊️
"Se firma el adiós. Gracias por lo vivido"

> *Les deseo sanar y ser felices por separado* 🕊️`

    await conn.sendMessage(m.chat, {
      image: img,
      caption: txt,
      mentions: [yo, pareja]
    }, { quoted: m })
  }

  if(command == 'pareja' || command == 'esposo'){
    if(!casados[yo]) return m.reply(`😔 *Aún no tienes pareja*`)
    let pareja = casados[yo]
    let namePareja = await conn.getName(pareja)
    let numPareja = pareja.split('@')[0]
    m.reply(`💍 *Estás casado con:* @${numPareja}\n*Nombre:* ${namePareja}`, null, { mentions: [pareja] })
  }
}

handler.help = ['casar <@responder/nombre>', 'divorcio', 'pareja']
handler.tags = ['love']
handler.command = /^(casar|matrimonio|divorcio|divorciar|pareja|esposo)$/i
handler.group = true
export default handler