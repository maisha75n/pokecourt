'use client';

type LoadMoreProps = {
  hasMore: boolean;
  onLoadMore: () => void;
  isLoading?: boolean;
};

export default function LoadMore({
  hasMore,
  onLoadMore,
  isLoading = false,
}: LoadMoreProps) {
  if (!hasMore) return null;

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={onLoadMore}
        disabled={isLoading}
        className="px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
        aria-label="Load more cards"
      >
        {isLoading ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
}

