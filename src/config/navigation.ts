/**
 * 导航项契约。消费者只读取 `key`（翻译键，用于 t(key)）和 `path`（路由路径），
 * 二者在后续重建导航时必须继续保留，不得改由 `/${item.key}` 之类的猜测推导路径。
 *
 * 原模板的 `icon` 字段当前无任何消费者，且重建时才会重新引入图标依赖，
 * 因此本阶段不再保留该字段。
 */
export interface NavigationItem {
  key: string;
  path: string;
  isContentType: boolean;
}

/**
 * 站点导航配置——Part 3 已清空，等待后续按新游戏的内容类型重建。
 *
 * 消费者：src/components/site.tsx（item.key / item.path）、
 * src/app/[locale]/[...slug]/page.tsx、src/app/sitemap.ts、src/lib/content.ts（均只读 CONTENT_TYPES）。
 */
export const NAVIGATION_CONFIG: readonly NavigationItem[] = [];

/** 内容类型列表由导航配置派生，避免两处漂移。 */
export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map((item) => item.path.replace(/^\//, ""));
