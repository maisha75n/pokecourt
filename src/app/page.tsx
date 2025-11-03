import { getAllCards } from '@/lib/cards';
import StatBar from '@/components/StatBar';
import CardTile from '@/components/CardTile';
import EmptyState from '@/components/EmptyState';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home - PokéCollection',
  description: 'View your Pokémon card collection statistics and newly added cards',
};

export default async function Home() {
  const allCards = await getAllCards();
  const newlyAdded = allCards.slice(-8).reverse(); // Last 8, newest first

  return (
    <div>
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6">
        Collection Overview
      </h1>
      <StatBar />

      {allCards.length === 0 ? (
        <EmptyState
          message="No cards in collection"
          description="To add cards, drop images in /public/cards and append entries to src/data/cards.json"
        />
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
            Newly Added
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {newlyAdded.map((card) => (
              <CardTile key={card.id} card={card} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

