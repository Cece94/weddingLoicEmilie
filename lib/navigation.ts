export type NavKey =
  | "ourWedding"
  | "accommodationFood"
  | "registration"
  | "travel"
  | "program"
  | "faq";

export const navRoutes: Record<NavKey, string> = {
  ourWedding: "/our-wedding",
  accommodationFood: "/accommodation-food",
  registration: "/registration",
  travel: "/travel",
  program: "/program",
  faq: "/faq",
};
