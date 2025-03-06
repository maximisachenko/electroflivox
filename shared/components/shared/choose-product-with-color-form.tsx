import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui/button';
import { GroupVariants } from './group-variants';
import { ServiceItem } from './service-item';
import { ProductWithColorImage } from './product-with-color-image';
import { Variation } from '@prisma/client';
import { useSet } from 'react-use';
import { ProductWithColor } from '@/@types/prisma';

interface Props {
  imageUrl: string;
  name: string;
  guarantee: number;
  currentVariationId: number;
  variations: Variation[];
  loading: boolean;
  services: any[];
  onSubmit: (itemId: number, services: number[]) => void;
  className?: string;
  availableColors: { index: number; value: string }[];
}

export const ChooseProductWithColorForm: React.FC<Props> = ({
  name,
  imageUrl,
  variations,
  guarantee,
  loading,
  services,
  onSubmit,
  className,
  availableColors,
}) => {
  const [selectedColor, setSelectedColor] = React.useState<string | null>(
    availableColors[0]?.value || null
  );
  const handleColorClick = (value: string) => {
    setSelectedColor(selectedColor === value ? null : value);
  };

  const [selectedServices, { toggle: addService }] = useSet(
    new Set<Number>([])
  );

  const currentVariationId = variations.find(
    (variation) => variation.color === selectedColor
  )?.id;
  const selectedServicesNames = services
    .filter((service) => selectedServices.has(service.id))
    .map((service) => service.name)
    .join(', ');

  const getGuaranteeText = (guarantee: number | undefined) => {
    if (!guarantee) return 'нет гарантии';
    if (guarantee === 1) return `${guarantee} год`;
    if (guarantee >= 2 && guarantee <= 4) return `${guarantee} года`;
    return `${guarantee} лет`;
  };

  const textDetails = `${name}, цвет ${selectedColor || 'не выбран'}, гарантия ${getGuaranteeText(guarantee)}, бесплатная доставка${
    selectedServicesNames
      ? `, дополнительные услуги: ${selectedServicesNames}`
      : ''
  }`;

  const productPrice =
    variations.find((variation) => variation.color === selectedColor)?.price ||
    0;

  const totalServicesPrice: number = services
    .filter((service) => selectedServices.has(service.id))
    .reduce((sum, service) => sum + service.price, 0);

  const totalPrice: number = productPrice + totalServicesPrice;

  const handleClickAdd = () => {
    if (currentVariationId) {
      onSubmit(currentVariationId, Array.from(selectedServices).map(Number));
    }
  };

  return (
    <div className={cn(className, 'flex flex-1')}>
      <ProductWithColorImage
        imageUrl={imageUrl}
        color={selectedColor || ''}
        productName={name}
      />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetails}</p>
        <div className="flex flex-col gap-4 mt-8">
          <GroupVariants
            items={availableColors}
            value={selectedColor ? String(selectedColor) : undefined}
            onClick={handleColorClick}
          />
        </div>
        <div className="bg-gray-50 pl-5 pr-5 pt-3 pb-7 rounded-md h-[350px] overflow-auto scrollbar mt-7">
          <div className="grid grid-cols-3 gap-3">
            {services.length > 0 ? (
              services.map((service) => (
                <ServiceItem
                  key={service.id}
                  name={service.name}
                  price={service.price}
                  imageUrl={service.imageUrl}
                  onClick={() => addService(service.id)}
                  active={selectedServices.has(service.id)}
                />
              ))
            ) : (
              <p>Нет доступных услуг для этого продукта</p>
            )}
          </div>
        </div>

        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice} BYN
        </Button>
      </div>
    </div>
  );
};
