import { prisma } from "@/lib/prisma";
import { ProductForm } from "../product-form";

export default async function NewProductPage() {
    const categories = await prisma.category.findMany();

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Новый товар</h1>
            <ProductForm categories={categories} />
        </div>
    );
} 