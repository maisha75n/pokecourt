'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Card from '@/types/Card';

type FilterPanelProps = {
  cards: Card[];
};

export default function FilterPanel({ cards }: FilterPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [setName, setNameFilter] = useState(searchParams.get('set') || '');
  const [rarity, setRarity] = useState<string[]>(
    searchParams.get('rarity')?.split(',').filter(Boolean) || []
  );
  const [finish, setFinish] = useState<string[]>(
    searchParams.get('finish')?.split(',').filter(Boolean) || []
  );
  const [language, setLanguage] = useState<string[]>(
    searchParams.get('language')?.split(',').filter(Boolean) || []
  );
  const [condition, setCondition] = useState(searchParams.get('condition') || '');
  const [tags, setTags] = useState<string[]>(
    searchParams.get('tags')?.split(',').filter(Boolean) || []
  );

  // Get unique values
  const uniqueSets = Array.from(new Set(cards.map((c) => c.setName))).sort();
  const uniqueRarities = Array.from(new Set(cards.map((c) => c.rarity))).sort();
  const uniqueFinishes = Array.from(new Set(cards.map((c) => c.finish))).sort();
  const uniqueLanguages = Array.from(new Set(cards.map((c) => c.language))).sort();
  const uniqueConditions = Array.from(new Set(cards.map((c) => c.condition))).sort();
  const allTags = Array.from(
    new Set(cards.flatMap((c) => c.tags))
  ).sort();

  const updateURL = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (setName) params.set('set', setName);
    else params.delete('set');
    
    if (rarity.length > 0) params.set('rarity', rarity.join(','));
    else params.delete('rarity');
    
    if (finish.length > 0) params.set('finish', finish.join(','));
    else params.delete('finish');
    
    if (language.length > 0) params.set('language', language.join(','));
    else params.delete('language');
    
    if (condition) params.set('condition', condition);
    else params.delete('condition');
    
    if (tags.length > 0) params.set('tags', tags.join(','));
    else params.delete('tags');
    
    params.delete('page'); // Reset pagination
    router.push(`?${params.toString()}`);
  };

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleRarity = (r: string) => {
    setRarity((prev) =>
      prev.includes(r) ? prev.filter((val) => val !== r) : [...prev, r]
    );
  };

  const toggleFinish = (f: string) => {
    setFinish((prev) =>
      prev.includes(f) ? prev.filter((val) => val !== f) : [...prev, f]
    );
  };

  const toggleLanguage = (l: string) => {
    setLanguage((prev) =>
      prev.includes(l) ? prev.filter((val) => val !== l) : [...prev, l]
    );
  };

  useEffect(() => {
    updateURL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setName, rarity, finish, language, condition, tags]);

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6 space-y-6">
      <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
        Filters
      </h2>

      {/* Set Name */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Set
        </label>
        <select
          value={setName}
          onChange={(e) => setNameFilter(e.target.value)}
          className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
          aria-label="Filter by set name"
        >
          <option value="">All Sets</option>
          {uniqueSets.map((set) => (
            <option key={set} value={set}>
              {set}
            </option>
          ))}
        </select>
      </div>

      {/* Rarity */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Rarity
        </label>
        <div className="space-y-2">
          {uniqueRarities.map((r) => (
            <label
              key={r}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={rarity.includes(r)}
                onChange={() => toggleRarity(r)}
                className="w-4 h-4 text-neutral-600 border-neutral-300 rounded focus:ring-neutral-500 focus:ring-2"
                aria-label={`Filter by ${r} rarity`}
              />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                {r}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Finish */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Finish
        </label>
        <div className="space-y-2">
          {uniqueFinishes.map((f) => (
            <label
              key={f}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={finish.includes(f)}
                onChange={() => toggleFinish(f)}
                className="w-4 h-4 text-neutral-600 border-neutral-300 rounded focus:ring-neutral-500 focus:ring-2"
                aria-label={`Filter by ${f} finish`}
              />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                {f}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Language */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Language
        </label>
        <div className="space-y-2">
          {uniqueLanguages.map((l) => (
            <label
              key={l}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={language.includes(l)}
                onChange={() => toggleLanguage(l)}
                className="w-4 h-4 text-neutral-600 border-neutral-300 rounded focus:ring-neutral-500 focus:ring-2"
                aria-label={`Filter by ${l} language`}
              />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                {l}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Condition */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Condition
        </label>
        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
          aria-label="Filter by condition"
        >
          <option value="">All Conditions</option>
          {uniqueConditions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Tags
        </label>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800 ${
                tags.includes(tag)
                  ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900'
                  : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600'
              }`}
              aria-label={`Toggle ${tag} tag filter`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

