let db = global.db.data.escalaSorteos = global.db.data.escalaSorteos || {}

let handler = async (m, { conn, isAdmin, command, args, groupMetadata }) => {
    if (!m.isGroup) return m.reply(`❌ Este comando solo funciona en grupos`)

    let user = `@${m.sender.split('@')[0]}`
    let chat = db[m.chat] = db[m.chat] || {lunes:[],martes:[],miercoles:[],jueves:[],viernes:[],sabado:[]}
    let dias = ['lunes','martes','miercoles','jueves','viernes','sabado']
    let emoji = {lunes:'🌙', martes:'💼', miercoles:'📊', jueves:'📢', viernes:'🎉', sabado:'🎁'}

    const buscarUsuario = (texto) => {
        if (!texto) return null
        texto = texto.toLowerCase().replace(/[^0-9a-z]/g, '')
        if (m.mentionedJid[0]) return m.mentionedJid[0]
        if (m.quoted?.sender) return m.quoted.sender
        let porNumero = groupMetadata.participants.find(p => p.id.includes(texto))
        if (porNumero) return porNumero.id
        let porNombre = groupMetadata.participants.find(p => (p.name || p.notify || '').toLowerCase().replace(/[^0-9a-z]/g, '').includes(texto))
        if (porNombre) return porNombre.id
        return null
    }

    // =====.setlunes @usuario =====
    if (command.startsWith('set')) {
        if (!isAdmin) return m.reply(`🚫 *ACCESO DENEGADO*\nSolo administradores ${user}`, m, { mentions: [m.sender] })
        let dia = command.replace('set','')
        if (!dias.includes(dia)) return

        let who = buscarUsuario(args.join(' '))
        if (!who) return m.reply(`❌ *ERROR*\n${user} Menciona o escribe el nombre\n💡 *Ejemplo:*.set${dia} @usuario`, m, { mentions: [m.sender] })
        if (chat[dia].includes(who)) return m.reply(`⚠️ *YA ESTA EN LA ESCALA*\n${user} @${who.split('@')[0]} ya fue registrado`, m, { mentions: [m.sender, who] })

        chat[dia].push(who)

        let txt = `🐉 𓆩 *𝗥𝗘𝗚𝗜𝗦𝗧𝗥𝗢 𝗦𝗛𝗘𝗡𝗟𝗢𝗡𝗚* 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— ``𝗔𝗚𝗥𝗘𝗚𝗔𝗗𝗢`` —˙𖦹.🏆꒷

──愛 *𝗗𝗘𝗧𝗔𝗟𝗘𝗦* ╏ ${emoji[dia]}
${emoji[dia]} ➛ Día: *${dia.toUpperCase()}*
${emoji[dia]} ➛ Staff: @${who.split('@')[0]}
${emoji[dia]} ➛ Posición: #${chat[dia].length}

──愛 *𝗥𝗘𝗚𝗜𝗦𝗧𝗥𝗔𝗗𝗢 𝗣𝗢𝗥* ╏ 👮
👮 ➛ ${user}

> *"El ki de este guerrero ha sido registrado"* 💥`

        return conn.reply(m.chat, txt, m, { mentions: [m.sender, who] })
    }

    // =====.lunes =====
    if (dias.includes(command)) {
        let dia = command
        if (chat[dia].length === 0) return m.reply(`📭 *ESCALA VACÍA*\n${user}\nNo hay guerreros asignados para *${dia.toUpperCase()}*`, m, { mentions: [m.sender] })

        let txt = `🐉 𓆩 *𝗘𝗦𝗖𝗔𝗟𝗔 ${dia.toUpperCase()}* 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— ``𝗟𝗜𝗦𝗧𝗔 𝗗𝗘 𝗚𝗨𝗘𝗥𝗘𝗥𝗢𝗦`` —˙𖦹.🏆꒷

──愛 *𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔𝗗𝗢 𝗣𝗢𝗥* ╏ 👮
👮 ➛ ${user}
👮 ➛ Total: ${chat[dia].length} guerreros\n`

        let mentions = [m.sender,...chat[dia]]
        chat[dia].forEach((jid, i) => {
            txt += `──愛 *𝗚𝗨𝗘𝗥𝗘𝗥𝗢 #${i+1}* ╏ ⚡\n⚡ ➛ @${jid.split('@')[0]}\n`
        })

        txt += `\n──愛 *𝗥𝗘𝗖𝗨𝗘𝗥𝗗𝗔* ╏ ❌\n❌ ➛ Hola Bebit@ Recuerda Hacer Tu Sorteo Y No Te Ganes Un Tache ❌\n\n──愛 *𝗩𝗘𝗥𝗜𝗙𝗜𝗖𝗔𝗖𝗜𝗢𝗡* ╏ 📸\n📸 ➛ Para poder verificar tu sorteo envía @ a un admin tu sorteo realizado + cap\n> *"El honor de un Guerrero Z está en juego"* 💥`

        return conn.reply(m.chat, txt, m, { mentions: [...new Set(mentions)] })
    }

    // =====.limpiarlunes =====
    if (command.startsWith('limpiar')) {
        if (!isAdmin) return m.reply(`🚫 *ACCESO DENEGADO*\nSolo administradores ${user}`, m, { mentions: [m.sender] })
        let dia = command.replace('limpiar','')
        if (!dias.includes(dia)) return

        let cantidad = chat[dia].length
        chat[dia] = []

        let txt = `🐉 𓆩 *𝗟𝗜𝗠𝗣𝗜𝗘𝗭𝗔 𝗦𝗛𝗘𝗡𝗟𝗢𝗡𝗚* 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— ``𝗘𝗦𝗖𝗔𝗟𝗔 𝗕𝗢𝗥𝗔𝗗𝗔`` —˙𖦹.🏆꒷

──愛 *𝗗𝗘𝗧𝗔𝗟𝗟𝗘𝗦* ╏ 🗑️
🗑️ ➛ Día: *${dia.toUpperCase()}*
🗑️ ➛ Eliminados: ${cantidad} guerreros

──愛 *𝗘𝗝𝗘𝗖𝗨𝗧𝗔𝗗𝗢 𝗣𝗢𝗥* ╏ 👮
👮 ➛ ${user}

> *"La escala ha sido reiniciada"* 💥`

        return m.reply(txt, m, { mentions: [m.sender] })
    }

    // =====.tabla =====
    if (command === 'tabla') {
        if (!isAdmin) return m.reply(`🚫 *ACCESO DENEGADO*\nSolo administradores ${user}`, m, { mentions: [m.sender] })

        let txt = `🐉 𓆩 *𝗧𝗔𝗕𝗟𝗔 𝗦𝗘𝗠𝗔𝗡𝗔𝗟 𝗦𝗧𝗔𝗙* 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— ``𝗔𝗚𝗘𝗡𝗗𝗔 𝗖𝗢𝗠𝗣𝗟𝗘𝗧𝗔`` —˙𖦹.🏆꒷

──愛 *𝗚𝗘𝗡𝗘𝗥𝗔𝗗𝗢 𝗣𝗢𝗥* ╏ 👮
👮 ➛ ${user}\n`

        let mentions = [m.sender]
        dias.forEach(d => {
            txt += `\n──愛 *${d.toUpperCase()}* ╏ ${emoji[d]} [${chat[d].length}]\n`
            if(chat[d].length > 0){
                chat[d].forEach((jid, i) => {
                    txt += `${emoji[d]} ➛ ${i+1}. @${jid.split('@')[0]}\n`
                    mentions.push(jid)
                })
            } else {
                txt += `${emoji[d]} ➛ *Sin guerreros asignados*\n`
            }
        })

        txt += `\n> *"7 días, 7 guerreros, 1 solo ganador"* 💥`

        return conn.reply(m.chat, txt, m, { mentions: [...new Set(mentions)] })
    }

}
handler.help = ['setlunes @', 'lunes', 'limpiarlunes', 'tabla']
handler.tags = ['staff']
handler.command = ['setlunes','setmartes','setmiercoles','setjueves','setviernes','setsabado','lunes','martes','miercoles','jueves','viernes','sabado','limpiarlunes','limpiarmartes','limpiarmiercoles','limpiarjueves','limpiarviernes','limpiarsabado','tabla']
handler.group = true
export default handler