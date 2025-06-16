'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';

type Variant = {
  index: number;
  value: string;
  disabled?: boolean;
};

interface Props {
  items: readonly Variant[];
  onClick?: (value: Variant['value']) => void;
  value?: Variant['value'];
  className?: string;
}

export const GroupVariants: React.FC<Props> = ({
  items,
  onClick,
  value,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex justify-between bg-[#eaeaea] rounded-3xl p-1 select-text',
        className
      )}
    >
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => {
            if (item.value !== value) {
              onClick?.(item.value);
            }
          }}
          disabled={item.disabled}
          className={cn(
            'flex-1 rounded-3xl px-4 py-1 text-sm font-medium duration-500',
            'flex items-center justify-center min-h-[40px] text-center',
            'overflow-hidden whitespace-nowrap text-ellipsis',
            value === item.value
              ? 'bg-white text-gray-500 shadow-sm'
              : 'text-gray-500',
            item.disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {item.value}
        </button>
      ))}
    </div>
  );
};
