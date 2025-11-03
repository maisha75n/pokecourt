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
    <div className="bg-gradient-to-br from-white to-pokemon-blue/5 dark:from-neutral-800 dark:to-pokemon-blue/10 rounded-2xl shadow-lg border-2 border-pokemon-blue/20 dark:border-pokemon-blue/30 p-6 mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
            Total Cards
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-pokemon-red to-pokemon-blue bg-clip-text text-transparent">
            {totalCards}
          </div>
        </div>
        <div>
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">
            Graded Cards
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-pokemon-yellow to-pokemon-orange bg-clip-text text-transparent">
            {gradedCount}
          </div>
        </div>
        <div>
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">
            Unique Sets
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-pokemon-blue to-pokemon-purple bg-clip-text text-transparent">
            {uniqueSets}
          </div>
        </div>
        <div>
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">
            Total Value
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-pokemon-green to-pokemon-blue bg-clip-text text-transparent">
            ${totalValue.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}

