import { Suspense } from 'react';
import TradeClient from './TradeClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trade - PokéCollection',
  description: 'Browse cards available for trade or sale',
};

export default function TradePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6">
        Trade & Sale
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <TradeClient />
      </Suspense>
    </div>
  );
}

