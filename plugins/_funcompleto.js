let handler = async (m, { conn, command, text }) => {
    let who = m.mentionedJid[0] || m.quoted?.sender || m.sender

    if (text) {
        let num = text.replace(/[^0-9]/g, '') // Quita + y espacios
        if (num.length > 8) who = num + '@s.whatsapp.net'
    }

    let nombre = '@' + who.split('@')[0] // Esto genera @233465966534833

    let txt = ''

    switch(command){
        case 'quiensoy':
            let qs = ['🧠 Un genio', '💎 Un crack', '🐀 Una rata', '👑 Un pro player', '⚡ Un dios', '😎 Un capo']
            txt = `*[ QUIEN SOY ]*\n\n${nombre}\nEres: *${qs[Math.random()*qs.length|0]}*`
        break

        case 'abrazar':
            let abrazo = ['te da un abrazo 🫂', 'te abraza fuerte 🤗', 'te llena de amor ❤️', 'te consiente 🥺']
            txt = `*[ ABRAZAR ]*\n\n${nombre} ${abrazo[Math.random()*abrazo.length|0]}`
        break

        case 'kabrazo':
            let gay = ['🌈', '🏳️‍🌈', '💅', '💖', '👠']
            txt = `*[ KABRAZO ]*\n\n${gay[Math.random()*gay.length|0]} KABRAZO GAY ACTIVADO ${gay[Math.random()*gay.length|0]}\n${nombre} bienvenido al team 🌈`
        break

        case 'lesbiana': txt = `*[ LESBIANA ]*\n\n🏳️‍🌈 Confirmado:\n${nombre} sí es lesbiana 😏` break
        case 'pajero': txt = `*[ PAJERO ]*\n\n🖐️ Confirmado:\n${nombre} sí es pajero 😂` break
        case 'pajera': txt = `*[ PAJERA ]*\n\n🖐️ Confirmado:\n${nombre} sí es pajera 😂` break
        case 'puto': txt = `*[ PUTO ]*\n\n😈 Confirmado:\n${nombre} sí es puto` break
        case 'puta': txt = `*[ PUTA ]*\n\n😈 Confirmado:\n${nombre} sí es puta` break
        case 'manco': txt = `*[ MANCO ]*\n\n🤲 Confirmado:\n${nombre} sí es manco` break
        case 'manca': txt = `*[ MANCA ]*\n\n🤲 Confirmado:\n${nombre} sí es manca` break
        case 'rata': txt = `*[ RATA ]*\n\n🐀 Confirmado:\n${nombre} sí es rata` break
        case 'prostituto': txt = `*[ PROSTITUTO ]*\n\n💵 Confirmado:\n${nombre} sí es prostituto` break
        case 'prostituta': txt = `*[ PROSTITUTA ]*\n\n💵 Confirmado:\n${nombre} sí es prostituta` break
        case 'sinpoto': txt = `*[ SIN POTO ]*\n\n🍑❌ Confirmado:\n${nombre} sí es sin poto` break
        case 'sintetas': txt = `*[ SIN TETAS ]*\n\n📉 Confirmado:\n${nombre} sí es sin tetas` break
        case 'chipi': txt = `*[ CHIPI ]*\n\n📏 Confirmado:\n${nombre} sí es chipi` break

        case 'chiste':
            let chistes = ['👨‍👦 Hijo: Papá me dicen distraído\n👨 Papá: Hijo tú vives al lado 😂']
            txt = `*[ CHISTE ]*\n\n${chistes[Math.random()*chistes.length|0]}`
        break
        case 'facto': txt = `*[ FACTO ]*\n\n💧 El agua moja` break
        case 'genio': txt = `*[ GENIO ]*\n\n${nombre}\n🧠 CI: 9999` break
        case 'kiss': txt = `*[ KISS ]*\n\n${nombre} te manda un besito 😘💋` break
        case 'love':
            let love = Math.floor(Math.random() * 100) + 1
            txt = `*[ LOVE ]*\n\n${nombre}\n❤️ Compatibilidad: *${love}%*`
        break
        case 'personalidad': txt = `*[ PERSONALIDAD ]*\n\n${nombre}\nEres: *😎 Crack*` break
        case 'pregunta': txt = `*[ PREGUNTA ]*\n\nRespuesta:\n*✅ Sí*` break
        case 'sorteo': txt = `*[ SORTEO ]*\n\n🎉 Ganador:\n${nombre}` break
        case 'top': txt = `*[ TOP ]*\n\n🥇 El más activo\n🥈 El más chistoso` break
        case 'verdad': txt = `*[ VERDAD ]*\n\n😨 ¿Cuál es tu mayor miedo?` break
    }

    await conn.sendMessage(m.chat, {
        text: txt,
        mentions: [who] // AQUI LE DECIMOS A WHATSAPP A QUIEN MENCIONAR
    }, { quoted: m })
}

handler.help = ['quiensoy', 'abrazar', 'kabrazo', 'lesbiana', 'pajero', 'pajera', 'puto', 'puta', 'manco', 'manca', 'rata', 'prostituto', 'prostituta', 'sinpoto', 'sintetas', 'chipi', 'chiste', 'facto', 'genio', 'kiss', 'love', 'personalidad', 'pregunta', 'sorteo', 'top', 'verdad']
handler.tags = ['juegos']
handler.command = ['quiensoy','abrazar','kabrazo','lesbiana','pajero','pajera','puto','puta','manco','manca','rata','prostituto','prostituta','sinpoto','sintetas','chipi','chiste','facto','genio','kiss','love','personalidad','pregunta','sorteo','top','verdad']
handler.group = true

export default handler