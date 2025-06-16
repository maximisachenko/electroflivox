import { useSearchParams } from 'next/navigation';
import React from 'react';
import { useSet } from 'react-use';

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  manufacturer: string;
}

export interface Filters {
  selectedManufacturer: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
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

  /* Фильтр цены */
  const [prices, setPrice] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    selectedManufacturer,
    prices,
    setPrices: updatePrice,
    setSelectedManufacturer: toggleManufacturer,
  };
};
