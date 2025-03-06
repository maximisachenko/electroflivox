import { Product, Service, Variation } from '@prisma/client';
import { CartStateItem } from './get-cart-details';

export const getCartItemDetails = (
  services: CartStateItem['services'],
  color: Variation['color'],
  guarantee: Product['guarantee']
): string => {
  const details = [];

  if (color && guarantee) {
    let guaranteeText = 'лет';
    if (guarantee === 1) {
      guaranteeText = 'год';
    } else if (guarantee >= 2 && guarantee <= 4) {
      guaranteeText = 'года';
    }
    details.push(`Цвет ${color}, гарантия ${guarantee} ${guaranteeText}`);
  }

  if (services && services.length > 0) {
    details.push(
      `дополнительные услуги: ${services.map((service) => service.name).join(', ')}`
    );
  }

  return details.join(', ');
};
