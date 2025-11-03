import { notFound } from 'next/navigation';
import { getCardById, getAllCards, filterSortCards } from '@/lib/cards';
import ImageZoom from '@/components/ImageZoom';
import Card from '@/types/Card';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const card = await getCardById(params.id);

  if (!card) {
    return {
      title: 'Card Not Found - PokéCollection',
    };
  }

  return {
    title: `${card.name} – ${card.setName} ${card.number} - PokéCollection`,
    description: `${card.name} from ${card.setName} (${card.year}). ${card.rarity}${card.gradeCompany ? `, Graded ${card.gradeCompany} ${card.grade}` : ''}`,
    openGraph: {
      images: [card.images.front || '/placeholder.svg'],
    },
  };
}

function getRelatedCards(card: Card, allCards: Card[]): Card[] {
  const related: Card[] = [];
  const seen = new Set([card.id]);

  // Same set name
  const sameSet = allCards.filter(
    (c) => c.setName === card.setName && !seen.has(c.id)
  );
  related.push(...sameSet.slice(0, 3));
  sameSet.forEach((c) => seen.add(c.id));

  // Same name keyword (if space exists)
  const nameKeyword = card.name.split(' ')[0];
  if (nameKeyword && related.length < 6) {
    const nameMatches = allCards.filter(
      (c) =>
        c.name.includes(nameKeyword) &&
        !seen.has(c.id) &&
        c.id !== card.id
    );
    related.push(...nameMatches.slice(0, 6 - related.length));
  }

  return related.slice(0, 6);
}

export default async function CardPage({ params }: Props) {
  const card = await getCardById(params.id);
  const allCards = await getAllCards();

  if (!card) {
    notFound();
  }

  const relatedCards = getRelatedCards(card, allCards);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 mb-4">
        <Link
          href="/gallery"
          className="hover:text-neutral-900 dark:hover:text-white"
        >
          Gallery
        </Link>
        <span>/</span>
        <span className="text-neutral-900 dark:text-white">{card.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Images */}
        <div className="space-y-4">
          <ImageZoom
            src={card.images.front || '/placeholder.svg'}
            alt={`${card.name} front`}
            className="w-full"
          />
          {card.images.back && (
            <ImageZoom
              src={card.images.back}
              alt={`${card.name} back`}
              className="w-full"
            />
          )}
        </div>

        {/* Metadata */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
              {card.name}
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              {card.setName} #{card.number}
            </p>
          </div>

          {/* Badges */}
          <div className="flex gap-2 flex-wrap">
            {card.forTrade && (
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                For Trade
              </span>
            )}
            {card.forSale && (
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                For Sale
              </span>
            )}
          </div>

          {/* Metadata Table */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
            <table className="w-full">
              <tbody className="space-y-2">
                <tr className="border-b border-neutral-200 dark:border-neutral-700">
                  <td className="py-2 font-medium text-neutral-700 dark:text-neutral-300">
                    Rarity
                  </td>
                  <td className="py-2 text-neutral-900 dark:text-white">
                    {card.rarity}
                  </td>
                </tr>
                <tr className="border-b border-neutral-200 dark:border-neutral-700">
                  <td className="py-2 font-medium text-neutral-700 dark:text-neutral-300">
                    Finish
                  </td>
                  <td className="py-2 text-neutral-900 dark:text-white">
                    {card.finish}
                  </td>
                </tr>
                <tr className="border-b border-neutral-200 dark:border-neutral-700">
                  <td className="py-2 font-medium text-neutral-700 dark:text-neutral-300">
                    Language
                  </td>
                  <td className="py-2 text-neutral-900 dark:text-white">
                    {card.language}
                  </td>
                </tr>
                <tr className="border-b border-neutral-200 dark:border-neutral-700">
                  <td className="py-2 font-medium text-neutral-700 dark:text-neutral-300">
                    Year
                  </td>
                  <td className="py-2 text-neutral-900 dark:text-white">
                    {card.year}
                  </td>
                </tr>
                <tr className="border-b border-neutral-200 dark:border-neutral-700">
                  <td className="py-2 font-medium text-neutral-700 dark:text-neutral-300">
                    Condition
                  </td>
                  <td className="py-2 text-neutral-900 dark:text-white">
                    {card.condition}
                  </td>
                </tr>
                {card.gradeCompany && card.grade && (
                  <tr className="border-b border-neutral-200 dark:border-neutral-700">
                    <td className="py-2 font-medium text-neutral-700 dark:text-neutral-300">
                      Grade
                    </td>
                    <td className="py-2 text-neutral-900 dark:text-white">
                      {card.gradeCompany} {card.grade}
                    </td>
                  </tr>
                )}
                <tr className="border-b border-neutral-200 dark:border-neutral-700">
                  <td className="py-2 font-medium text-neutral-700 dark:text-neutral-300">
                    Acquired From
                  </td>
                  <td className="py-2 text-neutral-900 dark:text-white">
                    {card.acquiredFrom}
                  </td>
                </tr>
                <tr className="border-b border-neutral-200 dark:border-neutral-700">
                  <td className="py-2 font-medium text-neutral-700 dark:text-neutral-300">
                    Acquired Price
                  </td>
                  <td className="py-2 text-neutral-900 dark:text-white">
                    ${card.acquiredPrice.toFixed(2)}
                  </td>
                </tr>
                {card.estimatedValue && (
                  <tr className="border-b border-neutral-200 dark:border-neutral-700">
                    <td className="py-2 font-medium text-neutral-700 dark:text-neutral-300">
                      Estimated Value
                    </td>
                    <td className="py-2 text-neutral-900 dark:text-white">
                      ${card.estimatedValue.toFixed(2)}
                    </td>
                  </tr>
                )}
                <tr>
                  <td className="py-2 font-medium text-neutral-700 dark:text-neutral-300">
                    Quantity
                  </td>
                  <td className="py-2 text-neutral-900 dark:text-white">
                    {card.quantity}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Tags */}
          {card.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {card.notes && (
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                Notes
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300">
                {card.notes}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related Cards */}
      {relatedCards.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
            Related Cards
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {relatedCards.map((relatedCard) => (
              <Link
                key={relatedCard.id}
                href={`/card/${relatedCard.id}`}
                className="block"
              >
                <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative w-full aspect-[2/3] bg-neutral-100 dark:bg-neutral-900">
                    <Image
                      src={relatedCard.images.front || '/placeholder.svg'}
                      alt={`${relatedCard.name} - ${relatedCard.setName}`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 150px"
                      className="object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-neutral-900 dark:text-white text-sm mb-1 truncate">
                      {relatedCard.name}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                      {relatedCard.setName} #{relatedCard.number}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

