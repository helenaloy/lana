import { redirect } from 'next/navigation';

type Props = {
  params: { locale: string };
};

export default function GalleryPage({ params: { locale } }: Props) {
  redirect(`/${locale}#gallery`);
}
