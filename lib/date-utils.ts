import { format, parseISO, isWithinInterval, eachDayOfInterval } from 'date-fns';

export interface BookedInterval {
  startISO: string;
  endISO: string;
}

// Check if a date is booked
export function isDateBooked(date: Date, bookedIntervals: BookedInterval[]): boolean {
  return bookedIntervals.some((interval) => {
    try {
      const start = parseISO(interval.startISO);
      const end = parseISO(interval.endISO);
      return isWithinInterval(date, { start, end });
    } catch {
      return false;
    }
  });
}

// Get all booked dates as Date objects
export function getAllBookedDates(bookedIntervals: BookedInterval[]): Date[] {
  const bookedDates: Date[] = [];

  bookedIntervals.forEach((interval) => {
    try {
      const start = parseISO(interval.startISO);
      const end = parseISO(interval.endISO);
      const dates = eachDayOfInterval({ start, end });
      bookedDates.push(...dates);
    } catch (error) {
      console.error('Invalid date interval:', interval, error);
    }
  });

  return bookedDates;
}

// Format date for display
export function formatDate(date: Date | string, formatStr: string = 'PP'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr);
}

// Format date to ISO string (YYYY-MM-DD)
export function formatToISO(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

