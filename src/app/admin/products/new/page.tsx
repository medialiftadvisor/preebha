'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Plus } from 'lucide-react';

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [description, setDescription] = useState('');
  const [mrp, setMrp] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [fabric, setFabric] = useState('Chanderi Silk');
  const [categorySlug, setCategorySlug] = useState('kurta-sets');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !sku || !sellingPrice || !mrp) return;

    setLoading(true);

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          sku,
          description,
          mrp: parseFloat(mrp),
          sellingPrice: parseFloat(sellingPrice),
          fabric,
          categorySlug,
          imageUrl,
        }),
      });

      const data = await res.json();
      if (data.success) {
        router.push('/admin/products');
      } else {
        alert(data.error || 'Failed to create product.');
      }
    } catch (e) {
      alert('Server error creating product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center space-x-3 border-b border-sand pb-4">
        <Link href="/admin/products" className="p-2 text-charcoal hover:text-plum">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-plum font-semibold">Admin Panel</span>
          <h1 className="font-serif-luxury text-3xl text-luxury-black uppercase tracking-wide">
            Add New Boutique Product
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-sand/30 p-8 rounded border border-sand space-y-6 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
              Product Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Royal Indigo Zari Embroidered Silk Kurta Set"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
              SKU Code *
            </label>
            <input
              type="text"
              required
              placeholder="PRB-KS-099"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum uppercase"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
              Category
            </label>
            <select
              value={categorySlug}
              onChange={(e) => setCategorySlug(e.target.value)}
              className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum uppercase"
            >
              <option value="kurta-sets">Kurta Sets</option>
              <option value="kurtis">Kurtis</option>
              <option value="co-ord-sets">Co-ord Sets</option>
              <option value="dresses">Dresses</option>
              <option value="ethnic-wear">Ethnic Wear</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
              MRP (Original Price ₹) *
            </label>
            <input
              type="number"
              required
              placeholder="6999"
              value={mrp}
              onChange={(e) => setMrp(e.target.value)}
              className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
              Selling Price (₹) *
            </label>
            <input
              type="number"
              required
              placeholder="4999"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
              Fabric & Material Description
            </label>
            <input
              type="text"
              placeholder="Pure Chanderi Silk & Scalloped Organza"
              value={fabric}
              onChange={(e) => setFabric(e.target.value)}
              className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
              Product Description
            </label>
            <textarea
              rows={4}
              placeholder="Detailed editorial description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
              Primary Image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-plum text-ivory text-xs uppercase tracking-widest font-medium hover:bg-luxury-black transition-colors shadow-md"
        >
          {loading ? 'Creating Product...' : 'SAVE & PUBLISH PRODUCT'}
        </button>
      </form>
    </div>
  );
}
