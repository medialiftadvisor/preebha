import { prisma } from '@/lib/prisma';
import { Users, Mail, Phone, Calendar } from 'lucide-react';

export const revalidate = 0;

export default async function AdminCustomersPage() {
  const users = await prisma.user.findMany({
    include: {
      orders: true,
      addresses: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-sand pb-6">
        <span className="text-xs uppercase tracking-[0.25em] text-plum font-semibold">CRM & Accounts</span>
        <h1 className="font-serif-luxury text-3xl text-luxury-black uppercase tracking-wide">
          Customer Database ({users.length})
        </h1>
      </div>

      <div className="bg-ivory border border-sand rounded shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-luxury-black">
            <thead className="bg-sand/60 uppercase font-serif-luxury text-xs text-plum">
              <tr>
                <th className="px-4 py-3">Customer Name</th>
                <th className="px-4 py-3">Email Address</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Total Orders</th>
                <th className="px-4 py-3">Addresses</th>
                <th className="px-4 py-3">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-sand/20 transition-colors">
                  <td className="px-4 py-3 font-semibold text-luxury-black">{u.name}</td>
                  <td className="px-4 py-3 text-charcoal">{u.email}</td>
                  <td className="px-4 py-3 font-mono">
                    <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase rounded ${
                      u.role === 'SUPER_ADMIN' ? 'bg-plum text-ivory' : 'bg-sand text-charcoal'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-bold text-plum">{u.orders.length} Orders</td>
                  <td className="px-4 py-3">{u.addresses.length} Saved</td>
                  <td className="px-4 py-3 text-neutral-500">{new Date(u.createdAt).toLocaleDateString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
