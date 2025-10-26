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
import InquiryForm from '@/components/InquiryForm';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';

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

  const houseRules = locale === 'hr' ? siteData.house_rules_hr : siteData.house_rules_en;

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
            src="/images/20230430_171345.jpg"
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
      <section className="bg-white py-16 md:py-24">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 md:text-4xl">
              {t('about.title')}
            </h2>
            <div className="mb-6 text-center">
              <p className="text-xl font-semibold text-gray-700 md:text-2xl">
                {t('about.subtitle').split('\n\n')[0]}
              </p>
              <p className="mt-2 text-xl font-bold text-primary-600 md:text-2xl">
                {t('about.subtitle').split('\n\n')[1]}
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-8 text-lg text-gray-700 whitespace-pre-line leading-relaxed">
              {t('about.description')}
            </div>
          </div>
        </div>
      </section>

      {/* Accommodation Section */}
      <section id="accommodation" className="scroll-mt-20 bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">{tAccommodation('title')}</h2>
          </div>

          {/* Combined Amenities & Details */}
          <div className="mb-16">
            <AmenityList locale={locale} />
          </div>

          {/* House Rules */}
          <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 p-8 md:p-12">
            <h3 className="mb-4 text-center text-3xl font-bold text-gray-900">{tAccommodation('houseRules.title')}</h3>
            <p className="mx-auto mb-8 max-w-2xl text-center text-lg text-gray-700">{tAccommodation('houseRules.subtitle')}</p>
            <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-lg">
              <ul className="space-y-4">
                {houseRules.map((rule, index) => (
                  <li key={index} className="flex items-start rounded-lg bg-gray-50 p-4">
                    <span className="mr-3 text-2xl">{['😃', '🏠', '🔑', '❄️', '👨‍👩‍👧‍👦', '🅿️', '😎'][index] || '✓'}</span>
                    <span className="flex-1 text-gray-700">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="scroll-mt-20 bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
        <div className="container px-4">
          <h2 className="mb-4 text-center text-4xl font-bold text-gray-900">{tGallery('title')}</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-xl text-gray-600">{tGallery('description')}</p>
          <GalleryGrid locale={locale} />
        </div>
      </section>

      {/* Availability Section */}
      <section id="availability" className="scroll-mt-20 bg-white py-16 md:py-24">
        <div className="container px-4">
          <h2 className="mb-4 text-center text-4xl font-bold text-gray-900">{tAvailability('title')}</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-xl text-gray-600">{tAvailability('description')}</p>
          
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
            {/* Calendar */}
            <div>
              <h3 className="mb-6 text-2xl font-bold text-gray-900">
                {tAvailability('calendar.title')}
              </h3>
              <AvailabilityCalendar locale={locale} />
            </div>

            {/* Inquiry Form */}
            <div>
              <h3 className="mb-6 text-2xl font-bold text-gray-900">{tAvailability('form.title')}</h3>
              <InquiryForm locale={locale} />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-20 bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-24">
        <div className="container px-4">
          <h2 className="mb-4 text-center text-4xl font-bold text-gray-900">{tContact('title')}</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-xl text-gray-600">{tContact('description')}</p>
          
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Contact Information */}
              <div className="rounded-lg bg-white p-8 shadow-md">
                <h3 className="mb-6 text-2xl font-bold text-gray-900">{tContact('info.title')}</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-700">{tContact('info.phone')}</h4>
                    <a
                      href={`tel:${siteData.contact.phone}`}
                      className="text-primary-600 hover:underline"
                    >
                      {siteData.contact.phone}
                    </a>
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-700">{tContact('info.email')}</h4>
                    <a
                      href={`mailto:${siteData.contact.email}`}
                      className="text-primary-600 hover:underline"
                    >
                      {siteData.contact.email}
                    </a>
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-700">{tContact('info.address')}</h4>
                    <address className="not-italic text-gray-700">
                      <p>{siteData.address.street}</p>
                      <p>{siteData.address.city}</p>
                      <p>{siteData.address.country}</p>
                    </address>
                  </div>
                </div>
              </div>

              {/* Map and Directions */}
              <div className="rounded-lg bg-white p-8 shadow-md">
                <h3 className="mb-6 text-2xl font-bold text-gray-900">
                  {locale === 'hr' ? 'Kako do nas' : 'How to reach us'}
                </h3>
                <div className="mb-6 overflow-hidden rounded-lg shadow-lg">
                  <MapComponent />
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-700">
                      {locale === 'hr' ? 'Kako do nas:' : 'How to reach us:'}
                    </h4>
                    <p className="text-gray-700">
                      {locale === 'hr' 
                        ? 'Kamp Dalmacija se nalazi u Privlaci, samo nekoliko minuta vožnje od Zadra. Slijedite znakove za kamp nakon ulaska u Privlaku.'
                        : 'Camp Dalmacija is located in Privlaka, just a few minutes drive from Zadar. Follow the camp signs after entering Privlaka.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
