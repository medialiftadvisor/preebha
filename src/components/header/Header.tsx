'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from '@/components/brand/Logo';
import AnnouncementBar from '@/components/header/AnnouncementBar';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronRight, ChevronDown } from 'lucide-react';

export default function Header() {
  const { openCart, totalItemsCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, isAdmin } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'NEW IN', href: '/shop?filter=new-arrivals' },
    { name: 'SHOP', href: '/shop' },
    {
      name: 'KURTIS',
      href: '/shop?category=kurtis',
      subcategories: [
        { name: 'Straight Kurtis', href: '/shop?category=kurtis&sub=straight-kurtis' },
        { name: 'A-Line Kurtis', href: '/shop?category=kurtis&sub=a-line-kurtis' },
        { name: 'Anarkali Kurtis', href: '/shop?category=kurtis&sub=anarkali-kurtis' },
        { name: 'Short Kurtis', href: '/shop?category=kurtis&sub=short-kurtis' },
        { name: 'Embroidered Kurtis', href: '/shop?category=kurtis&sub=embroidered-kurtis' },
      ],
    },
    {
      name: 'KURTA SETS',
      href: '/shop?category=kurta-sets',
      subcategories: [
        { name: '2-Piece Sets', href: '/shop?category=kurta-sets&sub=2-piece-sets' },
        { name: '3-Piece Sets', href: '/shop?category=kurta-sets&sub=3-piece-sets' },
        { name: 'Kurta & Pant Sets', href: '/shop?category=kurta-sets&sub=kurta-pant-sets' },
        { name: 'Festive Sets', href: '/shop?category=kurta-sets&sub=festive-sets' },
      ],
    },
    { name: 'CO-ORD SETS', href: '/shop?category=co-ord-sets' },
    { name: 'DRESSES', href: '/shop?category=dresses' },
    { name: 'COLLECTIONS', href: '/admin/collections' },
    { name: 'BESTSELLERS', href: '/shop?filter=bestsellers' },
    { name: 'OUR STORY', href: '/about' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'glass-panel shadow-sm border-b border-sand/60 py-3'
            : 'bg-ivory border-b border-sand py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Hamburger Trigger */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-luxury-black hover:text-plum transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6 text-[11px] uppercase tracking-widest text-luxury-black font-semibold">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative group py-1"
                  onMouseEnter={() => setActiveMegaMenu(item.name)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <Link href={item.href} className="hover:text-plum transition-colors flex items-center space-x-1">
                    <span>{item.name}</span>
                    {item.subcategories && <ChevronDown className="w-3 h-3 text-dusty-rose" />}
                  </Link>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-plum transition-all duration-300 group-hover:w-full" />

                  {/* Mega Menu Dropdown */}
                  {item.subcategories && activeMegaMenu === item.name && (
                    <div className="absolute top-full left-0 w-48 bg-ivory border border-sand shadow-xl p-4 space-y-2 animate-fade-in z-50">
                      {item.subcategories.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block text-[10px] text-charcoal hover:text-plum transition-colors py-1 uppercase tracking-wider"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Logo */}
            <div className="flex-1 lg:flex-none text-center">
              <Logo size="md" />
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-4 text-luxury-black">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:text-plum transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                href={isAuthenticated ? (isAdmin ? '/admin' : '/account') : '/login'}
                className="p-2 hover:text-plum transition-colors"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>

              <Link
                href="/account/wishlist"
                className="p-2 hover:text-plum transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-dusty-rose text-ivory text-[10px] font-semibold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button
                onClick={openCart}
                className="p-2 hover:text-plum transition-colors relative flex items-center space-x-1"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItemsCount > 0 && (
                  <span className="absolute top-1 right-1 w-4.5 h-4.5 rounded-full bg-plum text-ivory text-[10px] font-semibold flex items-center justify-center">
                    {totalItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar Overlay */}
        {searchOpen && (
          <div className="absolute top-full left-0 w-full bg-ivory border-b border-sand shadow-lg p-4 animate-fade-in">
            <div className="max-w-3xl mx-auto flex items-center space-x-3">
              <Search className="w-5 h-5 text-plum" />
              <input
                type="text"
                placeholder="Search Kurtis, Kurta Sets, SKU, Fabric..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
                className="flex-1 bg-transparent border-b border-sand py-2 px-1 text-sm text-luxury-black focus:outline-none focus:border-plum"
                autoFocus
              />
              <button
                onClick={() => {
                  if (searchQuery.trim()) {
                    window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
                className="px-4 py-2 bg-plum text-ivory text-xs uppercase tracking-widest"
              >
                Search
              </button>
              <button onClick={() => setSearchOpen(false)} className="p-2 text-charcoal">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div className="fixed inset-0 bg-luxury-black/60 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 max-w-full flex">
            <div className="w-screen max-w-xs bg-ivory text-luxury-black shadow-xl flex flex-col justify-between p-6 animate-fade-in border-r border-sand">
              <div>
                <div className="flex items-center justify-between border-b border-sand pb-4 mb-6">
                  <Logo size="sm" />
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-charcoal">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-luxury-black hover:text-plum py-2 border-b border-sand/40"
                    >
                      <span>{item.name}</span>
                      <ChevronRight className="w-4 h-4 text-dusty-rose" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t border-sand pt-6 text-[11px] text-charcoal/70">
                <p>© PREEBHA Lifestyle. Elegance, Redefined.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
