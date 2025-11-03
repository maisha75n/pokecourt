import { getSets } from '@/lib/cards';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sets - PokéCollection',
  description: 'Browse your collection by set',
};

export default async function SetsPage() {
  const sets = await getSets();

  return (
    <div>
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6">
        Sets
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sets.map((set) => (
          <Link
            key={set.setName}
            href={`/gallery?set=${encodeURIComponent(set.setName)}`}
            className="block bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
          >
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
              {set.setName}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              {set.count} {set.count === 1 ? 'card' : 'cards'}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

