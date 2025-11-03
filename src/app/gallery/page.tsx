import { Suspense } from 'react';
import GalleryClient from './GalleryClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery - PokéCollection',
  description: 'Browse and filter your Pokémon card collection',
};

export default function GalleryPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6">
        Gallery
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <GalleryClient />
      </Suspense>
    </div>
  );
}

