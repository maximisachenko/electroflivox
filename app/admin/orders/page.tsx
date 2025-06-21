import { prisma } from "@/lib/prisma";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { UpdateOrderStatusButton } from "./update-order-status-button";
import { OrderStatusBadge } from "./order-status-badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Info } from "lucide-react";
import Link from "next/link";
import { OrderDetailsModal } from "./order-details-modal";

export default async function OrdersPage() {
    const orders = await prisma.order.findMany({
        include: {
            user: {
                select: {
                    fullName: true
                }
            }
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    // Получаем информацию о товарах и услугах
    const products = await prisma.product.findMany({
        include: {
            variations: true,
            services: {
                include: {
                    service: true
                }
            }
        }
    });

    const services = await prisma.service.findMany();

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl lg:text-2xl font-bold">Заказы</h1>
            </div>

            {/* Мобильная версия - карточки */}
            <div className="block lg:hidden space-y-4">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-lg shadow p-4 space-y-3">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <h3 className="font-semibold">Заказ #{order.id}</h3>
                                <p className="text-sm text-gray-600">{order.user?.fullName || 'Гость'}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <OrderStatusBadge status={order.status} />
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t">
                            <span className="font-medium text-lg">{order.totalAmount.toFixed(2)} BYN</span>
                            <div className="flex gap-2">
                                <OrderDetailsModal
                                    order={order}
                                    products={products}
                                    services={services}
                                />
                                <Link href={`/admin/orders/${order.id}/chat`}>
                                    <Button variant="outline" size="sm">
                                        <MessageSquare className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="pt-2">
                            <UpdateOrderStatusButton order={order} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Десктопная версия - таблица */}
            <div className="hidden lg:block bg-white rounded-lg shadow overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID заказа</TableHead>
                            <TableHead>Клиент</TableHead>
                            <TableHead>Дата</TableHead>
                            <TableHead>Сумма</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead className="text-right">Действия</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>#{order.id}</TableCell>
                                <TableCell className="max-w-[150px] truncate">{order.user?.fullName || 'Гость'}</TableCell>
                                <TableCell className="whitespace-nowrap">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="whitespace-nowrap">{order.totalAmount.toFixed(2)} BYN</TableCell>
                                <TableCell>
                                    <OrderStatusBadge status={order.status} />
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <OrderDetailsModal
                                            order={order}
                                            products={products}
                                            services={services}
                                        />
                                        <Link href={`/admin/orders/${order.id}/chat`}>
                                            <Button variant="outline" size="sm">
                                                <MessageSquare className="w-4 h-4 mr-2" />
                                                Чат
                                            </Button>
                                        </Link>
                                        <UpdateOrderStatusButton order={order} />
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