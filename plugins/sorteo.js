let db = global.db.data.agendaSorteos = global.db.data.agendaSorteos || {}

let handler = async (m, { conn, isAdmin, command, args }) => {
    if (!m.isGroup) return m.reply(`❌ Este comando solo funciona en grupos`)

    let user = `@${m.sender.split('@')[0]}` // MENCION2 DEL QUE USA
    let chat = db[m.chat] = db[m.chat] || {lunes:null,martes:null,miercoles:null,jueves:null,viernes:null,sabado:null}
    let dias = ['lunes','martes','miercoles','jueves','viernes','sabado']
    let emoji = {lunes:'🌙', martes:'💼', miercoles:'📊', jueves:'📢', viernes:'🎉', sabado:'🎁'}

    // =====.setlunes @usuario =====
    if (command.startsWith('set')) {
        if (!isAdmin) return m.reply(`❌ Solo admins ${user}`, m, { mentions: [m.sender] })
        let dia = command.replace('set','')
        if (!dias.includes(dia)) return

        // ACEPTA @tag / responder / numero
        let who = m.mentionedJid[0] || m.quoted?.sender || (args[0]? args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null)
        if (!who) return m.reply(`❌ ${user} Menciona a la persona\nEjemplo:.set${dia} @usuario`, m, { mentions: [m.sender] })

        let target = `@${who.split('@')[0]}` // MENCION2 DEL ASIGNADO
        chat[dia] = who

        let txt = `✅ *AGENDA ACTUALIZADA*

${user}
${emoji[dia]} *${dia.toUpperCase()}* ahora le toca sortear a ${target}`

        return conn.reply(m.chat, txt, m, { mentions: [m.sender, who] }) // MENCIONA A LOS 2
    }

    // =====.lunes =====
    if (dias.includes(command)) {
        let dia = command
        let responsable = chat[dia]
        if (!responsable) return m.reply(`⚠️ ${user} No hay nadie asignado para *${dia.toUpperCase()}*`, m, { mentions: [m.sender] })

        let target = `@${responsable.split('@')[0]}`
        let txt = `📅 *AGENDA DE SORTEOS STAFF*

${user} consultó el día ${emoji[dia]} *${dia.toUpperCase()}*

👤 Responsable: ${target}

Recuerden cobrarle el sorteo del día`

        return conn.reply(m.chat, txt, m, { mentions: [m.sender, responsable] }) // MENCIONA A LOS 2
    }

    // =====.tabla =====
    if (command === 'tabla') {
        if (!isAdmin) return m.reply(`❌ Solo admins ${user}`, m, { mentions: [m.sender] })

        let txt = `📊 *TABLA SEMANAL DE SORTEOS STAFF* 📊\n\n${user}\n\n`
        let todos = []
        dias.forEach(d => {
            txt += `${emoji[d]} *${d.toUpperCase()}*: `
            if (chat[d]) {
                txt += `@${chat[d].split('@')[0]}\n`
                todos.push(chat[d])
            } else {
                txt += `Sin asignar\n`
            }
        })

        return conn.reply(m.chat, txt, m, { mentions: [m.sender,...todos] }) // MENCIONA A TODOS + A TI
    }

    // =====.recordatorio =====
    if (command === 'recordatorio') {
        if (!isAdmin) return m.reply(`❌ Solo admins ${user}`, m, { mentions: [m.sender] })

        let hoy = new Date().toLocaleDateString('es-PE', { weekday: 'long' }).toLowerCase()
           .replace('miércoles','miercoles').replace('sábado','sabado')
        if (!dias.includes(hoy)) return m.reply(`Hoy es domingo, descansen ${user}`, m, { mentions: [m.sender] })

        let responsable = chat[hoy]
        if (!responsable) return m.reply(`⚠️ ${user} No hay nadie asignado para hoy *${hoy}*`, m, { mentions: [m.sender] })

        let target = `@${responsable.split('@')[0]}`
        let txt = `🔔 *RECORDATORIO DE SORTEO* 🔔

${user}

${target} te toca sortear hoy *${hoy.toUpperCase()}* 🎁
No olvides pasar tu sorteo`

        return conn.reply(m.chat, txt, m, { mentions: [m.sender, responsable] }) // MENCIONA A LOS 2
    }

}
handler.help = ['setlunes @', 'lunes', 'tabla', 'recordatorio']
handler.tags = ['staff']
handler.command = ['setlunes','setmartes','setmiercoles','setjueves','setviernes','setsabado','lunes','martes','miercoles','jueves','viernes','sabado','tabla','recordatorio']
handler.group = true
export default handler