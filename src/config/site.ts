export interface SiteConfig {
  name: string;
  shortName: string;
  logoText: string;
  tagline: string;
  description: string;
  url: string;
  supportEmail: string;
  gameUrl?: string;
  heroVideoId?: string;
  social?: {
    discord?: string;
    youtube?: string;
    twitter?: string;
    tiktok?: string;
  };
  locales: readonly string[];
  defaultLocale: string;
}

export const siteConfig: SiteConfig = {
  name: "Animal Daycare Anomaly Wiki",
  shortName: "Animal Daycare",
  logoText: "AD",
  tagline: "Anomaly Detection Guides, Daycare Tips, Secrets & Updates",
  description: "Animal Daycare Anomaly is a Roblox survival horror game where players manage a daycare, inspect animal visitors, care for children, discover hidden impostors, and survive mysterious nighttime events.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://animal-daycare-anomaly.wiki",
  supportEmail: `support@${new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://animal-daycare-anomaly.wiki").hostname.replace(/^www\./, "")}`,
  gameUrl: "https://www.roblox.com/games/124061247871628/Animal-Daycare",
  heroVideoId: "nB2RIoSDg1Y", // Roblox Animal Daycare (Anomaly) full gameplay walkthrough
  social: {
    discord: "https://discord.gg/roblox",
    youtube: "https://www.youtube.com/@roblox",
  },
  locales: ["en", "es", "pt", "de", "fr"],
  defaultLocale: "en",
};
