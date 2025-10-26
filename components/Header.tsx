'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import LangSwitcher from './LangSwitcher';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('navigation');

  const locale = pathname.split('/')[1] || 'hr';
  
  // Check if we're on a subpage that should always show dark header
  const isSubpage = pathname.includes('/impressum') || 
                    pathname.includes('/privacy-policy') || 
                    pathname.includes('/cookie-policy');

  const navigation = [
    { name: t('home'), href: '#home', id: 'home' },
    { name: t('accommodation'), href: '#accommodation', id: 'accommodation' },
    { name: t('gallery'), href: '#gallery', id: 'gallery' },
    { name: t('availability'), href: '#availability', id: 'availability' },
    { name: t('contact'), href: '#contact', id: 'contact' },
  ];

  // Smooth scroll to section
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // On subpages, navigate to home page instead
    if (isSubpage) {
      window.location.href = `/${locale}`;
      return;
    }
    
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
      setIsMobileMenuOpen(false);
    }
  };

  // Track active section on scroll and scroll position
  useEffect(() => {
    // On subpages, always show dark header
    if (isSubpage) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      const sections = navigation.map((item) => item.id);
      const scrollPosition = window.scrollY + 100;

      // Check if scrolled past hero section (home)
      const heroElement = document.getElementById('home');
      if (heroElement) {
        const heroHeight = heroElement.offsetHeight;
        setIsScrolled(window.scrollY > heroHeight * 0.3); // Change color after 30% of hero height
      }

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSubpage]);

  const isActive = (id: string) => activeSection === id;

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/10 backdrop-blur-md border-b border-gray-200/50 shadow-lg' 
        : 'bg-transparent backdrop-blur-md border-b border-white/30 shadow-sm'
    }`}>
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleClick(e, '#home')}
            className="flex cursor-pointer items-center gap-2"
          >
            {/* Hand-drawn house icon */}
            <svg
              className={`h-8 w-8 md:h-10 md:w-10 transition-colors duration-300 ${
                isScrolled ? 'text-primary-600' : 'text-white drop-shadow-lg'
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Roof (hand-drawn style) */}
              <path d="M3.5 9l8.5-5 8.5 5" strokeLinecap="round" strokeLinejoin="round"/>
              {/* Left wall */}
              <path d="M3.5 9v9h4v-4" strokeLinecap="round" strokeLinejoin="round"/>
              {/* Right wall */}
              <path d="M20.5 9v9h-4v-4" strokeLinecap="round" strokeLinejoin="round"/>
              {/* Bottom */}
              <path d="M7.5 18h9" strokeLinecap="round"/>
              {/* Door (left side) */}
              <path d="M5 14h2.5v4" strokeLinecap="round" strokeLinejoin="round"/>
              {/* Window (right side) */}
              <circle cx="16" cy="13" r="1.5" strokeLinecap="round"/>
              <path d="M14 13h4M16 11.5v3" strokeLinecap="round"/>
            </svg>
            <span className={`font-display text-2xl font-bold md:text-3xl transition-colors duration-300 ${
              isScrolled ? 'text-primary-600' : 'text-white drop-shadow-lg'
            }`}>
              Mobile Home Lana
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`cursor-pointer font-heading text-lg md:text-xl transition-colors duration-300 ${
                  isActive(item.id)
                    ? `font-bold ${isScrolled ? 'text-primary-600' : 'text-white drop-shadow-lg'}`
                    : isScrolled 
                      ? 'text-gray-700 hover:text-primary-600' 
                      : 'text-white hover:text-gray-200 drop-shadow-lg'
                }`}
              >
                {item.name}
              </a>
            ))}
            <LangSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 lg:hidden">
            <LangSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/20'
              }`}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`border-t py-4 lg:hidden transition-colors duration-300 ${
            isScrolled ? 'border-gray-200' : 'border-white/30'
          }`}>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`block cursor-pointer font-heading text-lg px-4 py-3 transition-colors duration-300 ${
                  isActive(item.id)
                    ? `font-bold ${
                        isScrolled 
                          ? 'bg-primary-50 text-primary-600' 
                          : 'bg-white/20 text-white drop-shadow-lg'
                      }`
                    : isScrolled 
                      ? 'text-gray-700 hover:bg-gray-50' 
                      : 'text-white hover:bg-white/10 drop-shadow-lg'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}

