let handler = async (m, { conn, command, text }) => {
    let who = m.mentionedJid[0] || m.sender // 1. Si mencionas tocando el nombre
    if (!m.mentionedJid[0] && text) { // 2. Si escribes @nombre
        let userText = text.replace(/[@ ]/g, '')
        // Busca en los participantes del grupo
        let participants = m.isGroup? m.chat.split`-`[0] : m.sender
        let group = await conn.groupMetadata(m.chat)
        let found = group.participants.find(p => p.id.includes(userText))
        who = found? found.id : m.sender
    }

    let user = `@${who.split('@')[0]}`

    let txt = ''

    switch(command){
        case 'quiensoy':
            let qs = ['🧠 Un genio', '💎 Un crack', '🐀 Una rata', '👑 Un pro player', '⚡ Un dios', '😎 Un capo']
            txt = `*[ QUIEN SOY ]*\n\n${user}\nEres: *${qs[Math.random()*qs.length|0]}*`
        break

        case 'abrazar':
            let abrazo = ['te da un abrazo 🫂', 'te abraza fuerte 🤗', 'te llena de amor ❤️', 'te consiente 🥺']
            txt = `*[ ABRAZAR ]*\n\n${user} ${abrazo[Math.random()*abrazo.length|0]}`
        break

        case 'kabrazo':
            let gay = ['🌈', '🏳️‍🌈', '💅', '💖', '👠']
            txt = `*[ KABRAZO ]*\n\n${gay[Math.random()*gay.length|0]} KABRAZO GAY ACTIVADO ${gay[Math.random()*gay.length|0]}\n${user} bienvenido al team 🌈`
        break

        case 'lesbiana': txt = `*[ LESBIANA ]*\n\n🏳️‍🌈 Confirmado:\n${user} sí es lesbiana 😏` break
        case 'pajero': txt = `*[ PAJERO ]*\n\n🖐️ Confirmado:\n${user} sí es pajero 😂` break
        case 'pajera': txt = `*[ PAJERA ]*\n\n🖐️ Confirmado:\n${user} sí es pajera 😂` break
        case 'puto': txt = `*[ PUTO ]*\n\n😈 Confirmado:\n${user} sí es puto` break
        case 'puta': txt = `*[ PUTA ]*\n\n😈 Confirmado:\n${user} sí es puta` break
        case 'manco': txt = `*[ MANCO ]*\n\n🤲 Confirmado:\n${user} sí es manco` break
        case 'manca': txt = `*[ MANCA ]*\n\n🤲 Confirmado:\n${user} sí es manca` break
        case 'rata': txt = `*[ RATA ]*\n\n🐀 Confirmado:\n${user} sí es rata` break
        case 'prostituto': txt = `*[ PROSTITUTO ]*\n\n💵 Confirmado:\n${user} sí es prostituto` break
        case 'prostituta': txt = `*[ PROSTITUTA ]*\n\n💵 Confirmado:\n${user} sí es prostituta` break
        case 'sinpoto': txt = `*[ SIN POTO ]*\n\n🍑❌ Confirmado:\n${user} sí es sin poto` break
        case 'sintetas': txt = `*[ SIN TETAS ]*\n\n📉 Confirmado:\n${user} sí es sin tetas` break
        case 'chipi': txt = `*[ CHIPI ]*\n\n📏 Confirmado:\n${user} sí es chipi` break

        case 'chiste':
            let chistes = [
                '👨‍👦 Hijo: Papá en el cole me dicen distraído\n👨 Papá: Hijo tú vives al lado 😂',
                '💑 Amor me amas? Sí\nMucho? Sí\nCuánto? Como para no responder y ver el partido 📺',
                '🦎 ¿Qué le dice una iguana a su hermana?\nIguanita tú 😂'
            ]
            txt = `*[ CHISTE ]*\n\n${chistes[Math.random()*chistes.length|0]}`
        break

        case 'facto':
            let factos = ['💧 El agua moja', '😴 Dormir cura todo', '📅 Los lunes apestan']
            txt = `*[ FACTO ]*\n\n${factos[Math.random()*factos.length|0]}`
        break

        case 'genio': txt = `*[ GENIO ]*\n\n${user}\n🧠 CI: 9999\n⚡ Nivel: Sobredotado` break
        case 'kiss': txt = `*[ KISS ]*\n\n${user} te manda un besito 😘💋` break
        case 'love':
            let love = Math.floor(Math.random() * 100) + 1
            let msg = love > 80? '💘 Amor verdadero' : love > 50? '💞 Hay química' : '👬 Amigos nomás'
            txt = `*[ LOVE ]*\n\n${user}\n❤️ Compatibilidad: *${love}%*\n${msg}`
        break
        case 'personalidad':
            let pers = ['😶 Tímido', '😈 Tóxico', '😇 Amable', '🤡 Chistoso', '🧠 Inteligente']
            txt = `*[ PERSONALIDAD ]*\n\n${user}\nEres: *${pers[Math.random()*pers.length|0]}*`
        break
        case 'pregunta':
            let preg = ['✅ Sí', '❌ No', '🤔 Tal vez', '🔥 Obvio', '🙅 Ni cagando']
            txt = `*[ PREGUNTA ]*\n\nRespuesta:\n*${preg[Math.random()*preg.length|0]}*`
        break
        case 'sorteo': txt = `*[ SORTEO ]*\n\n🎉 Ganador:\n${user}` break
        case 'top': txt = `*[ TOP ]*\n\n🥇 El más activo\n🥈 El más chistoso\n🥉 El más rata` break
        case 'verdad':
            let verd = ['😨 ¿Cuál es tu mayor miedo?', '❤️ ¿A quién quieres?', '📏 ¿Cuánto mides?']
            txt = `*[ VERDAD ]*\n\n${verd[Math.random()*verd.length|0]}`
        break
    }

    await conn.reply(m.chat, txt, m, { mentions: [who] }) // AQUI ESTA LA CLAVE
}

handler.help = ['quiensoy', 'abrazar', 'kabrazo', 'lesbiana', 'pajero', 'pajera', 'puto', 'puta', 'manco', 'manca', 'rata', 'prostituto', 'prostituta', 'sinpoto', 'sintetas', 'chipi', 'chiste', 'facto', 'genio', 'kiss', 'love', 'personalidad', 'pregunta', 'sorteo', 'top', 'verdad']
handler.tags = ['juegos']
handler.command = ['quiensoy','abrazar','kabrazo','lesbiana','pajero','pajera','puto','puta','manco','manca','rata','prostituto','prostituta','sinpoto','sintetas','chipi','chiste','facto','genio','kiss','love','personalidad','pregunta','sorteo','top','verdad']
handler.group = true

export default handler