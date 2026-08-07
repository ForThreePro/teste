let db = global.db.data.escalaSorteos = global.db.data.escalaSorteos || {}

let handler = async (m, { conn, isAdmin, command, args, groupMetadata, text }) => {
    if (!m.isGroup) return m.reply(`❌ Solo en grupos`)

    let user = `@${m.sender.split('@')[0]}`
    let chat = db[m.chat] = db[m.chat] || {lunes:[],martes:[],miercoles:[],jueves:[],viernes:[],sabado:[]}
    let dias = ['lunes','martes','miercoles','jueves','viernes','sabado']
    let emoji = {lunes:'🌙', martes:'💼', miercoles:'📊', jueves:'📢', viernes:'🎉', sabado:'🎁'}
    let participants = groupMetadata.participants

    const buscarUsuario = (texto) => {
        if (!texto) return null
        texto = texto.toLowerCase().replace(/[^0-9a-z]/g, '')
        let porNumero = participants.find(p => p.id.includes(texto))
        if (porNumero) return porNumero.id
        let porNombre = participants.find(p => (p.name || p.notify || '').toLowerCase().replace(/[^0-9a-z]/g, '').includes(texto))
        if (porNombre) return porNombre.id
        return null
    }

    // =====.helpstaff =====
    if (command === 'helpstaff') {
        let txt = `🐉 ━━━━━━━━ *MANUAL SHENLONG* ━━━━━━━━ 🐉

📖 *COMANDOS DE ESCALA STAFF* 📖

┌─ *AGREGAR STAFF* ─┐
│ ✅.setlunes @usuario │
│ ✅.setmartes @usuario │
└───────────────────┘
💡 *TIP:* Puedes poner varios @ juntos
Ej:.setlunes @pepito @maria @ana

┌─ *VER ESCALA* ─┐
│ 👀.lunes.martes.miercoles │
│ 👀.jueves.viernes.sabado │
└────────────────┘

┌─ *LIMPIAR DIA* ─┐
│ 🗑️.limpiarlunes...hasta sabado │
└──────────────────┘

┌─ *OTROS* ─┐
│ 📊.tabla │
│ ❓.helpstaff │
└────────────┘

*NOTA:* Solo admins pueden agregar y limpiar
> "Un verdadero Guerrero Z conoce las reglas" 💥`

        return m.reply(txt, m, { mentions: [m.sender] })
    }

    // =====.set DIA @ ===== AHORA LEE VARIOS @ DEL TEXTO
    if (command.startsWith('set')) {
        if (!isAdmin) return m.reply(`🚫 *ACCESO DENEGADO*\nSolo administradores ${user}`, m, { mentions: [m.sender] })
        let dia = command.replace('set','')
        if (!dias.includes(dia)) return

        let targets = new Set()

        // 1. Agarra todos los @ mencionados oficiales
        if(m.mentionedJid.length > 0){
            m.mentionedJid.forEach(jid => targets.add(jid))
        }

        // 2. Si no hay, busca @ en el texto y nombres
        let palabras = text.split(' ').slice(1) // quita el.setlunes
        palabras.forEach(p => {
            p = p.replace('@','')
            let jid = buscarUsuario(p)
            if(jid) targets.add(jid)
        })

        if (targets.size === 0) return m.reply(`❌ *ERROR*\n${user} Menciona a los usuarios\n💡 *Ejemplo:*.set${dia} @pepito @maria @ana`, m, { mentions: [m.sender] })

        let targetsArray = [...targets]
        let agregados = []
        let yaEstaban = []

        targetsArray.forEach(who => {
            if (chat[dia].includes(who)) {
                yaEstaban.push(who)
            } else {
                chat[dia].push(who)
                agregados.push(who)
            }
        })

        if(agregados.length === 0) return m.reply(`⚠️ *NADIE NUEVO*\n${user} Todos ya estaban en la escala de *${dia.toUpperCase()}*`, m, { mentions: [m.sender,...targetsArray] })

        let txt = `🐉 ━━━━━━━━ *REGISTRO SHENLONG* ━━━━━━━━ 🐉

✨ *AGREGADOS CON EXITO* ✨

${emoji[dia]} *DIA:* ${dia.toUpperCase()}
${emoji[dia]} *CANTIDAD:* ${agregados.length} guerreros

*LISTA AGREGADA:*
`
        agregados.forEach((jid, i) => {
            txt += `${i+1}. @${jid.split('@')[0]}\n`
        })

        if(yaEstaban.length > 0){
            txt += `\n⚠️ *YA ESTABAN:* ${yaEstaban.length}`
        }

        txt += `\n\n👮 *REGISTRADO POR:* ${user}`
        txt += `\n> "El ki de estos guerreros ha sido registrado" 💥`

        return conn.reply(m.chat, txt, m, { mentions: [m.sender,...agregados,...yaEstaban] })
    }

    // =====.lunes =====
    if (dias.includes(command)) {
        let dia = command
        if (chat[dia].length === 0) return m.reply(`📭 *ESCALA VACIA*\n${user}\nNo hay guerreros asignados para *${dia.toUpperCase()}*`, m, { mentions: [m.sender] })

        let txt = `🐉 ━━━━━━━━ *ESCALA ${dia.toUpperCase()}* ━━━━━━━━ 🐉

👮 *CONSULTADO POR:* ${user}
👥 *TOTAL GUERREROS:* ${chat[dia].length}

`
        let mentions = [m.sender,...chat[dia]]

        chat[dia].forEach((jid, i) => {
            txt += `⚡ ┃ *#${i+1}* ┃ @${jid.split('@')[0]}\n`
        })

        txt += `
┌─ *IMPORTANTE* ─┐
│ ❌ Hola Bebit@ Recuerda Hacer │
│ Tu Sorteo Y No Te Ganes Un │
│ Tache ❌ │
└─────────────────┘

📸 *VERIFICACION:*
Para poder verificar tu sorteo envia @ a un admin tu sorteo realizado + cap

> "El honor de un Guerrero Z esta en juego" 💥`

        return conn.reply(m.chat, txt, m, { mentions: [...new Set(mentions)] })
    }

    // =====.limpiar DIA =====
    if (command.startsWith('limpiar')) {
        if (!isAdmin) return m.reply(`🚫 *ACCESO DENEGADO*\nSolo administradores ${user}`, m, { mentions: [m.sender] })
        let dia = command.replace('limpiar','')
        if (!dias.includes(dia)) return

        let cantidad = chat[dia].length
        chat[dia] = []

        let txt = `🐉 ━━━━━━━━ *LIMPIEZA SHENLONG* ━━━━━━━━ 🐉

🗑️ *ESCALA BORRADA* 🗑️

${emoji[dia]} *DIA:* ${dia.toUpperCase()}
🗑️ *ELIMINADOS:* ${cantidad} guerreros

👮 *EJECUTADO POR:* ${user}

> "La escala ha sido reiniciada" 💥`

        return m.reply(txt, m, { mentions: [m.sender] })
    }

    // =====.tabla =====
    if (command === 'tabla') {
        if (!isAdmin) return m.reply(`🚫 *ACCESO DENEGADO*\nSolo administradores ${user}`, m, { mentions: [m.sender] })

        let txt = `🐉 ━━━━━━━━ *TABLA SEMANAL STAFF* ━━━━━━━━ 🐉

👮 *GENERADO POR:* ${user}

`
        let mentions = [m.sender]
        dias.forEach(d => {
            txt += `━━━━━━━━━━━━━━━━━━━━━━━\n`
            txt += `${emoji[d]} *${d.toUpperCase()}* ┃ [${chat[d].length}]\n`
            if(chat[d].length > 0){
                chat[d].forEach((jid, i) => {
                    txt += ` ${i+1}. @${jid.split('@')[0]}\n`
                    mentions.push(jid)
                })
            } else {
                txt += ` └─ *Sin guerreros asignados*\n`
            }
            txt += `\n`
        })

        txt += `━━━━━━━━━━━━━━━━━━━━━━━\n`
        txt += `> "7 dias, 7 guerreros, 1 solo ganador" 💥`

        return conn.reply(m.chat, txt, m, { mentions: [...new Set(mentions)] })
    }

}
handler.help = ['helpstaff', 'setlunes @', 'lunes', 'limpiarlunes', 'tabla']
handler.tags = ['staff']
handler.command = ['helpstaff','setlunes','setmartes','setmiercoles','setjueves','setviernes','setsabado','lunes','martes','miercoles','jueves','viernes','sabado','limpiarlunes','limpiarmartes','limpiarmiercoles','limpiarjueves','limpiarviernes','limpiarsabado','tabla']
handler.group = true
export default handler