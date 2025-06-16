import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shared/constants/auth-options';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      categoryId,
      manufacturer,
      guarantee,
      description,
      imageUrl,
      variations,
    } = body;

    // Удаляем старые вариации
    await prisma.variation.deleteMany({
      where: { productId: parseInt(params.id) },
    });

    const product = await prisma.product.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        name,
        categoryId,
        manufacturer,
        guarantee,
        description,
        imageUrl,
        variations: {
          create: variations,
        },
      },
      include: { variations: true },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('[PRODUCT_UPDATE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const productId = parseInt(params.id);

    // Delete all variations first
    await prisma.variation.deleteMany({
      where: {
        productId,
      },
    });

    // Delete all product services
    await prisma.productService.deleteMany({
      where: {
        productId,
      },
    });

    // Delete the product
    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[PRODUCT_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
