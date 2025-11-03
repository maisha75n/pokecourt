'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || 'newest';

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', e.target.value);
    params.delete('page'); // Reset pagination
    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
    router.replace(newUrl);
  };

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="sort"
        className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
      >
        Sort:
      </label>
      <select
        id="sort"
        value={currentSort}
        onChange={handleSortChange}
        className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
        aria-label="Sort cards"
      >
        <option value="nameAZ">Name (A-Z)</option>
        <option value="yearDesc">Year (Newest)</option>
        <option value="valueDesc">Value (High to Low)</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  );
}

