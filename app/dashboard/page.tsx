import { Suspense } from 'react';
import { fetchCardData, fetchLatestInvoices, fetchRevenue } from '@/app/lib/data';
import { CardSkeleton, RevenueChartSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';

export default async function Page() {
  const revenue = await fetchRevenue(); // Ambil data pendapatan
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData(); // Ambil data kartu

  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* <CardWrapper /> Komponen CardWrapper belum mengambil data, akan dibahas di Chapter 8 */}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}