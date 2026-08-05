'use client';

import { useState } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import { Filter, Grid3X3, Grid2X2, LayoutGrid, X, ChevronDown, Check } from 'lucide-react';

interface ShopFilterClientProps {
  initialProducts: any[];
  categories: any[];
  collections: any[];
}

export default function ShopFilterClient({
  initialProducts,
  categories,
  collections,
}: ShopFilterClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [gridCols, setGridCols] = useState<number>(4);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Active filter chips calculation
  const activeFilters = [
    selectedCategory !== 'all' ? { key: 'category', label: selectedCategory, reset: () => setSelectedCategory('all') } : null,
    selectedColor !== 'all' ? { key: 'color', label: selectedColor, reset: () => setSelectedColor('all') } : null,
    selectedSize !== 'all' ? { key: 'size', label: `Size: ${selectedSize}`, reset: () => setSelectedSize('all') } : null,
  ].filter(Boolean) as { key: string; label: string; reset: () => void }[];

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedColor('all');
    setSelectedSize('all');
  };

  // Filter Products
  const filteredProducts = initialProducts.filter((p) => {
    if (selectedCategory !== 'all' && p.category?.slug !== selectedCategory) return false;
    if (selectedColor !== 'all') {
      const hasColor = p.variants?.some(
        (v: any) => v.color.toLowerCase() === selectedColor.toLowerCase()
      );
      if (!hasColor) return false;
    }
    if (selectedSize !== 'all') {
      const hasSize = p.variants?.some((v: any) => v.size === selectedSize);
      if (!hasSize) return false;
    }
    return true;
  });

  // Sort Products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.sellingPrice - b.sellingPrice;
    if (sortBy === 'price-high') return b.sellingPrice - a.sellingPrice;
    if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return 0;
  });

  const availableColors = ['Dusty Rose', 'Deep Plum', 'Ivory', 'Blush', 'Black'];
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="space-y-6">
      {/* Top Filter Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-y border-sand py-4 gap-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-sand/40 border border-sand text-xs uppercase tracking-widest font-semibold hover:bg-plum hover:text-ivory transition-colors"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filter</span>
          </button>

          <span className="text-xs text-charcoal/70 hidden sm:inline">
            Showing <strong>{sortedProducts.length}</strong> Products
          </span>
        </div>

        {/* Active Filter Chips */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {activeFilters.map((chip) => (
              <span
                key={chip.key}
                className="px-2.5 py-1 bg-sand/60 text-luxury-black text-[10px] uppercase tracking-wider font-semibold rounded flex items-center space-x-1 border border-sand"
              >
                <span>{chip.label}</span>
                <button onClick={chip.reset} className="hover:text-plum">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-[10px] uppercase tracking-widest text-plum font-semibold underline hover:text-luxury-black"
            >
              Clear All
            </button>
          </div>
        )}

        <div className="flex items-center space-x-4">
          {/* Grid Layout Switcher */}
          <div className="hidden md:flex items-center space-x-1 border-r border-sand pr-4">
            <button
              onClick={() => setGridCols(2)}
              className={`p-1.5 ${gridCols === 2 ? 'text-plum' : 'text-charcoal/40'}`}
              title="2 Columns"
            >
              <Grid2X2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridCols(3)}
              className={`p-1.5 ${gridCols === 3 ? 'text-plum' : 'text-charcoal/40'}`}
              title="3 Columns"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridCols(4)}
              className={`p-1.5 ${gridCols === 4 ? 'text-plum' : 'text-charcoal/40'}`}
              title="4 Columns"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="uppercase tracking-wider text-charcoal/70 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 text-xs bg-ivory border border-sand uppercase tracking-wider text-luxury-black focus:outline-none focus:border-plum"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest Drops</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div
        className={`grid gap-6 ${
          gridCols === 2
            ? 'grid-cols-2'
            : gridCols === 3
            ? 'grid-cols-2 md:grid-cols-3'
            : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
        }`}
      >
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Mobile Filter Drawer / Bottom Sheet */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="fixed inset-0 bg-luxury-black/60 backdrop-blur-xs" onClick={() => setMobileFilterOpen(false)} />
          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-xs bg-ivory text-luxury-black p-6 flex flex-col justify-between animate-fade-in shadow-2xl border-l border-sand">
              <div className="space-y-6 overflow-y-auto">
                <div className="flex justify-between items-center border-b border-sand pb-4">
                  <h3 className="font-serif-luxury text-xl uppercase font-semibold">Filter Catalog</h3>
                  <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-charcoal">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-plum">Category</h4>
                  <div className="space-y-1 text-xs">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`block w-full text-left py-1 uppercase ${
                        selectedCategory === 'all' ? 'text-plum font-bold' : 'text-charcoal'
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={`block w-full text-left py-1 uppercase ${
                          selectedCategory === cat.slug ? 'text-plum font-bold' : 'text-charcoal'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-plum">Size</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {availableSizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(selectedSize === sz ? 'all' : sz)}
                        className={`py-1.5 text-xs font-semibold uppercase border ${
                          selectedSize === sz ? 'bg-plum text-ivory border-plum' : 'bg-ivory border-sand text-charcoal'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-sand">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 bg-plum text-ivory text-xs uppercase tracking-widest font-semibold"
                >
                  APPLY FILTERS ({sortedProducts.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
