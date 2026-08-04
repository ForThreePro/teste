let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;
let linkRegex1 = /whatsapp.com\/channel\/([0-9A-Za-z]{20,24})/i;

export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner, participants }) {
    if (!m.isGroup) return 
    if (isAdmin || isOwner || m.fromMe || isROwner) return

    let chat = global.db.data.chats[m.chat];
    const user = `@${m.sender.split`@`[0]}`;
    const groupAdmins = participants.filter(p => p.admin);

    const isGroupLink = linkRegex.exec(m.text) || linkRegex1.exec(m.text);

    if (chat.antiLink && isGroupLink && !isAdmin) {
        // SI EL LINK ES DEL MISMO GRUPO NO HACE NADA
        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat).catch(() => "")}`;
            if (m.text.includes(linkThisGroup)) return !0;
        }

        // AVISO DBZ - ESTILO PREM
        await conn.sendMessage(m.chat, { 
            image: { url: 'https://files.evogb.win/INtgbw.jpg' },
            caption: `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🚨꒷

 ⤷ ┇ 𝗥𝗔𝗗𝗔𝗥 𝗗𝗘𝗟 𝗗𝗥𝗔𝗚𝗢𝗡 ：✿ 。
꒰ ◞⁺⊹ ．Amenaza Detectada •

  ꒱ ׁ. ᘏ 𝗔𝗟𝗘𝗥𝗧𝗔 𝗗𝗘 𝗦𝗘𝗚𝗨𝗥𝗜𝗗𝗔𝗗 ׅ 𝆬 ָ֢ ෆ
🚨 ➛ Infractor: ${user}
🚨 ➛ Tipo: *ENLACE EXTERNO*
🚨 ➛ Estado: *ELIMINANDO AMENAZA* ⚡

──愛 *SISTEMA ANTI-LINK* ╏ 💥
🚨 ➛ Los enlaces externos estan prohibidos
🚨 ➛ Protegiendo este grupo con el poder de Shenlon

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> "Nadie rompe las reglas en mi territorio" 
━━━━━━━━━━━`.trim(),
            mentions: [m.sender] 
        }, { quoted: m });

        // SI NO ES ADMIN EL BOT
        if (!isBotAdmin) {
            return conn.sendMessage(m.chat, { 
                image: { url: 'https://files.evogb.win/INtgbw.jpg' },
                caption: `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚠️꒷

 ⤷ ┇ 𝗘𝗥𝗥𝗢𝗥 𝗗𝗘 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 ：✿ 。
꒰ ◞⁺⊹ ．Ki Insuficiente •

──愛 *PERMISOS REQUERIDOS* ╏ ❄️
⚠️ ➛ No tengo suficiente poder para eliminar
⚠️ ➛ Activenme como Admin para usar mis tecnicas

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> "Dame poder y acabare con la amenaza"
━━━━━━━━━━━`.trim(),
                mentions: groupAdmins.map(v => v.id) 
            }, { quoted: m });
        }

        // ELIMINAR Y KICK
        if (isBotAdmin) {
            await conn.sendMessage(m.chat, { delete: m.key });
            await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
            await conn.sendMessage(m.chat, {
                image: { url: 'https://files.evogb.win/INtgbw.jpg' },
                caption: `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.🔥꒷

 ⤷ ┇ 𝗠𝗜𝗦𝗜𝗢𝗡 𝗖𝗨𝗠𝗣𝗟𝗜𝗗𝗔 ：✿ 。

  ꒱ ׁ. ᘏ 𝗔𝗠𝗘𝗡𝗔𝗭𝗔 𝗘𝗟𝗜𝗠𝗜𝗡𝗔𝗗𝗔 ׅ 𝆬 ָ֢ ෆ
🔥 ➛ ${user} fue expulsado del grupo
🔥 ➛ El grupo esta seguro nuevamente

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> "Asi se trata a los invasores" 💥
━━━━━━━━━━━`.trim(),
                mentions: [m.sender]
            })
        }
    }
    return !0;
}