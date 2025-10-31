'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const router = useRouter();

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data, error: authError } = await supabase.auth.getUser();
        
        if (authError) {
          console.error('Auth check error:', authError);
        }
        
        if (data?.user) {
          router.replace('/dashboard');
          return;
        }
        
        setReady(true);
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : 'Neočekivana greška pri provjeri autentifikacije';
        console.error('Error checking auth:', err);
        setInitError(errMsg);
        setReady(true);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        const errMsg = signInError.message || 'Greška pri prijavi';
        setError(errMsg);
        console.error('Login error:', signInError);
        return;
      }

      if (data?.user) {
        router.replace('/dashboard');
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Dogodila se neočekivana greška';
      setError(errMsg);
      console.error('Unexpected login error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking auth status
  if (!ready) {
    return (
      <main style={{ padding: 16, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Učitavanje login stranice…</div>
      </main>
    );
  }

  // Show init error if there was a problem
  if (initError) {
    return (
      <main style={{ padding: 16, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'crimson', marginBottom: 16 }}>Greška: {initError}</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{ padding: '8px 16px', cursor: 'pointer' }}
          >
            Osvježi stranicu
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary-900 mb-2">Dobrodošli</h1>
            <p className="text-gray-600">Prijavi se</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="Unesite svoj email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Lozinka
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="Unesite svoju lozinku"
              />
            </div>

            {error && (
              <div>
                <p style={{ color: 'crimson', fontSize: '14px', marginTop: '8px' }}>Greška: {error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Prijava u tijeku...' : 'Prijavi se'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              ← Natrag
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}