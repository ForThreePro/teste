let handler = async (m, { conn, command, text }) => {

    // FORMA 1: MENCION TOCANDO EL NOMBRE
    // FORMA 2: RESPONDIENDO
    // FORMA 3: PONIENDO NUMERO
    let who = m.mentionedJid[0]
            || m.quoted?.sender
            || (conn.parseMention(text)[0]) // Esto agarra @ aunque lo escribas
            || (text.replace(/[^0-9]/g, '') + '@s.whatsapp.net')

    if (who === '@s.whatsapp.net' ||!who) who = null

    let necesitaPersona = ['abrazar','kabrazo','lesbiana','pajero','pajera','puto','puta','manco','manca','rata','prostituto','prostituta','sinpoto','sintetas','kiss','love','personalidad','sorteo','top'].includes(command)

    if (necesitaPersona &&!who) {
        return m.reply(`❌ Tienes que:\n1. *Tocar el @* y elegir a la persona\n2. *Responder* al mensaje +.comando\n3..comando 519123456`)
    }

    let user = `@${m.sender.split('@')[0]}`
    let target = `@${who.split('@')[0]}`

    const respuestas = {
        quiensoy: [`${user} eres una persona única ✨`, `${user} eres el alma de la fiesta 🥳`],
        abrazar: [`${user} le da un abrazo a ${target} 🤗`, `*${user} abraza fuerte a ${target}* 🫂`],
        kabrazo: [`*${user} te manda un k-abrazo coreano* 💖`, `${user} abraza a ${target} estilo k-drama 🥺`],
        lesbiana: [`Según mis cálculos... ${target} tiene 87% de ser lesbiana 🌈`, `${target} *guiño guiño* 🏳️‍🌈`],
        pajero: [`${target} eres bien pajero/a 😏`, `Confirmado: ${target} vive en el 5vs5 🫠`],
        pajera: [`${target} eres bien pajera 😏`, `Te descubrí ${target} 👀`],
        puto: [`${target} PUTO 😡`, `Cálmate ${target} jajaja`],
        puta: [`${target} PUTA 😡`, `Ya ${target} tranquilízate`],
        manco: [`${target} eres bien manco en el juego 🎮`, `Confirmo, ${target} no le da a nada`],
        manca: [`${target} eres bien manca 😂`, `${target} ni en fácil le das`],
        rata: [`${target} RATA 🐀`, `Te vi robar ${target}`],
        prostituto: [`${target} cobras o qué? 💰`, `${target} modo sugar activado`],
        prostituta: [`${target} cobras o qué? 💰`, `${target} modo sugar activado`],
        sinpoto: [`${target} anda sin poto 😂`, `Pobre ${target} plano`],
        sintetas: [`${target} anda sin tetas 😂`, `Tabla de planchar: ${target}`],
        chipi: [`Chipi chipi chapa chapa ${target} 🎶`, `Dubi dubi daba daba ${user}`],
        chiste: [`¿Qué le dice un techo a otro? Techo de menos 🏠`, `¿Por qué la compu fue al doctor? Virus 💻`],
        facto: [`Facto: Dormir es lo mejor 😴`, `Facto: El lunes no debería existir`],
        genio: [`${user} eres un genio 🧠`, `CI de ${user}: 9999`],
        kiss: [`${user} le da un beso a ${target} 😘`, `*${user} besa a ${target}* 💋`],
        love: [`${user} te ama ${target} ❤️`, `Shippeo: ${user} x ${target} 💘`],
        personalidad: [`${target} tu personalidad es: Caótica pero querible 😈`, `${target} eres: 90% sarcasmo 10% ternura`],
        pregunta: [`Sí ✅`, `No ❌`, `Tal vez 🤔`, `Pregúntame después ⏰`],
        sorteo: [`El ganador es... ${target} 🎉`, `Sorteo: Gana ${user} 🏆`],
        top: [`Top 1: ${user} 👑`, `Top 5:\n1. ${user}\n2. ${target}`],
        verdad: [`Verdad: ¿Cuál es tu mayor secreto? 👀`, `Verdad: ¿A quién quieres besar? 😏`]
    }

    let res = respuestas[command][Math.floor(Math.random() * respuestas[command].length)]
    await conn.reply(m.chat, res, m, { mentions: [who, m.sender] })
    await conn.sendMessage(m.chat, { react: { text: '✨', key: m.key } })
}

handler.help = [
'abrazar ( @tocar / responder / numero )',
'kabrazo ( @tocar / responder / numero )',
'lesbiana ( @tocar / responder / numero )',
'pajero ( @tocar / responder / numero )',
'pajera ( @tocar / responder / numero )',
'puto ( @tocar / responder / numero )',
'puta ( @tocar / responder / numero )',
'manco ( @tocar / responder / numero )',
'manca ( @tocar / responder / numero )',
'rata ( @tocar / responder / numero )',
'prostituto ( @tocar / responder / numero )',
'prostituta ( @tocar / responder / numero )',
'sinpoto ( @tocar / responder / numero )',
'sintetas ( @tocar / responder / numero )',
'kiss ( @tocar / responder / numero )',
'love ( @tocar / responder / numero )',
'personalidad ( @tocar / responder / numero )',
'sorteo ( @tocar / responder / numero )',
'top ( @tocar / responder / numero )',
'quiensoy', 'chipi', 'chiste', 'facto', 'genio', 'pregunta', 'verdad'
]
handler.tags = ['diversión']
handler.command = ['quiensoy','abrazar','kabrazo','lesbiana','pajero','pajera','puto','puta','manco','manca','rata','prostituto','prostituta','sinpoto','sintetas','chipi','chiste','facto','genio','kiss','love','personalidad','pregunta','sorteo','top','verdad']

export default handler