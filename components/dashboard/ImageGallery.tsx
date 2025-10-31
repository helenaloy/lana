'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface ImageFile {
  name: string;
  url: string;
}

export default function ImageGallery() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const BUCKET_NAME = 'images';
  const FOLDER_NAME = 'about';

  // Load images
  const loadImages = async () => {
    try {
      const { data, error: listError } = await supabase.storage
        .from(BUCKET_NAME)
        .list(FOLDER_NAME);

      if (listError) {
        setError('Greška pri učitavanju slika: ' + listError.message);
        return;
      }

      if (data) {
        const imageList = data
          .filter((file) => file.name !== '.emptyFolderPlaceholder')
          .map((file) => ({
            name: file.name,
            url: supabase.storage
              .from(BUCKET_NAME)
              .getPublicUrl(`${FOLDER_NAME}/${file.name}`).data.publicUrl,
          }));
        setImages(imageList);
      }
    } catch (err) {
      setError('Greška pri učitavanju slika');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setMessage(null);
    setError(null);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = `${FOLDER_NAME}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }
      });

      await Promise.all(uploadPromises);
      setMessage('Uspješan upload');
      setTimeout(() => setMessage(null), 3000);

      // Reload images
      await loadImages();

      // Reset file input
      e.target.value = '';
    } catch (err: any) {
      setError('Greška pri uploadu: ' + (err.message || 'Nepoznata greška'));
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (imageName: string) => {
    if (!confirm('Jeste li sigurni da želite obrisati ovu sliku?')) {
      return;
    }

    setDeleting(imageName);
    setMessage(null);
    setError(null);

    try {
      const { error: deleteError } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([`${FOLDER_NAME}/${imageName}`]);

      if (deleteError) {
        setError('Greška pri brisanju: ' + deleteError.message);
        return;
      }

      setMessage('Slika obrisana');
      setTimeout(() => setMessage(null), 3000);

      // Reload images
      await loadImages();
    } catch (err) {
      setError('Greška pri brisanju');
      console.error(err);
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-primary-900 mb-4">Slike</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-primary-900 mb-4">Slike</h2>

      <div className="space-y-6">
        {/* Upload section */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <label className="cursor-pointer">
            <div className="space-y-2">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-primary-600 hover:text-primary-700">
                  Kliknite za upload
                </span>{' '}
                ili povucite slike ovdje
              </p>
              <p className="text-xs text-gray-500">PNG, JPG do 10MB</p>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>

        {/* Messages */}
        {uploading && (
          <div className="flex items-center gap-2 text-primary-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
            <p>Učitavanje...</p>
          </div>
        )}

        {message && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Images grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image) => (
              <div key={image.name} className="relative group">
                <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => handleDelete(image.name)}
                  disabled={deleting === image.name}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed opacity-0 group-hover:opacity-100"
                >
                  {deleting === image.name ? 'Brisanje...' : 'Obriši'}
                </button>
              </div>
            ))}
          </div>
        )}

        {images.length === 0 && !uploading && (
          <p className="text-center text-gray-500 py-8">
            Trenutno nema slika. Dodajte slike klikom na gumb iznad.
          </p>
        )}
      </div>
    </div>
  );
}

