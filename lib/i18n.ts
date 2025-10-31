import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['hr', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'hr';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

// Export for static rendering
export { setRequestLocale } from 'next-intl/server';

