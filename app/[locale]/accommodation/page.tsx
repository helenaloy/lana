import { redirect } from 'next/navigation';

type Props = {
  params: { locale: string };
};

export default function AccommodationPage({ params: { locale } }: Props) {
  redirect(`/${locale}#accommodation`);
}
