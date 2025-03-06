import React from 'react';
import { Filters } from './use-filters';
import qs from 'qs';
import { useRouter } from 'next/navigation';

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();
  const prevQueryRef = React.useRef<string>('');

  React.useEffect(() => {
    const params: Record<string, any> = {
      ...filters.prices,
      guarantees: Array.from(filters.guarantees || []),
      manufacturer: Array.from(filters.selectedManufacturer || []),
    };

    const query = qs.stringify(params, {
      arrayFormat: 'comma',
      skipNulls: true,
    });

    if (query !== prevQueryRef.current) {
      prevQueryRef.current = query;
      router.replace(`?${query}`, { scroll: false });
      console.log('Updated query:', query);
    }
  }, [filters, router]);
};
