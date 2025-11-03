'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set('q', query);
      } else {
        params.delete('q');
      }
      params.delete('page'); // Reset to page 1 on search
      const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
      router.replace(newUrl);
    }, 250);

    return () => clearTimeout(timer);
  }, [query, router, searchParams]);

  return (
    <div className="w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name, set, or tags..."
        className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
        aria-label="Search cards"
      />
    </div>
  );
}

