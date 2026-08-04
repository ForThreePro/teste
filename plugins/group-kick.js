var handler = async (m, { conn, participants, usedPrefix, command }) => {
  let texto = await m.mentionedJid;
  let user = texto.length > 0? texto[0] : (m.quoted? await m.quoted.sender : false);

  if (!user) {
    return conn.reply(m.chat, `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚔️꒷

 ⤷ ┇ 𝗘𝗥𝗥𝗢𝗥 𝗗𝗘 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 ：✿ 。

──愛 *INSTRUCCION* ╏ ❄️
⚔️ ➛ Menciona o cita al usuario
⚔️ ➛ Ejemplo: ${usedPrefix}kick @usuario

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`, m);
  }

  const groupInfo = await conn.groupMetadata(m.chat);
  const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net';
  const ownerBot = globalThis.owner[0][0] + '@s.whatsapp.net';
  const protectedOwners = global.owner.map(o => o[0] + '@s.whatsapp.net');
  const targetName = globalThis.db.data.users[user]?.name || await conn.getName(user)

  if (user === m.sender) {
    return conn.reply(m.chat, `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚠️꒷

 ⤷ ┇ 𝗔𝗖𝗖𝗘𝗦𝗢 𝗗𝗘𝗡𝗘𝗚𝗔𝗗𝗢 ：✿ 。

──愛 *SEGURIDAD* ╏ ❄️
⚠️ ➛ No puedes expulsarte a ti mismo
⚠️ ➛ Accion suicida detectada

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`, m);
  }

  if (user === conn.user.jid) {
    return conn.reply(m.chat, `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚠️꒷

 ⤷ ┇ 𝗔𝗖𝗖𝗘𝗦𝗢 𝗗𝗘𝗡𝗘𝗚𝗔𝗗𝗢 ：✿ 。

──愛 *SEGURIDAD* ╏ ❄️
⚠️ ➛ No puedo expulsarme a mi mismo
⚠️ ➛ Soy el nucleo del sistema

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`, m);
  }

  if (user === ownerGroup) {
    return conn.reply(m.chat, `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚠️꒷

 ⤷ ┇ 𝗔𝗖𝗖𝗘𝗦𝗢 𝗗𝗘𝗡𝗘𝗚𝗔𝗗𝗢 ：✿ 。

──愛 *SEGURIDAD* ╏ ❄️
⚠️ ➛ No se puede expulsar al creador
⚠️ ➛ Rango: *Dios de la Destruccion*

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`, m);
  }

  if (user === ownerBot || protectedOwners.includes(user)) {
    return conn.reply(m.chat, `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚠️꒷

 ⤷ ┇ 𝗔𝗖𝗖𝗘𝗦𝗢 𝗗𝗘𝗡𝗘𝗚𝗔𝗗𝗢 ：✿ 。

──愛 *SEGURIDAD* ╏ ❄️
⚠️ ➛ No se puede expulsar al owner
⚠️ ➛ Protegido por el sistema Saiyan

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`, m);
  }

  const participant = groupInfo.participants.find(p => p.jid === user);

  if (!participant) {
    return conn.reply(m.chat, `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚔️꒷

 ⤷ ┇ 𝗨𝗦𝗨𝗔𝗥𝗜𝗢 𝗡𝗢 𝗘𝗡𝗖𝗢𝗡𝗧𝗥𝗔𝗗𝗢 ：✿ 。

  ꒱ ׁ. ᘏ 𝗘𝗦𝗧𝗔𝗗𝗢 ׅ 𝆬 ָ֢ ෆ
⚔️ ➛ ${targetName} ya no esta en el grupo
⚔️ ➛ Objetivo fuera del sistema

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`, m);
  }

  await conn.groupParticipantsUpdate(m.chat, [user], 'remove');

  await conn.reply(m.chat, `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚔️꒷

 ⤷ ┇ 𝗘𝗫𝗣𝗨𝗟𝗦𝗜𝗢𝗡 𝗘𝗝𝗘𝗖𝗨𝗧𝗔𝗗𝗔 ：✿ 。
꒰ ◞⁺⊹ ．Reporte de baja •

  ꒱ ׁ. ᘏ 𝗥𝗘𝗣𝗢𝗥𝗧𝗘 ׅ 𝆬 ָ֢ ෆ
⚔️ ➛ Usuario: ${targetName}
⚔️ ➛ Accion: *EXPULSADO* 🔻
⚔️ ➛ Poder: *Eliminado del sistema*
⚔️ ➛ Por: @${m.sender.split('@')[0]}

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *"La puerta se cerro tras su salida"* 💥
━━━━━━━━━━━`, m, { mentions: [m.sender] });
};

handler.help = ['kick'];
handler.tags = ['group'];
handler.command = ['kick'];
handler.admin = true;
handler.botAdmin = true;

export default handler;