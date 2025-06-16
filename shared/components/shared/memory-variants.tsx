import React from 'react';
import { cn } from '@/shared/lib/utils';

interface Props {
    items: string[];
    value?: string;
    onClick?: (value: string) => void;
    className?: string;
}

export const MemoryVariants: React.FC<Props> = ({ items, value, onClick, className }) => (
    <div className={cn('flex gap-x-2', className)}>
        {items.map((item) => (
            <button
                key={item}
                type="button"
                onClick={() => onClick?.(item)}
                className={cn(
                    'rounded-3xl px-4 py-2 text-sm font-medium duration-500',
                    'flex items-center justify-center min-h-[40px] text-center',
                    'overflow-hidden whitespace-nowrap text-ellipsis',
                    value === item
                        ? 'bg-white text-gray-500 shadow-sm'
                        : 'text-gray-500'
                )}
            >
                {item}
            </button>
        ))}
    </div>
); 