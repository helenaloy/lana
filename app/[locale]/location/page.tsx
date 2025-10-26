import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: { locale: string };
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'hr' }];
}

export default function LocationPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  redirect(`/${locale}#location`);
}
