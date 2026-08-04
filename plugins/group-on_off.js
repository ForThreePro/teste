let handler = async (m, { conn, args, command, isOwner }) => {
  const setting = args[0]?.toLowerCase();
  const chatData = global.db.data.chats[m.chat];
  const botSettings = global.db.data.settings[conn.user.jid];

  const on = '✅';
  const off = '❌';

  // AGARRAR FOTO Y NOMBRE DEL GRUPO
  let pp;
  let groupName = await conn.getName(m.chat);
  try {
    pp = await conn.profilePictureUrl(m.chat, 'image');
  } catch {
    pp = 'https://files.evogb.win/INtgbw.jpg'; // default si no hay foto
  }

  const configList = `
🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚔️꒷

 ⤷ ┇ 𝗣𝗔𝗡𝗘𝗟 𝗗𝗘 𝗖𝗢𝗡𝗧𝗥𝗢𝗟 ：✿ 。

  ꒱ ׁ. ᘏ 𝗖𝗢𝗡𝗙𝗜𝗚𝗨𝗥𝗔𝗖𝗜𝗢𝗡 ׅ 𝆬 ָ֢ ෆ
⚔️ ➛ ${chatData.welcome? on : off} Bienvenida
⚔️ ➛ ${chatData.antiLink? on : off} Anti Enlaces
⚔️ ➛ ${chatData.economy? on : off} Economia Zeni
⚔️ ➛ ${chatData.gacha? on : off} Capsulas Gacha
⚔️ ➛ ${chatData.adminonly? on : off} Modo Dios
⚔️ ➛ ${chatData.reaction? on : off} Reacciones Ki
⚔️ ➛ ${chatData.nsfw? on : off} NSFW
⚔️ ➛ ${chatData.alerts? on : off} Alerta Peligro
⚔️ ➛ ${chatData.notprefix? on : off} Sin Prefijo
⚔️ ➛ ${botSettings?.jadibotmd? on : off} SubBots

──愛 *USO* ╏ 💥
⚔️ ➛.${command} welcome on/off
⚔️ ➛.${command} antilink on/off

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369`.trim();

  if (!setting) {
    return conn.sendMessage(m.chat, {
      image: { url: pp },
      caption: `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚔️꒷

 ⤷ ┇ 𝗚𝗥𝗨𝗣𝗢 ：✿ 。
⚔️ ➛ ${groupName}

${configList}`,
      mentions: [m.sender]
    }, { quoted: m });
  }

  const status = command === 'on';
  const reply = (name) => conn.sendMessage(m.chat, {
    image: { url: pp },
    caption: `
🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚔️꒷

 ⤷ ┇ 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 𝗔𝗖𝗧𝗨𝗔𝗟𝗜𝗭𝗔𝗗𝗢 ：✿ 。
꒰ ◞⁺⊹ ．Modulo actualizado •

  ꒱ ׁ. ᘏ 𝗗𝗔𝗧𝗢𝗦 ׅ 𝆬 ָ֢ ෆ
⚔️ ➛ Funcion: ${name}
⚔️ ➛ Estado: ${status? '✅ ACTIVADO' : '❌ DESACTIVADO'}
⚔️ ➛ Ki: ${status? 'Nivel Super Saiyajin' : 'Nivel Base'}

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369`.trim(),
    mentions: [m.sender]
  }, { quoted: m });

  switch (setting) {
    case 'antilink': case 'antilinks': case 'antienlaces':
      chatData.antiLink = status; await global.db.write(); reply('Anti Enlaces'); break;

    case 'rpg': case 'economia':
      chatData.rpg = status; chatData.economy = status; await global.db.write(); reply('Economia Zeni'); break;

    case 'gacha':
      chatData.gacha = status; await global.db.write(); reply('Capsulas Gacha'); break;

    case 'modoadmin': case 'adminonly': case 'onlyadmin':
      chatData.adminonly = status; await global.db.write(); reply('Modo Dios'); break;

    case 'nsfw':
      chatData.nsfw = status; await global.db.write(); reply('NSFW'); break;

    case 'bienvenida': case 'welcome':
      chatData.welcome = status; await global.db.write(); reply('Bienvenida'); break;

    case 'reaccion': case 'reaction':
      chatData.reaction = status; await global.db.write(); reply('Reacciones Ki'); break;

    case 'alerts': case 'alertas':
      chatData.alerts = status; await global.db.write(); reply('Alerta Peligro'); break;

    case 'notprefix': case 'noprefix': case 'sinprefijo':
      chatData.notprefix = status; await global.db.write(); reply('Sin Prefijo'); break;

    case 'serbot': case 'jadibot': case 'subbots':
      if (!isOwner) return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚠️꒷

 ⤷ ┇ 𝗔𝗖𝗖𝗘𝗦𝗢 𝗗𝗘𝗡𝗘𝗚𝗔𝗗𝗢 ：✿ 。

──愛 *SEGURIDAD* ╏ ❄️
⚠️ ➛ Solo el Maestro puede usar esto
⚠️ ➛ Tu ki no es suficiente

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369`);
      if (botSettings) { botSettings.jadibotmd = status; await global.db.write(); reply('SubBots'); }
      break;

    default:
      return conn.sendMessage(m.chat, {
        image: { url: pp },
        caption: `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚠️꒷

 ⤷ ┇ 𝗘𝗥𝗥𝗢𝗥 ：✿ 。

──愛 *OPCION NO VALIDA* ╏ ❄️
⚠️ ➛ Revisa el Panel de Control

${configList}`,
        mentions: [m.sender]
      }, { quoted: m });
  }
};

handler.help = ['on', 'off'];
handler.tags = ['group'];
handler.command = ['on', 'off'];
handler.admin = true;
handler.botAdmin = false;
export default handler