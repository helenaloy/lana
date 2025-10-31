import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import siteData from '@/content/site.json';
import galleryData from '@/content/gallery.json';
import metaData from '@/content/meta.json';
import AmenityList from '@/components/AmenityList';
import GalleryGrid from '@/components/GalleryGrid';
import MapComponent from '@/components/MapComponent';
import AvailabilitySection from '@/components/AvailabilitySection';

type Props = {
  params: { locale: string };
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'hr' }];
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const meta = locale === 'hr' ? metaData.home.title_hr : metaData.home.title_en;
  const description =
    locale === 'hr' ? metaData.home.description_hr : metaData.home.description_en;

  return {
    title: meta,
    description: description,
    openGraph: {
      title: meta,
      description: description,
      type: 'website',
    },
  };
}

export default function HomePage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = useTranslations('home');
  const tAccommodation = useTranslations('accommodation');
  const tGallery = useTranslations('gallery');
  const tAvailability = useTranslations('availability');
  const tContact = useTranslations('contact');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        id="home"
        className="relative flex min-h-screen items-end justify-center text-white pb-16 -mt-20"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/terasa1_MH_Lana.jpg"
            alt={locale === 'hr' ? 'Mobilna kućica Lana' : 'Mobile Home Lana'}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
        </div>
        
        {/* Overlay za bolju čitljivost */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="container relative z-10 px-4 text-center">
          <a
            href="#availability"
            className="inline-block rounded-lg bg-white px-10 py-5 font-heading text-xl font-bold text-primary-700 shadow-xl transition-all hover:bg-primary-50 hover:shadow-2xl hover:scale-105 md:text-2xl"
          >
            {t('hero.cta')}
          </a>
          <p className="mt-4 font-heading text-xl drop-shadow-lg md:text-2xl lg:text-3xl">{t('hero.ctaSubtext')}</p>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 md:text-4xl">
              {t('about.title')}
            </h2>
            <div className="mb-6 text-center">
              <p className="mx-auto max-w-2xl text-xl font-semibold text-primary-600 md:text-2xl">
                {t('about.subtitle')}
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-8 text-lg text-gray-700 whitespace-pre-line leading-relaxed">
              {t('about.description')}
            </div>
          </div>
        </div>
      </section>

      {/* Accommodation Section */}
      <section id="accommodation" className="scroll-mt-20 bg-gradient-to-b from-gray-50 to-white py-12 md:py-16">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{tAccommodation('title')}</h2>
          </div>

          {/* Combined Amenities & Details */}
          <div className="mb-16">
            <AmenityList locale={locale} />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="scroll-mt-20 bg-gradient-to-b from-white to-gray-50 py-12 md:py-16">
        <div className="container px-4">
          <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 md:text-4xl">{tGallery('title')}</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-xl text-gray-600 md:text-2xl">{tGallery('description')}</p>
          <GalleryGrid locale={locale} />
        </div>
      </section>

      {/* Availability Section */}
      <section id="availability" className="scroll-mt-20 bg-white py-12 md:py-16">
        <div className="container px-4">
          <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 md:text-4xl">{tAvailability('title')}</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-xl text-gray-600 md:text-2xl">{tAvailability('description')}</p>
          
          <div className="mx-auto max-w-6xl">
            <h3 className="mb-6 text-center text-2xl font-bold text-gray-900 md:text-3xl">
              {tAvailability('calendar.title')}
            </h3>
            <AvailabilitySection locale={locale} />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-20 bg-gradient-to-br from-gray-50 to-gray-100 py-12 md:py-16">
        <div className="container px-4">
          <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 md:text-4xl">{tContact('title')}</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-xl text-gray-600 md:text-2xl">{tContact('description')}</p>
          
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Contact Information */}
              <div className="rounded-lg bg-white p-8 shadow-md">
                <h3 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">{tContact('info.title')}</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="mb-2 text-xl font-bold text-gray-700">{tContact('info.phone')}</h4>
                    <a
                      href={`tel:${siteData.contact.phone}`}
                      className="text-xl text-primary-600 hover:underline"
                    >
                      {siteData.contact.phone}
                    </a>
                  </div>
                  <div>
                    <h4 className="mb-2 text-xl font-bold text-gray-700">{tContact('info.email')}</h4>
                    <a
                      href={`mailto:${siteData.contact.email}`}
                      className="text-xl text-primary-600 hover:underline"
                    >
                      {siteData.contact.email}
                    </a>
                  </div>
                  <div>
                    <h4 className="mb-2 text-xl font-bold text-gray-700">{tContact('info.address')}</h4>
                    <address className="not-italic text-xl text-gray-700">
                      <p>{siteData.address.street}</p>
                      <p>{siteData.address.city}</p>
                      <p>{siteData.address.country}</p>
                    </address>
                  </div>
                </div>
              </div>

              {/* Map and Directions */}
              <div className="rounded-lg bg-white p-8 shadow-md">
                <h3 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">
                  {locale === 'hr' ? 'LOKACIJA' : 'LOCATION'}
                </h3>
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <MapComponent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
