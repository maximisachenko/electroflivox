'use client';

import { ProductWithColor } from '@/@types/prisma';
import { cn } from '@/shared/lib/utils';
import { useCartStore } from '@/shared/store';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-hot-toast';
import { ChooseProductWithColorForm } from './choose-product-with-color-form';
import { ChooseProductForm } from './choose-product-form';

interface Props {
  product: ProductWithColor;
  className?: string;
}

export const ProductForm: React.FC<Props> = ({ className, product }) => {
  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);

  const availableColors = product.variations.map((color, index) => ({
    index: index,
    value: color.color,
  }));

  const firstItem = product.variations[0];
  const router = useRouter();
  const isProductWithColor = Boolean(firstItem.color);

  const onAddProduct = (productItemId: number, services: number[]) => {
    try {
      addCartItem({
        variationId: productItemId,
        services,
      });
      toast.success(`${product.name} успешно добавлен в корзину`);
      router.back();
    } catch (err) {
      toast.error('Не удалось добавить товар в корзину');
      console.error(err);
    }
  };

  if (isProductWithColor) {
    return (
      <ChooseProductWithColorForm
        imageUrl={product.imageUrl}
        guarantee={product.guarantee}
        name={product.name}
        variations={product.variations}
        services={product.services}
        availableColors={availableColors}
        onSubmit={onAddProduct}
        currentVariationId={firstItem.id}
        loading={loading}
      />
    );
  } else {
    return (
      <ChooseProductForm
        imageUrl={product.imageUrl}
        name={product.name}
        services={product.services}
        loading={loading}
      />
    );
  }
};
