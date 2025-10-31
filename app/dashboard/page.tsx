'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import AboutEditor from '@/components/dashboard/AboutEditor';
import AccommodationEditor from '@/components/dashboard/AccommodationEditor';
import ImageGallery from '@/components/dashboard/ImageGallery';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { user: currentUser },
          error,
        } = await supabase.auth.getUser();

        if (error || !currentUser) {
          router.push('/login');
          return;
        }

        setUser(currentUser);
      } catch (err) {
        console.error('Error checking user:', err);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/login');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Učitavanje...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-primary-900">DASHBOARD</h1>
                <p className="text-gray-600 mt-2">Dobrodošli!</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Odjava
              </button>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <div className="bg-primary-50 rounded-lg p-6 mb-6">
                <p className="text-lg text-primary-900">
                  Prijavljeni ste kao <span className="font-semibold">{user.email}</span>
                </p>
              </div>

              <div className="space-y-6">
                <AboutEditor />
                <AccommodationEditor />
                <ImageGallery />
              </div>
            </div>

            <div className="mt-8">
              <a
                href="/"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                ← Natrag na početnu
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

