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
  emoji: string;
  color: string;
}

export const clusters: Cluster[] = [
  {
    slug: "suenos-con-animales",
    name: "Sueños con Animales",
    description: "Serpientes, perros, pájaros, leones... Los animales son los mensajeros más directos del inconsciente.",
    pillarSlug: "sonar-con-animales-guia-completa",
    categorySlug: "animales",
    emoji: "🐍",
    color: "#4ade80",
  },
  {
    slug: "suenos-con-personas",
    name: "Sueños con Personas",
    description: "Tu ex, tu familia, desconocidos. Cada persona es un espejo de algo tuyo.",
    pillarSlug: "sonar-con-personas-guia-completa",
    categorySlug: "personas",
    emoji: "👥",
    color: "#818cf8",
  },
  {
    slug: "suenos-con-muerte-y-miedo",
    name: "Muerte y Miedo",
    description: "Morir en un sueño es renacer. Descubre por qué estos sueños son señales de transformación.",
    pillarSlug: "sonar-con-muerte-guia-completa",
    categorySlug: "emociones",
    emoji: "🌑",
    color: "#a78bfa",
  },
  {
    slug: "suenos-de-amor-y-ex-pareja",
    name: "Amor y Ex Pareja",
    description: "Soñar con el ex no es añoranza. Es tu psique procesando lo que el corazón aún carga.",
    pillarSlug: "sonar-con-ex-pareja-guia-completa",
    categorySlug: "personas",
    emoji: "💜",
    color: "#f472b6",
  },
  {
    slug: "suenos-de-dinero-y-trabajo",
    name: "Dinero y Trabajo",
    description: "El dinero en los sueños habla de autoestima, poder y tu relación con la abundancia.",
    pillarSlug: "sonar-con-dinero-guia-completa",
    categorySlug: "emociones",
    emoji: "✨",
    color: "#fbbf24",
  },
  {
    slug: "suenos-espirituales",
    name: "Sueños Espirituales",
    description: "Visitas de fallecidos, ángeles, presencias. Lo que el alma procesa mientras el cuerpo duerme.",
    pillarSlug: "suenos-espirituales-guia-completa",
    categorySlug: "espiritual",
    emoji: "🌙",
    color: "#67e8f9",
  },
];

