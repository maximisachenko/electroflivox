'use client';

import * as React from 'react';
import { Title } from './title';
import { cn } from '@/shared/lib/utils';
import { useIntersection } from 'react-use';
import { ProductCard } from './product-card';
import { useCategoryState } from '@/shared/store/category';
import { Product } from '@prisma/client';
import { ProductWithColor } from '@/@types/prisma';

interface Props {
  title: string;
  items: ProductWithColor[];
  className?: string;
  listClassName?: string;
  categoryId: number;
}

export const ProductsList: React.FC<Props> = ({
  title,
  items,
  listClassName,
  categoryId,
  className,
}) => {
  const setActiveCategoryId = useCategoryState((state) => state.setActiveId);
  const intersectionRef = React.useRef<HTMLDivElement | null>(null);
  const intersection = useIntersection(
    intersectionRef as React.RefObject<HTMLElement>,
    {
      threshold: 0.4,
    }
  );

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title
        text={title}
        size="lg"
        className="font-extrabold mb-5 text-fontColor px-2 sm:px-0"
      />
      <div className={cn('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-10', listClassName)}>
        {items.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.variations?.[0]?.price ?? 'Нет цены'} // Берём цену первой вариации
            manufacturer={product.manufacturer}
            guarantee={product.guarantee}
            description={product.description}
            services={product.services}
          />
        ))}
      </div>
    </div>
  );
};
