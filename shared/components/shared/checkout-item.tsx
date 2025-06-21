'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import * as CartItemDetails from './cart-item-details';
import { CountButtonProps } from './count-button';
import { Button } from '../ui/button';

interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  className,
  imageUrl,
  disabled,
  details,
  quantity,
  onClickCountButton,
  onClickRemove,
}) => {
  return (
    <div
      className={cn(
        className,
        'bg-white p-4 lg:p-5 rounded-lg border border-gray-100',
        // Мобильный layout - вертикальный
        'flex flex-col gap-3',
        // Десктопный layout - горизонтальный
        'lg:flex-row lg:items-center lg:justify-between lg:gap-6',
        { 'opacity-50 pointer-events-none': disabled }
      )}
    >
      {/* Основная информация о товаре */}
      <div className="flex items-center gap-3 lg:gap-5 flex-1">
        <CartItemDetails.Image src={imageUrl} />
        <div className="flex-1 min-w-0">
          <CartItemDetails.Info name={name} details={details} />
        </div>
      </div>

      {/* Мобильная версия - управление и цена в одном ряду */}
      <div className="flex items-center justify-between lg:hidden">
        <CartItemDetails.Price value={price} />
        <div className="flex items-center gap-3">
          <CartItemDetails.CountButton
            onClick={onClickCountButton}
            value={quantity}
          />
          <Button
            type="button"
            onClick={onClickRemove}
            variant="ghost"
            size="sm"
            className="p-1 h-8 w-8"
          >
            <X className="text-gray-400 hover:text-red-500" size={16} />
          </Button>
        </div>
      </div>

      {/* Десктопная версия - цена отдельно */}
      <div className="hidden lg:block">
        <CartItemDetails.Price value={price} />
      </div>

      {/* Десктопная версия - управление отдельно */}
      <div className="hidden lg:flex items-center gap-5">
        <CartItemDetails.CountButton
          onClick={onClickCountButton}
          value={quantity}
        />
        <Button
          type="button"
          onClick={onClickRemove}
          variant="ghost"
          size="sm"
          className="p-2 h-9 w-9"
        >
          <X className="text-gray-400 hover:text-red-500" size={18} />
        </Button>
      </div>
    </div>
  );
};
