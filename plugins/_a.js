let handler = async (m, { conn, command, text, usedPrefix }) => {
    let who = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : m.sender
    let name = await conn.getName(who)
    let user = `@${m.sender.split('@')[0]}`
    let target = `@${who.split('@')[0]}`

    // Frases random para que no se repita
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
        pajero: [
            `${target} eres bien pajero/a 😏`,
            `Confirmado: ${target} vive en el 5vs5 🫠`,
            `${target} *se sonroja*`
        ],
        pajera: [
            `${target} eres bien pajera 😏`,
            `Te descubrí ${target} 👀`,
            `${target} modo avión activado ✈️`
        ],
        puto: [
            `${target} PUTO 😡`,
            `Cálmate ${target} jajaja`,
            `${target} no seas así pues`
        ],
        puta: [
            `${target} PUTA 😡`,
            `Ya ${target} tranquilízate`,
            `Jajaja ${target}`
        ],
        manco: [
            `${target} eres bien manco en el juego 🎮`,
            `Confirmo, ${target} no le da a nada`,
            `${target} practica más noob`
        ],
        manca: [
            `${target} eres bien manca 😂`,
            `${target} ni en fácil le das`,
            `F por ${target}`
        ],
        rata: [
            `${target} RATA 🐀`,
            `Te vi robar ${target}`,
            `${target} devuelve lo que te llevaste`
        ],
        prostituto: [
            `${target} cobras o qué? 💰`,
            `${target} modo sugar activado`,
            `Ofertas con ${target}`
        ],
        prostituta: [
            `${target} cobras o qué? 💰`,
            `${target} modo sugar activado`,
            `Ofertas con ${target}`
        ],
        sinpoto: [
            `${target} anda sin poto 😂`,
            `Pobre ${target} plano`,
            `${target} *se sienta en el aire*`
        ],
        sintetas: [
            `${target} anda sin tetas 😂`,
            `Tabla de planchar: ${target}`,
            `${target} modo aeropuerto`
        ],
        chipi: [
            `Chipi chipi chapa chapa ${target} 🎶`,
            `Dubi dubi daba daba ${user}`,
            `Chipi chipi ✨`
        ],
        chiste: [
            `¿Qué le dice un techo a otro? Techo de menos 🏠`,
            `¿Por qué la computadora fue al doctor? Porque tenía un virus 💻`,
            `¿Qué hace una abeja en el baño? Zzzzz 😂`
        ],
        facto: [
            `Facto: Dormir es lo mejor del mundo 😴`,
            `Facto: El lunes no debería existir`,
            `Facto: El café cura todo ☕`
        ],
        genio: [
            `${user} eres un genio 🧠`,
            `Albert Einstein le dice a ${user}: me ganaste`,
            `CI de ${user}: 9999`
        ],
        kiss: [
            `${user} le da un beso a ${target} 😘`,
            `*${user} besa a ${target}* 💋`,
            `${user} + ${target} = 💕`
        ],
        love: [
            `${user} te ama ${target} ❤️`,
            `El amor está en el aire... entre ${user} y ${target}`,
            `Shippeo: ${user} x ${target} 💘`
        ],
        personalidad: [
            `${target} tu personalidad es: Caótica pero querible 😈`,
            `${target} eres: Tierno pero peligroso 🥺`,
            `${target} eres: 90% sarcasmo 10% ternura`
        ],
        pregunta: [
            `Sí ✅`,
            `No ❌`,
            `Tal vez 🤔`,
            `Pregúntame después ⏰`,
            `Obvio que sí 😌`
        ],
        sorteo: [
            `El ganador es... ${target} 🎉`,
            `Sorteo: Gana ${user} 🏆`,
            `Nadie ganó... intenten de nuevo 😂`
        ],
        top: [
            `Top 1: ${user} 👑`,
            `Top 5 del grupo:\n1. ${user}\n2. ${target}\n3. Alguien\n4. Otro\n5. Yo`,
            `Tú eres el top ${target} 😎`
        ],
        verdad: [
            `Verdad o reto: ¿Cuál es tu mayor secreto? 👀`,
            `Verdad: ¿A quién quieres besar? 😏`,
            `Verdad: ¿Cuántos ex tienes?`
        ]
    }

    if (!respuestas[command]) return

    let res = respuestas[command][Math.floor(Math.random() * respuestas[command].length)]
    await conn.reply(m.chat, res, m, { mentions: [who, m.sender] })
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