export const pillarPages: PillarPage[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // 1. ANIMALES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "sonar-con-animales-guia-completa",
    clusterSlug: "suenos-con-animales",
    title: "Soñar con Animales: Guía Completa de Significados",
    metaTitle: "Soñar con Animales: Significado Completo y Qué Revela tu Inconsciente",
    metaDescription:
      "Guía definitiva para interpretar sueños con animales. Descubre qué simboliza cada especie, desde serpientes y perros hasta leones y pájaros, y cómo aplicarlo a tu vida.",
    category: "Animales",
    categorySlug: "animales",
    publishedAt: "2024-01-01",
    updatedAt: "2024-03-01",
    readingTime: 18,
    coverImage: "/images/blog/animales/sonar-con-animales-guia-completa.webp",
    coverAlt: "Animales salvajes bajo la luz de la luna llena",
    tags: ["animales", "sueños", "inconsciente", "simbolismo", "arquetipos"],
    tipo: "pilar",
    faqItems: [
      {
        question: "¿Por qué soñamos tan frecuentemente con animales?",
        answer:
          "Los animales representan instintos, emociones primitivas y aspectos de nuestra personalidad que la mente consciente reprime. Jung los consideraba arquetipos universales del inconsciente colectivo presentes en toda cultura humana.",
      },
      {
        question: "¿Es malo soñar con animales peligrosos?",
        answer:
          "No. Un animal peligroso en un sueño suele representar una emoción intensa o una situación desafiante en tu vida. Enfrentarlo en el sueño es señal de que estás listo para manejarlo en la realidad.",
      },
      {
        question: "¿Qué diferencia hay entre soñar con un animal doméstico y uno salvaje?",
        answer:
          "Los animales domésticos se relacionan con aspectos conocidos y controlados de tu personalidad o de tus relaciones cercanas. Los salvajes representan instintos más primarios, libertad o partes de ti que aún no has integrado.",
      },
      {
        question: "¿Importa el color del animal en el sueño?",
        answer:
          "Sí. Un lobo negro puede simbolizar la sombra jungiana, mientras que uno blanco apunta a pureza o guía espiritual. Siempre combina el animal con su color para una interpretación más precisa.",
      },
      {
        question: "¿Qué significa soñar que un animal me ataca?",
        answer:
          "Un ataque animal indica que una emoción reprimida —ira, miedo, deseo— reclama tu atención. También puede señalar una amenaza externa que tu inconsciente detectó antes que tu mente consciente.",
      },
    ],
    content: `<h2>Cuando los animales entran en tu sueño</h2>
<p>Son las tres de la madrugada y una serpiente te observa. O un lobo te sigue en silencio por un bosque oscuro. O un pájaro blanco se posa en tu hombro y sientes, inexplicablemente, que todo va a estar bien. Despiertas con el corazón acelerado, o con una paz extraña, o con la certeza de que ese sueño decía algo importante.</p>
<p>Tenías razón. Los sueños con animales son uno de los lenguajes más directos del inconsciente, y uno de los más universales: aparecen en los sueños registrados más antiguos de la humanidad, en todas las culturas y en todas las épocas. Tu mente no los eligió al azar.</p>

<h2>Qué dice la psicología</h2>
<p>Carl Gustav Jung fue el pensador que más profundamente exploró el significado de los animales en los sueños. Para Jung, los animales representan los <em>arquetipos del inconsciente colectivo</em>: patrones simbólicos compartidos por toda la humanidad que emergen especialmente en los sueños.</p>
<p>La lógica es clara: los seres humanos vivimos durante cientos de miles de años en estrecho contacto con los animales, dependiendo de ellos para sobrevivir, temiéndolos, venerándolos. Ese vínculo evolutivo quedó grabado en las capas más profundas de nuestra psique. Cuando soñamos con un lobo, no soñamos solo con ese animal concreto: activamos toda la carga simbólica que esa especie ha acumulado en el inconsciente colectivo de nuestra especie.</p>
<p>Sigmund Freud tenía una visión más directa: los animales en los sueños representaban pulsiones instintivas, especialmente las que la vida social obliga a reprimir. Un animal agresivo era, para él, la ira o el deseo sexual que no te permites expresar conscientemente.</p>
<p>La psicología moderna añade otra dimensión: los sueños con animales cumplen una función de procesamiento emocional. El cerebro usa estos símbolos para integrar experiencias cargadas de emoción que durante el día no pudieron procesarse completamente.</p>

<h2>Qué dice la espiritualidad</h2>
<p>En prácticamente todas las tradiciones espirituales del mundo, los animales son mensajeros, guías o encarnaciones de fuerzas espirituales. Las culturas chamánicas de Siberia, América y África trabajan con <em>animales de poder</em>: guías espirituales en forma animal que acompañan al chamán en sus viajes al mundo invisible.</p>
<p>La tradición nativa norteamericana desarrolló un sistema elaborado de tótems: cada clan o persona tiene animales guía cuyas cualidades debe encarnar. Soñar repetidamente con un animal específico puede ser la señal de que ese animal es tu tótem del momento —una energía que tu alma necesita integrar.</p>
<p>En la tradición hindú, cada dios tiene su vāhana, su animal sagrado. El elefante es Ganesha, el águila es Vishnu, la serpiente rodea a Shiva. Soñar con estos animales en tradiciones con influencia hindú tiene resonancias espirituales específicas.</p>
<p>El budismo tibetano utiliza animales como símbolos de las cinco sabidurías: el garuda, el tigre, el dragón, el leopardo de las nieves y el león de las nieves representan cualidades espirituales que el practicante busca desarrollar.</p>

<h2>Los sueños más comunes en este cluster</h2>

<h3>Soñar con serpientes</h3>
<p>Es el sueño con animal más consultado en todo el mundo. La serpiente condensa en un solo símbolo la transformación, la sabiduría y el peligro. Soñar con una serpiente que muda de piel es uno de los mejores presagios oníricos: anuncio de renovación profunda. Soñar que te muerde puede señalar una herida emocional activa o una traición percibida.</p>
<p>→ <a href="/blog/sonar-con-serpientes" class="text-violet-400 hover:text-violet-300 underline underline-offset-2">Significado completo de soñar con serpientes</a></p>

<h3>Soñar con perros</h3>
<p>El perro es el símbolo de la lealtad y la amistad. Un perro amigable señala relaciones de confianza en tu vida. Uno agresivo puede representar una traición o conflicto con alguien cercano. Un perro enfermo señala que una relación importante está deteriorándose.</p>

<h3>Soñar con pájaros</h3>
<p>Los pájaros son universalmente símbolos del alma, la libertad y la perspectiva elevada. Un pájaro enjaulado representa una parte de ti que se siente atrapada. Pájaros en vuelo libre son liberación y expansión.</p>

<h3>Soñar con leones o tigres</h3>
<p>Los grandes felinos representan el poder personal y el liderazgo. Caminar junto a un felino sin miedo es una de las señales más poderosas de integración del propio poder interior.</p>

<h2>Cómo interpretar el animal de tu sueño</h2>
<p>Antes de buscar el significado de un animal concreto, responde estas preguntas:</p>
<ul>
  <li><strong>¿Qué estaba haciendo el animal?</strong> La acción importa más que el animal. Una serpiente que muda de piel tiene un significado radicalmente distinto a una que te ataca.</li>
  <li><strong>¿Qué sentiste?</strong> Tu reacción emocional es la brújula del sueño. Miedo, fascinación, ternura, indiferencia: cada emoción orienta la interpretación.</li>
  <li><strong>¿De qué color era?</strong> Blanco apunta a lo espiritual, negro a la sombra, rojo a la pasión o la ira, dorado a la sabiduría.</li>
  <li><strong>¿Qué estaba ocurriendo en tu vida el día anterior?</strong> El inconsciente trabaja con el material fresco.</li>
</ul>

<h2>La técnica de la imaginación activa</h2>
<p>Jung desarrolló una técnica llamada imaginación activa para dialogar con los símbolos del sueño. Para aplicarla con un animal que apareció en tu sueño:</p>
<ol>
  <li>Siéntate en silencio con los ojos cerrados y recuerda el sueño vívidamente.</li>
  <li>Visualiza de nuevo al animal. Observa su aspecto, su postura, su mirada.</li>
  <li>Pregúntale en tu imaginación: "¿Quién eres? ¿Qué necesitas de mí?"</li>
  <li>Observa sin juicio lo que surge: imágenes, palabras, sensaciones corporales.</li>
  <li>Agradece al animal y anota todo en tu diario de sueños inmediatamente.</li>
</ol>
<p>Muchas personas se sorprenden de la claridad de las respuestas que aparecen con esta técnica.</p>

<h2>Llevar un diario de sueños con animales</h2>
<p>Si los animales aparecen con frecuencia en tus sueños, llevar un registro sistemático te permitirá identificar patrones que una sola interpretación no revela. Anota: qué animal fue, qué acción realizaba, su color, tu emoción, y qué estaba pasando en tu vida en ese momento. Con el tiempo emerge el lenguaje simbólico específico de tu propio inconsciente.</p>`,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. PERSONAS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "sonar-con-personas-guia-completa",
    clusterSlug: "suenos-con-personas",
    title: "Soñar con Personas: Guía Completa de Significados",
    metaTitle: "Soñar con Personas: Qué Significa Soñar con Alguien Específico",
    metaDescription:
      "Guía completa para interpretar sueños con personas: ex parejas, familia, desconocidos, personas fallecidas. Descubre qué representan realmente y por qué tu mente las convoca.",
    category: "Personas",
    categorySlug: "personas",
    publishedAt: "2024-01-08",
    updatedAt: "2024-03-01",
    readingTime: 16,
    coverImage: "/images/blog/personas/sonar-con-personas-guia-completa.webp",
    coverAlt: "Siluetas de personas en un paisaje onírico",
    tags: ["personas", "ex", "familia", "desconocidos", "fallecidos", "relaciones"],
    tipo: "pilar",
    faqItems: [
      {
        question: "¿Soñar con mi ex significa que todavía lo/la quiero?",
        answer:
          "No necesariamente. Tu ex representa en tu psique un conjunto de cualidades y patrones relacionales. Soñar con él o ella puede señalar que esas cualidades o necesidades están activas en tu vida actual, sin que implique deseo de retomar la relación.",
      },
      {
        question: "¿Qué significa soñar con alguien que apenas conozco?",
        answer:
          "Las personas que apenas conocemos en sueños suelen representar aspectos de nuestra propia personalidad que no hemos desarrollado plenamente. La cualidad que más te llama la atención en esa persona es la clave interpretativa.",
      },
      {
        question: "¿Por qué aparecen desconocidos en mis sueños?",
        answer:
          "Los desconocidos son proyecciones de aspectos de uno mismo: la sombra jungiana, el animus o anima, aspectos potenciales sin desarrollar. Un desconocido amenazante puede representar la sombra; uno atractivo y misterioso, el animus o anima.",
      },
      {
        question: "¿Es normal soñar con personas que ya fallecieron?",
        answer:
          "Es completamente normal y puede ser profundamente significativo. Estos sueños pueden representar el proceso de duelo, pero muchas personas los describen como visitas reales: más vívidos, con la persona en paz, y mensajes de consuelo genuino.",
      },
    ],
    content: `<h2>Todos los personajes de tu sueño eres tú</h2>
<p>Despiertas con el corazón acelerado porque soñaste con esa persona que ya no está. O con alguien que ni recuerdas conscientemente. O con un desconocido que, de alguna manera, te resultaba íntimamente familiar. ¿Por qué tu mente convoca exactamente a esas personas y no a otras?</p>
<p>La respuesta más transformadora que ofrece la psicología de los sueños es esta: en tus sueños, <em>tú eres todos los personajes</em>. La persona que te persigue, el ser querido que aparece, el desconocido que te ayuda: todos son proyecciones de aspectos de tu propia psique. No son las personas reales. Son versiones construidas por tu inconsciente a partir de tu percepción, tus memorias y tus proyecciones emocionales de esas personas.</p>
<p>Con esta perspectiva, cada persona que aparece en tus sueños se convierte en un maestro sobre ti mismo.</p>

<h2>Qué dice la psicología</h2>
<p>Sigmund Freud observó que las personas en los sueños casi siempre representan figuras de autoridad o deseo del soñador. El padre sería la figura del superyó; ciertos personajes encarnarían deseos reprimidos. Para Freud, preguntar "¿por qué soñé con esta persona?" era preguntar qué rol emocional ocupa en tu vida psíquica.</p>
<p>Carl Jung desarrolló esta idea con el concepto de <em>proyección</em>: tendemos a proyectar en los demás las cualidades que no reconocemos como propias. Los sueños, al mostrar esas proyecciones directamente, son una oportunidad única de verlas y reclamarlas como nuestras.</p>
<p>Jung también identificó arquetipos específicos que aparecen como personajes en los sueños:</p>
<ul>
  <li><strong>La Sombra:</strong> El personaje que amenaza o persigue. Representa los aspectos de ti mismo que has rechazado o reprimido. Cuanto más aterrador, mayor la energía psíquica que has estado conteniendo.</li>
  <li><strong>El Anima / Animus:</strong> Una figura del sexo opuesto, a menudo cargada de atractivo misterioso. Representa las cualidades del otro sexo que llevas dentro y que necesitas integrar.</li>
  <li><strong>El Self / Sí-mismo:</strong> Una figura de autoridad serena y sabia —un anciano, una anciana, un maestro— que a menudo porta mensajes de orientación directa.</li>
</ul>
<p>La psicología cognitiva moderna añade que los sueños con personas conocidas son, en parte, simulaciones sociales: el cerebro practica relaciones, anticipa conflictos y procesa emociones no resueltas de interacciones recientes.</p>

<h2>Qué dice la espiritualidad</h2>
<p>En las tradiciones espirituales, las personas que aparecen en sueños pueden ser mensajeros del más allá, manifestaciones de vínculos kármicos o proyecciones del propio alma en distintas formas.</p>
<p>En el espiritismo y muchas tradiciones chamánicas, soñar con personas fallecidas que traen mensajes de paz es considerado una comunicación genuina: el alma del fallecido que visita al soñador para transmitir un mensaje específico. Esta interpretación es coherente con los miles de testimonios de personas en duelo que describen estos sueños como cualitativamente diferentes a cualquier otro.</p>
<p>La tradición hindú interpreta los sueños con personas como manifestaciones de vínculos kármicos: las almas con las que tenemos deudas o contratos kármicos aparecen en nuestros sueños para recordarnos ese vínculo. Una perspectiva que, independientemente de la postura metafísica que se adopte, señala a la profundidad y la relevancia de ciertas relaciones en nuestra vida.</p>

<h2>Los sueños más comunes en este cluster</h2>

<h3>Soñar con tu ex pareja</h3>
<p>El más consultado con diferencia. Soñar con el ex no significa que quieras retomar la relación: significa que esa persona representa en tu psique un conjunto de cualidades, emociones y dinámicas que siguen activas en tu vida actual. La pregunta clave es: ¿qué cualidad tiene tu ex en el sueño? Eso es lo que realmente te señala el inconsciente.</p>

<h3>Soñar con padres o familia</h3>
<p>El padre suele representar la autoridad, la estructura y la crítica interna. La madre representa el cuidado, el origen y la nutrición. Los conflictos con figuras familiares en sueños casi siempre señalan conflictos internos con lo que esas figuras representan en tu psique.</p>

<h3>Soñar con personas fallecidas</h3>
<p>Tiene dos lecturas posibles: psicológica (representan lo que simbolizaban en tu vida) y espiritual (muchas personas describen estas visitas como reales por su viveza extraordinaria y el consuelo genuino que traen). Ambas lecturas son válidas y no son excluyentes.</p>

<h3>Soñar con desconocidos</h3>
<p>Los personajes desconocidos son creaciones puras del inconsciente. Casi siempre representan partes de ti mismo: la sombra, el animus/anima, o potenciales sin desarrollar. Obsérvalos como si fueran espejos: la cualidad que proyectas en ellos es la que tu psique quiere que reconozcas en ti.</p>

<h2>Cómo trabajar con estos sueños</h2>
<ol>
  <li><strong>Identifica la cualidad central:</strong> ¿Cuál es el rasgo más saliente de esa persona en el sueño?</li>
  <li><strong>Pregúntate si esa cualidad es tuya:</strong> ¿La tienes? ¿La deseas? ¿La rechazas?</li>
  <li><strong>Observa la dinámica:</strong> Lo que ocurre entre tú y esa persona en el sueño es un mapa de tu dinámica interna.</li>
  <li><strong>Registra la emoción:</strong> Cómo te sentiste al despertar es la información más directa disponible.</li>
</ol>`,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. MUERTE Y MIEDO
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "sonar-con-muerte-guia-completa",
    clusterSlug: "suenos-con-muerte-y-miedo",
    title: "Soñar con la Muerte: Guía Completa de Significados",
    metaTitle: "Soñar con la Muerte: Qué Significa Realmente y Por Qué No Debes Asustarte",
    metaDescription:
      "Guía completa sobre sueños con la muerte y el miedo. Por qué soñar con morir no es un mal presagio, qué simboliza cada variante y cómo trabajar con estos poderosos mensajes del inconsciente.",
    category: "Emociones",
    categorySlug: "emociones",
    publishedAt: "2024-01-10",
    updatedAt: "2024-03-01",
    readingTime: 15,
    coverImage: "/images/blog/muerte-miedo/sonar-con-muerte-guia-completa.webp",
    coverAlt: "Figura oscura en un paisaje neblinoso al amanecer",
    tags: ["muerte", "miedo", "transformación", "fin de ciclo", "cambio", "inconsciente"],
    tipo: "pilar",
    faqItems: [
      {
        question: "¿Soñar con mi propia muerte significa que voy a morir pronto?",
        answer:
          "No. Esta es una de las supersticiones más extendidas y sin fundamento. Soñar con la propia muerte es, en la psicología de los sueños, una de las señales más frecuentes de transformación personal: una identidad, etapa o patrón está llegando a su fin para dar paso a algo nuevo.",
      },
      {
        question: "¿Por qué sueño repetidamente con la muerte de un ser querido?",
        answer:
          "Estos sueños suelen reflejar ansiedad sobre la pérdida de esa persona, cambios en la relación con ella, o aspectos tuyos que esa persona representa en tu psique.",
      },
      {
        question: "¿Es normal sentir alivio en un sueño donde alguien muere?",
        answer:
          "Sí, y es más común de lo que se cree. El alivio señala el fin de una situación tensa o el deseo inconsciente de liberarse de una carga emocional. No indica un deseo real de daño.",
      },
      {
        question: "¿Qué son las pesadillas recurrentes y cómo se detienen?",
        answer:
          "Las pesadillas recurrentes son el inconsciente señalando un tema no resuelto con insistencia creciente. La técnica con mayor evidencia para detenerlas es la Imagery Rehearsal Therapy: reescribir conscientemente el final del sueño y ensayarlo durante 10-20 minutos al día.",
      },
    ],
    content: `<h2>El mayor malentendido del mundo onírico</h2>
<p>Despiertas sudando. Tu corazón late desbocado. Soñaste que morías, o que alguien a quien quieres moría. El primer impulso es el miedo: ¿es una señal? ¿Un mal presagio? ¿Significa algo terrible?</p>
<p>La respuesta de la psicología del sueño es categórica y, para muchos, sorprendente: soñar con la muerte es <em>casi siempre una señal de transformación, no de muerte literal</em>. Es, de hecho, uno de los sueños más positivos que puede tener una persona que atraviesa un proceso de cambio profundo.</p>
<p>Entender esto no solo alivia el miedo que estos sueños generan: te da acceso a uno de los mensajes más poderosos que tu inconsciente puede enviarte.</p>

<h2>Qué dice la psicología</h2>
<p>Carl Jung fue el pensador que más profundamente exploró la muerte como símbolo en los sueños. Para Jung, la muerte en los sueños representaba la <em>enantiodromia</em>: el principio por el cual todo proceso lleva en sí mismo su propio opuesto. Lo que muere en un sueño permite que algo nuevo nazca.</p>
<p>En términos psicológicos concretos, soñar con la propia muerte suele ocurrir en momentos de:</p>
<ul>
  <li><strong>Transición de identidad:</strong> Cuando una versión de ti mismo —el empleado que eras, el hijo dependiente, la persona en relación— está llegando a su fin.</li>
  <li><strong>Cierre de etapas:</strong> Finales de relaciones, cambios de trabajo, mudanzas, graduaciones. Tu psique necesita ritualizar el cierre.</li>
  <li><strong>Integración de la sombra:</strong> Cuando un aspecto reprimido de tu personalidad está siendo finalmente reconocido y asimilado.</li>
</ul>
<p>Sigmund Freud asociaba los sueños con muerte a deseos hostiles reprimidos o a la angustia de castración y pérdida. Una visión más reduccionista, pero que señala acertadamente la carga emocional de estos sueños.</p>
<p>La psicología del trauma añade una dimensión importante: las pesadillas con muerte recurrentes pueden ser síntomas de TEPT, en cuyo caso el procesamiento requiere acompañamiento terapéutico.</p>

<h2>Qué dice la espiritualidad</h2>
<p>Las tradiciones espirituales del mundo son notablemente unánimes en su interpretación de la muerte en los sueños: es siempre transformación, nunca predicción.</p>
<p>En el budismo, los sueños con muerte son oportunidades de practicar el desapego y contemplar la impermanencia. El Yoga del Sueño tibetano entrena al practicante para reconocer el estado de muerte como una transición de conciencia, y los sueños con muerte como preparación para esa transición.</p>
<p>La tradición kabbalística ve la muerte en los sueños como el ascenso del alma a planos superiores para recibir instrucción espiritual. El soñador no muere: su conciencia se expande.</p>
<p>En las tradiciones shamánicas de América Latina, soñar con la propia muerte es una iniciación: el chamán que ha experimentado la muerte en sueños tiene autoridad espiritual para acompañar a otros en sus transiciones.</p>
<p>El mensaje espiritual es coherente con el psicológico: lo que muere en el sueño es lo que ya no sirve. El espacio que queda es para algo nuevo.</p>

<h2>Los sueños más comunes en este cluster</h2>

<h3>Soñar con caídas</h3>
<p>Es el sueño de miedo más frecuente. La caída casi nunca señala un peligro físico real: señala pérdida de control percibida en algún área de la vida. Las personas que sueñan con caídas recurrentes suelen estar cargando con demasiada responsabilidad o en situaciones donde sienten que el suelo no es seguro.</p>
<p>→ <a href="/blog/sonar-con-caidas" class="text-violet-400 hover:text-violet-300 underline underline-offset-2">Significado completo de soñar con caídas</a></p>

<h3>Soñar con la propia muerte</h3>
<p>Señal de transformación profunda. Si mueres violentamente en el sueño, el cambio es abrupto; si mueres en paz, el cambio será gradual. La pregunta clave: ¿qué parte de ti sientes que está muriendo en tu vida actual?</p>

<h3>Soñar con ser perseguido</h3>
<p>El sueño de miedo más común junto con las caídas. El perseguidor representa algo que estás evitando. Cuanto más aterrador, mayor la energía psíquica reprimida. La solución no está en huir: está en detenerse y preguntar "¿qué quieres de mí?"</p>

<h3>Soñar con funerales</h3>
<p>Rituales de cierre. Tu psique está ceremoniando el fin de algo: una relación, una etapa, una identidad. Es un sueño que acompaña procesos de cambio saludables.</p>

<h2>La Imagery Rehearsal Therapy para pesadillas</h2>
<p>Si tienes pesadillas recurrentes con muerte o miedo, esta es la técnica con mayor evidencia científica para resolverlas:</p>
<ol>
  <li>Escribe la pesadilla con detalle.</li>
  <li>Diseña un final alternativo que te resulte satisfactorio (no tiene que ser "realista").</li>
  <li>Ensaya mentalmente el nuevo final durante 10-20 minutos al día, en estado relajado.</li>
  <li>Repite durante 1-3 semanas.</li>
</ol>
<p>Los estudios muestran reducción significativa en la frecuencia e intensidad de las pesadillas en el 70-80% de los casos.</p>`,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. AMOR Y EX PAREJA
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "sonar-con-ex-pareja-guia-completa",
    clusterSlug: "suenos-de-amor-y-ex-pareja",
    title: "Soñar con tu Ex y con el Amor: Guía Completa",
    metaTitle: "Soñar con tu Ex: Por Qué Ocurre y Qué Significa Realmente",
    metaDescription:
      "Guía completa sobre sueños con tu ex pareja y el amor romántico. Por qué aparece tu ex en sueños, qué significa cada escenario, y cómo interpretar los sueños de amor.",
    category: "Personas",
    categorySlug: "personas",
    publishedAt: "2024-01-14",
    updatedAt: "2024-03-01",
    readingTime: 17,
    coverImage: "/images/blog/amor-ex/sonar-con-ex-pareja-guia-completa.webp",
    coverAlt: "Dos siluetas bajo la luz de la luna en un paisaje onírico",
    tags: ["ex pareja", "amor", "relaciones", "romance", "desamor", "reconciliación"],
    tipo: "pilar",
    faqItems: [
      {
        question: "¿Soñar con mi ex significa que debo volver con él/ella?",
        answer:
          "No. Los sueños con el ex raramente son un mensaje de retomar la relación. Más frecuentemente señalan que una necesidad emocional que esa relación satisfacía —seguridad, pasión, conexión— está activa ahora y requiere atención.",
      },
      {
        question: "¿Por qué sigo soñando con mi ex si ya lo superé?",
        answer:
          "Superar una relación en el plano consciente no significa que el inconsciente haya completado el procesamiento. Los sueños continuos señalan heridas emocionales que siguen activas aunque no las sientas conscientemente en la vigilia.",
      },
      {
        question: "¿Qué significa soñar que mi ex está con otra persona?",
        answer:
          "Este sueño suele reflejar inseguridades sobre tu propia valía o temores al abandono, más que preocupación real por lo que hace tu ex. Es una proyección de miedos internos en forma de escena relacional.",
      },
      {
        question: "¿Soñar con el amor de mi vida que aún no conozco es posible?",
        answer:
          "Sí. Una figura romántica desconocida puede representar el arquetipo del anima o animus jungiano: la imagen interna de la pareja ideal. También puede señalar que estás listo para abrirte al amor.",
      },
    ],
    content: `<h2>Esa persona que aparece aunque digas que ya la superaste</h2>
<p>Son las seis de la mañana y acabas de soñar con él. O con ella. Con esa persona que prometiste no volver a pensar. Y ahora estás en la cama con el corazón en la garganta preguntándote qué significa esto, si significa algo, si eres tan patético como te sientes en este momento.</p>
<p>No eres patético. Y el sueño sí significa algo, aunque no lo que probablemente temes.</p>
<p>Los sueños con ex parejas son los más consultados en todo el mundo, en todos los idiomas y en todas las culturas. Son tan universales que la psicología lleva décadas estudiándolos. Y la respuesta que ha encontrado es liberadora: <em>soñar con tu ex casi nunca es sobre tu ex</em>.</p>

<h2>Qué dice la psicología</h2>
<p>La psicología del sueño tiene una explicación clara para por qué el ex aparece en sueños incluso años después de una ruptura: las relaciones románticas significativas activan sistemas neurológicos profundos relacionados con el apego, la identidad y la regulación emocional. Cuando esa relación termina, el cerebro necesita tiempo para desactivar esos sistemas y reorganizar los esquemas emocionales asociados a esa persona.</p>
<p>La investigadora Rosalind Cartwright, pionera en el estudio de los sueños durante el divorcio, documentó que las personas en proceso de divorcio sueñan significativamente más con sus ex parejas, y que estos sueños cumplen una función de procesamiento emocional activo. Las personas que sueñan más con el ex durante el duelo relacional tienden a procesar el duelo más completamente.</p>
<p>Desde la perspectiva jungiana, el ex representa en tu psique un <em>complejo</em>: una constelación de emociones, memorias y expectativas que se activaron durante esa relación. El complejo no desaparece cuando termina la relación: sigue activo en el inconsciente hasta que las emociones asociadas son procesadas.</p>
<p>La aparición del ex en un sueño señala que ese complejo está activo <em>ahora mismo</em>, y generalmente porque hay una necesidad emocional en tu vida actual que ese complejo encarna. La pregunta productiva no es "¿extraño a mi ex?" sino "¿qué necesito ahora mismo que esa relación me daba?"</p>

<h2>Qué dice la espiritualidad</h2>
<p>Las tradiciones espirituales aportan una dimensión adicional: la de los vínculos del alma. En muchas tradiciones —el hinduismo, el budismo, la astrología kármica, el espiritismo— ciertas almas tienen vínculos que trascienden una sola vida. Las relaciones románticas intensas, especialmente las que generan heridas profundas o grandes transformaciones, suelen interpretarse como vínculos kármicos: relaciones destinadas a activar un aprendizaje específico en cada alma.</p>
<p>Desde esta perspectiva, soñar recurrentemente con una ex pareja puede señalar que el aprendizaje que esa relación vino a enseñar no ha sido completamente integrado. El sueño es una invitación a completar la lección.</p>
<p>La perspectiva sufi del amor añade otra capa: el amor romántico humano es un reflejo, imperfecto pero real, del amor divino. Las heridas del amor son, en este marco, oportunidades de apertura y de comprensión de algo más grande que uno mismo.</p>

<h2>Los sueños más comunes en este cluster</h2>

<h3>Volver con el ex en el sueño</h3>
<p>El más angustiante para quien lo vive. Raramente es un mensaje de retomar la relación. Casi siempre señala que <em>algo</em> de esa relación —la familiaridad, la pasión, sentirte completamente conocido— es lo que tu vida actual necesita. La pregunta clave: ¿qué es lo que más extrañas de ese tiempo? Eso es lo que realmente te señala el sueño.</p>

<h3>Tu ex feliz con otra persona</h3>
<p>Casi siempre sobre inseguridades tuyas, no sobre lo que hace tu ex. Puede reflejar miedo a no ser suficiente o la herida del abandono que no ha sanado del todo.</p>

<h3>Tu ex te busca o te pide perdón</h3>
<p>Tu inconsciente está generando el cierre que tu corazón necesitó y no tuvo. Es sanador, no es una predicción de lo que va a ocurrir en la realidad.</p>

<h3>Soñar con una figura romántica desconocida</h3>
<p>El desconocido romántico es el arquetipo del animus o anima jungiano: la imagen interna de la pareja ideal. Señala apertura a una nueva relación o el desarrollo de cualidades que antes proyectabas en la pareja.</p>

<h2>Lo que no debes hacer con estos sueños</h2>
<ul>
  <li><strong>No actúes impulsivamente:</strong> Soñar con el ex no es señal de que debes contactarlo.</li>
  <li><strong>No te culpes:</strong> No has "retrocedido". El inconsciente procesa a su propio ritmo.</li>
  <li><strong>No busques literalidad:</strong> El sueño habla en símbolos, no en instrucciones.</li>
</ul>
<p>Lo que <em>sí</em> puedes hacer: identificar la necesidad real que el sueño señala y explorar cómo satisfacerla de formas que no dependan de esa persona.</p>`,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. DINERO Y TRABAJO
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "sonar-con-dinero-guia-completa",
    clusterSlug: "suenos-de-dinero-y-trabajo",
    title: "Soñar con Dinero y Trabajo: Guía Completa de Significados",
    metaTitle: "Soñar con Dinero: Qué Significa y Qué Dice de tu Relación con la Abundancia",
    metaDescription:
      "Guía completa sobre sueños con dinero, trabajo y abundancia. Qué significa encontrar dinero, perderlo, soñar que te despiden, y cómo estos sueños reflejan tu autoestima y poder.",
    category: "Emociones",
    categorySlug: "emociones",
    publishedAt: "2024-01-18",
    updatedAt: "2024-03-01",
    readingTime: 16,
    coverImage: "/images/blog/dinero-trabajo/sonar-con-dinero-guia-completa.webp",
    coverAlt: "Monedas y billetes flotando en un espacio onírico",
    tags: ["dinero", "trabajo", "abundancia", "autoestima", "éxito", "fracaso"],
    tipo: "pilar",
    faqItems: [
      {
        question: "¿Soñar que encuentro dinero es buena señal?",
        answer:
          "Generalmente sí. Señala reconocimiento de valor propio, descubrimiento de recursos inesperados, o apertura a la abundancia. Coincide frecuentemente con períodos de mayor autoestima o con el reconocimiento de oportunidades que antes pasabas por alto.",
      },
      {
        question: "¿Qué significa soñar que me despiden del trabajo?",
        answer:
          "Raramente predice un despido real. Suele reflejar inseguridad sobre tu desempeño, miedo a no ser suficiente, o el deseo inconsciente de salir de esa situación laboral.",
      },
      {
        question: "¿Por qué sueño tan frecuentemente con el trabajo?",
        answer:
          "El trabajo ocupa un espacio enorme en la identidad y la rutina. Cuando hay estrés laboral no resuelto, el inconsciente continúa procesándolo durante el sueño. Es una señal de que algo en tu situación laboral necesita atención consciente.",
      },
      {
        question: "¿Los sueños de riqueza predicen el futuro económico?",
        answer:
          "No de forma literal. Un sueño de riqueza repentina refleja el deseo de libertad y opciones que sientes que no tienes ahora, o una expansión de la autoestima. No predice un golpe de suerte, pero sí señala un estado interno de mayor apertura a la abundancia.",
      },
    ],
    content: `<h2>El dinero que no es dinero</h2>
<p>Soñar con dinero puede parecer prosaico: ¿qué misterio puede haber en ver billetes o monedas mientras duermes? Pero la psicología de los sueños tiene algo importante que decir sobre esto: en los sueños, el dinero <em>raramente es solo dinero</em>.</p>
<p>El dinero es energía. Es poder. Es valor. Es seguridad. Es libertad. Y en los sueños, funciona como símbolo de todos estos conceptos a la vez. Cuando sueñas con dinero, estás soñando con tu relación con el poder, el valor propio y la capacidad de moverte libremente por el mundo.</p>
<p>Lo mismo ocurre con el trabajo: no es solo un lugar donde produces. Es donde buscas reconocimiento, donde defines parte de tu identidad, donde mides tu valía frente a los demás. Por eso los sueños laborales tocan algo tan profundo.</p>

<h2>Qué dice la psicología</h2>
<p>Alfred Adler, el psicólogo que desarrolló la psicología individual, ponía el impulso de poder y reconocimiento social en el centro de la motivación humana. Desde su perspectiva, los sueños con dinero y trabajo son expresiones directas de la lucha por la superioridad y el temor a la inferioridad.</p>
<p>La psicóloga Lynne Twist, en su investigación sobre la relación psicológica con el dinero, identificó lo que llama "mentiras tóxicas del dinero": creencias inconscientes como "nunca hay suficiente", "más es siempre mejor" o "así es como funciona el mundo". Estas creencias —muchas de ellas heredadas de la familia de origen— se manifiestan directamente en los sueños con dinero.</p>
<p>Desde la psicología cognitiva, los sueños laborales son en parte simulaciones de rendimiento: el cerebro practica escenarios de evaluación, anticipa conflictos sociales en el trabajo y procesa la ansiedad de no cumplir expectativas. El sueño del examen para el que no te preparaste —que muchos adultos que dejaron los estudios hace décadas siguen teniendo— es estructuralmente idéntico al sueño de fracasar en el trabajo.</p>

<h2>Qué dice la espiritualidad</h2>
<p>Las tradiciones espirituales tienen una perspectiva interesante sobre el dinero y la abundancia: lo material es un reflejo de lo interno, no al revés. La ley de la atracción, el principio hermético "como es arriba es abajo", la noción budista de que el sufrimiento nace del apego a lo externo: todas apuntan a que la relación con el dinero es fundamentalmente una relación con el propio yo.</p>
<p>En la perspectiva de la prosperidad espiritual, soñar con escasez crónica no señala un problema económico: señala una mentalidad de escasez —una creencia arraigada de que no mereces abundancia, de que el mundo es un lugar de recursos limitados y amenazas constantes. Esta mentalidad opera en el inconsciente mucho antes de manifestarse en la realidad material.</p>
<p>La tradición judía tiene un proverbio revelador: "El hombre sueña con lo que desea, y teme lo que cree que merece". Los sueños de pobreza pueden ser tanto deseos frustrados como reflejos de una autoestima que necesita trabajo.</p>

<h2>Los sueños más comunes en este cluster</h2>

<h3>Encontrar dinero</h3>
<p>Uno de los sueños más placenteros. Señala reconocimiento de valor propio, descubrimiento de recursos inesperados o apertura a la abundancia. Suele coincidir con períodos de mayor autoestima o con el reconocimiento de oportunidades que antes pasabas por alto.</p>

<h3>Perder dinero o que te lo roban</h3>
<p>Refleja miedos sobre la seguridad material, pérdida de poder o control, o la sensación de que algo valioso está siendo sustraído de tu vida. Puede señalar una relación que drena tu energía o un contexto donde das más de lo que recibes.</p>

<h3>Que te despiden</h3>
<p>Raramente predice un despido real. Suele reflejar inseguridad laboral o el deseo inconsciente de salir de esa situación. Cuando este sueño es alivio, el mensaje es claro.</p>

<h3>No poder terminar el trabajo</h3>
<p>Refleja sobrecarga real o percibida. Tu sistema nervioso está pidiendo que algo se quite de tu plato.</p>

<h2>Preguntas para trabajar con estos sueños</h2>
<ul>
  <li>¿Cómo me siento respecto a mi valor en el mundo profesional?</li>
  <li>¿Siento que recibo una compensación justa por lo que aporto?</li>
  <li>¿Qué creencias sobre el dinero heredé de mi familia?</li>
  <li>¿Me identifico tanto con mi trabajo que amenaza mi autoestima fuera de él?</li>
  <li>¿Hay algo en mi situación laboral que necesita cambiar y estoy evitando?</li>
</ul>`,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. ESPIRITUAL
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "suenos-espirituales-guia-completa",
    clusterSlug: "suenos-espirituales",
    title: "Sueños Espirituales: Guía Completa de Significados",
    metaTitle: "Sueños Espirituales: Qué Son, Tipos y Cómo Interpretarlos",
    metaDescription:
      "Guía completa sobre sueños espirituales: visitas de seres queridos fallecidos, encuentros con ángeles, sueños proféticos y experiencias místicas mientras duermes.",
    category: "Espiritual",
    categorySlug: "espiritual",
    publishedAt: "2024-01-05",
    updatedAt: "2024-03-01",
    readingTime: 17,
    coverImage: "/images/blog/espiritual/suenos-espirituales-guia-completa.webp",
    coverAlt: "Figura luminosa flotando sobre un paisaje onírico",
    tags: ["espiritual", "visitas", "ángeles", "profético", "místico", "alma"],
    tipo: "pilar",
    faqItems: [
      {
        question: "¿Cómo sé si un sueño es espiritual o simplemente un sueño normal?",
        answer:
          "Los sueños espirituales suelen distinguirse por su viveza extraordinaria, la sensación de realidad mayor que la vida despierta, y el impacto emocional duradero. Muchas personas describen saber dentro del sueño que lo que viven es real, no imaginado.",
      },
      {
        question: "¿Es posible recibir visitas de personas fallecidas en sueños?",
        answer:
          "Desde la psicología, estos sueños reflejan el proceso de duelo. Desde perspectivas espirituales, muchas tradiciones afirman que el contacto es real. Lo cierto es que traen consuelo genuino y mensajes que resuenan profundamente en quienes los viven.",
      },
      {
        question: "¿Qué son los sueños lúcidos y tienen dimensión espiritual?",
        answer:
          "Un sueño lúcido es aquel en que eres consciente de que estás soñando. Tradiciones contemplativas como el budismo tibetano lo consideran una práctica espiritual avanzada: un puente entre la conciencia ordinaria y estados expandidos de la mente.",
      },
      {
        question: "¿Los sueños proféticos predicen el futuro?",
        answer:
          "El inconsciente procesa señales que la mente consciente pasa por alto y construye proyecciones muy precisas. Si además existen capacidades perceptivas aún no comprendidas, ambas explicaciones apuntan al mismo resultado: estos sueños merecen atención.",
      },
    ],
    content: `<h2>Los sueños que no se olvidan</h2>
<p>Hay sueños que se desvanecen al despertar. Y hay sueños que te acompañan durante días, semanas, o el resto de tu vida. Una presencia que sentiste tan real como cualquier cosa que hayas vivido despierto. Una figura de luz que te dijo algo que necesitabas escuchar. Un familiar fallecido que apareció más vivo que nunca para decirte que está bien.</p>
<p>Estos son los sueños espirituales. Y pertenecen a una categoría diferente.</p>
<p>Personas de todas las culturas, en todos los tiempos, han reportado estos sueños con las mismas características: extraordinariamente vívidos, más reales que la realidad ordinaria, con impacto emocional duradero, y con mensajes que resuenan con una claridad que ningún otro sueño alcanza. La consistencia de estos reportes a través del tiempo y la geografía no puede ser ignorada.</p>

<h2>Qué dice la psicología</h2>
<p>La psicología aborda los sueños espirituales con respeto creciente. Carl Jung fue pionero en tomarse en serio las experiencias que la psicología de su época descartaba como superstición. Para Jung, los sueños de visita, los encuentros con figuras luminosas y las experiencias de unidad mística eran manifestaciones del Self —el arquetipo central de la psique— que se comunica de las formas más directas cuando el ego se silencia durante el sueño.</p>
<p>La investigadora Jennifer Wiseman documentó miles de lo que llama "comunicaciones post mortem": experiencias en que personas en duelo sienten la presencia de sus seres queridos fallecidos, principalmente a través de sueños. Lo que todos los casos tienen en común es que la persona fallecida aparece en paz, comunica que está bien, y el soñador despierta con un alivio genuino que ninguna otra forma de consuelo había producido.</p>
<p>La neurociencia contemporánea estudia los estados cerebrales durante los sueños espirituales y los sueños lúcidos. Los patrones de activación cerebral son distintos a los sueños ordinarios y comparten características con los estados meditativos profundos y las experiencias cercanas a la muerte. La psique hace algo diferente en estos momentos.</p>

<h2>Qué dice la espiritualidad</h2>
<p>Las tradiciones espirituales del mundo no necesitan convencer a nadie de que los sueños espirituales son reales: es uno de sus fundamentos más antiguos.</p>
<p>El <em>Yoga del Sueño</em> tibetano —uno de los Seis Yogas de Naropa— es una práctica contemplativa completa que utiliza el estado de sueño como campo de entrenamiento espiritual avanzado. La premisa: el estado de sueño comparte estructura con el estado de muerte. Aprender a mantener la conciencia durante el sueño prepara al practicante para mantenerla durante la transición de la muerte.</p>
<p>En el sufismo, los sueños son el reino del <em>barzakh</em>: el mundo intermedio entre lo visible y lo invisible donde el corazón espiritual puede recibir conocimiento directo. Los grandes maestros sufíes recibían instrucción espiritual en sueños.</p>
<p>La tradición cabalística distingue entre sueños ordinarios y sueños proféticos —<em>nevi'a</em>— en los que el alma asciende a planos espirituales y recibe revelación. El Talmud afirma que "el sueño es una sexagésima parte de la profecía".</p>
<p>Las culturas indígenas del continente americano utilizan los sueños como principal canal de comunicación con el mundo espiritual. Los sueños son visiones que guían las decisiones de la comunidad, curan enfermedades y revelan destinos.</p>

<h2>Los sueños más comunes en este cluster</h2>

<h3>Soñar con agua (dimension espiritual)</h3>
<p>El agua es el símbolo espiritual por excelencia: el inconsciente, el alma, las emociones más profundas. Soñar con aguas cristalinas puede señalar purificación y claridad espiritual. Las aguas del bautismo, del Ganges, del mikvé: todas las tradiciones espirituales tienen agua sagrada.</p>
<p>→ <a href="/blog/sonar-con-agua" class="text-violet-400 hover:text-violet-300 underline underline-offset-2">Significado completo de soñar con agua</a></p>

<h3>Visitas de personas fallecidas</h3>
<p>Los más impactantes de este cluster. La persona aparece en paz, a veces más joven, con una presencia que se siente diferente a cualquier otro sueño. El mensaje suele ser breve pero definitivo: "estoy bien", "sigue adelante", "te quiero". Estos sueños suelen llegar en los primeros meses de duelo, cuando más se necesitan.</p>

<h3>Encuentros con figuras de luz</h3>
<p>Figuras luminosas, seres de luz o presencias angélicas que aparecen en momentos de crisis o de búsqueda espiritual intensa. Dejan invariablemente una sensación de amor incondicional y paz que persiste días después.</p>

<h3>Sueños proféticos o premonitorios</h3>
<p>Sueñas algo que luego ocurre. La psicología ofrece una explicación (el inconsciente procesa señales que la conciencia pasa por alto); la espiritualidad ofrece otra (acceso a información que trasciende el tiempo ordinario). En cualquier caso, si tienes un sueño que sientes que señala algo real: presta atención.</p>

<h2>Cómo cultivar sueños espirituales</h2>
<ol>
  <li><strong>Intención antes de dormir:</strong> Formula una pregunta o petición clara al acostarte. El inconsciente —o lo que sea que escucha— tiende a responder a intenciones conscientes.</li>
  <li><strong>Diario de sueños:</strong> Anotar los sueños regularmente aumenta la conexión con la vida onírica profunda.</li>
  <li><strong>Meditación vespertina:</strong> Una práctica de meditación o contemplación antes de dormir calma el ruido mental y abre el espacio para sueños más profundos.</li>
  <li><strong>Silencio digital:</strong> Desconéctate de pantallas al menos una hora antes de dormir. El sistema nervioso simpático activado no accede a capas profundas del sueño.</li>
  <li><strong>Despertar en quietud:</strong> Los primeros segundos al despertar son sagrados. No consultes el teléfono. Permanece quieto, recuerda, anota.</li>
</ol>`,
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
