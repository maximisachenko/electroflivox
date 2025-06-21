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
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h1 className="text-xl lg:text-2xl font-bold">Товары</h1>
                <Link href="/admin/products/new">
                    <Button className="w-full sm:w-auto">Добавить товар</Button>
                </Link>
            </div>

            {/* Мобильная версия - карточки */}
            <div className="block lg:hidden space-y-4">
                {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow p-4 space-y-3">
                        <div className="space-y-2">
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <div className="text-sm text-gray-600 space-y-1">
                                <p><span className="font-medium">Категория:</span> {product.category.name}</p>
                                <p><span className="font-medium">Производитель:</span> {product.manufacturer}</p>
                                <p><span className="font-medium">Гарантия:</span> {product.guarantee} лет</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Link href={`/admin/products/${product.id}/edit`}>
                                <Button variant="outline" size="sm" className="w-full">
                                    Редактировать
                                </Button>
                            </Link>
                            <DeleteProductButton productId={product.id} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Десктопная версия - таблица */}
            <div className="hidden lg:block bg-white rounded-lg shadow overflow-x-auto">
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
                                <TableCell className="max-w-[200px] truncate">{product.name}</TableCell>
                                <TableCell>{product.category.name}</TableCell>
                                <TableCell>{product.manufacturer}</TableCell>
                                <TableCell>{product.guarantee} лет</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/admin/products/${product.id}/edit`}>
                                            <Button variant="outline" size="sm">
                                                Редактировать
                                            </Button>
                                        </Link>
                                        <DeleteProductButton productId={product.id} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
} 