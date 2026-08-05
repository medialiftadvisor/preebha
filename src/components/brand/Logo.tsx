import Link from 'next/link';

interface LogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ variant = 'dark', size = 'md' }: LogoProps) {
  const isLight = variant === 'light';

  const sizeClasses = {
    sm: 'text-lg tracking-[0.25em]',
    md: 'text-2xl tracking-[0.3em]',
    lg: 'text-4xl tracking-[0.35em]',
  };

  const subSizeClasses = {
    sm: 'text-[9px] tracking-[0.35em]',
    md: 'text-[11px] tracking-[0.4em]',
    lg: 'text-[13px] tracking-[0.45em]',
  };

  return (
    <Link href="/" className="inline-flex flex-col items-center group select-none transition-opacity hover:opacity-90">
      <span
        className={`font-serif-luxury font-medium uppercase ${sizeClasses[size]} ${
          isLight ? 'text-ivory' : 'text-luxury-black'
        } leading-none`}
      >
        PREEBHA
      </span>
      <span
        className={`uppercase font-light mt-1 ${subSizeClasses[size]} ${
          isLight ? 'text-blush' : 'text-plum'
        } opacity-90`}
      >
        LIFESTYLE
      </span>
    </Link>
  );
}
