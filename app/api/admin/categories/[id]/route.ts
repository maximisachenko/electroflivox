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
    const { name } = body;

    const category = await prisma.category.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        name,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error('[CATEGORY_UPDATE]', error);
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

    const categoryId = parseInt(params.id);

    // Delete all products in the category first
    const products = await prisma.product.findMany({
      where: {
        categoryId,
      },
    });

    for (const product of products) {
      // Delete all variations
      await prisma.variation.deleteMany({
        where: {
          productId: product.id,
        },
      });

      // Delete all product services
      await prisma.productService.deleteMany({
        where: {
          productId: product.id,
        },
      });
    }

    // Delete all products
    await prisma.product.deleteMany({
      where: {
        categoryId,
      },
    });

    // Delete the category
    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[CATEGORY_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
