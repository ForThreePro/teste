var handler = async (m, { conn, participants }) => {
  const groupInfo = await conn.groupMetadata(m.chat);
  const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net';
  const ownerBot = globalThis.owner[0][0] + '@s.whatsapp.net';

  let targets = participants
 .map(p => p.id)
 .filter(id => id!== conn.user.jid)
 .filter(id => id!== ownerGroup)
 .filter(id => id!== ownerBot)
 .filter(id => {
      const isAdmin = participants.find(p => p.id === id)?.admin
      return!isAdmin // No expulsa admins
    });

  if (!targets.length) {
    return conn.reply(m.chat, `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚠️꒷

 ⤷ ┇ 𝗔𝗗𝗩𝗘𝗥𝗧𝗘𝗡𝗖𝗜𝗔 𝗗𝗘𝗟 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 ：✿ 。

  ꒱ ׁ. ᘏ 𝗘𝗦𝗧𝗔𝗗𝗢 ׅ 𝆬 ָ֢ ෆ
⚠️ ➛ No hay usuarios validos para expulsar
⚠️ ➛ Solo quedan admins y owners

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`, m);
  }

  // Mensaje de advertencia antes de ejecutar
  await conn.reply(m.chat, `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚔️꒷

 ⤷ ┇ 𝗘𝗝𝗘𝗖𝗨𝗧𝗔𝗡𝗗𝗢 𝗣𝗥𝗢𝗧𝗢𝗖𝗢𝗟𝗢 ：✿ 。
꒰ ◞⁺⊹ ．Genki Dama Grupal •

  ꒱ ׁ. ᘏ 𝗥𝗘𝗣𝗢𝗥𝗧𝗘 ׅ 𝆬 ָ֢ ෆ
⚔️ ➛ Objetivos: *${targets.length}*
⚔️ ➛ Estado: *Eliminando...* 🔴
⚔️ ➛ Autor: @${m.sender.split('@')[0]}

──愛 *AVISO* ╏ 💥
⚔️ ➛ Iniciando limpieza del sistema

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *"¡El poder de todos se concentra!"*
━━━━━━━━━━━`, m, { mentions: [m.sender] });

  await conn.groupParticipantsUpdate(m.chat, targets, 'remove');

  await conn.reply(m.chat, `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚔️꒷

 ⤷ ┇ 𝗣𝗥𝗢𝗧𝗢𝗖𝗢𝗟𝗢 𝗖𝗢𝗠𝗣𝗟𝗘𝗧𝗔𝗗𝗢 ：✿ 。
꒰ ◞⁺⊹ ．Purgado exitoso •

  ꒱ ׁ. ᘏ 𝗥𝗘𝗣𝗢𝗥𝗧𝗘 ׅ 𝆬 ָ֢ ෆ
⚔️ ➛ Expulsados: *${targets.length}*
⚔️ ➛ Estado: *Grupo limpio* ✅
⚔️ ➛ Por: @${m.sender.split('@')[0]}

──愛 *SISTEMA* ╏ 💥
⚔️ ➛ El sistema ha sido purgado

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *"No queda nadie... solo el silencio"*
━━━━━━━━━━━`, m, { mentions: [m.sender] });
};

handler.help = ['kickall'];
handler.tags = ['group'];
handler.command = ['kickall'];
handler.admin = true;
handler.botAdmin = true;
handler.group = true

export default handler;