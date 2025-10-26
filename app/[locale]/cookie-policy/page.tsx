import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';

type Props = {
  params: { locale: string };
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'hr' }];
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'cookies' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function CookiePolicyPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = useTranslations('cookies');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">{t('title')}</h1>
            <p className="text-xl text-gray-600">{t('description')}</p>
          </div>

          {/* Content */}
          <div className="rounded-lg bg-white p-8 shadow-md">
            <div className="prose prose-lg max-w-none">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">{t('whatAreCookies.title')}</h2>
              
              <div className="mb-8 space-y-4">
                <p className="text-gray-600">{t('whatAreCookies.content')}</p>
              </div>

              <h2 className="mb-6 text-2xl font-bold text-gray-900">{t('typesOfCookies.title')}</h2>
              
              <div className="mb-8 space-y-6">
                <div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-700">{t('typesOfCookies.essential.title')}</h3>
                  <p className="text-gray-600">{t('typesOfCookies.essential.content')}</p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-700">{t('typesOfCookies.analytics.title')}</h3>
                  <p className="text-gray-600">{t('typesOfCookies.analytics.content')}</p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-700">{t('typesOfCookies.functional.title')}</h3>
                  <p className="text-gray-600">{t('typesOfCookies.functional.content')}</p>
                </div>
              </div>

              <h2 className="mb-6 text-2xl font-bold text-gray-900">{t('cookiesUsed.title')}</h2>
              
              <div className="mb-8">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">
                          {t('cookiesUsed.table.name')}
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">
                          {t('cookiesUsed.table.purpose')}
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">
                          {t('cookiesUsed.table.duration')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 text-gray-600">session_id</td>
                        <td className="border border-gray-300 px-4 py-2 text-gray-600">{t('cookiesUsed.table.sessionPurpose')}</td>
                        <td className="border border-gray-300 px-4 py-2 text-gray-600">{t('cookiesUsed.table.sessionDuration')}</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 text-gray-600">language_preference</td>
                        <td className="border border-gray-300 px-4 py-2 text-gray-600">{t('cookiesUsed.table.languagePurpose')}</td>
                        <td className="border border-gray-300 px-4 py-2 text-gray-600">{t('cookiesUsed.table.languageDuration')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <h2 className="mb-6 text-2xl font-bold text-gray-900">{t('manageCookies.title')}</h2>
              
              <div className="mb-8 space-y-4">
                <p className="text-gray-600">{t('manageCookies.content')}</p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800">{t('manageCookies.note')}</p>
                </div>
              </div>

              <h2 className="mb-6 text-2xl font-bold text-gray-900">{t('contact.title')}</h2>
              
              <div className="mb-8 space-y-4">
                <p className="text-gray-600">{t('contact.content')}</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">Email: lana.mobilehome@gmail.com</p>
                  <p className="text-gray-600">Telefon: +385 91 546 0088</p>
                </div>
              </div>

              <h2 className="mb-6 text-2xl font-bold text-gray-900">{t('changes.title')}</h2>
              
              <div className="space-y-4 text-gray-600">
                <p>{t('changes.content')}</p>
                <p className="text-sm text-gray-500">{t('changes.lastUpdated')}</p>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <Link
              href={`/${locale}`}
              className="inline-block rounded-lg bg-primary-600 px-6 py-3 text-white transition-colors hover:bg-primary-700"
            >
              {locale === 'hr' ? 'Povratak na početnu' : 'Back to Home'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
