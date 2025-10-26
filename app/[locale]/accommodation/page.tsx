import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: { locale: string };
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'hr' }];
}

export default function AccommodationPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  redirect(`/${locale}#accommodation`);
}
