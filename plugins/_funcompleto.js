let handler = async (m, { conn }) => {
    let chistes = [
        'Le dice un hijo a su papá: Papá, en el cole me dicen distraído\nEl papá: Hijo, tú vives en la casa de al lado',
        '- Amor, ¿me amas?\n- Sí\n- ¿Mucho?\n- Sí\n- ¿Cuánto?\n- Como para no responderte y seguir viendo el partido',
        '¿Qué le dice una iguana a su hermana?\nIguanita tú',
        'Profesor: Si tengo 5 manzanas y me como 2, ¿qué tengo?\nAlumno: Un problema estomacal profe',
        '¿Por qué los pájaros no usan Facebook?\nPorque ya tienen Twitter',
        'Le dice el 0 al 8: Oye, qué bonito cinturón\nEl 8: Gracias, es que bajé de peso',
        '¿Qué hace una abeja en el gimnasio?\n¡Zum-ba!',
        'Doctor: Tiene que dejar el celular\nPaciente: ¿Y si lo dejo en silencio?\nDoctor: No, DEJAR',
        '¿Cómo se despiden los químicos?\nÁcido un gusto',
        '¿Qué le dice un techo a otro?\nTecho de menos'
    ]

    let chiste = chistes[Math.floor(Math.random() * chistes.length)]

    let texto = `
╭───「 😂 *CHISTE* 😂 」───╮
│
│ ${chiste}
│
╰────────────────────────╯

> *.chiste* para otro
`.trim()

    m.reply(texto)
}

handler.help = ['chiste']
handler.tags = ['joda']
handler.command = ['chiste']
handler.group = true
handler.cooldown = 3000

export default handler