import type { MetadataRoute } from "next";
import { getAllContentPaths } from "@/lib/content";
import { routing } from "@/i18n/routing";
import { CONTENT_TYPES } from "@/config/navigation";

export const dynamic = "force-static";

const SITE_URL = "https://animal-daycare-anomaly.wiki";

/** 固定存在的非内容页（法律页等） */
const STATIC_PAGES = ["/privacy-policy", "/terms-of-service", "/copyright", "/about"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;

  // 分类列表页由 CONTENT_TYPES 派生，避免与导航配置漂移
  const listingPaths = CONTENT_TYPES.map((ct) => `/${ct}`);
  const listingSet = new Set(listingPaths);

  // Dynamic paths: scan actual MDX content files
  const contentPaths = await getAllContentPaths("en");
  const dynamicPaths = contentPaths.map((item) => `/${[item.contentType, ...item.slug].join("/")}`);

  const paths = ["/", ...listingPaths, ...STATIC_PAGES, ...dynamicPaths];

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteUrl}/${locale}${path === "/" ? "" : path}`,
      lastModified: new Date(),
      changeFrequency: path === "/" ? ("daily" as const) : ("weekly" as const),
      priority: path === "/" ? 1 : listingSet.has(path) ? 0.8 : 0.6,
    })),
  );
}
