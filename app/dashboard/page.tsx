import { Suspense } from 'react';
import { fetchCardData, fetchLatestInvoices, fetchRevenue } from '@/app/lib/data';
import { CardSkeleton, RevenueChartSkeleton, LatestInvoicesSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';

export default async function Page() {
  // Menggunakan Promise.all untuk mengambil semua data secara paralel.
  const [revenue, latestInvoices, cardData] = await Promise.all([
    fetchRevenue(),
    fetchLatestInvoices(),
    fetchCardData(),
  ]);

  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Menggunakan Suspense dengan CardWrapper */}
        <Suspense fallback={<CardSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* Meneruskan data revenue yang sudah selesai diambil sebagai props */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart revenue={revenue} />
        </Suspense>
        {/* Meneruskan data latestInvoices yang sudah selesai diambil sebagai props */}
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices latestInvoices={latestInvoices} />
        </Suspense>
      </div>
    </main>
  );
}