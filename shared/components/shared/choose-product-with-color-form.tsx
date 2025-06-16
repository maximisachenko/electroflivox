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

  const textDetails = `${name}, цвет ${selectedColor || 'не выбран'}, гарантия ${getGuaranteeText(guarantee)}, бесплатная доставка${selectedServicesNames
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
    <div className={cn(className, 'flex flex-col md:flex-row flex-1 h-full gap-4 sm:gap-8')}>
      <ProductWithColorImage
        imageUrl={imageUrl}
        color={selectedColor || ''}
        productName={name}
        className="w-full md:w-auto mb-4 md:mb-0"
      />
      <div className="w-full md:w-[490px] bg-[#f7f6f5] p-4 sm:p-7 flex flex-col">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400 text-sm md:text-base">{textDetails}</p>
        <div className="flex flex-col gap-4 mt-6">
          <div>
            <Title text="Цвет" size="sm" className="font-bold mb-2" />
            <GroupVariants
              items={availableColors}
              value={selectedColor ? String(selectedColor) : undefined}
              onClick={handleColorClick}
            />
          </div>
        </div>

        <div className="bg-gray-50 pl-3 pr-3 sm:pl-5 sm:pr-5 pt-3 pb-7 rounded-md h-[220px] md:h-[270px] overflow-auto scrollbar mt-7 mb-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
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
              <div className="text-center text-gray-400 flex items-center justify-center h-full">Нет доступных услуг для этого продукта</div>
            )}
          </div>
        </div>

        <Button
          loading={loading}
          onClick={handleClickAdd}
          disabled={!selectedColor}
          className="h-[48px] md:h-[55px] px-6 md:px-10 text-base rounded-[18px] w-full mt-auto"
        >
          Добавить в корзину за {totalPrice} BYN
        </Button>
      </div>
    </div>
  );
};
