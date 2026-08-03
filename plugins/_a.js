let handler = async (m, { conn, command, text }) => {
    // Solo agarra mención real o si respondes
    let who = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : null

    // Si el comando necesita persona y no hay, avisar
    let necesitaPersona = ['abrazar','kabrazo','lesbiana','pajero','pajera','puto','puta','manco','manca','rata','prostituto','prostituta','sinpoto','sintetas','kiss','love','personalidad','sorteo','top'].includes(command)

    if (necesitaPersona &&!who) {
        return m.reply(`❌ Tienes que *mencionar a alguien* o *responder a su mensaje*\n\nEjemplo:.abrazar @Pepito`)
    }

    let user = `@${m.sender.split('@')[0]}`
    let target = who? `@${who.split('@')[0]}` : user

    const respuestas = {
        quiensoy: [
            `${user} eres una persona única ✨`,
            `${user} eres el alma de la fiesta 🥳`,
            `${user} eres misterioso/a... pero te quiero 👀`
        ],
        abrazar: [
            `${user} le da un abrazo a ${target} 🤗`,
            `*${user} abraza fuerte a ${target}* 🫂`,
            `${user} + ${target} = abrazo grupal 💕`
        ],
        kabrazo: [
            `*${user} te manda un k-abrazo coreano* 💖`,
            `${user} abraza a ${target} estilo k-drama 🥺`,
            `Abrazo virtual para ${target} de parte de ${user} 🫂`
        ],
        lesbiana: [
            `Según mis cálculos... ${target} tiene 87% de ser lesbiana 🌈`,
            `${target} *guiño guiño* 🏳️‍🌈`,
            `El gaydar dice que ${target}... nah mentira 😂`
        ],
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
    await conn.reply(m.chat, res, m, { mentions: who? [who, m.sender] : [m.sender] })
    await conn.sendMessage(m.chat, { react: { text: '✨', key: m.key } })
}

handler.help = [
'quiensoy',
'abrazar ( @mencionar o responder )',
'kabrazo ( @mencionar o responder )',
'lesbiana ( @mencionar o responder )',
'pajero ( @mencionar o responder )',
'pajera ( @mencionar o responder )',
'puto ( @mencionar o responder )',
'puta ( @mencionar o responder )',
'manco ( @mencionar o responder )',
'manca ( @mencionar o responder )',
'rata ( @mencionar o responder )',
'prostituto ( @mencionar o responder )',
'prostituta ( @mencionar o responder )',
'sinpoto ( @mencionar o responder )',
'sintetas ( @mencionar o responder )',
'chipi',
'chiste',
'facto',
'genio',
'kiss ( @mencionar o responder )',
'love ( @mencionar o responder )',
'personalidad ( @mencionar o responder )',
'pregunta',
'sorteo ( @mencionar o responder )',
'top ( @mencionar o responder )',
'verdad'
]
handler.tags = ['diversión']
handler.command = ['quiensoy','abrazar','kabrazo','lesbiana','pajero','pajera','puto','puta','manco','manca','rata','prostituto','prostituta','sinpoto','sintetas','chipi','chiste','facto','genio','kiss','love','personalidad','pregunta','sorteo','top','verdad']

export default handler