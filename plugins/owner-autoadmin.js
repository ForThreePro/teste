const handler = async (m, {conn, isAdmin, groupMetadata }) => {
  if (isAdmin) return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚠️꒷

 ⤷ ┇ 𝗔𝗩𝗜𝗦𝗢 𝗗𝗘𝗟 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 ：✿ 。

  ꒱ ׁ. ᘏ 𝗘𝗦𝗧𝗔𝗗𝗢 ׅ 𝆬 ָ֢ ෆ
⚠️ ➛ Ya eres administrador
⚠️ ➛ Tu ki ya esta al maximo

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`);

  try {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
    await m.react('✅')
    m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🌟꒷

 ⤷ ┇ 𝗔𝗦𝗖𝗘𝗡𝗦𝗢 𝗖𝗢𝗡𝗖𝗘𝗗𝗜𝗗𝗢 ：✿ 。
꒰ ◞⁺⊹ ．Evolucion completada •

  ꒱ ׁ. ᘏ 𝗥𝗘𝗣𝗢𝗥𝗧𝗘 ׅ 𝆬 ָ֢ ෆ
🌟 ➛ Usuario: @${m.sender.split('@')[0]}
🌟 ➛ Nuevo Rango: *ADMINISTRADOR*
🌟 ➛ Poder: *Nivel Super Saiyajin Dios*
🌟 ➛ Por: *SISTEMA*

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *"Tu ki ha evolucionado. Ahora eres guardian"* ⚡`, null, { mentions: [m.sender] });

  } catch (e) {
    console.error(e)
    m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚠️꒷

 ⤷ ┇ 𝗘𝗥𝗢𝗥 𝗖𝗥𝗜𝗧𝗜𝗖𝗢 ：✿ 。

──愛 *𝗗𝗘𝗧𝗔𝗟𝗟𝗘* ╏ ❄️
⚠️ ➛ No se pudo dar admin
⚠️ ➛ El bot no tiene suficiente poder

──愛 *𝗦𝗢𝗟𝗨𝗖𝗜𝗢𝗡* ╏ 🛡️
⚠️ ➛ Dale permisos de admin al bot
⚠️ ➛ Necesita ki para promover

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369`)
  }
};

handler.tags = ['owner'];
handler.help = ['autoadmin'];
handler.command = ['autoadmin'];
handler.rowner = true;
handler.group = true;
handler.botAdmin = true;
handler.owner = true;

export default handler;