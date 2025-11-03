import Card from '@/types/Card';
import cardsData from '@/data/cards.json';

type FilterSortOptions = {
  q?: string;
  set?: string;
  rarity?: string | string[];
  finish?: string | string[];
  language?: string | string[];
  condition?: string;
  tags?: string[];
  sort?: 'nameAZ' | 'yearDesc' | 'valueDesc' | 'newest';
};

export async function getAllCards(): Promise<Card[]> {
  return cardsData as Card[];
}

export async function getCardById(id: string): Promise<Card | undefined> {
  const cards = await getAllCards();
  return cards.find((card) => card.id === id);
}

export async function getSets(): Promise<{ setName: string; count: number }[]> {
  const cards = await getAllCards();
  const setMap = new Map<string, number>();

  cards.forEach((card) => {
    const count = setMap.get(card.setName) || 0;
    setMap.set(card.setName, count + 1);
  });

  return Array.from(setMap.entries()).map(([setName, count]) => ({
    setName,
    count,
  }));
}

export function filterSortCards(
  cards: Card[],
  options: FilterSortOptions
): Card[] {
  let filtered = [...cards];

  // Search filter
  if (options.q) {
    const query = options.q.toLowerCase();
    filtered = filtered.filter(
      (card) =>
        card.name.toLowerCase().includes(query) ||
        card.setName.toLowerCase().includes(query) ||
        card.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  // Set filter
  if (options.set) {
    filtered = filtered.filter((card) => card.setName === options.set);
  }

  // Rarity filter
  if (options.rarity) {
    const rarities = Array.isArray(options.rarity)
      ? options.rarity
      : [options.rarity];
    if (rarities.length > 0) {
      filtered = filtered.filter((card) => rarities.includes(card.rarity));
    }
  }

  // Finish filter
  if (options.finish) {
    const finishes = Array.isArray(options.finish)
      ? options.finish
      : [options.finish];
    if (finishes.length > 0) {
      filtered = filtered.filter((card) => finishes.includes(card.finish));
    }
  }

  // Language filter
  if (options.language) {
    const languages = Array.isArray(options.language)
      ? options.language
      : [options.language];
    if (languages.length > 0) {
      filtered = filtered.filter((card) => languages.includes(card.language));
    }
  }

  // Condition filter
  if (options.condition) {
    filtered = filtered.filter((card) => card.condition === options.condition);
  }

  // Tags filter
  if (options.tags && options.tags.length > 0) {
    filtered = filtered.filter((card) =>
      options.tags!.some((tag) => card.tags.includes(tag))
    );
  }

  // Sorting
  if (options.sort) {
    switch (options.sort) {
      case 'nameAZ':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'yearDesc':
        filtered.sort((a, b) => b.year - a.year);
        break;
      case 'valueDesc':
        filtered.sort((a, b) => {
          const aValue = a.estimatedValue || 0;
          const bValue = b.estimatedValue || 0;
          return bValue - aValue;
        });
        break;
      case 'newest':
        // Assuming newest means highest year, then by ID or array order
        filtered.sort((a, b) => {
          if (b.year !== a.year) return b.year - a.year;
          return 0;
        });
        break;
    }
  }

  return filtered;
}

export function getUniqueValues(cards: Card[], key: keyof Card): string[] {
  const values = new Set<string>();
  cards.forEach((card) => {
    const value = card[key];
    if (typeof value === 'string') {
      values.add(value);
    }
  });
  return Array.from(values).sort();
}

export function getAllTags(cards: Card[]): string[] {
  const tagSet = new Set<string>();
  cards.forEach((card) => {
    card.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

