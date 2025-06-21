import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/constants/auth-options";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { OrderStatusBadge } from "@/shared/components/order-status-badge";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { Header } from "@/shared/components/shared/header";
import { Container } from "@/shared/components/shared/container";

export default async function OrdersPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/");
    }

    const orders = await prisma.order.findMany({
        where: {
            userId: parseInt(session.user.id),
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <>
            <Header hasSearch={false} hasSearchInMobileMenu={false} />
            <Container className="py-6 lg:py-8">
                <div className="space-y-4 lg:space-y-6">
                    <h1 className="text-xl lg:text-2xl font-bold">Мои заказы</h1>

                    {/* Мобильная версия - карточки */}
                    <div className="block lg:hidden space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white rounded-lg shadow p-4 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <h3 className="font-semibold">Заказ #{order.id}</h3>
                                        <p className="text-sm text-gray-500">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <OrderStatusBadge status={order.status} />
                                </div>

                                <div className="flex justify-between items-center pt-2 border-t">
                                    <span className="font-medium text-lg">{order.totalAmount.toFixed(2)} BYN</span>
                                    <Link href={`/profile/orders/${order.id}/chat`}>
                                        <Button variant="outline" size="sm">
                                            <MessageSquare className="w-4 h-4 mr-2" />
                                            Чат
                                        </Button>
                                    </Link>
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
                                        <TableCell className="whitespace-nowrap">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap">{order.totalAmount.toFixed(2)} BYN</TableCell>
                                        <TableCell>
                                            <OrderStatusBadge status={order.status} />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Link href={`/profile/orders/${order.id}/chat`}>
                                                <Button variant="outline" size="sm">
                                                    <MessageSquare className="w-4 h-4 mr-2" />
                                                    Чат
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </Container>
        </>
    );
} 