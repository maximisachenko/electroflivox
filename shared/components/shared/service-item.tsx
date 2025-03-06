import { cn } from '@/shared/lib/utils';
import { CircleCheck } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface Props {
  name: string;
  price: number;
  active?: boolean;
  imageUrl: string;
  onClick?: () => void;
  className?: string;
}

export const ServiceItem: React.FC<Props> = ({
  className,
  active,
  name,
  price,
  imageUrl,
  onClick,
}) => {
  return (
    <div
      className={cn(
        'flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white mt-5',
        { 'border border-primary': active },
        className
      )}
      onClick={onClick}
    >
      {active && (
        <CircleCheck className="absolute top-2 right-2 text-primary" />
      )}
      <img className="mt-5" width={90} height={90} src={imageUrl} />
      <span className="text-xs mt-4">{name}</span>
      <span className="font-bold mt-5 mb-[10px]">{price} BYN</span>
    </div>
  );
};
