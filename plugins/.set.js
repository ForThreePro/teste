let handler = async (m, { conn, command, text }) => {
    let chat = global.db.data.chats[m.chat]
    if (!chat.listaDias) chat.listaDias = {
        lunes: [], martes: [], miercoles: [], jueves: [], viernes: [], sabado: []
    }

    let dia = command.replace(/set|borrar|sortear/g, '')
    let diasValidos = ['lunes','martes','miercoles','jueves','viernes','sabado']
    if (!diasValidos.includes(dia)) return

    let user = `@${m.sender.split('@')[0]}`

    // =====.setlunes @ =====
    if (command.startsWith('set')) {
        let users = m.mentionedJid
        if (!users || users.length === 0) return m.reply(`❌ *Uso:*.set${dia} @persona1 @persona2`, m)

        chat.listaDias[dia] = [...new Set([...chat.listaDias[dia],...users])]

        let lista = chat.listaDias[dia].map((v,i) => `${i+1}. @${v.split('@')[0]}`).join('\n')
        let txt = `✅ *${user} ACTUALIZÓ LA LISTA DE ${dia.toUpperCase()}*\n\n${lista}\n\n_Total: ${chat.listaDias[dia].length}_`
        return conn.reply(m.chat, txt, m, { mentions: chat.listaDias[dia].concat(m.sender) })
    }

    // =====.lunes =====
    if (diasValidos.includes(command)) {
        let lista = chat.listaDias[dia]
        if (lista.length === 0) return m.reply(`📅 *${user}*\n\nLa lista de *${dia}* está vacía.\nUsa:.set${dia} @para agregar`, m)

        let texto = `📅 *LISTA ${dia.toUpperCase()} - ${user}*\n\n`
        lista.forEach((v, i) => {
            texto += `${i+1}. @${v.split('@')[0]}\n`
        })
        texto += `\n_Total: ${lista.length} persona(s)_`
        return conn.reply(m.chat, texto, m, { mentions: lista.concat(m.sender) })
    }

    // =====.borrarlunes =====
    if (command.startsWith('borrar')) {
        if (!m.isAdmin) return m.reply(`❌ Solo admins ${user}`, m, { mentions: [m.sender] })
        if (chat.listaDias[dia].length === 0) return m.reply(`⚠️ La lista de ${dia} ya está vacía ${user}`, m, { mentions: [m.sender] })
        chat.listaDias[dia] = []
        return m.reply(`🗑️ *${user} borró la lista de ${dia}*`, m, { mentions: [m.sender] })
    }

    // =====.sortearlunes NUEVO =====
    if (command.startsWith('sortear')) {
        let lista = chat.listaDias[dia]
        if (lista.length === 0) return m.reply(`❌ No hay nadie en la lista de ${dia} ${user}`, m, { mentions: [m.sender] })

        let ganador = lista[Math.floor(Math.random() * lista.length)]
        let txt = `🎉 *SORTEO ${dia.toUpperCase()}* 🎉\n\n${user} sacó a:\n\n👑 @${ganador.split('@')[0]} 👑\n\n*FELICIDADES!*`
        return conn.reply(m.chat, txt, m, { mentions: [ganador, m.sender] })
    }

}

handler.help = [
'📅 *SISTEMA DE SORTEO POR DÍAS* 📅',
'setlunes @ | setmartes @ |...',
'lunes | martes |...',
'borrarlunes | borrarmartes |...',
'sortearlunes | sortearmartes |...'
]
handler.tags = ['sorteo']
handler.command = [
    'setlunes','setmartes','setmiercoles','setjueves','setviernes','setsabado',
    'lunes','martes','miercoles','jueves','viernes','sabado',
    'borrarlunes','borrarmartes','borrarmiercoles','borrarjueves','borrarviernes','borrarsabado',
    'sortearlunes','sortearmartes','sortearmiercoles','sortearjueves','sortearviernes','sortearsabado'
]
handler.group = true
handler.admin = true

export default handler