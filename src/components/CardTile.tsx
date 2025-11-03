import Image from 'next/image';
import Link from 'next/link';
import Card from '@/types/Card';

type CardTileProps = {
  card: Card;
};

export default function CardTile({ card }: CardTileProps) {
  return (
    <Link
      href={`/card/${card.id}`}
      className="block bg-white dark:bg-neutral-800 rounded-2xl shadow-md border-2 border-pokemon-blue/20 dark:border-pokemon-blue/30 overflow-hidden hover:shadow-xl hover:border-pokemon-red/40 dark:hover:border-pokemon-red/50 transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-pokemon-blue focus:ring-offset-2"
    >
      <div className="relative w-full aspect-[2/3] bg-neutral-100 dark:bg-neutral-900">
        <Image
          src={card.images.front || '/placeholder.svg'}
          alt={`${card.name} - ${card.setName}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 320px"
          className="object-contain"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-neutral-900 dark:text-white mb-1 truncate">
          {card.name}
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
          {card.setName} #{card.number}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded">
            {card.rarity}
          </span>
          {card.gradeCompany && card.grade && (
            <span className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded">
              {card.gradeCompany} {card.grade}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

