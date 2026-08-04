import { getBotConfig } from '../lib/botconfig.js'

let linkRegex = /https:\/\/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;

let handler = async (m, { conn, text, isOwner }) => {
  const botname = getBotConfig(conn, 'botname')

    if (!text) return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🌌꒷

 ⤷ ┇ 𝗘𝗥𝗥𝗢𝗥 𝗗𝗘 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 ：✿ 。

──愛 *INSTRUCCION* ╏ ❄️
🌌 ➛ Debes enviar una invitacion para que
🌌 ➛ *${botname}* se una al grupo
🌌 ➛ Ejemplo: .invite https://chat.whatsapp.com/xxxx

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`);

    let [_, code] = text.match(linkRegex) || [];

    if (!code) return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚠️꒷

 ⤷ ┇ 𝗩𝗔𝗟𝗜𝗗𝗔𝗖𝗜𝗢𝗡 𝗙𝗔𝗟𝗜𝗗𝗔 ：✿ 。

──愛 *ERROR* ╏ ❄️
⚠️ ➛ Enlace de invitacion no valido
⚠️ ➛ Verifica que sea un link de WhatsApp

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`);

    if (isOwner) {
        await conn.groupAcceptInvite(code)
            .then(res => m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🌌꒷

 ⤷ ┇ 𝗔𝗖𝗖𝗘𝗦𝗢 𝗖𝗢𝗡𝗖𝗘𝗗𝗜𝗗𝗢 ：✿ 。
꒰ ◞⁺⊹ ．Portal abierto •

  ꒱ ׁ. ᘏ 𝗥𝗘𝗣𝗢𝗥𝗧𝗘 ׅ 𝆬 ָ֢ ෆ
🌌 ➛ Me he unido exitosamente al grupo
🌌 ➛ Teletransportacion completada

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *"Instant Transmission ejecutada"* ⚡
━━━━━━━━━━━`))
            .catch(err => m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚠️꒷

 ⤷ ┇ 𝗘𝗥𝗥𝗢𝗥 𝗖𝗥𝗜𝗧𝗜𝗖𝗢 ：✿ 。

──愛 *DETALLE* ╏ ❄️
⚠️ ➛ Error al unirme al grupo
⚠️ ➛ El link puede estar caducado o lleno

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`));
    } else {
        let message = `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🌌꒷

 ⤷ ┇ 𝗦𝗢𝗟𝗜𝗖𝗜𝗧𝗨𝗗 𝗗𝗘 𝗜𝗡𝗚𝗥𝗘𝗦𝗢 ：✿ 。
꒰ ◞⁺⊹ ．Nueva solicitud •

  ꒱ ׁ. ᘏ 𝗗𝗘𝗧𝗔𝗟𝗟𝗘 ׅ 𝆬 ָ֢ ෆ
🌌 ➛ Enlace: ${text}
🌌 ➛ Por: @${m.sender.split('@')[0]}
🌌 ➛ Bot: ${botname}

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *"Solicitan acceso al sistema"* 📨
━━━━━━━━━━━`;
        await conn.sendMessage(`${global.owner[0][0]}` + '@s.whatsapp.net', { text: message, mentions: [m.sender] }, { quoted: m });
        m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🌌꒷

 ⤷ ┇ 𝗦𝗢𝗟𝗜𝗖𝗜𝗧𝗨𝗗 𝗘𝗡𝗩𝗜𝗔𝗗𝗔 ：✿ 。

  ꒱ ׁ. ᘏ 𝗘𝗦𝗧𝗔𝗗𝗢 ׅ 𝆬 ָ֢ ෆ
🌌 ➛ El link del grupo ha sido enviado al owner
🌌 ➛ Espera aprobacion

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`, null, { mentions: [m.sender] });
    }
};

handler.help = ['invite'];
handler.tags = ['owner'];
handler.command = ['invite', 'join'];

export default handler;