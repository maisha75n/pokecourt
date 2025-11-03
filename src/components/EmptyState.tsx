type EmptyStateProps = {
  message?: string;
  description?: string;
};

export default function EmptyState({
  message = 'No cards found',
  description,
}: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
          {message}
        </h3>
        {description && (
          <p className="text-neutral-600 dark:text-neutral-400">{description}</p>
        )}
      </div>
    </div>
  );
}

