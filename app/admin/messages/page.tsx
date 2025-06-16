import { prisma } from "@/prisma/prisma-client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

export default async function MessagesPage() {
    const messages = await prisma.message.findMany({
        include: {
            order: true,
            user: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Сообщения чата</h1>
            </div>

            <div className="bg-white rounded-lg shadow">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Отправитель</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Сообщение</TableHead>
                            <TableHead>Дата</TableHead>
                            <TableHead className="text-right">Действия</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {messages.map((message) => (
                            <TableRow key={message.id}>
                                <TableCell>#{message.id}</TableCell>
                                <TableCell>{message.order.fullName}</TableCell>
                                <TableCell>{message.order.email}</TableCell>
                                <TableCell className="max-w-md truncate">
                                    {message.content}
                                </TableCell>
                                <TableCell>
                                    {new Date(message.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Link href={`/admin/orders/${message.orderId}/chat`}>
                                        <Button variant="outline" size="sm">
                                            <MessageSquare className="w-4 h-4 mr-2" />
                                            Ответить
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