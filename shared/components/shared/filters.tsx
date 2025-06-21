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
import { Button } from '../ui/button';
import { Filter, SlidersHorizontal } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';

interface Props {
  className?: string;
}

// Компонент с содержимым фильтров
const FiltersContent: React.FC<{ className?: string }> = ({ className }) => {
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
        className="mb-6 lg:mb-[30px] text-fontColor font-bold"
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
      <div className="mb-6 lg:mb-[30px]">
        <Title
          text="Цена"
          className="mb-4 lg:mb-[30px] text-base lg:text-lg text-fontColor font-bold"
        />
        <RangeSlider
          min={0}
          max={10000}
          step={1}
          value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 10000]}
          onValueChange={updatePrices}
          className="mb-8 lg:mb-[60px]"
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

// Кнопка фильтров для мобильных
export const MobileFiltersButton: React.FC = () => {
  const filters = useFilters();

  // Подсчитываем количество активных фильтров
  const activeFiltersCount = React.useMemo(() => {
    let count = 0;
    if (filters.prices.priceFrom && filters.prices.priceFrom > 0) count++;
    if (filters.prices.priceTo && filters.prices.priceTo < 10000) count++;
    if (filters.selectedManufacturer && filters.selectedManufacturer.size > 0) {
      count += filters.selectedManufacturer.size;
    }
    return count;
  }, [filters.prices, filters.selectedManufacturer]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 relative"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Фильтры
          {activeFiltersCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="pb-6">
          <SheetTitle className="text-left flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5" />
            Фильтры
          </SheetTitle>
        </SheetHeader>

        <FiltersContent />

        <div className="sticky bottom-0 bg-white pt-4 mt-6 border-t">
          <SheetClose asChild>
            <Button className="w-full">
              Применить фильтры
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <>
      {/* Десктопная версия */}
      <div className="hidden lg:block">
        <FiltersContent className={className} />
      </div>

      {/* Мобильная версия - только кнопка */}
      <div className="lg:hidden">
        <MobileFiltersButton />
      </div>
    </>
  );
};
