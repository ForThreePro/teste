import fetch from 'node-fetch'

const MARCA = 'SON GOKU PREM 🐉'
const TZ = 'America/Lima'

let handler = async (m, { conn, text }) => {
  await conn.sendMessage(m.chat, { react: { text: '🐉', key: m.key } }).catch(_=>{})

  if (!text ||!text.includes('/')) {
    return m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.💰꒷

 ⤷ ┇ 𝗖𝗔𝗦𝗔 𝗗𝗘 𝗖𝗔𝗠𝗕𝗜𝗢𝗦 𝗦𝗔𝗜𝗬𝗔𝗝𝗜𝗡 ：✿ 。
꒰ ◞⁺⊹ ．Sistema Financiero •

  ꒱ ׁ. ᘏ 𝗜𝗡𝗦𝗧𝗥𝗨𝗖𝗜𝗢𝗡𝗘𝗦 ׅ 𝆬 ָ֢ ෆ
💰 ➛.cambio [monto] / [CODIGO] / [CODIGO]

──愛 *EJEMPLOS* ╏ ⚡
💰 ➛.cambio 100 / PEN / USD → Oficial
💰 ➛.cambio 100 / USD / ARS → BLUE 🇦🇷
💰 ➛.cambio 100 / ARS / PEN → BLUE Inverso 🇦🇷

──愛 *MONEDAS SOPORTADAS* ╏ 🌍
💰 ➛ PEN, USD, EUR, ARS, COP, MXN, BRL...

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *¡Yo calculo más rápido que una Genkidama!* ⚡
━━━━━━━━━━━`)
  }

  let [montoStr, de, a] = text.split('/').map(v => v.trim().toUpperCase())
  let monto = parseFloat(montoStr.replace(/,/g, ''))

  if (isNaN(monto) || monto <= 0) return m.reply(`⚠️ *¡Monto inválido!* Necesito un número, no aire 😤`)
  if (de.length!== 3 || a.length!== 3) return m.reply(`⚠️ *Usa códigos de 3 letras:* PEN, USD, ARS`)
  if (de === a) return m.reply(`✅ *${monto} ${de}* = *${monto} ${a}* \n*¡No hay cambio Saiyajin aquí!*`)

  try {
    let tasaUSD_ARS = null
    let tipoTasa = 'OFICIAL'

    if (de === 'ARS' || a === 'ARS') {
      let resBlue = await fetch('https://dolarapi.com/v1/dolares/blue')
      let jsonBlue = await resBlue.json()
      if(!jsonBlue.venta) throw new Error('API Blue caida')
      tasaUSD_ARS = jsonBlue.venta
      tipoTasa = 'BLUE 🔵'
    }

    let total
    if (de === 'USD' && a === 'ARS') total = (monto * tasaUSD_ARS).toFixed(2)
    else if (de === 'ARS' && a === 'USD') total = (monto / tasaUSD_ARS).toFixed(2)
    else if (de === 'ARS') {
      let res = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
      let json = await res.json()
      total = ((monto / tasaUSD_ARS) * json.rates[a]).toFixed(2)
    }
    else if (a === 'ARS') {
      let res = await fetch(`https://api.exchangerate-api.com/v4/latest/${de}`)
      let json = await res.json()
      total = ((monto * json.rates.USD) * tasaUSD_ARS).toFixed(2)
    }
    else {
      let res = await fetch(`https://api.exchangerate-api.com/v4/latest/${de}`)
      let json = await res.json()
      if(!json.rates[a]) throw new Error('Moneda inválida')
      total = (monto * json.rates[a]).toFixed(2)
    }

    let fecha = new Date().toLocaleDateString('es-PE', { timeZone: TZ })

    let txt = `🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.💰꒷

 ⤷ ┇ 𝗖𝗢𝗡𝗩𝗘𝗥𝗦𝗜𝗢𝗡 𝗦𝗔𝗜𝗬𝗔𝗝𝗜𝗡 ：✿ 。
꒰ ◞⁺⊹ ．Calculo Completado •

  ꒱ ׁ. ᘏ 𝗥𝗘𝗦𝗨𝗟𝗧𝗔𝗗𝗢 ׅ 𝆬 ָ֢ ෆ
💰 ➛ ${monto} *${de}*
💰 ➛ ⬇️ *¡KA-ME-HA-ME-HAAA!* 🟦
💰 ➛ *${total}* *${a}*

──愛 *DETALLES DE LA TASA* ╏ 📊
💰 ➛ Tipo: ${tipoTasa}
${tasaUSD_ARS? `💰 ➛ 1 USD = ${tasaUSD_ARS} ARS` : ''}
💰 ➛ Fecha: ${fecha}

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
> *${MARCA}* | Datos en tiempo real
━━━━━━━━━━━`

    m.reply(txt)

  } catch(e) {
    console.log(e)
    m.reply(`🐉 𓆩 𝗦𝗢𝗡 𝗚𝗢𝗞𝗨 𝗣𝗥𝗘𝗠 𓆪 🐉

.⃟𖥔 ݁. 𖦹˙— \`\`𝐏𝐫𝐞𝐦\`\` —˙𖦹.⚠️꒷

 ⤷ ┇ 𝗘𝗥𝗥𝗢𝗥 𝗗𝗘 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 ：✿ 。

──愛 *FALLA SAIYAJIN* ╏ ❄️
⚠️ ➛ ${e.message}
⚠️ ➛ Revisa los códigos: PEN, USD, ARS, COP...

━━━━━━━━━━━
*Owner*: @whois.yallico | *Numero*: +51 927 174 369
━━━━━━━━━━━`)
  }
}

handler.help = ['cambio ( Monedas )']
handler.tags = ['finanzas']
handler.command = /^cambio$/i
handler.group = true
export default handler