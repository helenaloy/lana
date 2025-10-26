'use client';

import { useState } from 'react';
import InteractiveCalendar from './InteractiveCalendar';
import InquiryForm from './InquiryForm';
import availabilityData from '@/content/availability.json';
import type { BookedInterval } from '@/lib/date-utils';

type Props = {
  locale: string;
};

export default function AvailabilitySection({ locale }: Props) {
  const [selectedDates, setSelectedDates] = useState({ checkIn: '', checkOut: '' });

  // Load booked dates from availability.json
  const bookedIntervals: BookedInterval[] = availabilityData;

  return (
    <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
      {/* Calendar */}
      <div>
        <InteractiveCalendar
          locale={locale}
          bookedIntervals={bookedIntervals}
          onDatesChange={setSelectedDates}
        />
      </div>

      {/* Inquiry Form */}
      <div>
        <InquiryForm locale={locale} prefillDates={selectedDates} />
      </div>
    </div>
  );
}
