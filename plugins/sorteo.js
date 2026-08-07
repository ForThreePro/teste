let db = global.db.data.escalaSorteos = global.db.data.escalaSorteos || {}

let handler = async (m, { conn, isAdmin, command, args, groupMetadata }) => {
    if (!m.isGroup) return m.reply(`❌ Solo en grupos`)

    let user = `@${m.sender.split('@')[0]}`
    let chat = db[m.chat] = db[m.chat] || {lunes:[],martes:[],miercoles:[],jueves:[],viernes:[],sabado:[]}
    let dias = ['lunes','martes','miercoles','jueves','viernes','sabado']
    let emoji = {lunes:'🌙', martes:'💼', miercoles:'📊', jueves:'📢', viernes:'🎉', sabado:'🎁'}
    let participants = groupMetadata.participants

    // BUSCAR USUARIO POR @ / NOMBRE / NUMERO / RESPONDER
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
        if (!isAdmin) return m.reply(`❌ Solo admins ${user}`, m, { mentions: [m.sender] })
        let dia = command.replace('set','')
        if (!dias.includes(dia)) return

        let who = buscarUsuario(args.join(' '))
        if (!who) return m.reply(`❌ ${user} Menciona o escribe el nombre\nEj:.set${dia} @usuario`, m, { mentions: [m.sender] })
        if (chat[dia].includes(who)) return m.reply(`⚠️ ${user} @${who.split('@')[0]} ya está en la escala del ${dia}`, m, { mentions: [m.sender, who] })

        chat[dia].push(who)
        let target = `@${who.split('@')[0]}`

        let txt = `✅ *AGREGADO A LA ESCALA*

${user}
${emoji[dia]} *${dia.toUpperCase()}*
Se agregó a ${target}
Posición: ${chat[dia].length}`

        return conn.reply(m.chat, txt, m, { mentions: [m.sender, who] })
    }

    // =====.lunes ===== VER LISTA
    if (dias.includes(command)) {
        let dia = command
        if (chat[dia].length === 0) return m.reply(`⚠️ ${user} No hay nadie en la escala del *${dia.toUpperCase()}*`, m, { mentions: [m.sender] })

        let txt = `📅 *ESCALA DE SORTEOS - ${dia.toUpperCase()}* 📅\n\n${user}\n\n`
        let mentions = [m.sender,...chat[dia]] // MENCIONA A TODOS

        chat[dia].forEach((jid, i) => {
            txt += `${i+1}. @${jid.split('@')[0]}\n`
        })

        txt += `\n🎯 *LE TOCA HOY*: @${chat[dia][0].split('@')[0]}`
        mentions.push(chat[dia][0])

        return conn.reply(m.chat, txt, m, { mentions: [...new Set(mentions)] })
    }

    // =====.limpiarlunes ===== BORRAR TODO EL DIA
    if (command.startsWith('limpiar')) {
        if (!isAdmin) return m.reply(`❌ Solo admins ${user}`, m, { mentions: [m.sender] })
        let dia = command.replace('limpiar','')
        if (!dias.includes(dia)) return

        let cantidad = chat[dia].length
        chat[dia] = [] // vacía la lista

        return m.reply(`🗑️ ${user} Se limpió la escala del *${dia.toUpperCase()}*\nSe eliminaron ${cantidad} personas`, m, { mentions: [m.sender] })
    }

    // =====.tabla ===== VER TODA LA SEMANA
    if (command === 'tabla') {
        if (!isAdmin) return m.reply(`❌ Solo admins ${user}`, m, { mentions: [m.sender] })

        let txt = `📊 *TABLA SEMANAL ESCALA STAFF* 📊\n\n${user}\n\n`
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

        return conn.reply(m.chat, txt, m, { mentions: [...new Set(mentions)] }) // MENCIONA A TODOS
    }

}
handler.help = ['setlunes @', 'lunes', 'limpiarlunes', 'tabla']
handler.tags = ['staff']
handler.command = ['setlunes','setmartes','setmiercoles','setjueves','setviernes','setsabado','lunes','martes','miercoles','jueves','viernes','sabado','limpiarlunes','limpiarmartes','limpiarmiercoles','limpiarjueves','limpiarviernes','limpiarsabado','tabla']
handler.group = true
export default handler