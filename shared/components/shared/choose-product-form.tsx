import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui/button';
import { ProductImage } from './product-image';

interface Props {
  imageUrl: string;
  name: string;
  services: any[];
  loading: boolean;
  onClickAdd?: VoidFunction;
  className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({
  name,
  imageUrl,
  services,
  onClickAdd,
  loading,
  className,
}) => {
  const textDetails = '30 sm, top testo, 590g';
  const totalPrice = 100;
  const size = 30;

  return (
    <div className={cn(className, 'flex flex-1')}>
      <ProductImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>
        <Button
          loading={loading}
          onClick={onClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
