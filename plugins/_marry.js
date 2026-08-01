let handler = async (m, { conn, command, text }) => {
  let yo = m.sender
  let who = m.quoted?.sender || m.mentionedJid[0]

  if(!global.db.data.casados) global.db.data.casados = {}
  let casados = global.db.data.casados

  // BUSCAR POR NOMBRE si no hay mention
  if(!who && text) {
    let nombreBuscado = text.replace(command, '').replace('@','').trim().toLowerCase()
    if(nombreBuscado) {
      let group = await conn.groupMetadata(m.chat)
      let participante = group.participants.find(p => {
        let nombre = conn.getName(p.id) || p.id.split('@')[0]
        return nombre.toLowerCase().includes(nombreBuscado)
      })
      if(participante) who = participante.id
    }
  }

  if(command == 'marry' || command == 'matrimonio'){
    if(!who) return m.reply(`💍 *Use it like this:*\n1. Reply to their message with *.marry*\n2. *.marry @user*\n3. *.marry Romi2* 🥺`)
    if(who === yo) return m.reply(`🌸 *You can't marry yourself silly*`)
    if(casados[yo] || casados[who]) return m.reply(`😿 *One of you is already married*\nUse *.divorce* first`)

    casados[yo] = who
    casados[who] = yo

    let nameYo = await conn.getName(yo) || 'Someone'
    let nameWho = await conn.getName(who) || 'Someone'
    let numYo = yo.split('@')[0]
    let numWho = who.split('@')[0]

    let txt = `ᯇ 💒 𝗪𝗘𝗗𝗗𝗜𝗡𝗚 𝗕𝗢𝗧 💒 ୧

@${numYo} 💍 @${numWho}

"Today 2 hearts decided to walk together.
To take care of each other, laugh, hug tight
and choose each other even on gray days" ✨

──愛 *𝗩𝗢𝗪𝗦* ╏ 🕊️
"I promise to be your home, your laugh and your peace.
To love you today, tomorrow and always"

> *May God bless this beautiful union* 🎉💫`

    await conn.sendMessage(m.chat, {
      text: txt,
      mentions: [yo, who]
    }, { quoted: m })
  }

  if(command == 'divorce' || command == 'divorciar'){
    if(!casados[yo]) return m.reply(`😔 *You're not married to anyone*`)

    let pareja = casados[yo]
    let nameYo = await conn.getName(yo) || 'Someone'
    let namePareja = await conn.getName(pareja) || 'Someone'
    let numYo = yo.split('@')[0]
    let numPareja = pareja.split('@')[0]

    delete casados[yo]
    delete casados[pareja]

    let txt = `ᯇ 💔 𝗗𝗜𝗩𝗢𝗥𝗖𝗘 𝗕𝗢𝗧 💔 ୧

@${numYo} 💔 @${numPareja}

"Sometimes letting go is also a way to love.
Thank you for the beautiful memories we shared" 🥺

──愛 *𝗔𝗖𝗧* ╏ 🕊️
"The goodbye is signed with respect and love"

> *Wishing you both healing and happiness* 🕊️🤍`

    await conn.sendMessage(m.chat, {
      text: txt,
      mentions: [yo, pareja]
    }, { quoted: m })
  }

  if(command == 'couple' || command == 'pareja'){
    if(!casados[yo]) return m.reply(`😔 *You're not married yet*`)
    let pareja = casados[yo]
    let namePareja = await conn.getName(pareja)
    let numPareja = pareja.split('@')[0]
    m.reply(`💍 *Your spouse is:* @${numPareja}\n*Name:* ${namePareja}`, null, { mentions: [pareja] })
  }
}

handler.help = ['marry <@reply/name>', 'divorce', 'couple']
handler.tags = ['love']
handler.command = /^(marry|matrimonio|divorce|divorciar|couple|pareja)$/i
handler.group = true
export default handler