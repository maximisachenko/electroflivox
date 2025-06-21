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

  return (
    <div className={cn(className, 'flex flex-col lg:flex-row flex-1 gap-4 lg:gap-8')}>
      {/* Изображение товара */}
      <div className="w-full lg:w-auto order-1 lg:order-1">
        <ProductImage
          imageUrl={imageUrl}
          className="w-full max-w-md mx-auto lg:mx-0"
        />
      </div>

      {/* Информация о товаре */}
      <div className="w-full lg:w-[490px] bg-[#f7f6f5] p-4 lg:p-7 flex flex-col order-2 lg:order-2">
        <Title text={name} size="md" className="font-extrabold mb-2 lg:mb-1 text-lg lg:text-xl" />
        <p className="text-gray-400 text-sm lg:text-base mb-6 lg:mb-4">{textDetails}</p>

        <Button
          loading={loading}
          onClick={onClickAdd}
          className="h-12 lg:h-[55px] px-6 lg:px-10 text-sm lg:text-base rounded-[18px] w-full mt-auto"
        >
          Добавить в корзину за {totalPrice} BYN
        </Button>
      </div>
    </div>
  );
};
