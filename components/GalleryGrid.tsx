'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import galleryData from '@/content/gallery.json';

type Props = {
  locale: string;
};

export default function GalleryGrid({ locale }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryContainerRef = useRef<HTMLDivElement | null>(null);

  const slides = galleryData.map((image) => ({
    src: image.src,
    alt: locale === 'hr' ? image.alt_hr : image.alt_en,
  }));

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const scrollLeft = () => {
    if (galleryContainerRef.current) {
      galleryContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (galleryContainerRef.current) {
      galleryContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  if (galleryData.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        {locale === 'hr' ? 'Nema dostupnih slika' : 'No images available'}
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        {/* Left arrow button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
          aria-label="Previous"
        >
          <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Scrollable horizontal gallery */}
        <div 
          ref={galleryContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }}
        >
          {galleryData.map((image, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className="group relative flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 shadow-md transition-transform hover:scale-105"
              style={{ width: '400px', height: '280px' }}
            >
              <Image
                src={image.src}
                alt={locale === 'hr' ? image.alt_hr : image.alt_en}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="400px"
              />
              <div className="absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-20" />
            </button>
          ))}
        </div>

        {/* Right arrow button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
          aria-label="Next"
        >
          <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={currentIndex}
      />
    </>
  );
}

