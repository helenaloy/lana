'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { inquirySchema, type InquiryFormData } from '@/lib/validators';

type Props = {
  locale: string;
};

export default function InquiryForm({ locale }: Props) {
  const t = useTranslations('availability.form');
  const tValidation = useTranslations('availability.validation');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
  });

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, locale }),
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
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
          {t('name')}
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          placeholder={t('namePlaceholder')}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{tValidation(errors.name.message!)}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
          {t('email')}
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          placeholder={t('emailPlaceholder')}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{tValidation(errors.email.message!)}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
          {t('phone')}
        </label>
        <input
          {...register('phone')}
          type="tel"
          id="phone"
          placeholder={t('phonePlaceholder')}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{tValidation(errors.phone.message!)}</p>
        )}
      </div>

      {/* Number of Guests */}
      <div>
        <label htmlFor="guests" className="mb-1 block text-sm font-medium text-gray-700">
          {t('guests')}
        </label>
        <select
          {...register('guests')}
          id="guests"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
        >
          <option value="">{t('guestsPlaceholder')}</option>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.guests && (
          <p className="mt-1 text-sm text-red-600">{tValidation(errors.guests.message!)}</p>
        )}
      </div>

      {/* Check-in Date */}
      <div>
        <label htmlFor="checkIn" className="mb-1 block text-sm font-medium text-gray-700">
          {t('checkIn')}
        </label>
        <input
          {...register('checkIn')}
          type="date"
          id="checkIn"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
        {errors.checkIn && (
          <p className="mt-1 text-sm text-red-600">
            {tValidation(errors.checkIn.message!)}
          </p>
        )}
      </div>

      {/* Check-out Date */}
      <div>
        <label htmlFor="checkOut" className="mb-1 block text-sm font-medium text-gray-700">
          {t('checkOut')}
        </label>
        <input
          {...register('checkOut')}
          type="date"
          id="checkOut"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
        {errors.checkOut && (
          <p className="mt-1 text-sm text-red-600">
            {tValidation(errors.checkOut.message!)}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
          {t('message')}
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={4}
          placeholder={t('messagePlaceholder')}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
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

