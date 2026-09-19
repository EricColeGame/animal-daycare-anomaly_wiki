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
    /** 官方开发者社群（Day Dreams Games 官方 Roblox Group，已验证 200） */
    developerGroup?: string;
    /** 玩法/攻略视频聚合入口 */
    gameplayVideos?: string;
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
    // 00基础信息.md 中官方 Discord / YouTube / Reddit 均为「待补充」，官方社群账号未经确认。
    // 为避免捏造「Official Discord」类链接，这里只指向已核验可达的本作官方/真实入口：
    //   1) Day Dreams Games 官方 Roblox Group（groups API 确认 creator 即该组，跳转后 200）
    //   2) YouTube 玩法视频检索（Footer 标签写作 "Gameplay Videos"，与真实去向一致）
    developerGroup: "https://www.roblox.com/communities/235484791/Day-Dreams-Games",
    gameplayVideos: "https://www.youtube.com/results?search_query=Animal+Daycare+Anomaly+Roblox+gameplay",
  },
  locales: ["en", "es", "pt", "de", "fr"],
  defaultLocale: "en",
};
