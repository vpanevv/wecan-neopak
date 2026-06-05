// Centralized photography sources. Verified Unsplash photos used as placeholders.
// TODO: Replace each with client-provided, optimized photography when available.
// Bilingual alt text is provided so the swap keeps accessibility intact.

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

export const IMAGES = {
  // Modern high-tech production facility — used in the Home process section.
  // Unsplash query reference: "beverage manufacturing facility modern"
  facility: {
    src: u('photo-1581091226825-a6a2a5aee158'),
    alt: {
      en: 'Modern high-tech production facility',
      bg: 'Модерен високотехнологичен производствен завод',
    },
  },
  // Industrial precision / technology accent — used on dark capability sections.
  // Unsplash query reference: "canning line industrial clean"
  line: {
    src: u('photo-1504917595217-d4dc5ebe6122'),
    alt: {
      en: 'Industrial production line precision work',
      bg: 'Прецизна работа на индустриална производствена линия',
    },
  },
} as const;
