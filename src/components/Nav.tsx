import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="border-b-2 border-pokemon-red/20 bg-gradient-to-r from-pokemon-red/5 via-white to-pokemon-blue/5 dark:from-pokemon-red/10 dark:via-neutral-900 dark:to-pokemon-blue/10 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-pokemon-red to-pokemon-blue bg-clip-text text-transparent hover:from-pokemon-red/80 hover:to-pokemon-blue/80 transition-all focus:outline-none focus:ring-2 focus:ring-pokemon-blue focus:ring-offset-2 rounded"
          >
            PokéCollection
          </Link>
          <div className="flex gap-6">
            <Link
              href="/"
              className="text-slate-700 dark:text-slate-300 hover:text-pokemon-red dark:hover:text-pokemon-blue font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pokemon-blue focus:ring-offset-2 rounded px-2 py-1"
            >
              Home
            </Link>
            <Link
              href="/gallery"
              className="text-slate-700 dark:text-slate-300 hover:text-pokemon-red dark:hover:text-pokemon-blue font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pokemon-blue focus:ring-offset-2 rounded px-2 py-1"
            >
              Gallery
            </Link>
            <Link
              href="/sets"
              className="text-slate-700 dark:text-slate-300 hover:text-pokemon-red dark:hover:text-pokemon-blue font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pokemon-blue focus:ring-offset-2 rounded px-2 py-1"
            >
              Sets
            </Link>
            <Link
              href="/trade"
              className="text-slate-700 dark:text-slate-300 hover:text-pokemon-red dark:hover:text-pokemon-blue font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pokemon-blue focus:ring-offset-2 rounded px-2 py-1"
            >
              Trade
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

