'use client';

import { useState, useEffect } from 'react';
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

  const slides = galleryData.map((image) => ({
    src: image.src,
    alt: locale === 'hr' ? image.alt_hr : image.alt_en,
  }));

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  // Calculate which images to show based on current offset
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 3 });
  const [isMobile, setIsMobile] = useState(false);

  // Update isMobile state on window resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollLeft = () => {
    const numVisible = isMobile ? 1 : 3;
    setVisibleRange(prev => {
      const newStart = Math.max(0, prev.start - numVisible);
      const newEnd = Math.min(galleryData.length, newStart + numVisible);
      return {
        start: newStart,
        end: newEnd,
      };
    });
  };

  const scrollRight = () => {
    const numVisible = isMobile ? 1 : 3;
    setVisibleRange(prev => {
      const newStart = Math.min(galleryData.length - numVisible, prev.start + numVisible);
      const newEnd = Math.min(galleryData.length, newStart + numVisible);
      return {
        start: newStart,
        end: newEnd,
      };
    });
  };

  if (galleryData.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        {locale === 'hr' ? 'Nema dostupnih slika' : 'No images available'}
      </div>
    );
  }

  // Get images to display
  const visibleImages = galleryData.slice(visibleRange.start, visibleRange.end);
  const canScrollLeft = visibleRange.start > 0;
  const canScrollRight = visibleRange.end < galleryData.length;

  return (
    <>
      <div className="relative">
        {/* Left arrow button - only show if we can scroll left */}
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
            aria-label="Previous"
          >
            <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Gallery grid - 3 on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {visibleImages.map((image, index) => {
            const actualIndex = visibleRange.start + index;
            return (
              <button
                key={actualIndex}
                onClick={() => openLightbox(actualIndex)}
                className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-200 shadow-md transition-transform hover:scale-105"
              >
                <Image
                  src={image.src}
                  alt={locale === 'hr' ? image.alt_hr : image.alt_en}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-20" />
              </button>
            );
          })}
        </div>

        {/* Right arrow button - only show if we can scroll right */}
        {canScrollRight && (
          <button
            onClick={scrollRight}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
            aria-label="Next"
          >
            <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
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

