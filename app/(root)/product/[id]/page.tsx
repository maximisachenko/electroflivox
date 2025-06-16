import { Container, ProductForm } from '@/shared/components/shared';
import { prisma } from '@/prisma/prisma-client';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: {
      services: {
        include: {
          service: true,
        },
      },
      category: {
        include: {
          products: {
            include: {
              variations: true,
            },
          },
        },
      },
      variations: true,
    },
  });

  if (!product) {
    return <p>Product not found</p>;
  }

  const transformedServices = product.services.map((ps) => ({
    id: ps.service.id,
    name: ps.service.name,
    imageUrl: ps.service.imageUrl,
    createdAt: ps.service.createdAt,
    updatedAt: ps.service.updatedAt,
    price: ps.service.price,
  }));

  const productWithColor = {
    ...product,
    services: transformedServices,
  };

  return (
    <Container className="mt-10">
      <ProductForm product={productWithColor} />
    </Container>
  );
}
