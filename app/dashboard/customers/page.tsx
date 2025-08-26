// app/dashboard/customers/page.tsx

import Table from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import { CustomersTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import Search from '@/app/ui/search';

// Mendefinisikan tipe props langsung di dalam argumen fungsi
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Customers
      </h1>
      <Search placeholder="Search customers..." />
      <Suspense fallback={<CustomersTableSkeleton />}>
        <Table query={query} />
      </Suspense>
    </div>
  );
}
