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
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function PrivacyPolicyPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = useTranslations('privacy');

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
              <h2 className="mb-6 text-2xl font-bold text-gray-900">{t('dataController.title')}</h2>
              
              <div className="mb-8 space-y-4">
                <p className="text-gray-600">{t('dataController.content')}</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-700">AMARYLLIS COSMETIC j.d.o.o.</p>
                  <p className="text-gray-600">Ulica braće Cvijića 21, Zagreb</p>
                  <p className="text-gray-600">OIB: 95901191963</p>
                  <p className="text-gray-600">Email: lana.mobilehome@gmail.com</p>
                </div>
              </div>

              <h2 className="mb-6 text-2xl font-bold text-gray-900">{t('dataCollection.title')}</h2>
              
              <div className="mb-8 space-y-4">
                <p className="text-gray-600">{t('dataCollection.content')}</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>{t('dataCollection.types.name')}</li>
                  <li>{t('dataCollection.types.email')}</li>
                  <li>{t('dataCollection.types.phone')}</li>
                  <li>{t('dataCollection.types.dates')}</li>
                  <li>{t('dataCollection.types.guests')}</li>
                </ul>
              </div>

              <h2 className="mb-6 text-2xl font-bold text-gray-900">{t('dataUsage.title')}</h2>
              
              <div className="mb-8 space-y-4">
                <p className="text-gray-600">{t('dataUsage.content')}</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>{t('dataUsage.purposes.booking')}</li>
                  <li>{t('dataUsage.purposes.communication')}</li>
                  <li>{t('dataUsage.purposes.service')}</li>
                  <li>{t('dataUsage.purposes.legal')}</li>
                </ul>
              </div>

              <h2 className="mb-6 text-2xl font-bold text-gray-900">{t('dataRetention.title')}</h2>
              
              <div className="mb-8 space-y-4">
                <p className="text-gray-600">{t('dataRetention.content')}</p>
              </div>

              <h2 className="mb-6 text-2xl font-bold text-gray-900">{t('rights.title')}</h2>
              
              <div className="mb-8 space-y-4">
                <p className="text-gray-600">{t('rights.content')}</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>{t('rights.list.access')}</li>
                  <li>{t('rights.list.rectification')}</li>
                  <li>{t('rights.list.erasure')}</li>
                  <li>{t('rights.list.restriction')}</li>
                  <li>{t('rights.list.portability')}</li>
                  <li>{t('rights.list.objection')}</li>
                </ul>
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
