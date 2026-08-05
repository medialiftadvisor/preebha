'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <span className="text-xs uppercase tracking-[0.3em] text-rose-700 font-semibold block">500 Application Error</span>
      <h1 className="font-serif-luxury text-4xl text-luxury-black uppercase tracking-wide">
        Something Went Wrong
      </h1>
      <p className="text-xs text-charcoal/70 max-w-sm mx-auto font-light">
        We encountered a temporary server error. Please try refreshing the page.
      </p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-plum text-ivory text-xs uppercase tracking-widest font-medium hover:bg-luxury-black transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-6 py-3 border border-luxury-black text-luxury-black text-xs uppercase tracking-widest font-medium hover:bg-luxury-black hover:text-ivory transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
