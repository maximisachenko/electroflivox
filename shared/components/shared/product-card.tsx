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
        <div className="flex justify-center items-center bg-cardBackground rounded-lg h-[260px]">
          <img className="w-[245px] h-[282px]" src={imageUrl} alt={name} />
        </div>

        <Title
          text={name}
          size="sm"
          className="text-fontColor font-bold mt-4 mb-2"
        />

        <p className="text-sm mb-3 text-descriptionColor">
          {manufacturer}, {description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-[20px] text-fontColor">
            от <b>{price} BYN</b>
          </span>

          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};
