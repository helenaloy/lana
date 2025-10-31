'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AboutEditor() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load existing content
  useEffect(() => {
    const loadContent = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('editable_sections_Lana')
          .select('content')
          .eq('section', 'about')
          .single();

        if (!fetchError && data?.content?.text) {
          setText(data.content.text);
        } else {
          setText('');
        }
      } catch (err) {
        console.error('Error loading content:', err);
        setText('');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('editable_sections_Lana')
        .update({ content: { text } })
        .eq('section', 'about');

      if (updateError) {
        setError('Greška pri spremanju: ' + updateError.message);
        return;
      }

      setMessage('Spremljeno - promjena je vidljiva na stranici');
      setTimeout(() => setMessage(null), 5000);
    } catch (err) {
      setError('Greška pri spremanju');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-primary-900 mb-4">O nama</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-primary-900 mb-4">O nama</h2>

      <div className="space-y-4">
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all min-h-[200px]"
            placeholder="Unesite tekst o nama..."
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Spremanje...' : 'Spremi'}
          </button>

          {message && (
            <p className="text-green-600 font-medium">{message}</p>
          )}

          {error && (
            <p className="text-red-600 font-medium">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
