'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { FilterCheckbox } from './filter-checkbox';
import { Title } from './title';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useRouter } from 'next/navigation';
import { useQueryFilters, useFilters, useServices } from '@/shared/hooks';

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const filters = useFilters();

  useQueryFilters(filters);
  const updatePrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0]);
    filters.setPrices('priceTo', prices[1]);
  };

  return (
    <div className={cn('', className)}>
      <Title
        text="Фильтрация"
        size="sm"
        className="mb-[30px] text-fontColor font-bold"
      />

      {/* Верхние CheckBox`s 
      <div className="flex flex-col gap-4">
        <FilterCheckbox
          name="available"
          text="В наличии"
          value="1"
          checked={filters.available}
          onCheckedChange={() => filters.setAvailable(!filters.available)}
        />
        <FilterCheckbox
          name="isNew"
          text="Новинки"
          value="2"
          checked={filters.isNew}
          onCheckedChange={() => filters.setIsNew(!filters.isNew)}
        />
      </div>*/}

      {/* Фильтрация цены (от и до) */}
      <div className="mb-[30px]">
        <Title
          text="Цена"
          className="mb-[30px] text-lg text-fontColor font-bold"
        />
        <RangeSlider
          min={0}
          max={10000}
          step={1}
          value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 10000]}
          onValueChange={updatePrices}
          className="mb-[60px]"
        />
      </div>

      <CheckboxFiltersGroup
        title="Производители"
        name="manufacturer"
        limit={6}
        className="mt-4"
        defaultItems={[
          { text: 'Apple', value: 'Apple' },
          { text: 'LG', value: 'LG' },
          { text: 'Asus', value: 'Asus' },
          { text: 'Gaming PC', value: 'Gaming PC' },
          { text: 'JBL', value: 'JBL' },
          { text: 'ACER', value: 'ACER' },
        ]}
        items={[
          { text: 'Apple', value: 'Apple' },
          { text: 'LG', value: 'LG' },
          { text: 'Asus', value: 'Asus' },
          { text: 'Gaming PC', value: 'Gaming PC' },
          { text: 'JBL', value: 'JBL' },
          { text: 'ACER', value: 'ACER' },
          { text: 'Xiaomi', value: 'Xiaomi' },
        ]}
        onClickCheckboxAction={filters.setSelectedManufacturer}
        selected={filters.selectedManufacturer}
      />
    </div>
  );
};
