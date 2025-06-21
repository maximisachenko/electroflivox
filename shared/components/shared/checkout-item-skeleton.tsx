import { cn } from '@/shared/lib/utils';
import React from 'react';

interface Props {
  className?: string;
}

export const CheckoutItemSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn(
      'bg-white p-4 lg:p-5 rounded-lg border border-gray-100',
      // Мобильный layout - вертикальный
      'flex flex-col gap-3',
      // Десктопный layout - горизонтальный
      'lg:flex-row lg:items-center lg:justify-between lg:gap-6',
      className
    )}>
      {/* Основная информация */}
      <div className="flex items-center gap-3 lg:gap-5 flex-1">
        <div className="w-12 h-12 lg:w-[50px] lg:h-[50px] bg-gray-200 rounded-lg animate-pulse flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 lg:h-5 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-3 lg:h-4 bg-gray-200 rounded animate-pulse w-1/2" />
        </div>
      </div>

      {/* Мобильная версия - управление и цена */}
      <div className="flex items-center justify-between lg:hidden">
        <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
        <div className="flex items-center gap-3">
          <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Десктопная версия - цена */}
      <div className="hidden lg:block">
        <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Десктопная версия - управление */}
      <div className="hidden lg:flex items-center gap-5">
        <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
        <div className="h-9 w-9 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
};
