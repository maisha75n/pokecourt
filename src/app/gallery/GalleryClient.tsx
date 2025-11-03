'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAllCards, filterSortCards } from '@/lib/cards';
import Card from '@/types/Card';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import SortSelect from '@/components/SortSelect';
import CardTile from '@/components/CardTile';
import EmptyState from '@/components/EmptyState';
import LoadMore from '@/components/LoadMore';

export default function GalleryClient() {
  const searchParams = useSearchParams();
  const [allCards, setAllCards] = useState<Card[]>([]);
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [displayedCards, setDisplayedCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const CARDS_PER_PAGE = 24;

  useEffect(() => {
    async function loadCards() {
      const cards = await getAllCards();
      setAllCards(cards);
      setLoading(false);
    }
    loadCards();
  }, []);

  useEffect(() => {
    const q = searchParams.get('q') || '';
    const set = searchParams.get('set') || '';
    const rarity = searchParams.get('rarity')?.split(',').filter(Boolean) || [];
    const finish = searchParams.get('finish')?.split(',').filter(Boolean) || [];
    const language = searchParams.get('language')?.split(',').filter(Boolean) || [];
    const condition = searchParams.get('condition') || '';
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || [];
    const sort = (searchParams.get('sort') as any) || 'newest';
    const pageParam = parseInt(searchParams.get('page') || '1');

    setPage(pageParam);

    const filtered = filterSortCards(allCards, {
      q,
      set,
      rarity,
      finish,
      language,
      condition,
      tags,
      sort,
    });

    setFilteredCards(filtered);
    setDisplayedCards(filtered.slice(0, pageParam * CARDS_PER_PAGE));
  }, [allCards, searchParams]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    setDisplayedCards(
      filteredCards.slice(0, nextPage * CARDS_PER_PAGE)
    );

    // Update URL
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', nextPage.toString());
    window.history.pushState({}, '', `?${params.toString()}`);
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  const hasMore = displayedCards.length < filteredCards.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <SearchBar />
        </div>
        <SortSelect />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <FilterPanel cards={allCards} />
        </div>
        <div className="lg:col-span-3">
          {filteredCards.length === 0 ? (
            <EmptyState message="No cards match your filters" />
          ) : (
            <>
              <div className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                Showing {displayedCards.length} of {filteredCards.length} cards
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {displayedCards.map((card) => (
                  <CardTile key={card.id} card={card} />
                ))}
              </div>
              <LoadMore
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
                isLoading={false}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

