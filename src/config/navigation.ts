/**
 * 导航项契约。消费者只读取 `key`（翻译键，用于 t(key)）和 `path`（路由路径），
 * 二者在后续重建导航时必须继续保留，不得改由 `/${item.key}` 之类的猜测推导路径。
 *
 * `path` 收窄为模板字符串类型 `/${string}`，配合下方 `satisfies` 约束，
 * 缺字段或漏写前导斜杠时 TypeScript 会直接报错。
 *
 * 原模板的 `icon` 字段当前无任何消费者，且重建时才会重新引入图标依赖，
 * 因此本阶段不再保留该字段。
 */
export interface NavigationItem {
  key: string;
  path: `/${string}`;
  isContentType: boolean;
}

/**
 * 站点导航配置——分类 slug 与 content/<locale>/ 下的文章子目录一一对应，
 * 真相源为需求目录 `关键词.json` 的 categories 数组（guide / mechanics /
 * characters / maps / controls / progression / codes）。
 *
 * nav 值命名规则：category key 的首字母大写形式，单个英文单词。
 * 因此 `key`（翻译键）与 `path`（URL）在本项目中取值相同，但语义不同，
 * 不得合并为同一字段。
 *
 * 消费者：src/components/site.tsx（item.key / item.path）、
 * src/app/[locale]/[...slug]/page.tsx、src/app/sitemap.ts、src/lib/content.ts（均只读 CONTENT_TYPES）。
 */
export const NAVIGATION_CONFIG = [
  { key: "guide", path: "/guide", isContentType: true },
  { key: "mechanics", path: "/mechanics", isContentType: true },
  { key: "characters", path: "/characters", isContentType: true },
  { key: "maps", path: "/maps", isContentType: true },
  { key: "controls", path: "/controls", isContentType: true },
  { key: "progression", path: "/progression", isContentType: true },
  { key: "codes", path: "/codes", isContentType: true },
] satisfies readonly NavigationItem[];

/** 内容类型列表由导航配置派生，避免两处漂移。 */
export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map((item) => item.path.replace(/^\//, ""));
