// Type definitions for content files

export interface SiteData {
  name: string;
  tagline: {
    hr: string;
    en: string;
  };
  address: {
    street: string;
    city: string;
    country: string;
  };
  contact: {
    email: string;
    phone: string;
    facebook: string;
    instagram: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  amenities: Amenity[];
  house_rules_hr: string[];
  house_rules_en: string[];
}

export interface Amenity {
  icon: string;
  label_hr: string;
  label_en: string;
}

export interface GalleryImage {
  src: string;
  alt_hr: string;
  alt_en: string;
}

export interface BookedInterval {
  startISO: string;
  endISO: string;
}

export interface MetaData {
  [key: string]: {
    title_hr: string;
    title_en: string;
    description_hr: string;
    description_en: string;
  };
}

export type Locale = 'hr' | 'en';

