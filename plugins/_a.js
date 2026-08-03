let handler = async (m, { conn, command, text, participants }) => {

    // ===== COMANDO TOP LIBRE =====
    if (command === 'top') {
        await conn.sendMessage(m.chat, { react: { text: '👑', key: m.key } })

        let titulo = text.trim()? text.trim().toUpperCase() : 'DEL GRUPO'

        let miembros = participants.map(u => u.id)
        if(miembros.length < 2) return m.reply('❌ Se necesitan mínimo 2 personas en el grupo')

        let cantidad = miembros.length >= 5? 5 : miembros.length
        let randoms = []
        while(randoms.length < cantidad){
            let rand = miembros[Math.floor(Math.random() * miembros.length)]
            if(!randoms.includes(rand)) randoms.push(rand)
        }

        let txt = `👑 *TOP ${cantidad} ${titulo}* 👑\n\n`
        randoms.forEach((v, i) => {
            txt += `🏆 ${i+1}. @${v.split('@')[0]}\n`
        })
        txt += `\n✨ Sorteado aleatoriamente ✨`

        return await conn.reply(m.chat, txt, m, { mentions: randoms })
    }

    // ===== DETECTAR USUARIO PARA LOS DEMÁS COMANDOS =====
    let who = m.mentionedJid[0]
            || m.quoted?.sender
            || (conn.parseMention(text)[0])
            || (text.replace(/[^0-9]/g, '') + '@s.whatsapp.net')

    if (who === '@s.whatsapp.net' ||!who) who = null

    let necesitaPersona = ['abrazar','kabrazo','lesbiana','pajero','pajera','puto','puta','manco','manca','rata','prostituto','prostituta','sinpoto','sintetas','kiss','love','personalidad','sorteo'].includes(command)

    if (necesitaPersona &&!who) {
        return m.reply(`❌ Tienes que:\n1. *Tocar @* y elegir a la persona\n2. *Responder* al mensaje +.comando\n3..comando 519123456`)
    }

    let user = `@${m.sender.split('@')[0]}`
    let target = who? `@${who.split('@')[0]}` : user

    // ===== TODAS LAS RESPUESTAS =====
    const respuestas = {
        quiensoy: [
            `${user} eres una persona única ✨`,
            `${user} eres el alma de la fiesta 🥳`,
            `${user} eres misterioso/a... pero te quiero 👀`,
            `${user} eres un crack 💎`
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
            `¿Qué hace una abeja en el baño? Zzzzz 😂`,
            `¿Qué le dice una iguana a su hermana? Iguanita 😆`
        ],
        facto: [
            `Facto: Dormir es lo mejor del mundo 😴`,
            `Facto: El lunes no debería existir`,
            `Facto: El café cura todo ☕`,
            `Facto: Los audios de 2 minutos son eternos`
        ],
        genio: [
            `${user} eres un genio 🧠`,
            `Albert Einstein le dice a ${user}: me ganaste`,
            `CI de ${user}: 9999`,
            `${user} modo cerebro 3000 activado`
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
            `${target} eres: 90% sarcasmo 10% ternura`,
            `${target} personalidad: Main character energy`
        ],
        pregunta: [
            `Sí ✅`,
            `No ❌`,
            `Tal vez 🤔`,
            `Pregúntame después ⏰`,
            `Obvio que sí 😌`,
            `Ni cagando 🚫`
        ],
        sorteo: [
            `🎉 El ganador es... ${target} 🎉`,
            `🏆 Sorteo: Gana ${user} 🏆`,
            `😂 Nadie ganó... intenten de nuevo`
        ],
        verdad: [
            `Verdad o reto: ¿Cuál es tu mayor secreto? 👀`,
            `Verdad: ¿A quién quieres besar? 😏`,
            `Verdad: ¿Cuántos ex tienes?`,
            `Verdad: ¿Cuál fue tu última mentira?`
        ]
    }

    if (!respuestas[command]) return

    let res = respuestas[command][Math.floor(Math.random() * respuestas[command].length)]
    await conn.reply(m.chat, res, m, { mentions: who? [who, m.sender] : [m.sender] })
    await conn.sendMessage(m.chat, { react: { text: '✨', key: m.key } })
}

handler.help = [
'top (cualquier texto)',
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
'quiensoy', 'chipi', 'chiste', 'facto', 'genio', 'pregunta', 'verdad'
]
handler.tags = ['diversión']
handler.command = ['quiensoy','abrazar','kabrazo','lesbiana','pajero','pajera','puto','puta','manco','manca','rata','prostituto','prostituta','sinpoto','sintetas','chipi','chiste','facto','genio','kiss','love','personalidad','pregunta','sorteo','top','verdad']
handler.group = true

export default handler