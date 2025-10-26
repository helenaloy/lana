import { redirect } from 'next/navigation';

type Props = {
  params: { locale: string };
};

export default function ContactPage({ params: { locale } }: Props) {
  redirect(`/${locale}#contact`);
}
