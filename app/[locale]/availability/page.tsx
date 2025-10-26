import { redirect } from 'next/navigation';

type Props = {
  params: { locale: string };
};

export default function AvailabilityPage({ params: { locale } }: Props) {
  redirect(`/${locale}#availability`);
}
