import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Package, MapPin, Truck, ArrowRight, Printer } from 'lucide-react';

export const revalidate = 0;

interface OrderSuccessPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderSuccessPage({ params }: OrderSuccessPageProps) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!order) {
    return notFound();
  }

  const shippingAddress = JSON.parse(order.shippingAddressJson || '{}');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      {/* Confirmation Success Header */}
      <div className="text-center space-y-4 bg-blush/20 p-8 sm:p-12 rounded border border-blush">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs uppercase tracking-[0.3em] text-plum font-semibold">PREEBHA Order Confirmed</span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-luxury-black uppercase tracking-wide">
          Thank You For Your Order!
        </h1>
        <p className="text-xs text-charcoal/80 max-w-md mx-auto">
          Order <strong>#{order.orderNumber}</strong> has been successfully placed and is now being handcrafted and prepared for express dispatch.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-sand/30 p-6 rounded border border-sand space-y-6 text-xs text-charcoal">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-sand text-left">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-neutral-500 block">Order Number</span>
            <strong className="text-sm font-serif-luxury text-luxury-black">{order.orderNumber}</strong>
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-neutral-500 block">Date</span>
            <strong className="text-sm text-luxury-black">{new Date(order.createdAt).toLocaleDateString('en-IN')}</strong>
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-neutral-500 block">Payment Method</span>
            <strong className="text-sm text-plum uppercase">{order.paymentMethod}</strong>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="space-y-4">
          <h3 className="font-serif-luxury text-base uppercase tracking-wider text-luxury-black">Items Ordered</h3>
          <div className="divide-y divide-sand">
            {order.items.map((item) => (
              <div key={item.id} className="py-3 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-16 bg-sand rounded overflow-hidden shrink-0">
                    <img src={item.productImage} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury text-sm text-luxury-black">{item.productName}</h4>
                    <p className="text-[11px] text-charcoal/70">Qty: {item.quantity} | Size: {item.size} | Color: {item.color}</p>
                  </div>
                </div>
                <span className="font-semibold text-plum">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total Summary */}
        <div className="border-t border-sand pt-4 space-y-1.5 text-right">
          <p>Grand Total Paid: <strong className="text-sm text-plum">₹{order.grandTotal.toLocaleString('en-IN')}</strong></p>
          <p className="text-[11px] text-emerald-800 font-medium">Status: CONFIRMED — Express Dispatch Pending</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href={`/track-order?orderNumber=${order.orderNumber}`}
          className="w-full sm:w-auto px-8 py-3.5 bg-plum text-ivory text-xs uppercase tracking-widest font-medium hover:bg-luxury-black transition-colors text-center"
        >
          Track Shipment Live
        </Link>

        <Link
          href="/shop"
          className="w-full sm:w-auto px-8 py-3.5 border border-luxury-black text-luxury-black text-xs uppercase tracking-widest font-medium hover:bg-luxury-black hover:text-ivory transition-colors text-center"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
