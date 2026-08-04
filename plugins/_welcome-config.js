import fs from 'fs'
import { join } from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'
const execAsync = promisify(exec)

// FUNCION PARA GUARDAR AUDIO EN MP3
const saveAudio = async (m, type) => {
  let q = m.quoted
  let mime = (q.msg || q).mimetype || q.mimetype || ''
  if (!/audio/.test(mime)) return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚠️꒷

 ⤷ ┇ 𝗘𝗥𝗢𝗥 ：✿ 。

──愛 *TIPO INCORRECTO* ╏ ❄️
⚠️ ➛ Eso no es un audio
⚠️ ➛ Responde a un audio MP3/PTT

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`);

  let chat = global.db.data.chats[m.chat] || {}
  let buffer = await q.download()
  let tempFile = join('./temp', `${m.chat}_temp_${Date.now()}.ogg`)
  let fileName = join('./temp', `${m.chat}_${type}_${Date.now()}.mp3`)
  if (!fs.existsSync('./temp')) fs.mkdirSync('./temp')
  fs.writeFileSync(tempFile, buffer)

  await execAsync(`ffmpeg -y -i "${tempFile}" -vn -ar 44100 -ac 2 -b:a 128k -c:a libmp3lame -id3v2_version 3 -metadata ptt="" "${fileName}"`)
  fs.unlinkSync(tempFile)

  chat[`${type}Audio`] = fileName
  global.db.data.chats[m.chat] = chat
  await global.db.write()
  return fileName
}

let handler = async (m, { conn, text, command, isAdmin }) => {
  if (!isAdmin) return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚠️꒷

 ⤷ ┇ 𝗘𝗥𝗢𝗥 ：✿ 。

──愛 *PERMISOS INSUFICIENTES* ╏ ❄️
⚠️ ➛ Solo admins pueden usar este comando

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`);

  let chat = global.db.data.chats[m.chat] || {}

  switch(command) {
    case 'setwelcome':
      if (!text) return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🍒꒷

 ⤷ ┇ 𝗦𝗘𝗧 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 ：✿ 。

──愛 *USO CORRECTO* ╏ 💥
🍒 ➛ ${command} [texto]
🍒 ➛ Ejemplo: ${command} @name llego a @group

──愛 *VARIABLES* ╏ 📝
🍒 ➛ @user @name @group @desc %users @action @date

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`);
      chat.welcomeText = text;
      global.db.data.chats[m.chat] = chat
      await global.db.write()
      return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🍒꒷

 ⤷ ┇ 𝗕𝗜𝗘𝗡𝗩𝗘𝗡𝗜𝗗𝗔 𝗚𝗨𝗔𝗥𝗗𝗔𝗗𝗔 ：✿ 。

  ꒱ ׁ. ᘏ 𝗘𝗫𝗜𝗧𝗢 ׅ 𝆬 ָ֢ ෆ
🍒 ➛ Mensaje de bienvenida configurado

──愛 *PREVISUALIZACION* ╏ 📝
🍒 ➛ ${text}

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *"Un nuevo guerrero se acerca"* ⚡
━━━━━━━━━━━`);

    case 'setbye':
      if (!text) return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🍒꒷

 ⤷ ┇ 𝗦𝗘𝗧 𝗕𝗬𝗘 ：✿ 。

──愛 *USO CORRECTO* ╏ 💥
🍒 ➛ ${command} [texto]
🍒 ➛ Ejemplo: ${command} @name abandono @group

──愛 *VARIABLES* ╏ 📝
🍒 ➛ @user @name @group %users @action @date

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`);
      chat.byeText = text;
      global.db.data.chats[m.chat] = chat
      await global.db.write()
      return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🍒꒷

 ⤷ ┇ 𝗗𝗘𝗦𝗣𝗘𝗗𝗜𝗗𝗔 𝗚𝗨𝗔𝗥𝗗𝗔𝗗𝗔 ：✿ 。

  ꒱ ׁ. ᘏ 𝗘𝗫𝗜𝗧𝗢 ׅ 𝆬 ָ֢ ෆ
🍒 ➛ Mensaje de despedida configurado

──愛 *PREVISUALIZACION* ╏ 📝
🍒 ➛ ${text}

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *"Otro guerrero ha caido"* 💀
━━━━━━━━━━━`);

    case 'delwelcome':
      chat.welcomeText = null;
      global.db.data.chats[m.chat] = chat
      await global.db.write()
      return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🍒꒷

 ⤷ ┇ 𝗕𝗜𝗘𝗡𝗩𝗘𝗡𝗜𝗗𝗔 𝗘𝗟𝗜𝗠𝗜𝗡𝗔𝗗𝗔 ：✿ 。

  ꒱ ׁ. ᘏ 𝗘𝗦𝗧𝗔𝗗𝗢 ׅ 𝆬 ָ֢ ෆ
