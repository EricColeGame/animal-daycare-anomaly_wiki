"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";

/**
 * 404 页。原模板硬编码 `/en/bosses`：既写死了 locale 前缀（其他语言用户被踢回英文），
 * 又指向已不存在的分类。这里改用 next-intl 的 useLocale 动态拼当前语言前缀，
 * 目标换成真实存在的分类列表页 /guide。
 *
 * 注意：不能用 @/components/site 的 localizeHref——该模块 import 了 next-intl/server，
 * 拉进客户端组件会导致构建失败。
 */
export default function NotFoundPage() {
  const locale = useLocale();
  return (
    <main className="mx-auto grid min-h-[60vh] max-w-3xl place-items-center px-4 py-16 text-center">
      <div className="rounded-3xl border border-border bg-card/70 p-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Page not found</h1>
        <p className="mt-4 text-muted-foreground">The guide you are looking for may have moved or has not been added yet.</p>
        <Button asChild className="mt-6"><Link href={`/${locale}/guide`}>Browse the Guides</Link></Button>
      </div>
    </main>
  );
}
