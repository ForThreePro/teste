let handler = async (m, { conn, command, usedPrefix, isAdmin }) => {

    global.db.data.sorteos = global.db.data.sorteos || {}
    let sorteos = global.db.data.sorteos
    let chatId = m.chat
    sorteos[chatId] = sorteos[chatId] || {}

    const dias = ['lunes','martes','miercoles','jueves','viernes','sabado']
    const emojis = {lunes:'🌙', martes:'🌌', miercoles:'✨', jueves:'🌠', viernes:'💫', sabado:'👑'}
    const aurora = '~*~*~*~*~*~*~*~*~*~'

    let dia = command.replace(/set|borrar/g,'').toLowerCase()
    let user = `@${m.sender.split('@')[0]}` // sistema de mencion que usamos en juegos

    // Foto del grupo
    let pp = await conn.profilePictureUrl(chatId, 'image').catch(_ => 'https://i.imgur.com/8K2JhZQ.jpg')

    // ===== 1. ASIGNAR.setlunes @user =====
    if (command.startsWith('set')) {
        if (!isAdmin) return m.reply(`${aurora}\n❌ ACCESO DENEGADO ${user}\n${aurora}`, m, {mentions:[m.sender]})
        if (!dias.includes(dia)) return m.reply(`${aurora}\n❌ DÍA INVÁLIDO ${user}\n${aurora}`, m, {mentions:[m.sender]})

        let mentioned = m.mentionedJid
        if (mentioned.length === 0) return m.reply(`${aurora}\n❌ FALTA MENCIONAR ${user}\nEj: ${usedPrefix}set${dia} @user1 @user2\n${aurora}`, m, {mentions:[m.sender]})

        sorteos[chatId][dia] = [...new Set(mentioned)]

        let list = sorteos[chatId][dia].map((u, i) => `✨ ${i+1}. @${u.split('@')[0]}`).join('\n')
        let msg = `${aurora}
🌌 AURORA ${dia.toUpperCase()} ${aurora}

${user} asignó el turno
📅 Fecha: ${new Date().toLocaleDateString('es')}

✧ LUZ DEL NORTE ✧
${list}

~* brilla con tu sorteo *~
Usa *${usedPrefix}${dia}* para recordar`
        await conn.sendMessage(m.chat, { image: { url: pp }, caption: msg, mentions: mentioned.concat(m.sender) })
        return
    }

    // ===== 2. BORRAR.borrarlunes =====
    if (command.startsWith('borrar')) {
        if (!isAdmin) return m.reply(`${aurora}\n❌ ACCESO DENEGADO ${user}\n${aurora}`, m, {mentions:[m.sender]})
        if (!sorteos[chatId][dia] || sorteos[chatId][dia].length === 0) return m.reply(`${aurora}\n⚠️ NO HAY LUZ EN ${dia.toUpperCase()} ${user}\n${aurora}`, m, {mentions:[m.sender]})
        delete sorteos[chatId][dia]
        return m.reply(`${aurora}\n🗑️ AURORA APAGADA\n${user} borró ${dia.toUpperCase()}\n${aurora}`, m, {mentions:[m.sender]})
    }

    // ===== 3. RECORDATORIO.lunes =====
    if (dias.includes(command.toLowerCase())) {
        // Cualquiera puede ver la lista, solo set/borrar es de admin
        let asignados = sorteos[chatId][command.toLowerCase()]
        if (!asignados ||!asignados.length) return m.reply(`${aurora}\n🌌 CIELO VACÍO ${user}\nUsa: ${usedPrefix}set${command} @user\n${aurora}`, m, {mentions:[m.sender]})

        let list = asignados.map((u, i) => `✨ ${i+1}. @${u.split('@')[0]}`).join('\n')

        let msg = `${aurora}
🌌 AURORA ${command.toUpperCase()} ${aurora}

${emojis[command]} Hoy le toca a ${command.toUpperCase()} ${emojis[command]}
${user} está recordando

✧ CONSTELACIÓN ✧
${list}

~* Tareas estelares *~
1. Realizar sorteo
2. Pedir reacciones
3. Compartir evidencia

Que su luz ilumine el grupo ✨`
        await conn.sendMessage(m.chat, { image: { url: pp }, caption: msg, mentions: asignados.concat(m.sender) })
        return
    }

    // ===== 4. VER TODO.ver =====
    if (command === 'ver') {
        let diasConData = dias.filter(d => Array.isArray(sorteos[chatId][d]) && sorteos[chatId][d].length > 0)
        if (diasConData.length === 0) return m.reply(`${aurora}\n🌌 CIELO NOCTURNO VACÍO ${user}\n${aurora}`, m, {mentions:[m.sender]})

        let txt = `${aurora}
🌌 CIELO SEMANAL - ${user}
${aurora}\n`

        let todos = []
        for(let d of dias){
            if(!Array.isArray(sorteos[chatId][d]) || sorteos[chatId][d].length === 0) continue
            txt += `\n${emojis[d]} *${d.toUpperCase()}*\n`
            sorteos[chatId][d].forEach((u, i) => {
                txt += `✨ ${i+1}. @${u.split('@')[0]}\n`
                todos.push(u)
            })
        }
        txt += `\n~* que las auroras los guíen *~`
        await conn.sendMessage(m.chat, { image: { url: pp }, caption: txt, mentions: [...new Set(todos.concat(m.sender))] })
        return
    }
}

handler.help = [
'📅 *SISTEMA AURORA* 📅',
'setlunes @ | setmartes @ |...',
'lunes | martes |...',
'borrarlunes | borrarmartes |...',
'ver : Ver cronograma completo'
]
handler.tags = ['sorteos']
handler.command = /^(setlunes|setmartes|setmiercoles|setjueves|setviernes|setsabado|borrarlunes|borrarmartes|borrarmiercoles|borrarjueves|borrarviernes|borrarsabado|lunes|martes|miercoles|jueves|viernes|sabado|ver)$/i
handler.group = true
handler.admin = false // lo controlo manual arriba

export default handler