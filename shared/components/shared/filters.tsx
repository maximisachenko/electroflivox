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

      <CheckboxFiltersGroup
        title="Гарантия"
        name="guarantees"
        className="mb-[30px] mt-[30px]"
        onClickCheckboxAction={filters.setGuarantees}
        selected={filters.guarantees}
        items={[
          { text: 'Гарантия 1 год', value: '1' },
          { text: 'Гарантия 2 года', value: '2' },
          { text: 'Гарантия 5 лет', value: '5' },
          { text: 'Гарантия 10 лет', value: '10' },
        ]}
      />

      {/* Фильтрация цены (от и до) */}

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <Title
          text="Цена от и до"
          size="xs"
          className="text-fontColor font-bold"
        />
        <div className="inline-flex gap-4 mt-4 mb-6">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(filters.prices.priceFrom)}
            onChange={(e) =>
              filters.setPrices('priceFrom', Number(e.target.value))
            }
          />
          <Input
            type="number"
            placeholder="1000"
            min={100}
            max={1000}
            value={String(filters.prices.priceTo)}
            onChange={(e) =>
              filters.setPrices('priceTo', Number(e.target.value))
            }
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[
            filters.prices.priceFrom || 0,
            filters.prices.priceTo || 1000,
          ]}
          onValueChange={updatePrices}
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
