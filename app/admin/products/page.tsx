import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DeleteProductButton } from "./delete-product-button";


export default async function ProductsPage() {
    const products = await prisma.product.findMany({
        include: {
            category: true,
        },
    });

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Товары</h1>
                <Link href="/admin/products/new">
                    <Button>Добавить товар</Button>
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Название</TableHead>
                            <TableHead>Категория</TableHead>
                            <TableHead>Производитель</TableHead>
                            <TableHead>Гарантия</TableHead>
                            <TableHead className="text-right">Действия</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.category.name}</TableCell>
                                <TableCell>{product.manufacturer}</TableCell>
                                <TableCell>{product.guarantee} лет</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Link href={`/admin/products/${product.id}/edit`}>
                                        <Button variant="outline" size="sm">
                                            Редактировать
                                        </Button>
                                    </Link>
                                    <DeleteProductButton productId={product.id} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
} 