import siteData from '@/content/site.json';

type Props = {
  locale: string;
};

// Icon mapping with fun emojis
const iconMap: Record<string, string> = {
  wifi: '📶',
  'air-conditioning': '❄️',
  kitchen: '🍳',
  terrace: '🏡',
  parking: '🅿️',
  beach: '🏖️',
  tv: '📺',
  grill: '🔥',
  privacy: '🔑',
  family: '👨‍👩‍👧‍👦',
  bedroom: '🛏️',
  shallow: '🏊‍♂️',
  waterpark: '💦',
  playground: '🎠',
  restaurant: '🍽️',
  shop: '🛒',
  medical: '⚕️',
  bathroom: '🚿',
  childsafe: '🧒',
  dishwasher: '🧽',
};

export default function AmenityList({ locale }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {siteData.amenities.map((amenity, index) => (
        <div
          key={index}
          className="flex flex-col items-center rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 text-center shadow-md transition-all hover:scale-105 hover:shadow-lg"
        >
          <div className="mb-3 text-5xl">{iconMap[amenity.icon] || '✓'}</div>
          <h3 className="text-lg font-medium leading-snug text-gray-900 md:text-xl">
            {locale === 'hr' ? amenity.label_hr : amenity.label_en}
          </h3>
        </div>
      ))}
    </div>
  );
}

