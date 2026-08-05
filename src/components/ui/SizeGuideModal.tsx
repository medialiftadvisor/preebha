'use client';

import { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<'INCH' | 'CM'>('INCH');

  if (!isOpen) return null;

  const measurementsInch = [
    { size: 'XS', bust: '32 - 33', waist: '26 - 27', hip: '35 - 36', length: '46' },
    { size: 'S', bust: '34 - 35', waist: '28 - 29', hip: '37 - 38', length: '46' },
    { size: 'M', bust: '36 - 37', waist: '30 - 31', hip: '39 - 40', length: '46' },
    { size: 'L', bust: '38 - 40', waist: '32 - 34', hip: '41 - 43', length: '47' },
    { size: 'XL', bust: '41 - 43', waist: '35 - 37', hip: '44 - 46', length: '47' },
    { size: 'XXL', bust: '44 - 46', waist: '38 - 40', hip: '47 - 49', length: '48' },
  ];

  const measurementsCm = [
    { size: 'XS', bust: '81 - 84', waist: '66 - 69', hip: '89 - 91', length: '117' },
    { size: 'S', bust: '86 - 89', waist: '71 - 74', hip: '94 - 97', length: '117' },
    { size: 'M', bust: '91 - 94', waist: '76 - 79', hip: '99 - 102', length: '117' },
    { size: 'L', bust: '97 - 102', waist: '81 - 86', hip: '104 - 109', length: '119' },
    { size: 'XL', bust: '104 - 109', waist: '89 - 94', hip: '112 - 117', length: '119' },
    { size: 'XXL', bust: '112 - 117', waist: '97 - 102', hip: '119 - 124', length: '122' },
  ];

  const data = unit === 'INCH' ? measurementsInch : measurementsCm;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-luxury-black/60 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-ivory text-luxury-black rounded border border-sand shadow-2xl p-6 z-10 animate-fade-in space-y-6">
        <div className="flex justify-between items-center border-b border-sand pb-4">
          <div className="flex items-center space-x-2">
            <Ruler className="w-5 h-5 text-plum" />
            <h3 className="font-serif-luxury text-xl text-luxury-black uppercase tracking-wide">
              PREEBHA Size Guide
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-charcoal/70 hover:text-luxury-black">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Toggle */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-charcoal/80 font-light">Garment Body Measurements:</span>
          <div className="inline-flex border border-sand rounded overflow-hidden text-xs">
            <button
              onClick={() => setUnit('INCH')}
              className={`px-3 py-1 font-semibold uppercase ${
                unit === 'INCH' ? 'bg-plum text-ivory' : 'bg-ivory text-charcoal hover:bg-sand/30'
              }`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit('CM')}
              className={`px-3 py-1 font-semibold uppercase ${
                unit === 'CM' ? 'bg-plum text-ivory' : 'bg-ivory text-charcoal hover:bg-sand/30'
              }`}
            >
              CM
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="border border-sand rounded overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-sand/60 text-plum font-serif-luxury uppercase">
              <tr>
                <th className="p-2.5">Size</th>
                <th className="p-2.5">Bust ({unit === 'INCH' ? 'in' : 'cm'})</th>
                <th className="p-2.5">Waist ({unit === 'INCH' ? 'in' : 'cm'})</th>
                <th className="p-2.5">Hip ({unit === 'INCH' ? 'in' : 'cm'})</th>
                <th className="p-2.5">Length ({unit === 'INCH' ? 'in' : 'cm'})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand">
              {data.map((row) => (
                <tr key={row.size} className="hover:bg-sand/20">
                  <td className="p-2.5 font-bold text-plum">{row.size}</td>
                  <td className="p-2.5">{row.bust}</td>
                  <td className="p-2.5">{row.waist}</td>
                  <td className="p-2.5">{row.hip}</td>
                  <td className="p-2.5">{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[11px] text-charcoal/70 font-light italic text-center">
          Note: If you fall between sizes, we recommend choosing the larger size for standard Indian straight fits.
        </p>
      </div>
    </div>
  );
}
