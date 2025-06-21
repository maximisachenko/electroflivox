'use client';

import { cn } from '@/shared/lib/utils';
import { useCategoryState } from '@/shared/store/category';
import React, { useCallback, useEffect } from 'react';
import { Category } from '@prisma/client';
import { Button } from '../ui/button';
import { Grid3X3, Check } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';

interface Props {
  items: Category[];
  className?: string;
}

// Компонент содержимого категорий для десктопа
const CategoriesContent: React.FC<Props> = ({ items, className }) => {
  const categoryActiveId = useCategoryState((state) => state.activeId);
  const setCategoryActiveId = useCategoryState((state) => state.setActiveId);

  const handleCategoryClick = useCallback(
    (id: number, name: string) => {
      setCategoryActiveId(id);

      const element = document.getElementById(name);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    },
    [setCategoryActiveId]
  );

  const handleScroll = () => {
    const threshold = 200; // Пороговое значение, когда считаем, что категория видна
    let foundCategoryId = null;

    // Прокручиваем элементы и ищем первый видимый
    items.forEach(({ name, id }) => {
      const element = document.getElementById(name);
      if (element && element.getBoundingClientRect().top <= threshold) {
        foundCategoryId = id;
      }
    });

    if (foundCategoryId && foundCategoryId !== categoryActiveId) {
      setCategoryActiveId(foundCategoryId); // Обновляем активную категорию при скролле
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [categoryActiveId, items]);

  return (
    <div className="w-full overflow-x-auto scrollbar-hide pb-1">
      <div
        className={cn(
          'relative inline-flex gap-1 bg-categoriesBackground p-1 rounded-2xl w-max',
          className
        )}
      >
        {/* Фон активной категории */}
        <div
          className="absolute bg-white rounded-2xl shadow-md shadow-gray-200 h-9 lg:h-11"
        />

        {/* Список категорий */}
        {items.map(({ name, id }) => (
          <a
            className={cn(
              'relative flex items-center justify-center font-bold h-9 lg:h-11 rounded-2xl px-4 lg:px-6 z-10 whitespace-nowrap text-sm lg:text-base min-w-fit',
              categoryActiveId === id && 'text-primary'
            )}
            key={id}
            onClick={(e) => {
              e.preventDefault(); // Отменяем стандартное поведение ссылки
              handleCategoryClick(id, name); // Прокручиваем к элементу
            }}
          >
            <button>{name}</button>
          </a>
        ))}
      </div>
    </div>
  );
};

// Кнопка категорий для мобильных
const MobileCategoriesButton: React.FC<Props> = ({ items }) => {
  const categoryActiveId = useCategoryState((state) => state.activeId);
  const setCategoryActiveId = useCategoryState((state) => state.setActiveId);

  const activeCategory = items.find(item => item.id === categoryActiveId);

  const handleCategoryClick = useCallback(
    (id: number, name: string) => {
      setCategoryActiveId(id);

      const element = document.getElementById(name);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    },
    [setCategoryActiveId]
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 min-w-[160px] justify-start"
        >
          <Grid3X3 className="w-4 h-4" />
          <span className="truncate">
            {activeCategory ? activeCategory.name : 'Все категории'}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
        <SheetHeader className="pb-6">
          <SheetTitle className="text-left flex items-center gap-2">
            <Grid3X3 className="w-5 h-5" />
            Выберите категорию
          </SheetTitle>
        </SheetHeader>

        <div className="grid grid-cols-1 gap-2">
          {items.map(({ name, id }) => (
            <SheetClose key={id} asChild>
              <button
                className={cn(
                  'flex items-center justify-between p-4 rounded-lg text-left hover:bg-gray-50 transition-colors',
                  categoryActiveId === id && 'bg-primary/10 border border-primary/20'
                )}
                onClick={() => handleCategoryClick(id, name)}
              >
                <span className={cn(
                  'font-medium',
                  categoryActiveId === id && 'text-primary'
                )}>
                  {name}
                </span>
                {categoryActiveId === id && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </button>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export const Categories: React.FC<Props> = ({ items, className }) => {
  return (
    <>
      {/* Десктопная версия - горизонтальная прокрутка */}
      <div className="hidden lg:block w-full">
        <CategoriesContent items={items} className={className} />
      </div>

      {/* Мобильная версия - кнопка с модальным окном */}
      <div className="lg:hidden w-full flex justify-start">
        <MobileCategoriesButton items={items} />
      </div>
    </>
  );
};
