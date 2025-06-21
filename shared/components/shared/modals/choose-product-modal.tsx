'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ProductWithColor } from '@/@types/prisma';
import { ProductForm } from '../product-form';

interface Props {
  product: ProductWithColor;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogTitle />
      <DialogContent
        className={cn(
          className,
          'p-0 bg-white overflow-hidden',
          // Мобильные устройства - почти полный экран
          'w-[95vw] max-w-[95vw] h-[90vh] max-h-[90vh]',
          // Планшеты - немного больше отступов
          'sm:w-[90vw] sm:max-w-[90vw] sm:h-[85vh] sm:max-h-[85vh]',
          // Маленькие десктопы - фиксированные размеры
          'md:w-[800px] md:max-w-[800px] md:h-[600px] md:max-h-[600px]',
          // Большие десктопы - оригинальные размеры
          'lg:w-[1060px] lg:max-w-[1060px] lg:h-[700px] lg:max-h-[700px]'
        )}
      >
        <div className="h-full overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            <ProductForm product={product} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
