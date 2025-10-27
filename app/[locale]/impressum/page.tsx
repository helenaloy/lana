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
  const t = await getTranslations({ locale, namespace: 'impressum' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function ImpressumPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = useTranslations('impressum');

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
              <h2 className="mb-6 text-2xl font-bold text-gray-900">{t('company.title')}</h2>
              
              <div className="mb-8 space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold text-gray-700">{t('company.address')}</h3>
                  <p className="text-gray-600">Ulica braće Cvijića 21, 10000 Zagreb</p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-gray-700">{t('company.court')}</h3>
                  <p className="text-gray-600">Trgovački sud u Zagrebu</p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-gray-700">{t('company.mbs')}</h3>
                  <p className="text-gray-600">080928565</p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-gray-700">{t('company.oib')}</h3>
                  <p className="text-gray-600">95901191963</p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-gray-700">
                    {locale === 'hr' ? 'Temeljni kapital' : 'Share Capital'}
                  </h3>
                  <p className="text-gray-600">1,33 EUR (uplaćen u cijelosti)</p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-gray-700">
                    {locale === 'hr' ? 'Direktor' : 'Director'}
                  </h3>
                  <p className="text-gray-600">Larisa Grgurić</p>
                </div>
              </div>

              <h2 className="mb-6 text-2xl font-bold text-gray-900">{t('contact.title')}</h2>
              
              <div className="mb-8 space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold text-gray-700">{t('contact.email')}</h3>
                  <p className="text-gray-600">lana.mobilehome@gmail.com</p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-gray-700">{t('contact.phone')}</h3>
                  <p className="text-gray-600">+385 91 546 0088</p>
                </div>
              </div>

              <h2 className="mb-6 text-2xl font-bold text-gray-900">{t('disclaimer.title')}</h2>
              
              <div className="space-y-4 text-gray-600">
                <p>{t('disclaimer.content')}</p>
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
