import { getAllCards } from '@/lib/cards';
import Card from '@/types/Card';

export default async function StatBar() {
  const cards = await getAllCards();
  
  const totalCards = cards.reduce((sum, card) => sum + card.quantity, 0);
  const gradedCount = cards.filter(
    (card) => card.gradeCompany && card.gradeCompany !== ''
  ).length;
  const uniqueSets = new Set(cards.map((card) => card.setName)).size;
  const totalValue = cards.reduce(
    (sum, card) => sum + (card.estimatedValue || 0),
    0
  );

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6 mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
            Total Cards
          </div>
          <div className="text-2xl font-bold text-neutral-900 dark:text-white">
            {totalCards}
          </div>
        </div>
        <div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
            Graded Cards
          </div>
          <div className="text-2xl font-bold text-neutral-900 dark:text-white">
            {gradedCount}
          </div>
        </div>
        <div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
            Unique Sets
          </div>
          <div className="text-2xl font-bold text-neutral-900 dark:text-white">
            {uniqueSets}
          </div>
        </div>
        <div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
            Total Value
          </div>
          <div className="text-2xl font-bold text-neutral-900 dark:text-white">
            ${totalValue.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}

