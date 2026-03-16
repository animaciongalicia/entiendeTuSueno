/**
 * NAV_CATEGORIES — única fuente de verdad para la navegación por categorías.
 *
 * Cada entrada corresponde exactamente a un categorySlug usado en articles.ts.
 * Usada en: Header, ArticleSidebar, blog/page.tsx sidebar.
 */
export const NAV_CATEGORIES = [
  {
    slug: "animales",
    name: "Animales",
    emoji: "🐾",
    description: "Perros, gatos, serpientes, arañas y lo que revelan sobre tu instinto",
  },
  {
    slug: "simbolos-en-suenos",
    name: "Símbolos en Sueños",
    emoji: "🔮",
    description: "Agua, fuego, casas, sangre, ropa y los símbolos más comunes",
  },
  {
    slug: "suenos-recurrentes",
    name: "Sueños Recurrentes",
    emoji: "🔁",
    description: "Por qué el cerebro repite el mismo sueño y cómo interpretarlo",
  },
  {
    slug: "ansiedad-y-miedos",
    name: "Ansiedad y Miedos",
    emoji: "😰",
    description: "Caídas, persecuciones, exámenes y los sueños que delatan el estrés",
  },
  {
    slug: "relaciones",
    name: "Relaciones",
    emoji: "🫂",
    description: "Pareja, ex, familia, amigos y lo que el cerebro procesa sobre los vínculos",
  },
  {
    slug: "ciencia-del-sueno",
    name: "Ciencia del Sueño",
    emoji: "🧠",
    description: "REM, parálisis, sueños lúcidos y la neurociencia detrás de los sueños",
  },
  {
    slug: "trabajo-y-dinero",
    name: "Trabajo y Dinero",
    emoji: "💼",
    description: "Jefes, despidos, dinero y la ansiedad laboral que aparece al dormir",
  },
  {
    slug: "cuerpo-y-mente",
    name: "Cuerpo y Mente",
    emoji: "🌿",
    description: "Embarazo, cuerpo, salud y la conexión entre mente y físico en los sueños",
  },
] as const;

export type NavCategory = (typeof NAV_CATEGORIES)[number];
