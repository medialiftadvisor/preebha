import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ui/ProductCard';
import { Search as SearchIcon } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() || '';

  let products: any[] = [];
  if (query) {
    products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { description: { contains: query } },
          { sku: { contains: query } },
          { fabric: { contains: query } },
        ],
      },
      include: {
        category: true,
        images: true,
        variants: true,
      },
    });
  }

  const popularSearches = ['Kurta Sets', 'Chanderi Silk', 'Dusty Rose', 'Co-ord Sets', 'Ethnic Dresses'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-[0.3em] text-dusty-rose font-semibold">Boutique Search</span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-luxury-black uppercase tracking-tight">
          {query ? `Search Results for "${query}"` : 'Search PREEBHA Collection'}
        </h1>

        {/* Search Input Form */}
        <form action="/search" method="GET" className="relative flex items-center">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search Kurtis, Kurta Sets, SKU or Fabrics..."
            className="w-full pl-4 pr-12 py-3 text-sm bg-sand/30 border border-sand focus:outline-none focus:border-plum rounded-sm"
          />
          <button
            type="submit"
            className="absolute right-2 p-2 bg-plum text-ivory rounded hover:bg-luxury-black transition-colors"
          >
            <SearchIcon className="w-4 h-4" />
          </button>
        </form>

        {/* Popular Search Suggestions */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs pt-2">
          <span className="text-charcoal/60">Popular:</span>
          {popularSearches.map((term) => (
            <Link
              key={term}
              href={`/search?q=${encodeURIComponent(term)}`}
              className="px-2.5 py-1 bg-sand/50 hover:bg-plum hover:text-ivory text-charcoal rounded transition-colors"
            >
              {term}
            </Link>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div>
        {query && products.length === 0 ? (
          <div className="text-center py-16 bg-sand/20 rounded border border-sand space-y-4 max-w-md mx-auto">
            <h3 className="font-serif-luxury text-2xl text-luxury-black uppercase">No Results Found</h3>
            <p className="text-xs text-charcoal/70">
              We couldn&apos;t find any items matching &quot;{query}&quot;. Please check the spelling or explore our curated categories below.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="px-6 py-2.5 bg-plum text-ivory text-xs uppercase tracking-widest hover:bg-luxury-black transition-colors inline-block"
              >
                Browse Full Catalog
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
