export interface PillarPage {
  slug: string;
  clusterSlug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  categorySlug: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  coverImage: string;
  coverAlt: string;
  content: string;
  faqItems: { question: string; answer: string }[];
  tags: string[];
  tipo: "pilar";
}

export interface Cluster {
  slug: string;
  name: string;
  description: string;
  pillarSlug: string;
  categorySlug: string;
}

export const clusters: Cluster[] = [
  {
    slug: "suenos-con-animales",
    name: "Sueños con Animales",
    description: "Los animales en los sueños son arquetipos del inconsciente. Aprende a interpretar cada especie y el mensaje que porta.",
    pillarSlug: "sonar-con-animales-guia-completa",
    categorySlug: "animales",
  },
  {
    slug: "suenos-con-personas",
    name: "Sueños con Personas",
    description: "Soñar con alguien específico casi nunca es casual. Entiende qué representa cada persona que aparece en tus sueños.",
    pillarSlug: "sonar-con-personas-guia-completa",
    categorySlug: "personas",
  },
  {
    slug: "suenos-con-muerte-y-miedo",
    name: "Sueños con Muerte y Miedo",
    description: "La muerte y el miedo en los sueños son señales de transformación. Descubre su significado real y cómo trabajar con ellos.",
    pillarSlug: "sonar-con-muerte-guia-completa",
    categorySlug: "emociones",
  },
  {
    slug: "suenos-de-amor-y-ex-pareja",
    name: "Sueños de Amor y Ex Pareja",
    description: "Soñar con tu ex o con el amor no es señal de que debes volver. Descubre qué está procesando realmente tu mente.",
    pillarSlug: "sonar-con-ex-pareja-guia-completa",
    categorySlug: "personas",
  },
  {
    slug: "suenos-de-dinero-y-trabajo",
    name: "Sueños de Dinero y Trabajo",
    description: "El dinero y el trabajo en los sueños hablan de tu autoestima, tus miedos y tu relación con la abundancia.",
    pillarSlug: "sonar-con-dinero-guia-completa",
    categorySlug: "emociones",
  },
  {
    slug: "suenos-espirituales",
    name: "Sueños Espirituales",
    description: "Visitas, presencias y experiencias trascendentes mientras duermes. Una guía para entender lo que tu alma procesa.",
    pillarSlug: "suenos-espirituales-guia-completa",
    categorySlug: "espiritual",
  },
];

