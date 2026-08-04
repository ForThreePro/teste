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

    await conn.reply(m.chat, `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.☕꒷

 ⤷ ┇ 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢𝗡 𝗗𝗘𝗟 𝗖𝗥𝗘𝗔𝗗𝗢𝗥 ：✿ 。
꒰ ◞⁺⊹ ．Kame House •

  ꒱ ׁ. ᘏ 𝗗𝗔𝗧𝗢𝗦 ׅ 𝆬 ָ֢ ෆ
☕ ➛ Nombre: *Whois Yallico*
☕ ➛ Estado: *Kamehameha Activo* ⚡
☕ ➛ Numero: +51 927 174 369
☕ ➛ Bot: *SON GOKU PREM* 🐉

──愛 *MENSAJE* ╏ 💥
☕ ➛ No hagas spam o te mando un Genki Dama

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *"El creador del sistema Saiyan"* 
━━━━━━━━━━━`, m)
}

handler.help = ['owner']
handler.tags = ['info']
handler.command = ['owner']
export default handler