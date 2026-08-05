import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <span className="text-xs uppercase tracking-[0.3em] text-plum font-semibold block">404 Error</span>
      <h1 className="font-serif-luxury text-4xl sm:text-5xl text-luxury-black uppercase tracking-wide">
        Page Not Found
      </h1>
      <p className="text-xs text-charcoal/70 max-w-sm mx-auto font-light leading-relaxed">
        The boutique page or collection you are looking for may have been moved or updated.
      </p>
      <div>
        <Link
          href="/"
          className="px-8 py-3.5 bg-plum text-ivory text-xs uppercase tracking-widest font-medium hover:bg-luxury-black transition-colors inline-block shadow-md"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
