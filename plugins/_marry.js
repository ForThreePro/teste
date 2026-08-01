let handler = async (m, { conn, command, text }) => {
  let yo = m.sender
  let who = null

  if(!global.db.data.casados) global.db.data.casados = {}
  let casados = global.db.data.casados

  // 1. RESPONDIENDO
  if(m.quoted) who = m.quoted.sender

  // 2. MENCION REAL - tocar @ y elegir
  else if(m.mentionedJid && m.mentionedJid[0]) who = m.mentionedJid[0]

  // 3. BUSCAR POR NOMBRE -.casar Romi2
  else if(text) {
    let nombreBuscado = text.replace(command, '').replace('@','').trim().toLowerCase()
    if(!nombreBuscado) return m.reply(`💍 *Uso:*.casar @usuario\n*O*.casar Romi2\n*O responde a su mensaje* 🥺`)

    let group = await conn.groupMetadata(m.chat)
    let participante = group.participants.find(p => {
      let nombre = conn.getName(p.id) || p.id.split('@')[0]
      let numero = p.id.split('@')[0]
      return nombre.toLowerCase().includes(nombreBuscado) || numero.includes(nombreBuscado)
    })
    if(participante) who = participante.id
    else return m.reply(`😿 *No encontré a "${nombreBuscado}" en el grupo*\nResponde a su mensaje o etiquétalo de la lista`)
  }

  if(command == 'casar' || command == 'matrimonio'){
    if(!who) return m.reply(`💍 *Uso:*.casar @usuario\n*O responde a su mensaje* 🥺`)
    if(who === yo) return m.reply(`🌸 *No te puedes casar contigo mismo*`)
    if(casados[yo] || casados[who]) return m.reply(`😿 *Ya uno de los 2 está casado*\nUsa *.divorcio* primero`)

    casados[yo] = who
    casados[who] = yo

    let nameYo = await conn.getName(yo)
    let nameWho = await conn.getName(who)
    let numYo = yo.split('@')[0]
    let numWho = who.split('@')[0]

    let txt = `ᯇ 💒 𝗕𝗢𝗗𝗔 𝗕𝗢𝗧 💒 ୧

꒰ ◞⁺⊹ ．@${numYo} y @${numWho}

*${nameYo}* y *${nameWho}*

💍 *AHORA ESTÁN CASADOS* 💍

──愛 *𝗝𝗨𝗥𝗔𝗠𝗘𝗡𝗧𝗢* ╏ 🕊️
"Los declaro esposos. Que el amor los acompañe siempre"

> *Felicidades a la nueva pareja* 🎉✨`

    await conn.sendMessage(m.chat, { text: txt, mentions: [yo, who] }, { quoted: m })
  }

  if(command == 'divorcio' || command == 'divorciar'){
    if(!casados[yo]) return m.reply(`😔 *No estás casado con nadie*`)

    let pareja = casados[yo]
    let nameYo = await conn.getName(yo)
    let namePareja = await conn.getName(pareja)
    let numYo = yo.split('@')[0]
    let numPareja = pareja.split('@')[0]

    delete casados[yo]
    delete casados[pareja]

    let txt = `ᯇ 💔 𝗗𝗜𝗩𝗢𝗥𝗖𝗜𝗢 𝗕𝗢𝗧 💔 ୧

꒰ ◞⁺⊹ ．@${numYo} y @${numPareja}

*${nameYo}* y *${namePareja}*

💔 *SE HAN DIVORCIADO* 💔

──愛 *𝗔𝗖𝗧𝗔* ╏ 🕊️
"El matrimonio ha terminado. Cada uno por su lado"

> *Que les vaya bonito por separado* 🥺`

    await conn.sendMessage(m.chat, { text: txt, mentions: [yo, pareja] }, { quoted: m })
  }

  if(command == 'pareja' || command == 'esposo'){
    if(!casados[yo]) return m.reply(`😔 *No estás casado con nadie*`)
    let pareja = casados[yo]
    let namePareja = await conn.getName(pareja)
    let numPareja = pareja.split('@')[0]
    m.reply(`💍 *Tu pareja es:* @${numPareja}\n*Nombre:* ${namePareja}`, null, { mentions: [pareja] })
  }
}

handler.help = ['casar <nombre/@/responder>', 'divorcio', 'pareja']
handler.tags = ['love']
handler.command = /^(casar|matrimonio|divorcio|divorciar|pareja|esposo)$/i
handler.group = true
export default handler