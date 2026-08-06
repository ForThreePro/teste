let db = global.db.data.agendaSorteos = global.db.data.agendaSorteos || {}

let handler = async (m, { conn, isAdmin, command, args, groupMetadata }) => {
    if (!m.isGroup) return m.reply(`❌ Solo en grupos`)

    let user = `@${m.sender.split('@')[0]}`
    let chat = db[m.chat] = db[m.chat] || {lunes:null,martes:null,miercoles:null,jueves:null,viernes:null,sabado:null}
    let dias = ['lunes','martes','miercoles','jueves','viernes','sabado']
    let emoji = {lunes:'🌙', martes:'💼', miercoles:'📊', jueves:'📢', viernes:'🎉', sabado:'🎁'}
    let participants = groupMetadata.participants

    // FUNCION PARA BUSCAR POR NOMBRE O NUMERO
    const buscarUsuario = (texto) => {
        if (!texto) return null
        texto = texto.toLowerCase().replace(/[^0-9a-z]/g, '')

        // 1. Si es @mencion
        if (m.mentionedJid[0]) return m.mentionedJid[0]

        // 2. Si responde
        if (m.quoted?.sender) return m.quoted.sender

        // 3. Buscar por numero
        let porNumero = participants.find(p => p.id.includes(texto))
        if (porNumero) return porNumero.id

        // 4. Buscar por nombre
        let porNombre = participants.find(p =>
            (p.name || p.notify || '').toLowerCase().replace(/[^0-9a-z]/g, '').includes(texto)
        )
        if (porNombre) return porNombre.id

        return null
    }

    // =====.setlunes Anita o 519123 =====
    if (command.startsWith('set')) {
        if (!isAdmin) return m.reply(`❌ Solo admins ${user}`, m, { mentions: [m.sender] })
        let dia = command.replace('set','')
        if (!dias.includes(dia)) return

        let who = buscarUsuario(args.join(' '))
        if (!who) return m.reply(`❌ ${user} No encontré a esa persona\nUsa:.set${dia} @tag o.set${dia} nombre o.set${dia} 519...`, m, { mentions: [m.sender] })

        chat[dia] = who
        let target = `@${who.split('@')[0]}`

        let txt = `✅ *AGENDA ACTUALIZADA*

${user}
${emoji[dia]} *${dia.toUpperCase()}* ahora le toca sortear a ${target}`

        return conn.reply(m.chat, txt, m, { mentions: [m.sender, who] }) // AQUI ESTA LA CLAVE
    }

    // =====.lunes =====
    if (dias.includes(command)) {
        let dia = command
        let responsable = chat[dia]
        if (!responsable) return m.reply(`⚠️ ${user} Sin asignar para *${dia.toUpperCase()}*`, m, { mentions: [m.sender] })

        let target = `@${responsable.split('@')[0]}`
        let txt = `📅 *AGENDA DE SORTEOS STAFF*

${user} consultó ${emoji[dia]} *${dia.toUpperCase()}*

👤 Responsable: ${target}`

        return conn.reply(m.chat, txt, m, { mentions: [m.sender, responsable] })
    }

    // =====.tabla =====
    if (command === 'tabla') {
        if (!isAdmin) return m.reply(`❌ Solo admins ${user}`, m, { mentions: [m.sender] })

        let txt = `📊 *TABLA SEMANAL STAFF* 📊\n\n${user}\n\n`
        let todos = [m.sender]
        dias.forEach(d => {
            txt += `${emoji[d]} *${d.toUpperCase()}*: `
            if (chat[d]) {
                txt += `@${chat[d].split('@')[0]}\n`
                todos.push(chat[d])
            } else {
                txt += `Sin asignar\n`
            }
        })

        return conn.reply(m.chat, txt, m, { mentions: [...new Set(todos)] }) // [...new Set] quita duplicados
    }

    // =====.recordatorio =====
    if (command === 'recordatorio') {
        if (!isAdmin) return m.reply(`❌ Solo admins ${user}`, m, { mentions: [m.sender] })

        let hoy = new Date().toLocaleDateString('es-PE', { weekday: 'long' }).toLowerCase()
          .replace('miércoles','miercoles').replace('sábado','sabado')
        if (!dias.includes(hoy)) return m.reply(`Hoy domingo descansen ${user}`, m, { mentions: [m.sender] })

        let responsable = chat[hoy]
        if (!responsable) return m.reply(`⚠️ ${user} Sin asignar para hoy`, m, { mentions: [m.sender] })

        let target = `@${responsable.split('@')[0]}`
        let txt = `🔔 *RECORDATORIO*

${user}

${target} te toca sortear hoy *${hoy.toUpperCase()}* 🎁`

        return conn.reply(m.chat, txt, m, { mentions: [m.sender, responsable] })
    }

}
handler.help = ['setlunes @', 'lunes', 'tabla', 'recordatorio']
handler.tags = ['staff']
handler.command = ['setlunes','setmartes','setmiercoles','setjueves','setviernes','setsabado','lunes','martes','miercoles','jueves','viernes','sabado','tabla','recordatorio']
handler.group = true
export default handler