'use client';

import { cn } from '@/shared/lib/utils';
import { useCategoryState } from '@/shared/store/category';
import React, { useCallback, useEffect } from 'react';
import { Category } from '@prisma/client';

interface Props {
  items: Category[];
  className?: string;
}

export const Categories: React.FC<Props> = ({ items, className }) => {
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
    <div
      className={cn(
        'relative inline-flex gap-1 bg-categoriesBackground p-1 rounded-2xl',
        className
      )}
    >
      {/* Фон активной категории */}
      <div
        className="absolute bg-white rounded-2xl shadow-md shadow-gray-200 h-11"
      />

      {/* Список категорий */}
      {items.map(({ name, id }) => (
        <a
          className={cn(
            'relative flex items-center justify-center font-bold h-11 rounded-2xl px-5 z-10 flex-1', // flex-1 для равномерного распределения
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
  );
};
