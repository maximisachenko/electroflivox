import { prisma } from '@/prisma/prisma-client';

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  colors?: string;
  guarantees?: string;
  manufacturer?: string;
  priceFrom?: string;
  priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findProducts = async (params: GetSearchParams) => {
  const colors = params.colors
    ? params.colors
        .split(',')
        .map(Number)
        .filter((value) => !isNaN(value))
    : [];
  const guarantees = params.guarantees
    ? params.guarantees
        .split(',')
        .map((value) => Number(value))
        .filter((value) => !isNaN(value))
    : [];
  const manufacturers = params.manufacturer
    ? params.manufacturer.split(',').map((value) => value.trim())
    : [];

  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: 'desc',
        },
        where: {
          guarantee: guarantees.length > 0 ? { in: guarantees } : undefined,
          manufacturer:
            manufacturers.length > 0 ? { in: manufacturers } : undefined,
          variations: {
            some: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
        },
        include: {
          services: true,
          variations: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
            orderBy: {
              price: 'asc',
            },
          },
        },
      },
    },
  });

  return categories;
};
