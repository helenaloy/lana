'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useTranslations } from 'next-intl';

export default function AboutSectionText() {
  const t = useTranslations('about');
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadText = async () => {
      try {
        const { data, error } = await supabase
          .from('editable_sections')
          .select('content')
          .eq('section', 'about')
          .single();

        if (!error && data?.content?.text) {
          setText(data.content.text);
        } else {
          // Fallback to translation file if error or no data
          // This includes cases where table doesn't exist
          setText(t('description'));
        }
      } catch (err) {
        // Fallback to translation file on any error (including table not found)
        setText(t('description'));
      } finally {
        setLoading(false);
      }
    };

    loadText();

    // Subscribe to changes
    const channel = supabase
      .channel('editable_sections_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'editable_sections',
          filter: `section=eq.about`,
        },
        (payload) => {
          if (payload.new && (payload.new as any).content?.text) {
            setText((payload.new as any).content.text);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [t]);

  if (loading) {
    return (
      <div className="rounded-lg bg-gray-50 p-8 text-lg text-gray-700 whitespace-pre-line leading-relaxed">
        {t('description')}
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-gray-50 p-8 text-lg text-gray-700 whitespace-pre-line leading-relaxed">
      {text || t('description')}
    </div>
  );
}

