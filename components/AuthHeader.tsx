'use client';

import { useState, useEffect } from 'react';

export default function AuthHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/10 backdrop-blur-md border-b border-gray-200/50 shadow-lg'
          : 'bg-transparent backdrop-blur-md border-b border-white/30 shadow-sm'
      }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <a href="/" className="flex cursor-pointer items-center gap-2">
            {/* Hand-drawn house icon */}
            <svg
              className="h-8 w-8 md:h-10 md:w-10 text-primary-600 transition-colors duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Roof (hand-drawn style) */}
              <path
                d="M3.5 9l8.5-5 8.5 5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Left wall */}
              <path
                d="M3.5 9v9h4v-4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Right wall */}
              <path
                d="M20.5 9v9h-4v-4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Bottom */}
              <path d="M7.5 18h9" strokeLinecap="round" />
              {/* Door (left side) */}
              <path
                d="M5 14h2.5v4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Window (right side) */}
              <circle cx="16" cy="13" r="1.5" strokeLinecap="round" />
              <path d="M14 13h4M16 11.5v3" strokeLinecap="round" />
            </svg>
            <span className="font-display text-lg font-bold sm:text-xl md:text-3xl text-primary-600 transition-colors duration-300">
              Mobile Home Lana
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
}

