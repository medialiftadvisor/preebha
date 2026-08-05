import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { ToastProvider } from '@/components/ui/ToastProvider';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PREEBHA Lifestyle | Elegance, Redefined. Premium Women’s Ethnic Wear & Boutique Fashion',
  description:
    'Discover PREEBHA Lifestyle — a modern Indian premium women’s fashion and lifestyle brand combining elegance, femininity, quality craftsmanship and contemporary ethnic designs.',
  keywords: [
    'PREEBHA Lifestyle',
    'Premium Women Ethnic Wear',
    'Kurta Sets',
    'Chanderi Silk Kurtis',
    'Co-ord Sets',
    'Festive Ethnic Dresses',
    'Quiet Luxury Fashion India',
  ],
  authors: [{ name: 'PREEBHA Lifestyle' }],
  openGraph: {
    title: 'PREEBHA Lifestyle | Elegance, Redefined.',
    description: 'Modern Indian premium women fashion combining elegance and craftsmanship.',
    siteName: 'PREEBHA Lifestyle',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="antialiased bg-ivory text-luxury-black min-h-screen flex flex-col selection:bg-blush selection:text-plum">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <ToastProvider>
                <Header />
                <main className="flex-1">{children}</main>
                <CartDrawer />
                <Footer />
              </ToastProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
