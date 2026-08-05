import SizeGuideModal from '@/components/ui/SizeGuideModal';

export default function StandaloneSizeGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-2 border-b border-sand pb-6">
        <span className="text-xs uppercase tracking-[0.3em] text-dusty-rose font-semibold">Fit & Sizing</span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-luxury-black uppercase tracking-wide">
          PREEBHA Size Guide
        </h1>
      </div>

      <div className="bg-ivory border border-sand p-8 rounded space-y-6 text-xs text-charcoal">
        <p className="font-light leading-relaxed">
          All PREEBHA garments are tailored according to standard Indian women body measurements. For relaxed silhouettes, choose your standard size. For layered or festive fits, refer to the detailed size chart below.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-luxury-black border border-sand">
            <thead className="bg-sand/60 text-plum font-serif-luxury text-sm uppercase">
              <tr>
                <th className="p-3">Size Tag</th>
                <th className="p-3">Bust (Inches)</th>
                <th className="p-3">Waist (Inches)</th>
                <th className="p-3">Hip (Inches)</th>
                <th className="p-3">Shoulder (Inches)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand">
              <tr><td className="p-3 font-semibold text-plum">XS</td><td className="p-3">32&quot;</td><td className="p-3">26&quot;</td><td className="p-3">36&quot;</td><td className="p-3">14&quot;</td></tr>
              <tr><td className="p-3 font-semibold text-plum">S</td><td className="p-3">34&quot;</td><td className="p-3">28&quot;</td><td className="p-3">38&quot;</td><td className="p-3">14.5&quot;</td></tr>
              <tr><td className="p-3 font-semibold text-plum">M</td><td className="p-3">36&quot;</td><td className="p-3">30&quot;</td><td className="p-3">40&quot;</td><td className="p-3">15&quot;</td></tr>
              <tr><td className="p-3 font-semibold text-plum">L</td><td className="p-3">38&quot;</td><td className="p-3">32&quot;</td><td className="p-3">42&quot;</td><td className="p-3">15.5&quot;</td></tr>
              <tr><td className="p-3 font-semibold text-plum">XL</td><td className="p-3">40&quot;</td><td className="p-3">34&quot;</td><td className="p-3">44&quot;</td><td className="p-3">16&quot;</td></tr>
              <tr><td className="p-3 font-semibold text-plum">XXL</td><td className="p-3">42&quot;</td><td className="p-3">36&quot;</td><td className="p-3">46&quot;</td><td className="p-3">16.5&quot;</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
