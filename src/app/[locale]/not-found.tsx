"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { routing, type Locale } from "@/i18n/routing";
import en from "@/locales/en.json";
import pt from "@/locales/pt.json";
import es from "@/locales/es.json";
import de from "@/locales/de.json";

/**
 * 404 页。原模板硬编码 `/en/bosses`：既写死了 locale 前缀（其他语言用户被踢回英文），
 * 又指向已不存在的分类。这里改为按 URL 首段推导当前语言，CTA 指向真实存在的分类列表页 /guide。
 *
 * 语言与文案都刻意不依赖 i18n 运行时上下文：
 *   - 本模板是 `output: "export"` + `localePrefix: "always"` 且**没有 middleware**，
 *     `[locale]/not-found.tsx` 既不接收 params，也不保证被 [locale]/layout.tsx 的
 *     NextIntlClientProvider 包裹；一旦 useTranslations 取不到 context 会整页崩掉。
 *   - 因此用 usePathname() 取语言（与 language-switcher.tsx 同思路），
 *     文案直接取自 locales/*.json 的 notFound 命名空间，保持单一真相源、不重复维护字符串。
 *
 * 注意：不能用 @/components/site 的 localizeHref——该模块 import 了 next-intl/server，
 * 拉进客户端组件会导致构建失败。
 */
const notFoundCopy: Record<string, { title: string; description: string; cta: string }> = {
  en: en.notFound,
  pt: pt.notFound,
  es: es.notFound,
  de: de.notFound,
};

export default function NotFoundPage() {
  const pathname = usePathname() || "";
  const segment = pathname.split("/")[1] ?? "";
  const locale = (routing.locales as readonly string[]).includes(segment)
    ? (segment as Locale)
    : routing.defaultLocale;
  const copy = notFoundCopy[locale] ?? notFoundCopy.en;

  return (
    <main className="mx-auto grid min-h-[60vh] max-w-3xl place-items-center px-4 py-16 text-center">
      <div className="rounded-3xl border border-border bg-card/70 p-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">{copy.title}</h1>
        <p className="mt-4 text-muted-foreground">{copy.description}</p>
        <Button asChild className="mt-6"><Link href={`/${locale}/guide`}>{copy.cta}</Link></Button>
      </div>
    </main>
  );
}
