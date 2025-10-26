import { redirect } from 'next/navigation';

type Props = {
  params: { locale: string };
};

export default function LocationPage({ params: { locale } }: Props) {
  redirect(`/${locale}#location`);
}
