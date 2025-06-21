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
    <div className={cn(className, 'flex flex-col lg:flex-row flex-1 h-full gap-4 lg:gap-8')}>
      <div className="w-full lg:w-auto order-1 lg:order-1">
        <ProductWithColorImage
          imageUrl={imageUrl}
          color={selectedColor || ''}
          productName={name}
          className="w-full max-w-md mx-auto lg:mx-0"
        />
      </div>

      <div className="w-full lg:w-[490px] bg-[#f7f6f5] p-4 lg:p-7 flex flex-col order-2 lg:order-2">
        <Title text={name} size="md" className="font-extrabold mb-2 lg:mb-1 text-lg lg:text-xl" />
        <p className="text-gray-400 text-sm lg:text-base mb-4 lg:mb-0">{textDetails}</p>

        <div className="flex flex-col gap-4 lg:gap-4 mt-4 lg:mt-6">
          <div>
            <Title text="Цвет" size="sm" className="font-bold mb-3 lg:mb-2 text-base lg:text-sm" />
            <GroupVariants
              items={availableColors}
              value={selectedColor ? String(selectedColor) : undefined}
              onClick={handleColorClick}
            />
          </div>
        </div>

        <div className="bg-gray-50 px-3 lg:px-5 py-4 lg:py-3 rounded-md overflow-auto scrollbar mt-6 lg:mt-7 mb-6 lg:mb-10 flex-1 lg:h-[270px]">
          <Title text="Дополнительные услуги" size="sm" className="font-bold mb-3 text-base lg:text-sm" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-2">
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
              <div className="col-span-full text-center text-gray-400 flex items-center justify-center py-8">
                Нет доступных услуг для этого продукта
              </div>
            )}
          </div>
        </div>

        <Button
          loading={loading}
          onClick={handleClickAdd}
          disabled={!selectedColor}
          className="h-12 lg:h-[55px] px-6 lg:px-10 text-sm lg:text-base rounded-[18px] w-full mt-auto"
        >
          Добавить в корзину за {totalPrice} BYN
        </Button>
      </div>
    </div>
  );
};
