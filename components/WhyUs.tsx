'use client';

import { useTranslations } from 'next-intl';

export default function WhyUs() {
  const t = useTranslations('home.whyUs');

  const reasons = t.raw('reasons') as Array<{ title: string; description: string }>;

  return (
    <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 p-8 md:p-12">
      <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 md:text-4xl">
        {t('title')}
      </h2>
      <p className="mx-auto mb-12 max-w-2xl text-center text-lg leading-relaxed text-gray-700">
        {t('subtitle')}
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg"
          >
            <div className="mb-3 flex items-center">
              <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 font-display text-xl font-bold text-white">
                {index + 1}
              </div>
              <h3 className="font-heading text-2xl font-bold text-gray-900 md:text-3xl">{reason.title}</h3>
            </div>
            <p className="leading-relaxed text-gray-600">{reason.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

