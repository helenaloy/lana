'use client';

import { useState } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useTranslations } from 'next-intl';
import availabilityData from '@/content/availability.json';
import { getAllBookedDates } from '@/lib/date-utils';

type Props = {
  locale: string;
  onDateRangeChange?: (range: DateRange | undefined) => void;
};

export default function AvailabilityCalendar({ locale, onDateRangeChange }: Props) {
  const t = useTranslations('availability.calendar');
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();

  const bookedDates = getAllBookedDates(availabilityData);

  const handleRangeSelect = (range: DateRange | undefined) => {
    setSelectedRange(range);
    onDateRangeChange?.(range);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="mb-4">
        <p className="text-sm text-gray-600">{t('selectDates')}</p>
      </div>

      <DayPicker
        mode="range"
        selected={selectedRange}
        onSelect={handleRangeSelect}
        disabled={[
          { before: new Date() },
          ...bookedDates.map((date) => ({ from: date, to: date })),
        ]}
        numberOfMonths={1}
        className="mx-auto"
        classNames={{
          months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
          month: 'space-y-4',
          caption: 'flex justify-center pt-1 relative items-center',
          caption_label: 'text-sm font-medium',
          nav: 'space-x-1 flex items-center',
          nav_button:
            'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-gray-100',
          nav_button_previous: 'absolute left-1',
          nav_button_next: 'absolute right-1',
          table: 'w-full border-collapse space-y-1',
          head_row: 'flex',
          head_cell: 'text-gray-500 rounded-md w-9 font-normal text-[0.8rem]',
          row: 'flex w-full mt-2',
          cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-primary-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
          day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 rounded-md transition-colors',
          day_selected:
            'bg-primary-600 text-white hover:bg-primary-700 hover:text-white focus:bg-primary-700 focus:text-white',
          day_today: 'bg-gray-100 text-gray-900',
          day_outside: 'text-gray-400 opacity-50',
          day_disabled: 'text-gray-400 opacity-50 line-through',
          day_range_middle:
            'aria-selected:bg-primary-100 aria-selected:text-gray-900',
          day_hidden: 'invisible',
        }}
      />

      <div className="mt-6 flex items-start gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-primary-600" />
          <span className="text-gray-700">{t('legend.available')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-gray-300 line-through" />
          <span className="text-gray-700">{t('legend.booked')}</span>
        </div>
      </div>
    </div>
  );
}

