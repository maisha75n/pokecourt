import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
        Card Not Found
      </h2>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        The card you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/gallery"
        className="inline-block px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
      >
        Back to Gallery
      </Link>
    </div>
  );
}

