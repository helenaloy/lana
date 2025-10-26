'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isBefore,
  startOfDay,
} from 'date-fns';
import { hr, enUS } from 'date-fns/locale';
import { isDateBooked } from '@/lib/date-utils';
import type { BookedInterval } from '@/lib/date-utils';

type Props = {
  locale: string;
  bookedIntervals: BookedInterval[];
  onDatesChange?: (dates: { checkIn: string; checkOut: string }) => void;
};

export default function InteractiveCalendar({ locale, bookedIntervals, onDatesChange }: Props) {
  const t = useTranslations('availability.calendar');
  const dateLocale = locale === 'hr' ? hr : enUS;
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedCheckIn, setSelectedCheckIn] = useState<Date | null>(null);
  const [selectedCheckOut, setSelectedCheckOut] = useState<Date | null>(null);
  const [selectionMode, setSelectionMode] = useState<'checkIn' | 'checkOut'>('checkIn');

  // Month navigation
  const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  // Get calendar days for current month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { locale: dateLocale });
  const calendarEnd = endOfWeek(monthEnd, { locale: dateLocale });

  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  // Check if date is in the past
  const isDateInPast = (date: Date) => {
    return isBefore(date, startOfDay(new Date()));
  };

  // Check if date is booked
  const isDateBooked_ = (date: Date) => {
    return isDateBooked(date, bookedIntervals);
  };

  // Handle date click
  const handleDateClick = (date: Date) => {
    // Don't allow clicking past dates or booked dates
    if (isDateInPast(date) || isDateBooked_(date)) {
      return;
    }

    let newCheckIn = selectedCheckIn;
    let newCheckOut = selectedCheckOut;

    if (selectionMode === 'checkIn') {
      // First click - select check-in date
      newCheckIn = date;
      setSelectedCheckIn(date);
      setSelectionMode('checkOut');
    } else if (selectionMode === 'checkOut' && selectedCheckIn) {
      if (isBefore(date, selectedCheckIn)) {
        // If clicked date is before check-in, make it new check-in
        newCheckIn = date;
        newCheckOut = null;
        setSelectedCheckIn(date);
        setSelectedCheckOut(null);
      } else {
        // Select check-out date
        newCheckOut = date;
        setSelectedCheckOut(date);
        setSelectionMode('checkIn');
      }
    }

    // Update parent component after state updates
    const checkInStr = newCheckIn;
    const checkOutStr = newCheckOut;
    
    onDatesChange?.({
      checkIn: checkInStr ? format(checkInStr, 'yyyy-MM-dd') : '',
      checkOut: checkOutStr ? format(checkOutStr, 'yyyy-MM-dd') : '',
    });
  };

  // Check if date is in selected range
  const isDateInRange = (date: Date) => {
    if (!selectedCheckIn || !selectedCheckOut) return false;
    return date > selectedCheckIn && date < selectedCheckOut;
  };

  // Get date class
  const getDateClass = (date: Date) => {
    const baseClass =
      'relative flex h-14 items-center justify-center rounded-lg text-xl font-semibold transition-all duration-200 cursor-pointer';
    
    if (isDateInPast(date)) {
      return `${baseClass} text-gray-300 cursor-not-allowed`;
    }

    if (isDateBooked_(date)) {
      return `${baseClass} text-red-400 line-through cursor-not-allowed bg-red-50`;
    }

    if (selectedCheckIn && isSameDay(date, selectedCheckIn)) {
      return `${baseClass} bg-blue-600 text-white hover:bg-blue-700`;
    }

    if (selectedCheckOut && isSameDay(date, selectedCheckOut)) {
      return `${baseClass} bg-blue-600 text-white hover:bg-blue-700`;
    }

    if (isDateInRange(date)) {
      return `${baseClass} bg-blue-100 text-blue-900 hover:bg-blue-200`;
    }

    if (isSameMonth(date, currentMonth)) {
      return `${baseClass} text-gray-900 hover:bg-gray-100`;
    }

    return `${baseClass} text-gray-400`;
  };

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weekDaysHr = ['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned'];

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      {/* Calendar Header */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={goToPreviousMonth}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200"
          aria-label={locale === 'hr' ? 'Prethodni mjesec' : 'Previous month'}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h2 className="text-2xl font-bold text-gray-800">
          {format(currentMonth, 'MMMM yyyy', { locale: dateLocale })}
        </h2>
        
        <button
          onClick={goToNextMonth}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200"
          aria-label={locale === 'hr' ? 'Sljedeći mjesec' : 'Next month'}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="mb-4 grid grid-cols-7 gap-2">
        {(locale === 'hr' ? weekDaysHr : weekDays).map((day, index) => (
          <div key={index} className="text-center text-lg font-bold text-gray-600">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => (
          <button
            key={index}
            onClick={() => handleDateClick(day)}
            className={getDateClass(day)}
            disabled={isDateInPast(day) || isDateBooked_(day)}
          >
            <span>{format(day, 'd')}</span>
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-6 rounded-lg bg-gray-50 p-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg border-2 border-gray-300 bg-white"></div>
          <span className="text-lg text-gray-700">{t('legend.available')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-blue-600"></div>
          <span className="text-lg text-gray-700">{t('legend.selected')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-red-50 text-red-400 line-through">✕</div>
          <span className="text-lg text-gray-700">{t('legend.booked')}</span>
        </div>
      </div>
    </div>
  );
}

