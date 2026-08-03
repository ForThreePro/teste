let handler = async (m, { conn, command, usedPrefix, args, text, isAdmin, isBotAdmin }) => {
    
    const aurora = '~*~*~*~*~*~*~*~*~*~'
    
    if (!m.isGroup) return m.reply(`${aurora}\n ESTE COMANDO ES SOLO PARA GRUPOS\n${aurora}`)
    if (!isAdmin) return m.reply(`${aurora}\n SOLO ADMINS PUEDEN USAR ESTO\n${aurora}`)

    // ===== 1. CAMBIAR FOTO DEL GRUPO =====
    if (command === 'groupimg') {
        if (!isBotAdmin) return m.reply(`${aurora}\n NECESITO SER ADMIN PARA CAMBIAR LA FOTO\n${aurora}`)
        if (!m.quoted || !m.quoted.mimetype?.includes('image')) return m.reply(`${aurora}\n RESPONDE A UNA IMAGEN CON ${usedPrefix}groupimg\n${aurora}`)
        
        let media = await m.quoted.download()
        await conn.updateProfilePicture(m.chat, media)
        return m.reply(`${aurora}\n FOTO DE GRUPO ACTUALIZADA ✨\n${aurora}`)
    }

    // ===== 2. CAMBIAR DESCRIPCION =====
    if (command === 'gpdesc' || command === 'groupdesc') {
        if (!isBotAdmin) return m.reply(`${aurora}\n NECESITO SER ADMIN PARA CAMBIAR LA DESCRIPCION\n${aurora}`)
        if (!text) return m.reply(`${aurora}\n FALTA EL TEXTO\nEj: ${usedPrefix}gpdesc Bienvenidos a Aurora ✨\n${aurora}`)
        
        await conn.groupUpdateDescription(m.chat, text)
        return m.reply(`${aurora}\n DESCRIPCION ACTUALIZADA\nNueva desc: ${text}\n${aurora}`)
    }

    // ===== 3. CAMBIAR NOMBRE =====
    if (command === 'gpname' || command === 'groupname') {
        if (!isBotAdmin) return m.reply(`${aurora}\n NECESITO SER ADMIN PARA CAMBIAR EL NOMBRE\n${aurora}`)
        if (!text) return m.reply(`${aurora}\n FALTA EL NOMBRE\nEj: ${usedPrefix}gpname AURORA GROUP 🌌\n${aurora}`)
        if (text.length > 25) return m.reply(`${aurora}\n EL NOMBRE NO PUEDE PASAR DE 25 CARACTERES\n${aurora}`)
        
        await conn.groupUpdateSubject(m.chat, text)
        return m.reply(`${aurora}\n NOMBRE ACTUALIZADO\nNuevo nombre: ${text}\n${aurora}`)
    }

}

handler.help = ['groupimg', 'gpdesc', 'groupdesc', 'gpname', 'groupname']
handler.tags = ['group']
handler.command = /^(groupimg|gpdesc|groupdesc|gpname|groupname)$/i
handler.group = true
handler.admin = true
export default handler