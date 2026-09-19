import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import en from "@/locales/en.json";
import pt from "@/locales/pt.json";
import es from "@/locales/es.json";
import de from "@/locales/de.json";

type Messages = typeof en;

/**
 * 语言 → 消息包映射。键集合必须与 src/i18n/routing.ts 的语言集合完全一致。
 * 使用静态 import 而非动态 import：缺少语言文件时在构建期即报错，
 * 避免线上静默回退成英文而无人察觉。
 */
const messagesMap: Record<string, Partial<Messages>> = {
  "en": en,
  "pt": pt,
  "es": es,
  "de": de,
};

function deepMerge<T>(base: T, override: Partial<T>): T {
  if (
    typeof base !== "object" ||
    base === null ||
    typeof override !== "object" ||
    override === null
  ) {
    return (override as T) ?? base;
  }

  if (Array.isArray(base)) {
    return (Array.isArray(override) ? override : base) as T;
  }

  const result: Record<string, unknown> = { ...(base as Record<string, unknown>) };

  for (const key of Object.keys(override as Record<string, unknown>)) {
    const baseValue = (base as Record<string, unknown>)[key];
    const overrideValue = (override as Record<string, unknown>)[key];
    if (overrideValue === undefined) continue;
    result[key] = deepMerge(baseValue as never, overrideValue as never);
  }

  return result as T;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = deepMerge(en, messagesMap[locale] ?? {});
  return { locale, messages };
});
