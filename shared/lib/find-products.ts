import { prisma } from '@/prisma/prisma-client';

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  colors?: string;
  manufacturer?: string;
  priceFrom?: string;
  priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 10000;

export const findProducts = async (params: GetSearchParams) => {
  const colors = params.colors
    ? params.colors
        .split(',')
        .map(Number)
        .filter((value) => !isNaN(value))
    : [];
  const manufacturers = params.manufacturer
    ? params.manufacturer.split(',').map((value) => value.trim())
    : [];

  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

  const categoriesRaw = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: 'desc',
        },
        where: {
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
          services: {
            include: {
              service: true,
            },
          },
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

  // Преобразуем данные для совместимости с ожидаемыми типами
  const categories = categoriesRaw.map((category) => ({
    ...category,
    products: category.products.map((product) => ({
      ...product,
      services: product.services?.map((s) => s.service) ?? [],
    })),
  }));

  return categories;
};
