import { useRouter, useSearchParams } from 'next/navigation';
import { useSet } from 'react-use';
import React from 'react';

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  guarantees: string;
  manufacturer: string;
}

export interface Filters {
  selectedManufacturer: Set<string>;
  guarantees: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setGuarantees: (value: string) => void;
  setSelectedManufacturer: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  /* Фильтр услуг */
  const [selectedManufacturer, { toggle: toggleManufacturer }] = useSet(
    new Set<string>(searchParams.get('manufacturer')?.split(',') ?? [])
  );
  /* Фильтр гарантий */
  const [guarantees, { toggle: toggleGuarantees }] = useSet(
    new Set<string>(
      searchParams.has('guarantees')
        ? (searchParams.get('guarantees')?.split(',') ?? [])
        : []
    )
  );
  /* Фильтр цены */
  const [prices, setPrice] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  /*
  Фильтр по наличию
  const [available, setAvailable] = React.useState(
    searchParams.has('available')
      ? searchParams.get('available') === 'true'
      : false
  );

  Фильтр по новизне
  const [isNew, setIsNew] = React.useState(
    searchParams.has('isNew') ? searchParams.get('isNew') === 'true' : false
  );
*/

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    guarantees,
    selectedManufacturer,
    prices,
    setPrices: updatePrice,
    setGuarantees: toggleGuarantees,
    setSelectedManufacturer: toggleManufacturer,
  };
};
