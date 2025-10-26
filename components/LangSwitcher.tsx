'use client';

import { usePathname, useRouter } from 'next/navigation';
import { locales } from '@/lib/i18n';

export default function LangSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.split('/')[1] || 'hr';

  const switchLocale = (newLocale: string) => {
    const pathWithoutLocale = pathname.split('/').slice(2).join('/');
    const newPath = `/${newLocale}/${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white p-1">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
            currentLocale === locale
              ? 'bg-primary-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          aria-label={`Switch to ${locale.toUpperCase()}`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

