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
          'p-0 w-[1060px] max-w-[1060px] h-[700px] max-h-[700px] bg-white overflow-hidden'
        )}
      >
        <ProductForm product={product} />
      </DialogContent>
    </Dialog>
  );
};
