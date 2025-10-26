'use client';

import { useState } from 'react';
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
        {/* Scrollable horizontal gallery */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {galleryData.map((image, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className="group relative flex-shrink-0 overflow-hidden rounded-lg bg-gray-200"
              style={{ width: '300px', height: '200px' }}
            >
              <Image
                src={image.src}
                alt={locale === 'hr' ? image.alt_hr : image.alt_en}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="300px"
              />
              <div className="absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-20" />
            </button>
          ))}
        </div>
        
        {/* Scroll indicators */}
        <div className="mt-4 flex justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
        </div>
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

