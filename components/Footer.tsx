'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import siteData from '@/content/site.json';

export default function Footer() {
  const pathname = usePathname();
  const t = useTranslations('footer');
  const tNav = useTranslations('navigation');

  const locale = pathname.split('/')[1] || 'hr';
  const currentYear = new Date().getFullYear();

  const navigation = [
    { name: tNav('accommodation'), href: '#accommodation' },
    { name: tNav('gallery'), href: '#gallery' },
    { name: tNav('availability'), href: '#availability' },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* About */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 font-display text-xl font-bold text-gray-900">
              Mobile Home Lana
            </h3>
            <p className="mb-4 text-gray-600">
              {locale === 'hr' 
                ? 'Bijeg u prirodu bez odricanja: klima radi, roštilj miriši, a brige ostaju u prtljažniku.'
                : 'Escape to nature without compromise: AC is running, grill is smelling, and worries stay in the luggage.'}
            </p>
            <div className="flex gap-4">
              <a
                href={siteData.contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary-600"
                aria-label="Facebook"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Legal Information */}
          <div>
            <h4 className="mb-4 font-heading font-bold text-gray-900">
              {locale === 'hr' ? 'Pravne informacije' : 'Legal Information'}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={`/${locale}/impressum`}
                  className="text-gray-600 hover:text-primary-600"
                >
                  {locale === 'hr' ? 'Impressum' : 'Impressum'}
                </a>
              </li>
              <li>
                <a
                  href={`/${locale}/privacy-policy`}
                  className="text-gray-600 hover:text-primary-600"
                >
                  {locale === 'hr' ? 'Politika privatnosti' : 'Privacy Policy'}
                </a>
              </li>
              <li>
                <a
                  href={`/${locale}/cookie-policy`}
                  className="text-gray-600 hover:text-primary-600"
                >
                  {locale === 'hr' ? 'Politika kolačića' : 'Cookie Policy'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          <p>
            © {currentYear} {siteData.name.split('/')[0].trim()}. {t('rights')}.
          </p>
        </div>
      </div>
    </footer>
  );
}

