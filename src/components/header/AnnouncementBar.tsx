'use client';

import { useState } from 'react';
import { Sparkles, X } from 'lucide-react';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-plum text-ivory text-xs font-light tracking-widest py-2.5 px-4 text-center relative flex items-center justify-center border-b border-rose-dust/20">
      <div className="flex items-center space-x-2 animate-fade-in">
        <Sparkles className="w-3.5 h-3.5 text-blush animate-pulse" />
        <span className="uppercase">
          Complimentary Pan-India Shipping on Orders Above ₹2,999 | New Festive Collection Live
        </span>
        <Sparkles className="w-3.5 h-3.5 text-blush animate-pulse hidden sm:inline" />
      </div>

      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 text-blush/80 hover:text-ivory transition-colors p-1"
        aria-label="Close announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
