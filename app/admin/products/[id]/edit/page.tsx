import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProductForm } from "../../product-form";

export default async function EditProductPage({
    params,
}: {
    params: { id: string };
}) {
    const product = await prisma.product.findUnique({
        where: {
            id: parseInt(params.id),
        },
        include: {
            category: true,
            variations: true,
        },
    });

    if (!product) {
        notFound();
    }

    const categories = await prisma.category.findMany();

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Edit Product</h1>
            <ProductForm product={product} categories={categories} />
        </div>
    );
} 