export const pillarPages: PillarPage[] = [
  // ─── 1. ANIMALES ────────────────────────────────────────────────────────────
  {
    slug: "sonar-con-animales-guia-completa",
    clusterSlug: "suenos-con-animales",
    title: "Soñar con Animales: Guía Completa de Significados",
    metaTitle: "Soñar con Animales: Significado Completo y Qué Revela tu Inconsciente",
    metaDescription: "Guía definitiva para interpretar sueños con animales. Descubre qué simboliza cada especie, desde perros y gatos hasta serpientes y leones, y cómo aplicarlo a tu vida.",
    category: "Animales",
    categorySlug: "animales",
    publishedAt: "2024-01-01",
    updatedAt: "2024-03-01",
    readingTime: 18,
    coverImage: "/images/sonar-con-animales.webp",
    coverAlt: "Animales salvajes bajo la luz de la luna llena",
    tags: ["animales", "sueños", "inconsciente", "simbolismo", "arquetipos"],
    tipo: "pilar",
    faqItems: [
      {
        question: "¿Por qué soñamos tan frecuentemente con animales?",
        answer: "Los animales representan instintos, emociones primitivas y aspectos de nuestra personalidad que la mente consciente a veces reprime. Jung los consideraba arquetipos universales del inconsciente colectivo.",
      },
      {
        question: "¿Es malo soñar con animales peligrosos?",
        answer: "No necesariamente. Un animal peligroso en un sueño suele representar una emoción intensa o una situación desafiante en tu vida. Enfrentarlo en el sueño puede ser señal de que estás listo para manejarlo en la realidad.",
      },
      {
        question: "¿Qué diferencia hay entre soñar con un animal doméstico y uno salvaje?",
        answer: "Los animales domésticos suelen relacionarse con aspectos conocidos y controlados de tu personalidad o de tus relaciones cercanas. Los salvajes representan instintos más primarios, libertad, o partes de ti que aún no has integrado plenamente.",
      },
      {
        question: "¿Importa el color del animal en el sueño?",
        answer: "Sí. El color añade una capa simbólica importante. Un lobo negro puede simbolizar la sombra jungiana, mientras que uno blanco apunta a pureza o guía espiritual. Siempre combina el animal con su color para una interpretación más precisa.",
      },
      {
        question: "¿Qué significa soñar que un animal me ataca?",
        answer: "Un ataque animal en un sueño suele indicar que una emoción reprimida —ira, miedo, deseo— está reclamando tu atención. También puede señalar una amenaza externa que tu inconsciente ha detectado antes que tu mente consciente.",
      },
    ],
    content: `<h2>Los Animales como Mensajeros del Inconsciente</h2>
<p>Desde el amanecer de la humanidad, los animales han ocupado un lugar central en los sueños de todas las culturas. Los chamanes siberianos viajaban acompañados de espíritus animales. Los griegos antiguos interpretaban los sueños con animales como mensajes divinos. Carl Jung los llamó <em>arquetipos</em>: patrones universales grabados en el inconsciente colectivo de la especie humana.</p>
<p>Cuando un animal aparece en tu sueño, no es un accidente. Tu mente ha seleccionado ese símbolo específico de entre miles de posibilidades porque necesita comunicarte algo que las palabras conscientes no alcanzan a expresar. La pregunta no es si el sueño tiene significado, sino qué significado tiene <em>para ti</em>.</p>

<h2>El Marco Simbólico: Cómo Leer un Sueño con Animales</h2>
<p>Antes de buscar el significado de un animal concreto, conviene entender el marco general. Todo sueño con animales puede analizarse en tres niveles:</p>
<h3>Nivel instintivo</h3>
<p>Los animales representan tus impulsos más básicos: supervivencia, reproducción, territorialidad, afecto. Un lobo persiguiéndote puede simbolizar una emoción primitiva —miedo, ira, deseo— que has estado evitando. Un perro leal a tu lado puede representar el instinto de conexión y pertenencia.</p>
<h3>Nivel emocional</h3>
<p>Cada animal porta una carga emocional específica en el imaginario humano. El tigre encarna la fuerza y el poder; el conejo, la vulnerabilidad y la fertilidad; el cuervo, la inteligencia y los presagios. Tu reacción emocional en el sueño —miedo, admiración, ternura— es tan importante como el animal mismo.</p>
<h3>Nivel espiritual o arquetípico</h3>
<p>En muchas tradiciones, ciertos animales son guías, tótems o mensajeros del más allá. Un águila que vuela alto puede señalar una llamada a elevar tu perspectiva vital. Una serpiente que muda de piel puede anunciar una transformación profunda en tu identidad.</p>

<h2>Los 12 Animales Más Comunes en los Sueños</h2>
<h3>1. Serpiente</h3>
<p>Es probablemente el animal más cargado simbólicamente en toda la historia de los sueños. Sus significados oscilan entre la transformación y la traición, la sabiduría y el veneno. <strong>Soñar con una serpiente que muda de piel</strong> es una de las señales oníricas más positivas: anuncio de renovación profunda.</p>

<h3>2. Perro</h3>
<p>El perro es el compañero humano por excelencia. En los sueños suele representar la lealtad, la amistad y la protección. Un perro agresivo puede representar una traición percibida o un conflicto con alguien de tu círculo cercano.</p>

<h3>3. Gato</h3>
<p>Los gatos en los sueños están profundamente ligados a la intuición femenina, la independencia y el misterio. Soñar con un gato negro no es necesariamente malo: en muchas culturas simboliza la magia y la sabiduría oculta.</p>

<h3>4. Caballo</h3>
<p>El caballo es el arquetipo de la libertad, la fuerza y el movimiento. Montar un caballo con confianza es uno de los sueños más positivos: señala que estás en sintonía con tu poder personal.</p>

<h3>5. Pájaro</h3>
<p>Los pájaros son universalmente símbolos de libertad, perspectiva elevada y, en muchas tradiciones, del alma. Un pájaro enjaulado puede representar una parte de ti que se siente atrapada.</p>

<h3>6. León o Tigre</h3>
<p>Los grandes felinos representan poder, liderazgo y autoridad. Si caminas junto al felino, es señal de que has integrado tu fuerza interna.</p>

<h3>7. Oso</h3>
<p>El oso simboliza la introspección, la protección maternal y los ciclos naturales. Soñar con un oso en invierno puede señalar una necesidad de descanso o de retiro interior.</p>

<h3>8. Lobo</h3>
<p>El lobo representa tanto la amenaza como la sabiduría, el instinto social y la lealtad al grupo. Soñar con una manada de lobos puede señalar la importancia de tu tribu o comunidad.</p>

<h3>9. Araña</h3>
<p>Las arañas representan la creatividad, la tejedora de destinos, pero también la trampa y la manipulación. Soñar con una araña tejiendo su tela puede señalar que estás construyendo algo importante.</p>

<h3>10. Pez</h3>
<p>El agua es el dominio de las emociones, y los peces son sus habitantes. Pescar en un sueño suele representar el intento de traer a la conciencia algo que estaba oculto en el inconsciente.</p>

<h3>11. Elefante</h3>
<p>El elefante encarna la memoria, la sabiduría ancestral y la fuerza tranquila. Soñar con un elefante suele ser una señal positiva: tu inconsciente te recuerda que tienes más recursos de los que crees.</p>

<h3>12. Mariposa</h3>
<p>La mariposa es el símbolo universal de la transformación y el renacimiento. Si sueñas con mariposas en momentos de cambio vital, tu inconsciente está validando el proceso.</p>

<h2>Cómo el Color Transforma el Significado</h2>
<p>El color de un animal en un sueño modifica sustancialmente el mensaje:</p>
<ul>
  <li><strong>Blanco:</strong> Pureza, guía espiritual, mensaje del inconsciente más profundo.</li>
  <li><strong>Negro:</strong> La sombra jungiana, aspectos no integrados, también poder y misterio.</li>
  <li><strong>Rojo:</strong> Pasión, ira, vitalidad, energía sexual o creativa.</li>
  <li><strong>Dorado o amarillo:</strong> Sabiduría, iluminación, valor positivo.</li>
  <li><strong>Azul:</strong> Calma, comunicación, verdad espiritual.</li>
  <li><strong>Verde:</strong> Crecimiento, sanación, conexión con la naturaleza.</li>
</ul>

<h2>La Acción del Animal: La Clave Interpretativa</h2>
<p>Más importante que el animal en sí es lo que hace en tu sueño. La misma serpiente tiene significados radicalmente diferentes según la acción:</p>
<ul>
  <li><strong>Te ataca o muerde:</strong> Una herida psicológica activa, una situación amenazante.</li>
  <li><strong>Muda de piel:</strong> Transformación profunda e inminente.</li>
  <li><strong>Se enrolla alrededor de ti:</strong> Algo o alguien que sientes como restrictivo.</li>
  <li><strong>Te habla:</strong> Tu inconsciente quiere comunicarte algo urgente.</li>
  <li><strong>Muere:</strong> El fin de un ciclo, liberación de algo que ya no sirve.</li>
</ul>

<h2>Tu Reacción Emocional: La Brújula del Sueño</h2>
<p>La emoción que sientes ante el animal es, en muchos casos, más reveladora que el animal mismo. Si sueñas con una serpiente y sientes fascinación en lugar de miedo, el sueño tiene un tono completamente diferente al mismo sueño con terror. Siempre registra cómo te sentiste al despertar.</p>

<h2>Animales en Tradiciones Chamánicas y Espirituales</h2>
<p>En muchas culturas indígenas de América, los sueños con ciertos animales se interpretan como visitas de animales de poder o tótems. El animal que aparece repetidamente en tus sueños puede ser tu animal guía de ese momento: una energía que tu alma necesita integrar.</p>

<h2>Técnica: Dialogar con el Animal de tu Sueño</h2>
<p>La imaginación activa es una técnica de psicología profunda: regresar mentalmente al sueño, visualizar de nuevo al animal y preguntarle: "¿Qué mensaje traes para mí?" Sigue estos pasos:</p>
<ol>
  <li>Siéntate en silencio, cierra los ojos y recuerda el sueño vívidamente.</li>
  <li>Visualiza de nuevo al animal. Observa su aspecto, su movimiento, su mirada.</li>
  <li>Con calma, pregúntale: "¿Quién eres? ¿Qué necesitas de mí?"</li>
  <li>Observa sin juicio lo que surge: imágenes, palabras, sensaciones.</li>
  <li>Agradece al animal y anota todo en tu diario de sueños.</li>
</ol>

<h2>Conclusión</h2>
<p>Los sueños con animales son una de las formas más directas en que tu inconsciente se comunica contigo. No son superstición ni coincidencia: son el lenguaje en que tu psique habla cuando las palabras convencionales no bastan. Cada animal que cruza tus sueños es un maestro. La pregunta es si estás dispuesto a escuchar.</p>`,
  },

  // ─── 2. PERSONAS ────────────────────────────────────────────────────────────
  {
    slug: "sonar-con-personas-guia-completa",
    clusterSlug: "suenos-con-personas",
    title: "Soñar con Personas: Guía Completa de Significados",
    metaTitle: "Soñar con Personas: Qué Significa Soñar con Alguien Específico",
    metaDescription: "Guía completa para interpretar sueños con personas: ex parejas, familia, desconocidos, personas fallecidas, amigos y figuras de autoridad. Descubre qué representan realmente.",
    category: "Personas",
    categorySlug: "personas",
    publishedAt: "2024-01-08",
    updatedAt: "2024-03-01",
    readingTime: 16,
    coverImage: "/images/sonar-con-personas.webp",
    coverAlt: "Siluetas de personas en un paisaje onírico",
    tags: ["personas", "ex", "familia", "desconocidos", "fallecidos", "relaciones"],
    tipo: "pilar",
    faqItems: [
      {
        question: "¿Soñar con mi ex significa que todavía lo/la quiero?",
        answer: "No necesariamente. Tu ex aparece frecuentemente en sueños porque representa en tu psique un conjunto de cualidades, emociones y patrones relacionales. Soñar con él o ella puede señalar que esas cualidades o patrones están activos en tu vida actual.",
      },
      {
        question: "¿Qué significa soñar con una persona que apenas conozco?",
        answer: "Las personas que apenas conocemos en los sueños suelen representar aspectos de nuestra propia personalidad que no hemos desarrollado plenamente. La cualidad que más te llama la atención en esa persona es la clave interpretativa.",
      },
      {
        question: "¿Por qué aparecen desconocidos en mis sueños?",
        answer: "Los desconocidos son a menudo proyecciones de aspectos de uno mismo: la sombra jungiana, el animus o anima, aspectos potenciales aún sin desarrollar.",
      },
    ],
    content: `<h2>Las Personas en los Sueños: Proyecciones del Yo Interior</h2>
<p>Una de las revelaciones más liberadoras de la psicología de los sueños es esta: en tus sueños, tú eres todos los personajes. La persona que te persigue, el ser querido que aparece, el desconocido que te ayuda: todos son proyecciones de aspectos de tu propia psique.</p>
<p>Esto no significa que las personas reales no existan en tus sueños, sino que la versión de ellas que aparece es siempre tu representación interna de esas personas, construida desde tu percepción, tus memorias y tus proyecciones emocionales.</p>

<h2>Los Tipos de Personas más Frecuentes en los Sueños</h2>

<h3>La ex pareja</h3>
<p>Es uno de los temas más consultados. Soñar con un ex no significa necesariamente que lo/la extrañas o que quieres retomar la relación. En la psicología de los sueños, tu ex representa un conjunto específico de cualidades, emociones y dinámicas relacionales.</p>
<p>Si tu ex aparece en sueños en un momento de nueva relación, puede ser que estés comparando inconscientemente. Si la dinámica del sueño repite patrones conflictivos de la relación, tu inconsciente puede estar procesando heridas que no sanaron completamente.</p>

<h3>Padres y familia</h3>
<p>Los padres en los sueños son algunas de las figuras más cargadas arquetípicamente. El padre suele representar la autoridad, la ley, la estructura, la crítica interna. La madre representa el cuidado, la nutrición, el origen. Soñar con conflictos con los padres casi siempre señala un conflicto interno con lo que ellos representan en tu psique.</p>

<h3>Figuras de autoridad</h3>
<p>Jefes, profesores, figuras de poder en sueños generalmente representan la autoridad internalizada: el superyó freudiano, la voz crítica interna. Un jefe amenazante puede representar tu propio perfeccionismo.</p>

<h3>Amigos cercanos</h3>
<p>Los amigos en los sueños pueden aparecer como ellos mismos o como representaciones de cualidades que asocias con ellos. Tu amigo el aventurero puede representar tu propio deseo de aventura. Tu amiga la artista puede representar tu creatividad no expresada.</p>

<h3>Personas fallecidas</h3>
<p>Los seres queridos que ya no están tienen un capítulo aparte. Su aparición puede representar lo que simbolizaban en tu psique, pero muchas personas describen estos sueños como visitas reales: más vívidos, con la persona en paz, y mensajes de consuelo genuino.</p>

<h3>Desconocidos</h3>
<p>En la teoría junguiana, representan la <em>sombra</em> (aspectos no integrados del yo), el <em>animus</em> (la cualidad masculina en la psique femenina) o el <em>anima</em> (la cualidad femenina en la psique masculina). Un desconocido amenazante puede representar la sombra. Un desconocido atractivo y misterioso suele ser una figura de animus o anima.</p>

<h2>La Teoría de la Proyección: Todos Somos Nosotros Mismos</h2>
<p>En lugar de preguntar "¿por qué soñé con X persona?", la pregunta productiva es: "¿qué cualidad representa X persona en mi psique?" y "¿qué le estaba haciendo esa cualidad a otras partes de mí en el sueño?"</p>
<p>Por ejemplo: sueñas que tu mejor amigo te traiciona. La pregunta junguiana sería: ¿qué cualidad represento yo en ese amigo, y a qué otra parte de mí está traicionando esa cualidad en mi vida actual?</p>

<h2>Cómo Trabajar con las Personas de tus Sueños</h2>
<ol>
  <li><strong>Identifica la cualidad principal:</strong> ¿Cuál es el rasgo más saliente de esa persona en el sueño? ¿Fuerza, traición, ternura, autoridad?</li>
  <li><strong>Pregunta si esa cualidad es tuya:</strong> ¿Tienes esa cualidad? ¿La deseas? ¿La temes?</li>
  <li><strong>Observa la dinámica:</strong> ¿Qué estaba haciendo esa persona contigo? Esa dinámica refleja una dinámica interna.</li>
  <li><strong>Anota la emoción:</strong> ¿Cómo te sentiste durante el encuentro y al despertar?</li>
</ol>

<h2>Los Sueños con Personas como Mapa de Relaciones</h2>
<p>Con el tiempo, si mantienes un diario de sueños, emergen patrones fascinantes: las mismas personas aparecen en contextos similares, las mismas dinámicas se repiten. Este mapa onírico de relaciones es en realidad un mapa de tus patrones relacionales internos.</p>
<p>La buena noticia: cuando cambias algo en ti —cuando integras la sombra, cuando sanas una herida, cuando desarrollas un aspecto de ti mismo— los sueños cambian también. El personaje que te perseguía se convierte en aliado. El fallecido que aparecía con angustia comienza a aparecer en paz. El teatro interior refleja la transformación real.</p>

<h2>Conclusión</h2>
<p>Soñar con personas es soñar con partes de uno mismo que han tomado rostro. Cada encuentro onírico es una oportunidad para conocerte mejor: para reconocer tus proyecciones, integrar tus sombras y celebrar tus potenciales aún no desplegados.</p>`,
  },

  // ─── 3. MUERTE Y MIEDO ──────────────────────────────────────────────────────
  {
    slug: "sonar-con-muerte-guia-completa",
    clusterSlug: "suenos-con-muerte-y-miedo",
    title: "Soñar con la Muerte: Guía Completa de Significados",
    metaTitle: "Soñar con la Muerte: Qué Significa Realmente y Por Qué No Debes Asustarte",
    metaDescription: "Guía completa sobre sueños con la muerte. Por qué soñar con morir no es un mal presagio, qué simboliza cada variante y cómo trabajar con estos poderosos mensajes del inconsciente.",
    category: "Emociones",
    categorySlug: "emociones",
    publishedAt: "2024-01-10",
    updatedAt: "2024-03-01",
    readingTime: 15,
    coverImage: "/images/sonar-con-muerte.webp",
    coverAlt: "Figura oscura en un paisaje neblinoso al amanecer",
    tags: ["muerte", "miedo", "transformación", "fin de ciclo", "cambio", "inconsciente"],
    tipo: "pilar",
    faqItems: [
      {
        question: "¿Soñar con mi propia muerte significa que voy a morir pronto?",
        answer: "No. Esta es una de las supersticiones más extendidas y sin fundamento. Soñar con la propia muerte es, en la psicología de los sueños, una de las señales más frecuentes de transformación personal. Indica que una parte de ti —una identidad, una etapa, un patrón de conducta— está llegando a su fin para dar paso a algo nuevo.",
      },
      {
        question: "¿Por qué sueño repetidamente con la muerte de un ser querido?",
        answer: "Estos sueños suelen reflejar ansiedad sobre la pérdida de esa persona, no una predicción. También pueden simbolizar cambios en la relación con ella, o aspectos de ti mismo que esa persona representa en tu psique.",
      },
      {
        question: "¿Es normal sentir alivio o paz en un sueño donde alguien muere?",
        answer: "Sí, y es más común de lo que se cree. El alivio en estos sueños suele señalar el fin de una situación tensa o el deseo inconsciente de liberarse de una carga emocional.",
      },
    ],
    content: `<h2>La Muerte en los Sueños: El Mayor Malentendido del Mundo Onírico</h2>
<p>Pocas cosas generan tanto terror matutino como despertar de un sueño en que uno ha muerto o ha visto morir a un ser querido. Sin embargo, la psicología del sueño es categórica: soñar con la muerte es casi siempre una señal de transformación, no de muerte literal.</p>
<p>Carl Jung fue quizás el pensador que más profundamente exploró este territorio. Para él, la muerte en los sueños representaba lo que llamaba <em>enantiodromia</em>: el principio por el cual todo proceso alcanza su opuesto. Morir en un sueño es nacer en otro nivel.</p>

<h2>La Muerte como Símbolo de Transformación</h2>
<p>En prácticamente todas las tradiciones simbólicas del mundo, la muerte y el renacimiento son un par inseparable. El grano de trigo debe morir para que nazca la planta. La oruga debe disolverse completamente para que emerja la mariposa. Cuando mueres en un sueño, lo que muere es una versión de ti: una identidad que ya no sirve, una etapa vital que ha llegado a su conclusión natural.</p>

<h2>Tipos de Sueños con Muerte y Sus Significados</h2>

<h3>Soñar con tu propia muerte</h3>
<p>Es el sueño que más alarma genera, y el que mejor augura una transformación profunda. Si mueres de forma violenta, puede señalar una ruptura abrupta con algo conocido. Si mueres pacíficamente, el cambio vendrá de forma más gradual. La pregunta clave es: ¿qué parte de ti sientes que está muriendo en tu vida actual?</p>

<h3>Soñar con la muerte de un familiar</h3>
<p>Suele reflejar ansiedad por el bienestar de esa persona, especialmente si está mayor o enferma. Pero más frecuentemente simboliza un cambio en la relación con ella, o el hecho de que esa persona representa en tu psique una cualidad específica que estás modificando en ti mismo.</p>

<h3>Soñar con la muerte de alguien desconocido</h3>
<p>El desconocido en los sueños suele representar un aspecto de ti mismo. Su muerte indica que estás dejando atrás esa cualidad o ese patrón. Es un sueño especialmente positivo cuando el aspecto que muere es uno que has querido superar.</p>

<h3>Soñar con funerales</h3>
<p>Los rituales funerarios señalan procesos de cierre y despedida. Puede ser que estés cerrando un capítulo emocional, terminando una relación, o cambiando de trabajo o ciudad. El funeral onírico es el ritual interno que acompaña ese cierre real.</p>

<h3>Soñar con la muerte repetidamente</h3>
<p>Si el tema de la muerte aparece con frecuencia, tu psique está señalando que un proceso de transformación importante lleva tiempo sin ser atendido. Algo en tu vida necesita terminar para que algo nuevo pueda comenzar, y tú lo estás pospiendo.</p>

<h2>El Miedo en los Sueños</h2>
<p>Las pesadillas y los sueños de miedo tienen su propia lógica. El miedo en los sueños casi nunca es sobre lo que literalmente aparece, sino sobre lo que simboliza. Ser perseguido suele representar una situación de la que escapas en la vigilia. Caer puede señalar pérdida de control. Estar atrapado refleja sentirse limitado en algún área de la vida.</p>
<p>La regla de oro de las pesadillas: el monstruo que te persigue representa algo que necesitas enfrentar. Cuanto más horrendo el perseguidor, mayor la energía psíquica represada.</p>

<h2>Técnica: Regresar al Sueño y Enfrentar al Perseguidor</h2>
<p>La <em>Imagery Rehearsal Therapy</em> es la técnica con mayor evidencia científica para resolver pesadillas recurrentes. Consiste en reescribir el final del sueño de forma consciente y ensayarlo mentalmente. En lugar de huir del perseguidor, te detienes y le preguntas: "¿Qué quieres de mí?"</p>

<h2>Conclusión</h2>
<p>Soñar con la muerte y el miedo no es una maldición ni un presagio: es una invitación. Tu inconsciente te está mostrando el umbral de tu próxima transformación. El coraje para cruzarlo es la única respuesta que esos sueños piden de ti.</p>`,
  },

  // ─── 4. AMOR Y EX PAREJA ────────────────────────────────────────────────────
  {
    slug: "sonar-con-ex-pareja-guia-completa",
    clusterSlug: "suenos-de-amor-y-ex-pareja",
    title: "Soñar con tu Ex y con el Amor: Guía Completa de Significados",
    metaTitle: "Soñar con tu Ex: Por Qué Ocurre y Qué Significa Realmente",
    metaDescription: "Guía completa sobre sueños con tu ex pareja y el amor romántico. Descubre por qué aparece tu ex en sueños, qué simboliza cada escenario, y cómo interpretar los sueños románticos.",
    category: "Personas",
    categorySlug: "personas",
    publishedAt: "2024-01-14",
    updatedAt: "2024-03-01",
    readingTime: 17,
    coverImage: "/images/sonar-con-ex.webp",
    coverAlt: "Dos siluetas bajo la luz de la luna en un paisaje onírico",
    tags: ["ex pareja", "amor", "relaciones", "romance", "desamor", "reconciliación"],
    tipo: "pilar",
    faqItems: [
      {
        question: "¿Soñar con mi ex significa que debo volver con él/ella?",
        answer: "No. Los sueños con el ex raramente son un mensaje de que debes retomar la relación. Más frecuentemente señalan que una necesidad emocional que esa relación satisfacía —seguridad, pasión, conexión— está activa en tu vida actual y requiere atención.",
      },
      {
        question: "¿Por qué sigo soñando con mi ex si ya lo superé?",
        answer: "Superar una relación en el plano consciente no significa que el inconsciente haya completado el procesamiento. Los sueños continuos con el ex pueden señalar heridas emocionales que siguen activas aunque no las sientas conscientemente.",
      },
      {
        question: "¿Qué significa soñar que mi ex está con otra persona?",
        answer: "Este sueño suele reflejar inseguridades sobre tu propia valía o temores al abandono, más que preocupación real por lo que hace tu ex. Es una proyección de miedos internos en forma de escena relacional.",
      },
      {
        question: "¿Soñar con el amor de mi vida que aún no conozco es posible?",
        answer: "Sí. Soñar con una figura romántica desconocida puede representar el arquetipo del anima o animus jungiano: la imagen interna de la pareja ideal que tu psique ha construido. También puede señalar que estás listo para abrirte al amor.",
      },
    ],
    content: `<h2>Por Qué Tu Ex Sigue Apareciendo en tus Sueños</h2>
<p>No hay forma más efectiva de despertar con el corazón revuelto que soñar con el ex. Hay culpa —"¿por qué sigo pensando en él/ella?"— confusión —"¿significa algo?"— y a veces un dolor que creías superado que vuelve con toda su fuerza.</p>
<p>La respuesta corta: soñar con el ex es completamente normal y no significa lo que temes. La respuesta larga es más rica, más útil, y tiene mucho que decirte sobre dónde estás emocionalmente ahora mismo.</p>

<h2>La Función Psicológica de los Sueños con el Ex</h2>
<p>Tu ex no aparece en sueños porque tu inconsciente quiere que vuelvas con esa persona. Aparece porque representa, en tu psique interna, un conjunto específico de cualidades, emociones y patrones relacionales que estuvieron activos durante ese período de tu vida.</p>
<p>Cuando soñamos con el ex, generalmente está ocurriendo una de estas cosas:</p>
<ul>
  <li><strong>El inconsciente procesa la pérdida:</strong> Aunque consciente mente hayas "superado" la relación, el inconsciente puede seguir trabajando en la integración de esa experiencia.</li>
  <li><strong>Una necesidad activa:</strong> Lo que esa relación satisfacía —seguridad, pasión, compañía, validación— está activo como necesidad ahora mismo, y el ex es el símbolo que tu mente usa para representarla.</li>
  <li><strong>Un patrón relacional en bucle:</strong> Si la relación tuvo dinámicas problemáticas que no has resuelto, el sueño puede ser una señal de que ese patrón sigue operando en tus relaciones actuales.</li>
</ul>

<h2>Los Escenarios más Comunes y Su Significado</h2>

<h3>Sueñas que vuelves con tu ex</h3>
<p>Uno de los más angustiantes, especialmente si la relación terminó mal. Este sueño raramente significa que debes retomar la relación. Suele señalar que extrañas una <em>cualidad</em> de esa relación: la familiaridad, la pasión, la sensación de ser conocido profundamente. La pregunta relevante es: ¿qué es lo que más extrañas del tiempo que estuvieron juntos? Eso es lo que realmente necesitas ahora.</p>

<h3>Tu ex aparece feliz con otra persona</h3>
<p>Este sueño casi siempre es sobre inseguridades tuyas, no sobre lo que hace tu ex en la realidad. Puede reflejar miedo a no ser "suficiente", comparaciones internas con otros, o simplemente la herida del abandono que no ha sanado del todo.</p>

<h3>Tu ex te busca o te pide perdón</h3>
<p>Un sueño que puede traer alivio pero también confusión. Suele representar una necesidad de validación o cierre que no recibiste durante la ruptura. Tu inconsciente está generando el final que tu corazón necesitaba y no tuvo.</p>

<h3>Tienes una relación romántica con alguien desconocido</h3>
<p>El desconocido romántico en los sueños es a menudo la figura del <em>animus</em> o <em>anima</em> junguiano: la imagen interna de la pareja ideal. Este sueño puede señalar que estás listo para abrirte a una nueva relación, o que estás desarrollando cualidades internas que anteriormente proyectabas en la pareja.</p>

<h3>Una relación romántica actual en el sueño se tensa o termina</h3>
<p>Puede reflejar inseguridades sobre la relación actual, o señalar que hay algo en la relación que necesita ser abordado conscientemente. No lo ignores como "solo un sueño".</p>

<h2>El Amor en los Sueños: Más Allá de las Parejas</h2>
<p>Los sueños románticos no son solo sobre personas: son sobre la cualidad del amor en tu vida interior. Soñar que eres profundamente amado suele señalar que estás en un período de mayor autocompasión y aceptación propia. Soñar que no encuentras amor puede reflejar la autocrítica interna que impide la conexión genuina.</p>
<p>Jung observó que la capacidad de amar en los sueños refleja la capacidad de integrar el animus o anima: las cualidades del otro sexo que llevamos dentro. El amor onírico es, en cierta manera, amor a partes de uno mismo.</p>

<h2>Soñar con el Amor Perdido: El Duelo Onírico</h2>
<p>Algunos amores dejan una huella tan profunda que aparecen en sueños durante años, incluso décadas. Estas figuras se convierten en arquetipos personales: representan un momento de apertura emocional, de intensidad vital, de posibilidades que quizás no se realizaron.</p>
<p>No hay nada patológico en esto. Los grandes amores quedan integrados en la psique como configuraciones emocionales que resurgen en ciertos momentos. Lo importante es leer el mensaje: ¿qué estaba ofreciéndote ese amor que necesitas en tu vida actual?</p>

<h2>Cómo Trabajar con los Sueños Románticos</h2>
<ol>
  <li><strong>No actúes impulsivamente:</strong> Soñar con el ex no es señal de que debes contactarlo. Observa el sueño antes de reaccionar.</li>
  <li><strong>Identifica la necesidad real:</strong> ¿Qué cualidad o necesidad representa esa persona en el sueño? Trabaja para satisfacer esa necesidad de formas que no dependan de la persona.</li>
  <li><strong>Observa los patrones:</strong> ¿Con quién sueñas más? ¿En qué situaciones? Los patrones revelan configuraciones emocionales profundas.</li>
  <li><strong>Busca el cierre interno:</strong> Si hay heridas sin resolver, el trabajo no es obtener cierre de la otra persona, sino generarlo internamente. La terapia, el journaling y la meditación pueden ayudar.</li>
</ol>

<h2>Conclusión</h2>
<p>Soñar con el amor, con el ex, con relaciones que duelen o que añoras no es una debilidad ni un retroceso: es tu psique haciendo su trabajo. Cada uno de esos sueños es una oportunidad para entenderte mejor, para identificar lo que realmente necesitas en el amor, y para integrar experiencias que aún cargan peso emocional.</p>
<p>El amor en los sueños, incluso cuando duele, es siempre una enseñanza sobre el amor que mereces.</p>`,
  },

  // ─── 5. DINERO Y TRABAJO ────────────────────────────────────────────────────
  {
    slug: "sonar-con-dinero-guia-completa",
    clusterSlug: "suenos-de-dinero-y-trabajo",
    title: "Soñar con Dinero y Trabajo: Guía Completa de Significados",
    metaTitle: "Soñar con Dinero: Qué Significa y Qué Dice de tu Relación con la Abundancia",
    metaDescription: "Guía completa sobre sueños con dinero, trabajo y abundancia. Descubre qué significa encontrar dinero, perderlo, o soñar que te despiden, y cómo interpretar estos mensajes sobre tu autoestima.",
    category: "Emociones",
    categorySlug: "emociones",
    publishedAt: "2024-01-18",
    updatedAt: "2024-03-01",
    readingTime: 16,
    coverImage: "/images/sonar-con-dinero.webp",
    coverAlt: "Monedas y billetes flotando en un espacio onírico",
    tags: ["dinero", "trabajo", "abundancia", "autoestima", "éxito", "fracaso", "economía"],
    tipo: "pilar",
    faqItems: [
      {
        question: "¿Soñar que encuentro dinero es buena señal?",
        answer: "Soñar que encuentras dinero suele ser un sueño positivo: señala que estás reconociendo valor en ti mismo o descubriendo recursos internos o externos que no habías visto. No predice un golpe de suerte financiero, pero sí sugiere un momento de mayor apertura a la abundancia.",
      },
      {
        question: "¿Qué significa soñar que me despiden del trabajo?",
        answer: "Este sueño raramente predice un despido real. Suele reflejar inseguridad laboral, miedo a no ser suficiente, o la sensación de que una parte de tu identidad vinculada al trabajo está cambiando.",
      },
      {
        question: "¿Por qué sueño tan frecuentemente con el trabajo si ya no quiero pensar en él al llegar a casa?",
        answer: "El trabajo ocupa un espacio enorme en la identidad y la rutina. Cuando hay estrés laboral no resuelto, el inconsciente continúa procesándolo durante el sueño. Es una señal de que algo en tu situación laboral necesita atención consciente.",
      },
    ],
    content: `<h2>El Dinero y el Trabajo en los Sueños: Más Allá del Bolsillo</h2>
<p>Soñar con dinero y trabajo puede parecer prosaico comparado con las grandes visiones oníricas de animales salvajes o paisajes místicos. Pero estos sueños tocan algo profundamente personal: tu relación con el valor, la autoestima, la seguridad y el poder en el mundo material.</p>
<p>En la psicología de los sueños, el dinero raramente es solo dinero. Es energía, es validación, es poder, es supervivencia. Y el trabajo raramente es solo trabajo: es identidad, propósito, pertenencia social y autoestima.</p>

<h2>El Dinero como Símbolo Psicológico</h2>
<p>La psicóloga Lynne Twist, en su trabajo sobre la relación psicológica con el dinero, observa que nuestras creencias sobre el dinero van mucho más allá de las finanzas: son creencias sobre si merecemos, si somos suficientes, si el mundo es un lugar de abundancia o de escasez.</p>
<p>Los sueños con dinero reflejan estas creencias con sorprendente precisión.</p>

<h2>Los Escenarios con Dinero más Frecuentes</h2>

<h3>Encontrar dinero</h3>
<p>Es uno de los sueños más placenteros y generalmente señales positivas: reconocimiento de valor propio, descubrimiento de recursos inesperados (internos o externos), apertura a la abundancia. Puede coincidir con períodos en que empiezas a valorarte más, a pedir lo que mereces, o a notar oportunidades que antes pasabas por alto.</p>

<h3>Perder dinero o que te lo roban</h3>
<p>Refleja miedos sobre la seguridad material, pérdida de poder o control, o la sensación de que algo valioso —no necesariamente dinero real— está siendo sustraído de tu vida. Puede señalar una relación que drena tu energía, o un contexto donde sientes que das más de lo que recibes.</p>

<h3>Tener mucho dinero de repente</h3>
<p>Los sueños de riqueza repentina suelen reflejar deseos de libertad, de liberarse de preocupaciones materiales, o de tener opciones que sientes que no tienes ahora. También pueden señalar una autoestima en expansión: tu inconsciente te está mostrando una versión de ti con más recursos.</p>

<h3>No tener suficiente dinero, deudas</h3>
<p>Estos sueños suelen acompañar períodos de estrés económico real, pero también aparecen en personas sin problemas financieros objetivos. En estos casos, reflejan una mentalidad de escasez: la creencia arraigada de que nunca hay suficiente, que el mundo es un lugar donde los recursos son limitados y las amenazas constantes.</p>

<h3>Dar dinero o que te lo dan</h3>
<p>El intercambio de dinero en sueños habla de la dinámica del dar y recibir. Dar dinero libremente puede señalar generosidad o desprendimiento. Que te den dinero puede señalar reconocimiento que recibes o que deseas recibir.</p>

<h2>El Trabajo en los Sueños</h2>
<p>Los sueños laborales son algunos de los más comunes en la sociedad moderna: perderse en el trabajo, ser despedido, no poder completar una tarea, lidiar con un jefe difícil. Estos sueños hablan de la relación con tu identidad laboral, tu autoestima profesional y las dinámicas de poder en tu entorno de trabajo.</p>

<h3>Soñar que te despiden</h3>
<p>Casi nunca predice un despido real. Suele reflejar: inseguridad sobre tu desempeño o tu lugar en la organización, miedo a no ser suficientemente bueno, o —en casos en que conscientemente estás insatisfecho— el deseo inconsciente de salir de esa situación laboral.</p>

<h3>Soñar con un jefe amenazante o injusto</h3>
<p>El jefe en los sueños suele representar la autoridad internalizada, la voz crítica interna, el superyó. Un jefe que te ataca en sueños puede ser la representación de tu propio autocrítico interior, más que un reflejo de tu jefe real.</p>

<h3>No poder terminar el trabajo, estar abrumado</h3>
<p>Refleja estrés real o percibido sobre el rendimiento. También puede señalar que tienes demasiado en tu plato —laboralmente o en otras áreas— y que el sistema nervioso está pidiendo un descanso.</p>

<h3>Ser promovido o reconocido en el trabajo</h3>
<p>Un sueño de éxito laboral suele acompañar períodos de mayor confianza en uno mismo, o puede ser la expresión de un deseo legítimo de reconocimiento que no estás recibiendo en tu trabajo actual.</p>

<h2>La Conexión entre Dinero, Trabajo y Autoestima</h2>
<p>Los sueños con dinero y trabajo son, en última instancia, sueños sobre el valor que te asignas a ti mismo. Una persona con alta autoestima suele soñar de forma diferente sobre estos temas que alguien que lucha internamente con sentirse suficiente.</p>
<p>Si notas que tus sueños sobre dinero y trabajo son predominantemente negativos —escasez, despido, fracaso, injusticia— puede ser una señal de que hay trabajo interno que hacer sobre tu relación con el valor propio, independientemente de cuál sea tu situación laboral o financiera real.</p>

<h2>Preguntas para Trabajar con estos Sueños</h2>
<ul>
  <li>¿Cómo me siento respecto a mi valor en el mundo profesional?</li>
  <li>¿Siento que recibo una compensación justa por lo que aporto?</li>
  <li>¿Qué creencias sobre el dinero heredé de mi familia?</li>
  <li>¿Me identifico demasiado con mi trabajo hasta el punto de que amenaza mi autoestima?</li>
  <li>¿Hay algo en mi situación laboral que necesita un cambio que estoy evitando?</li>
</ul>

<h2>Conclusión</h2>
<p>Los sueños con dinero y trabajo son algunos de los más directamente relevantes para la vida cotidiana. Leídos con atención, son un espejo de tu relación con el poder, el valor y la seguridad. El mensaje casi invariable que traen es: mereces más de lo que te das a ti mismo. La abundancia, en todas sus formas, comienza en cómo te tratas internamente.</p>`,
  },

  // ─── 6. ESPIRITUAL ──────────────────────────────────────────────────────────
  {
    slug: "suenos-espirituales-guia-completa",
    clusterSlug: "suenos-espirituales",
    title: "Sueños Espirituales: Guía Completa de Significados",
    metaTitle: "Sueños Espirituales: Qué Son, Tipos y Cómo Interpretarlos",
    metaDescription: "Guía completa sobre sueños espirituales: visitas de seres queridos fallecidos, encuentros con ángeles, sueños proféticos y experiencias místicas mientras duermes.",
    category: "Espiritual",
    categorySlug: "espiritual",
    publishedAt: "2024-01-05",
    updatedAt: "2024-03-01",
    readingTime: 16,
    coverImage: "/images/suenos-espirituales.webp",
    coverAlt: "Figura luminosa flotando sobre un paisaje onírico",
    tags: ["espiritual", "visitas", "ángeles", "profético", "místico", "alma"],
    tipo: "pilar",
    faqItems: [
      {
        question: "¿Cómo sé si un sueño es espiritual o simplemente un sueño normal?",
        answer: "Los sueños espirituales suelen distinguirse por su viveza extraordinaria, la sensación de realidad mayor que la vida despierta, y el impacto emocional duradero que dejan. Muchas personas describen saber dentro del sueño que lo que viven es real, no imaginado.",
      },
      {
        question: "¿Es posible recibir visitas de personas fallecidas en sueños?",
        answer: "Desde una perspectiva psicológica, estos sueños reflejan el proceso de duelo y la presencia interna que esa persona dejó en ti. Desde perspectivas espirituales, muchas tradiciones afirman que el contacto es real. Lo cierto es que estos sueños suelen traer consuelo genuino y mensajes que resuenan profundamente.",
      },
      {
        question: "¿Qué son los sueños lúcidos y tienen dimensión espiritual?",
        answer: "Un sueño lúcido es aquel en que eres consciente de que estás soñando. Muchas tradiciones contemplativas, desde el budismo tibetano hasta la tradición sufí, consideran el sueño lúcido una práctica espiritual avanzada.",
      },
      {
        question: "¿Los sueños proféticos realmente predicen el futuro?",
        answer: "Hay dos explicaciones posibles: una es que el inconsciente procesa señales que la mente consciente pasa por alto y construye proyecciones muy precisas. La otra es que existen capacidades perceptivas que aún no comprendemos completamente. En ambos casos, merecen atención.",
      },
    ],
    content: `<h2>¿Qué Es un Sueño Espiritual?</h2>
<p>Existen sueños que simplemente procesan el día, y existen sueños que cambian algo en nosotros. Los sueños espirituales pertenecen a esta segunda categoría: son experiencias oníricas que trascienden la psicología ordinaria y tocan dimensiones más profundas de la existencia humana.</p>
<p>Personas de todas las culturas, en todos los tiempos, han reportado sueños que describían como visitas de seres del más allá, encuentros con lo divino, visiones del futuro o experiencias de unidad con todo lo que existe. La consistencia de estos reportes sugiere que apuntan a algo real en la experiencia humana.</p>

<h2>Tipos de Sueños Espirituales</h2>

<h3>1. Visitas de Personas Fallecidas</h3>
<p>Son quizás los más comunes y los que generan mayor impacto emocional. La persona soñada aparece con una vitalidad especial, a menudo más joven y saludable que al final de su vida. El contacto se siente diferente al de otros sueños: más real, más cargado de presencia.</p>
<p>Estos sueños suelen traer mensajes breves pero significativos: "estoy bien", "no te preocupes", "sigue adelante". Muchas personas que los viven los describen como el mayor consuelo que recibieron durante el duelo.</p>

<h3>2. Encuentros con Figuras de Luz o Ángeles</h3>
<p>Figuras luminosas o seres de luz pura aparecen en sueños que suelen coincidir con momentos de crisis o de búsqueda espiritual intensa. Estos encuentros dejan típicamente una sensación de paz profunda, amor incondicional y certeza que persiste días después.</p>

<h3>3. Sueños Proféticos o Precognitivos</h3>
<p>La tradición bíblica está llena de sueños proféticos. Pero más allá de la religión, incontables personas reportan haber soñado eventos que luego ocurrieron. La psicología sugiere que el inconsciente puede integrar señales débiles que la mente consciente ignora, produciendo proyecciones notablemente precisas.</p>

<h3>4. Experiencias de Salida del Cuerpo</h3>
<p>También llamadas experiencias extracorporales o astrales, son sueños en que percibes que tu consciencia sale de tu cuerpo físico. Muchas personas las describen como más reales que la vigilia. La tradición del sueño lúcido las considera habilidades entrenables.</p>

<h3>5. Sueños de Vidas Pasadas</h3>
<p>Algunos sueños presentan escenas de épocas históricas en las que el soñador aparece como protagonista, con memorias y emociones de esas épocas. Sin importar la postura metafísica adoptada, estos sueños suelen contener material simbólico relevante para la vida presente.</p>

<h3>6. Sueños de Unidad o Experiencias Místicas</h3>
<p>Los sueños místicos trascienden el lenguaje ordinario. El soñador experimenta una disolución de los límites del yo y una fusión con algo mayor: el universo, lo divino, la naturaleza. Estos sueños suelen cambiar la perspectiva vital del soñador de forma duradera.</p>

<h2>¿Cómo Distinguir un Sueño Espiritual?</h2>
<p>Varios rasgos se repiten consistentemente en los reportes de sueños espirituales:</p>
<ul>
  <li><strong>Viveza extraordinaria:</strong> Los colores son más intensos, los detalles más precisos que en sueños ordinarios.</li>
  <li><strong>Sensación de realidad:</strong> La experiencia se siente más real que la vigilia ordinaria.</li>
  <li><strong>Impacto emocional duradero:</strong> El estado emocional persiste horas o días después de despertar.</li>
  <li><strong>Mensaje claro:</strong> A diferencia de sueños simbólicos complejos, suelen contener un mensaje comprensible y directo.</li>
  <li><strong>Certeza interna:</strong> El soñador sabe, dentro de la experiencia, que lo que ocurre es significativo.</li>
</ul>

<h2>El Duelo y los Sueños de Visita</h2>
<p>Los investigadores Jennifer Wider y Bill Guggenheim han documentado miles de casos de lo que llaman "comunicaciones después de la muerte": experiencias en que personas en duelo sienten la presencia de sus seres queridos fallecidos, frecuentemente a través de sueños.</p>
<p>Lo que todos los reportes tienen en común es que la persona fallecida aparece en paz, comunica que está bien, y el soñador despierta con un alivio genuino que otras formas de consuelo no habían logrado.</p>

<h2>El Budismo Tibetano y el Yoga del Sueño</h2>
<p>El <em>Yoga del Sueño</em>, uno de los Seis Yogas de Naropa, es una práctica contemplativa que utiliza el estado de sueño como campo de entrenamiento espiritual. La premisa es que el estado de sueño comparte estructura con el estado de muerte. Aprender a mantenerse consciente durante el sueño prepara la mente para mantenerse consciente durante la transición de la muerte.</p>

<h2>Cómo Cultivar Sueños Espirituales</h2>
<ol>
  <li><strong>Intención antes de dormir:</strong> Establece una pregunta o intención clara al acostarte. El inconsciente tiende a trabajar con intenciones conscientes.</li>
  <li><strong>Diario de sueños:</strong> Registrar los sueños regularmente aumenta la conexión con la vida onírica.</li>
  <li><strong>Meditación vespertina:</strong> Una práctica de meditación antes de dormir calma el ruido mental y facilita el acceso a estados más profundos.</li>
  <li><strong>Reducir estímulos digitales:</strong> Las pantallas activan el sistema nervioso simpático y dificultan el acceso a sueños profundos.</li>
  <li><strong>Despertar con atención:</strong> Los primeros momentos al despertar son cruciales. Permanece quieto, recuerda el sueño y escríbelo antes de hacer cualquier otra cosa.</li>
</ol>

<h2>Conclusión</h2>
<p>Los sueños espirituales nos recuerdan que la conciencia humana es más vasta de lo que la vida ordinaria sugiere. Ya sea que los interpretes desde una perspectiva psicológica o metafísica, estas experiencias ofrecen orientación, consuelo y una perspectiva que trasciende las preocupaciones del día a día. El sueño es, quizás, el umbral más accesible a dimensiones de la existencia que la vida despierta raramente permite visitar.</p>`,
  },
];

export function getPillarBySlug(slug: string): PillarPage | undefined {
  return pillarPages.find((p) => p.slug === slug);
}

export function getPillarByCluster(clusterSlug: string): PillarPage | undefined {
  return pillarPages.find((p) => p.clusterSlug === clusterSlug);
}

export function getClusterBySlug(slug: string): Cluster | undefined {
  return clusters.find((c) => c.slug === slug);
}

export function getAllPillarSlugs(): string[] {
  return pillarPages.map((p) => p.slug);
}

export function getAllClusters(): Cluster[] {
  return clusters;
}
