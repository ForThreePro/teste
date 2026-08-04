let WAMessageStubType = (await import('@whiskeysockets/baileys')).default
import fs from 'fs'
import path from 'path'
import { getBotConfig } from '../lib/botconfig.js'

const lidCache = new Map()
let handler = m => m

handler.before = async function (m, { conn }) {
    if (!m.messageStubType ||!m.isGroup) return

    let chat = global.db.data.chats[m.chat]
    let userss = m.messageStubParameters?.[0]
    if (!userss) return

    const realSenderRaw = await resolveLidToRealJid(m?.sender, conn, m?.chat)
    const realSender = realSenderRaw?.includes('@')? realSenderRaw : null

    const userTag = `@${userss.split('@')[0]}`
    const adminTag = realSender? `@${realSender.split('@')[0]}` : 'SYSTEM'

    const mentions = [userss]
    if (realSender) mentions.push(realSender)

    const context = {
        contextInfo: {
            mentionedJid: mentions,
            isForwarded: true,
            forwardingScore: 999
        }
    }

    // IMAGEN DBZ FIJA
    let banner = 'https://files.evogb.win/INtgbw.jpg'

    // DISEÑO DBZ PROMOTE - ESTILO PREM
    const admingp = `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.☕꒷

 ⤷ ┇ 𝗔𝗟𝗘𝗥𝗧𝗔 𝗗𝗘 𝗚𝗥𝗨𝗣𝗢 ：✿ 。
꒰ ◞⁺⊹ ．Nuevo Admin Detectado •

  ꒱ ׁ. ᘏ 𝗚𝗨𝗘𝗥𝗘𝗥𝗢 𝗔𝗦𝗖𝗘𝗡𝗗𝗜𝗗𝗢 ׅ 𝆬 ָ֢ ෆ
☕ ➛ Usuario: ${userTag}
☕ ➛ Rango: *SUPER SAIYAJIN* ⚡
☕ ➛ Otorgado por: ${adminTag}

──愛 *PODERES DESBLOQUEADOS* ╏ 💥
☕ ➛ Expulsar / Promover miembros
☕ ➛ Editar info y nombre del grupo
☕ ➛ Cambiar configuración
☕ ➛ Activar modo anuncios

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> "Con gran poder viene gran responsabilidad" 💥
━━━━━━━━━━━`.trim()

    // DISEÑO DBZ DEMOTE - ESTILO PREM
    const noadmingp = `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.💀꒷

 ⤷ ┇ 𝗔𝗟𝗘𝗥𝗧𝗔 𝗗𝗘 𝗚𝗥𝗨𝗣𝗢 ：✿ 。
꒰ ◞⁺⊹ ．Rango Revocado •

  ꒱ ׁ. ᘏ 𝗚𝗨𝗘𝗥𝗘𝗥𝗢 𝗗𝗘𝗚𝗥𝗔𝗗𝗔𝗗𝗢 ׅ 𝆬 ָ֢ ෆ
💀 ➛ Usuario: ${userTag}
💀 ➛ Estado: *RANGO REVOCADO* 🔒
💀 ➛ Por: ${adminTag}

──愛 *ACCESO BLOQUEADO* ╏ ❄️
💀 ➛ Sin permisos de administrador
💀 ➛ Comandos de admin bloqueados
💀 ➛ Nivel: Guerrero Z

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> "Sin aura, sin poder" ⚡
━━━━━━━━━━━`.trim()

    // LIMPIAR SESSION SI KICKEAN BOT
    if (chat.detect && m.messageStubType == 2) {
        const uniqid = (m.isGroup? m.chat : m.sender).split('@')[0]
        const sessionPath = `./sessions/`
        try {
            for (const file of await fs.readdir(sessionPath)) {
                if (file.includes(uniqid)) {
                    await fs.unlink(path.join(sessionPath, file))
                }
            }
        } catch {}
    }

    // PROMOTE
    if (chat.alerts && m.messageStubType == 29) {
        await conn.sendMessage(m.chat, {
            image: { url: banner },
            caption: admingp,
           ...context
        }, { quoted: null })
        return
    }

    // DEMOTE
    if (chat.alerts && m.messageStubType == 30) {
        await conn.sendMessage(m.chat, {
            image: { url: banner },
            caption: noadmingp,
           ...context
        }, { quoted: null })
        return
    }

    if (m.messageStubType == 2) return
}

export default handler

async function resolveLidToRealJid(lid, conn, groupChatId, maxRetries = 3, retryDelay = 60000) {
    const inputJid = lid?.toString?.() || ''
    if (!inputJid.endsWith("@lid") ||!groupChatId?.endsWith("@g.us")) {
        return inputJid.includes("@")? inputJid : `${inputJid}@s.whatsapp.net`
    }

    if (lidCache.has(inputJid)) {
        return lidCache.get(inputJid)
    }

    const lidToFind = inputJid.split("@")[0]
    let attempts = 0

    while (attempts < maxRetries) {
        try {
            const metadata = await conn?.groupMetadata(groupChatId)
            if (!metadata?.participants) throw new Error()

            for (const participant of metadata.participants) {
                try {
                    if (!participant?.jid) continue
                    const contactDetails = await conn?.onWhatsApp(participant.jid)
                    if (!contactDetails?.[0]?.lid) continue

                    const possibleLid = contactDetails[0].lid.split("@")[0]
                    if (possibleLid === lidToFind) {
                        lidCache.set(inputJid, participant.jid)
                        return participant.jid
                    }
                } catch {}
            }
            lidCache.set(inputJid, inputJid)
            return inputJid
        } catch {
            if (++attempts >= maxRetries) {
                lidCache.set(inputJid, inputJid)
                return inputJid
            }
            await new Promise(r => setTimeout(r, retryDelay))
        }
    }
    return inputJid
}