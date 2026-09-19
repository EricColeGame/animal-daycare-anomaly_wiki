import { defineRouting } from "next-intl/routing";

/**
 * 站点支持的语言集合——本数组是唯一真相源。
 *
 * 以下四处必须与本文件的语言集合完全一致（Part 3 门禁）：
 *   1) src/i18n/request.ts 的 messagesMap 键
 *   2) src/components/language-switcher.tsx 的 localeLabels 键
 *   3) src/locales/*.json 的文件名集合
 *   4) content/<locale>/ 目录集合
 *
 * 注意：语言码必须保持内联字面量写法，不要改写成变量引用或展开语法，
 * 否则按行解析的校验脚本会取不到语言码。
 */
export const routing = defineRouting({
  locales: ["en", "pt", "es", "de"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
