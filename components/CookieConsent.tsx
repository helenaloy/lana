'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consentPreferences, setConsentPreferences] = useState({
    necessary: true, // Always true - required cookies
    analytics: false,
    marketing: false,
    social: false,
  });

  const t = useTranslations('cookieConsent');

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const preferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      social: true,
    };
    saveConsent(preferences);
  };

  const handleAcceptNecessary = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      social: false,
    });
  };

  const handleCustomize = () => {
    setShowSettings(true);
  };

  const handleSavePreferences = () => {
    saveConsent(consentPreferences);
  };

  const saveConsent = (preferences: typeof consentPreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setShowBanner(false);
    setShowSettings(false);
    // Here you can initialize cookie services based on preferences
    initializeCookieServices(preferences);
  };

  const initializeCookieServices = (preferences: typeof consentPreferences) => {
    // Future: Initialize Google Analytics
    if (preferences.analytics) {
      // window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
      console.log('Analytics cookies enabled');
    }

    // Future: Initialize Meta Pixel
    if (preferences.marketing) {
      // fbq('consent', 'grant');
      console.log('Marketing cookies enabled');
    }

    // Future: Initialize other services
    if (preferences.social) {
      console.log('Social cookies enabled');
    }
  };

  const togglePreference = (key: keyof typeof consentPreferences) => {
    if (key === 'necessary') return; // Cannot disable necessary cookies
    setConsentPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!showBanner && !showSettings) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-white shadow-2xl border-t-2 border-primary-600">
      <div className="container mx-auto px-4 py-6">
        {!showSettings ? (
          // Main Banner
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <h3 className="mb-2 text-xl font-bold text-gray-900">{t('title')}</h3>
              <p className="text-gray-600">{t('description')}</p>
              <a
                href="/hr/cookie-policy"
                className="mt-2 inline-block text-primary-600 underline hover:text-primary-700"
              >
                {t('learnMore')}
              </a>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleAcceptNecessary}
                className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                {t('acceptNecessary')}
              </button>
              <button
                onClick={handleCustomize}
                className="rounded-lg bg-gray-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-700"
              >
                {t('customize')}
              </button>
              <button
                onClick={handleAcceptAll}
                className="rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
              >
                {t('acceptAll')}
              </button>
            </div>
          </div>
        ) : (
          // Settings Panel
          <div className="max-w-4xl">
            <h3 className="mb-4 text-2xl font-bold text-gray-900">{t('settings.title')}</h3>
            <p className="mb-6 text-gray-600">{t('settings.description')}</p>

            {/* Necessary Cookies - Always on */}
            <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="mb-1 font-semibold text-gray-900">{t('settings.necessary.title')}</h4>
                  <p className="text-sm text-gray-600">{t('settings.necessary.description')}</p>
                </div>
                <div className="ml-4">
                  <span className="text-sm font-semibold text-gray-500">{t('settings.alwaysOn')}</span>
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="mb-4 rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="mb-1 font-semibold text-gray-900">{t('settings.analytics.title')}</h4>
                  <p className="text-sm text-gray-600">{t('settings.analytics.description')}</p>
                </div>
                <label className="relative ml-4 inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={consentPreferences.analytics}
                    onChange={() => togglePreference('analytics')}
                    className="peer sr-only"
                  />
                  <div className="h-6 w-11 rounded-full bg-gray-200 transition-colors peer-checked:bg-primary-600"></div>
                  <div className="absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5"></div>
                </label>
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="mb-4 rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="mb-1 font-semibold text-gray-900">{t('settings.marketing.title')}</h4>
                  <p className="text-sm text-gray-600">{t('settings.marketing.description')}</p>
                </div>
                <label className="relative ml-4 inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={consentPreferences.marketing}
                    onChange={() => togglePreference('marketing')}
                    className="peer sr-only"
                  />
                  <div className="h-6 w-11 rounded-full bg-gray-200 transition-colors peer-checked:bg-primary-600"></div>
                  <div className="absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5"></div>
                </label>
              </div>
            </div>

            {/* Social Media Cookies */}
            <div className="mb-6 rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="mb-1 font-semibold text-gray-900">{t('settings.social.title')}</h4>
                  <p className="text-sm text-gray-600">{t('settings.social.description')}</p>
                </div>
                <label className="relative ml-4 inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={consentPreferences.social}
                    onChange={() => togglePreference('social')}
                    className="peer sr-only"
                  />
                  <div className="h-6 w-11 rounded-full bg-gray-200 transition-colors peer-checked:bg-primary-600"></div>
                  <div className="absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5"></div>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={() => setShowSettings(false)}
                className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                {t('settings.cancel')}
              </button>
              <button
                onClick={handleSavePreferences}
                className="rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
              >
                {t('settings.save')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

