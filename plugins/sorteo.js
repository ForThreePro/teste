let db = global.db.data.escalaSorteos = global.db.data.escalaSorteos || {}

let handler = async (m, { conn, isAdmin, command, args, groupMetadata }) => {
    if (!m.isGroup) return m.reply(`❌ Solo en grupos`)

    let user = `@${m.sender.split('@')[0]}`
    let chat = db[m.chat] = db[m.chat] || {lunes:[],martes:[],miercoles:[],jueves:[],viernes:[],sabado:[]}
    let dias = ['lunes','martes','miercoles','jueves','viernes','sabado']
    let emoji = {lunes:'🌙', martes:'💼', miercoles:'📊', jueves:'📢', viernes:'🎉', sabado:'🎁'}
    let participants = groupMetadata.participants

    const buscarUsuario = (texto) => {
        if (!texto) return null
        texto = texto.toLowerCase().replace(/[^0-9a-z]/g, '')
        if (m.mentionedJid[0]) return m.mentionedJid[0]
        if (m.quoted?.sender) return m.quoted.sender
        let porNumero = participants.find(p => p.id.includes(texto))
        if (porNumero) return porNumero.id
        let porNombre = participants.find(p => (p.name || p.notify || '').toLowerCase().replace(/[^0-9a-z]/g, '').includes(texto))
        if (porNombre) return porNombre.id
        return null
    }

    // =====.setlunes @usuario ===== AGREGAR
    if (command.startsWith('set')) {
        if (!isAdmin) return m.reply(`🚫 Solo admins ${user}`, m, { mentions: [m.sender] })
        let dia = command.replace('set','')
        if (!dias.includes(dia)) return

        let who = buscarUsuario(args.join(' '))
        if (!who) return m.reply(`❌ ${user} Menciona o escribe el nombre\nEj:.set${dia} @usuario`, m, { mentions: [m.sender] })
        if (chat[dia].includes(who)) return m.reply(`⚠️ ${user} @${who.split('@')[0]} ya está en la escala del ${dia}`, m, { mentions: [m.sender, who] })

        chat[dia].push(who)
        let target = `@${who.split('@')[0]}`

        let txt = `🐉 *REGISTRO SHENLONG* 🐉
━━━━━━━━━
${emoji[dia]} *DIA:* ${dia.toUpperCase()}
${emoji[dia]} *STAFF:* ${target}
${emoji[dia]} *POSICION:* #${chat[dia].length}

*REGISTRADO POR:* ${user}
> "El ki de este guerrero ha sido registrado" 💥`

        return conn.reply(m.chat, txt, m, { mentions: [m.sender, who] })
    }

    // =====.lunes ===== VER LISTA
    if (dias.includes(command)) {
        let dia = command
        if (chat[dia].length === 0) return m.reply(`📭 ${user} No hay nadie en la escala del *${dia.toUpperCase()}*`, m, { mentions: [m.sender] })

        let txt = `🐉 *ESCALA ${dia.toUpperCase()}* 🐉
━━━━━━━━━━━━━━━━━
*CONSULTADO POR:* ${user}
*TOTAL:* ${chat[dia].length} guerreros

`
        let mentions = [m.sender,...chat[dia]] // MENCIONA A TODOS

        chat[dia].forEach((jid, i) => {
            txt += `⚡ *GUERRERO #${i+1}:* @${jid.split('@')[0]}\n`
        })

        txt += `
❌ *RECUERDA:* Hola Bebit@ Recuerda Hacer Tu Sorteo Y No Te Ganes Un Tache ❌
📸 *VERIFICACION:* Para poder verificar tu sorteo envia @ a un admin tu sorteo realizado + cap
> "El honor de un Guerrero Z esta en juego" 💥`

        return conn.reply(m.chat, txt, m, { mentions: [...new Set(mentions)] })
    }

    // =====.limpiarlunes ===== BORRAR TODO EL DIA
    if (command.startsWith('limpiar')) {
        if (!isAdmin) return m.reply(`🚫 Solo admins ${user}`, m, { mentions: [m.sender] })
        let dia = command.replace('limpiar','')
        if (!dias.includes(dia)) return

        let cantidad = chat[dia].length
        chat[dia] = [] // vacía la lista

        let txt = `🐉 *LIMPIEZA SHENLONG* 🐉
━━━━━━━━━━━━━━━━━
🗑️ *DIA:* ${dia.toUpperCase()}
🗑️ *ELIMINADOS:* ${cantidad} guerreros

*EJECUTADO POR:* ${user}
> "La escala ha sido reiniciada" 💥`

        return m.reply(txt, m, { mentions: [m.sender] })
    }

    // =====.tabla ===== VER TODA LA SEMANA
    if (command === 'tabla') {
        if (!isAdmin) return m.reply(`🚫 Solo admins ${user}`, m, { mentions: [m.sender] })

        let txt = `🐉 *TABLA SEMANAL STAFF* 🐉
━━━━━━━━━━━━━━━━━
*GENERADO POR:* ${user}

`
        let mentions = [m.sender]

        dias.forEach(d => {
            txt += `${emoji[d]} *${d.toUpperCase()}* [${chat[d].length}]\n`
            if(chat[d].length > 0){
                chat[d].forEach((jid, i) => {
                    txt += ` ${i+1}. @${jid.split('@')[0]}\n`
                    mentions.push(jid)
                })
            } else {
                txt += ` Sin asignar\n`
            }
            txt += `\n`
        })

        txt += `> "7 dias, 7 guerreros, 1 solo ganador" 💥`

        return conn.reply(m.chat, txt, m, { mentions: [...new Set(mentions)] }) // MENCIONA A TODOS
    }

}
handler.help = ['setlunes @', 'lunes', 'limpiarlunes', 'tabla']
handler.tags = ['staff']
handler.command = ['setlunes','setmartes','setmiercoles','setjueves','setviernes','setsabado','lunes','martes','miercoles','jueves','viernes','sabado','limpiarlunes','limpiarmartes','limpiarmiercoles','limpiarjueves','limpiarviernes','limpiarsabado','tabla']
handler.group = true
export default handler