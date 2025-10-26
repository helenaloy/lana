'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { inquirySchema, type InquiryFormData } from '@/lib/validators';

type Props = {
  locale: string;
  prefillDates?: { checkIn: string; checkOut: string };
};

// Helper function to convert ISO date (yyyy-mm-dd) to dd/mm/yyyy format
const formatDateForInput = (isoDate: string): string => {
  if (!isoDate) return '';
  const parts = isoDate.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return isoDate;
};

// Helper function to convert dd/mm/yyyy to ISO format for validation
const convertToISO = (dateStr: string): string => {
  if (!dateStr) return '';
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return dateStr;
};

export default function InquiryForm({ locale, prefillDates }: Props) {
  const t = useTranslations('availability.form');
  const tValidation = useTranslations('availability.validation');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: prefillDates ? {
      checkIn: prefillDates.checkIn,
      checkOut: prefillDates.checkOut,
    } : undefined,
  });

  // Update form when prefillDates change
  useEffect(() => {
    if (prefillDates?.checkIn) {
      const formattedDate = formatDateForInput(prefillDates.checkIn);
      setValue('checkIn', formattedDate);
    }
    if (prefillDates?.checkOut) {
      const formattedDate = formatDateForInput(prefillDates.checkOut);
      setValue('checkOut', formattedDate);
    }
  }, [prefillDates, setValue]);

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Convert dd/mm/yyyy to ISO format before sending
      const dataToSend = {
        ...data,
        checkIn: convertToISO(data.checkIn),
        checkOut: convertToISO(data.checkOut),
      };

      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...dataToSend, locale }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name */}
      <div>
        <label htmlFor="name" className="mb-2 block text-xl font-bold text-gray-700">
          {t('name')}
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          placeholder={t('namePlaceholder')}
          className="w-full rounded-lg border border-gray-300 px-4 py-4 text-xl focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
        {errors.name && (
          <p className="mt-1 text-xl text-red-600">{tValidation(errors.name.message!)}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-2 block text-xl font-bold text-gray-700">
          {t('email')}
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          placeholder={t('emailPlaceholder')}
          className="w-full rounded-lg border border-gray-300 px-4 py-4 text-xl focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
        {errors.email && (
          <p className="mt-1 text-xl text-red-600">{tValidation(errors.email.message!)}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="mb-2 block text-xl font-bold text-gray-700">
          {t('phone')}
        </label>
        <input
          {...register('phone')}
          type="tel"
          id="phone"
          placeholder={t('phonePlaceholder')}
          className="w-full rounded-lg border border-gray-300 px-4 py-4 text-xl focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
        {errors.phone && (
          <p className="mt-1 text-xl text-red-600">{tValidation(errors.phone.message!)}</p>
        )}
      </div>

      {/* Number of Guests */}
      <div>
        <label htmlFor="guests" className="mb-2 block text-xl font-bold text-gray-700">
          {t('guests')}
        </label>
        <select
          {...register('guests')}
          id="guests"
          className="w-full rounded-lg border border-gray-300 px-4 py-4 text-xl focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
        >
          <option value="">{t('guestsPlaceholder')}</option>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.guests && (
          <p className="mt-1 text-xl text-red-600">{tValidation(errors.guests.message!)}</p>
        )}
      </div>

      {/* Check-in and Check-out Dates - Side by Side */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Check-in Date */}
        <div>
          <label htmlFor="checkIn" className="mb-2 block text-xl font-bold text-gray-700">
            {t('checkIn')}
          </label>
          <input
            {...register('checkIn')}
            type="text"
            id="checkIn"
            placeholder={t('checkInPlaceholder')}
            className="w-full rounded-lg border border-gray-300 px-4 py-4 text-xl focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
          {errors.checkIn && (
            <p className="mt-1 text-xl text-red-600">
              {tValidation(errors.checkIn.message!)}
            </p>
          )}
        </div>

        {/* Check-out Date */}
        <div>
          <label htmlFor="checkOut" className="mb-2 block text-xl font-bold text-gray-700">
            {t('checkOut')}
          </label>
          <input
            {...register('checkOut')}
            type="text"
            id="checkOut"
            placeholder={t('checkOutPlaceholder')}
            className="w-full rounded-lg border border-gray-300 px-4 py-4 text-xl focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
          {errors.checkOut && (
            <p className="mt-1 text-xl text-red-600">
              {tValidation(errors.checkOut.message!)}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-2 block text-xl font-bold text-gray-700">
          {t('message')}
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={4}
          placeholder={t('messagePlaceholder')}
          className="w-full rounded-lg border border-gray-300 px-4 py-4 text-xl focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-primary-600 px-6 py-4 text-2xl font-bold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? t('submitting') : t('submit')}
      </button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="rounded-lg bg-green-50 p-4 text-green-800">{t('success')}</div>
      )}
      {submitStatus === 'error' && (
        <div className="rounded-lg bg-red-50 p-4 text-red-800">{t('error')}</div>
      )}
    </form>
  );
}

