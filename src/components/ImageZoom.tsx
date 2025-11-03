'use client';

import Image from 'next/image';
import { useState } from 'react';

type ImageZoomProps = {
  src: string;
  alt: string;
  className?: string;
};

export default function ImageZoom({ src, alt, className = '' }: ImageZoomProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!src) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`relative block focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 rounded-lg ${className}`}
        aria-label="Click to zoom image"
      >
        <Image
          src={src || '/placeholder.svg'}
          alt={alt}
          width={400}
          height={600}
          className="rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-label="Zoomed image"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-white rounded px-2"
            aria-label="Close zoom"
          >
            ×
          </button>
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={src || '/placeholder.svg'}
              alt={alt}
              width={800}
              height={1200}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              sizes="(max-width: 1024px) 90vw, 800px"
            />
          </div>
        </div>
      )}
    </>
  );
}

