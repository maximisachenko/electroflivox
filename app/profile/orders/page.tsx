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
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Мои заказы</h1>

            <div className="bg-white rounded-lg shadow">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>#{order.id}</TableCell>
                                <TableCell>
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell>{order.totalAmount.toFixed(2)} BYN</TableCell>
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
    );
} 