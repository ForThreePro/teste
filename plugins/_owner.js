let handler = async (m, { conn }) => {
    let vcard = `BEGIN:VCARD
VERSION:3.0
N:;Whois Yallico;;;
FN:Whois Yallico
ORG:𝐒𝐨𝐧 𝐆𝐨𝐤𝐮 𝐏𝐫𝐞𝐦 𝐁𝐨𝐭
TEL;type=CELL;type=VOICE;waid=51927174369:+51 927 174 369
END:VCARD`

    await conn.sendMessage(m.chat, {
        contacts: {
            displayName: 'Whois Yallico',
            contacts: [{ vcard }]
        }
    }, { quoted: m })

    await conn.reply(m.chat, `🐉 *𝐁𝐎𝐓 𝐒𝐎𝐍 𝐆𝐎𝐊𝐔 𝐏𝐑𝐄𝐌*

╭─「 👑 𝐂𝐑𝐄𝐀𝐃𝐎𝐑 」─╮
│
│ *𝐍𝐎𝐌𝐁𝐑𝐄:* 𝐖𝐡𝐨𝐢𝐬 𝐘𝐚𝐥𝐢𝐜𝐨
│ *𝐄𝐒𝐓𝐀𝐃𝐎:* 𝐊𝐚𝐦𝐞𝐡𝐚𝐦𝐞𝐡𝐚 𝐀𝐜𝐭𝐢𝐯𝐨 ⚡
│
╰─────────────────╯

> 𝐍𝐨 𝐡𝐚𝐠𝐚𝐬 𝐬𝐩𝐚𝐦 𝐨 𝐭𝐞 𝐦𝐚𝐧𝐝𝐨 𝐮𝐧 𝐆𝐞𝐧𝐤𝐢 𝐃𝐚𝐦𝐚 🐉`, m)
}

handler.help = ['owner']
handler.tags = ['info']
handler.command = ['owner']
export default handler