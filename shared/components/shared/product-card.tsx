import { Image, Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { Service } from '@prisma/client';

interface Props {
  id: number;
  name: string;
  price: number;
  manufacturer: string;
  guarantee: number;
  description: string | null;
  imageUrl: string;
  services: Service[];
  className?: string;
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  manufacturer,
  guarantee,
  description,
  imageUrl,
  services,
  className,
}) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center items-center bg-cardBackground rounded-lg h-[180px] md:h-[260px]">
          <img className="w-full max-w-[180px] md:max-w-[245px] h-[150px] md:h-[282px] object-contain" src={imageUrl} alt={name} />
        </div>

        <Title
          text={name}
          size="sm"
          className="text-fontColor font-bold mt-3 mb-1 md:mt-4 md:mb-2 px-2"
        />

        <p className="text-xs md:text-sm mb-2 md:mb-3 text-descriptionColor px-2">
          {manufacturer}, {description}
        </p>

        <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0 px-2">
          <span className="text-base md:text-[20px] text-fontColor">
            от <b>{price} BYN</b>
          </span>

          <Button variant="secondary" className="text-sm md:text-base font-bold w-full md:w-auto">
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};