🍒 ➛ Se elimino el mensaje personalizado
🍒 ➛ Volvio al mensaje DBZ por defecto

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`);

    case 'delbye':
      chat.byeText = null;
      global.db.data.chats[m.chat] = chat
      await global.db.write()
      return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🍒꒷

 ⤷ ┇ 𝗗𝗘𝗦𝗣𝗘𝗗𝗜𝗗𝗔 𝗘𝗟𝗜𝗠𝗜𝗡𝗔𝗗𝗔 ：✿ 。

  ꒱ ׁ. ᘏ 𝗘𝗦𝗧𝗔𝗗𝗢 ׅ 𝆬 ָ֢ ෆ
🍒 ➛ Se elimino el mensaje personalizado
🍒 ➛ Volvio al mensaje DBZ por defecto

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`);

    case 'audiowelcome':
      if (!m.quoted) return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚠️꒷

 ⤷ ┇ 𝗘𝗥𝗢𝗥 ：✿ 。

──愛 *FALTA AUDIO* ╏ ❄️
⚠️ ➛ Responde a un audio para guardarlo

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`);
      await saveAudio(m, 'welcome')
      return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🍒꒷

 ⤷ ┇ 𝗔𝗨𝗗𝗜𝗢 𝗚𝗨𝗔𝗥𝗗𝗔𝗗𝗢 ：✿ 。

  ꒱ ׁ. ᘏ 𝗘𝗫𝗜𝗧𝗢 ׅ 𝆬 ָ֢ ෆ
🍒 ➛ Audio MP3 de bienvenida guardado
🍒 ➛ Ya no se silenciará en grupos

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *"Sonara al entrar un guerrero"* 🎵
━━━━━━━━━━━`);

    case 'audiobye':
      if (!m.quoted) return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚠️꒷

 ⤷ ┇ 𝗘𝗥𝗥𝗢𝗥 ：✿ 。

──愛 *FALTA AUDIO* ╏ ❄️
⚠️ ➛ Responde a un audio para guardarlo

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`);
      await saveAudio(m, 'bye')
      return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🍒꒷

 ⤷ ┇ 𝗔𝗨𝗗𝗜𝗢 𝗚𝗨𝗔𝗥𝗗𝗔𝗗𝗢 ：✿ 。

  ꒱ ׁ. ᘏ 𝗘𝗫𝗜𝗧𝗢 ׅ 𝆬 ָ֢ ෆ
🍒 ➛ Audio MP3 de despedida guardado
🍒 ➛ Ya no se silenciará en grupos

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *"Sonara al irse un guerrero"* 💀
━━━━━━━━━━━`);

    case 'delaudiowelcome':
      chat.welcomeAudio = null
      global.db.data.chats[m.chat] = chat
      await global.db.write()
      return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🍒꒷

 ⤷ ┇ 𝗔𝗨𝗗𝗜𝗢 𝗘𝗟𝗜𝗠𝗜𝗡𝗔𝗗𝗢 ：✿ 。

  ꒱ ׁ. ᘏ 𝗘𝗦𝗧𝗔𝗗𝗢 ׅ 𝆬 ָ֢ ෆ
🍒 ➛ Audio de bienvenida eliminado

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`);

    case 'delaudiobye':
      chat.byeAudio = null
      global.db.data.chats[m.chat] = chat
      await global.db.write()
      return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🍒꒷

 ⤷ ┇ 𝗔𝗨𝗗𝗜𝗢 𝗘𝗟𝗜𝗠𝗜𝗡𝗔𝗗𝗢 ：✿ 。

  ꒱ ׁ. ᘏ 𝗘𝗦𝗧𝗔𝗗𝗢 ׅ 𝆬 ָ֢ ෆ
🍒 ➛ Audio de despedida eliminado

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`);
  }
}

handler.help = [
  'setwelcome <texto>', 
  'setbye <texto>', 
  'delwelcome', 
  'delbye',
  'audiowelcome',
  'audiobye', 
  'delaudiowelcome',
  'delaudiobye'
];
handler.tags = ['group'];
handler.command = /^(setwelcome|setbye|delwelcome|delbye|audiowelcome|audiobye|delaudiowelcome|delaudiobye)$/i;
handler.admin = true;
handler.group = true;

export default handler