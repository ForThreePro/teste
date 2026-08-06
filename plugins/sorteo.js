let db = global.db.data.agendaSorteos = global.db.data.agendaSorteos || {}

let handler = async (m, { conn, isAdmin, command, args }) => {
    if (!m.isGroup) return m.reply(`❌ Este comando solo funciona en grupos`)

    let chat = db[m.chat] = db[m.chat] || {lunes:null,martes:null,miercoles:null,jueves:null,viernes:null,sabado:null}
    let dias = ['lunes','martes','miercoles','jueves','viernes','sabado']
    let emoji = {lunes:'🌙', martes:'💼', miercoles:'📊', jueves:'📢', viernes:'🎉', sabado:'🎁'}

    // =====.setlunes @usuario =====
    if (command.startsWith('set')) {
        if (!isAdmin) return m.reply(`❌ Solo admins`)
        let dia = command.replace('set','')
        if (!dias.includes(dia)) return

        let who = m.mentionedJid[0]
        if (!who) return m.reply(`❌ Menciona a la persona\nEjemplo:.set${dia} @usuario`)

        chat[dia] = who
        await m.reply(`✅ *${dia.toUpperCase()}* ahora le toca sortear a @${who.split('@')[0]}`, null, { mentions: [who] })
        return
    }

    // =====.lunes =====
    if (dias.includes(command)) {
        let dia = command
        let responsable = chat[dia]
        if (!responsable) return m.reply(`⚠️ No hay nadie asignado para el *${dia.toUpperCase()}*`)

        let txt = `📅 *AGENDA DE SORTEOS*

${emoji[dia]} *${dia.toUpperCase()}*
Responsable: @${responsable.split('@')[0]}

Recuerden: A esa persona se le cobra el sorteo del día`
        await conn.reply(m.chat, txt, m, { mentions: [responsable] })
        return
    }

    // =====.tabla =====
    if (command === 'tabla') {
        let txt = `📊 *TABLA SEMANAL DE SORTEOS STAFF* 📊\n\n`
        dias.forEach(d => {
            txt += `${emoji[d]} *${d.toUpperCase()}*: `
            txt += chat[d]? `@${chat[d].split('@')[0]}\n` : `Sin asignar\n`
        })
        let todos = dias.map(d => chat[d]).filter(Boolean)
        await conn.reply(m.chat, txt, m, { mentions: todos })
        return
    }

    // =====.quitarlunes =====
    if (command.startsWith('quitar')) {
        if (!isAdmin) return m.reply(`❌ Solo admins`)
        let dia = command.replace('quitar','')
        if (!dias.includes(dia)) return
        chat[dia] = null
        return m.reply(`✅ Se quitó al responsable del *${dia}*`)
    }

    // =====.recordatorio =====
    if (command === 'recordatorio') {
        let hoy = new Date().toLocaleDateString('es', { weekday: 'long' }).toLowerCase()
        hoy = hoy.replace('miércoles','miercoles').replace('sábado','sabado')
        if (!dias.includes(hoy)) return m.reply(`Hoy es domingo, no hay sorteo`)

        let responsable = chat[hoy]
        if (!responsable) return m.reply(`⚠️ No hay nadie asignado para hoy *${hoy}*`)

        let txt = `🔔 *RECORDATORIO DE SORTEO* 🔔\n\n@${responsable.split('@')[0]} te toca sortear hoy *${hoy.toUpperCase()}* 🎁\nNo olvides pasar tu sorteo`
        await conn.reply(m.chat, txt, m, { mentions: [responsable] })
        return
    }

}
handler.help = ['setlunes @', 'lunes', 'tabla', 'quitarlunes', 'recordatorio']
handler.tags = ['staff']
handler.command = ['setlunes','setmartes','setmiercoles','setjueves','setviernes','setsabado','lunes','martes','miercoles','jueves','viernes','sabado','tabla','quitarlunes','quitarmartes','quitarmiercoles','quitarjueves','quitarviernes','quitarsabado','recordatorio']
handler.group = true
export default handler