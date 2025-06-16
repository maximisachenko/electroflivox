import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/prisma/prisma-client';
import { DataTable } from '@/shared/components/shared/data-table';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { authOptions } from '@/shared/constants/auth-options';

const columns = [
    {
        header: 'Имя',
        accessorKey: 'name',
    },
    {
        header: 'Email',
        accessorKey: 'email',
    },
    {
        header: 'Сообщение',
        accessorKey: 'message',
    },
    {
        header: 'Дата',
        accessorKey: 'createdAt',
    },
];

export default async function SupportPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== 'ADMIN') {
        redirect('/');
    }

    const messages = await prisma.chatMessage.findMany({
        where: {
            type: 'support'
        },
        include: {
            order: true,
            user: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    const formattedMessages = messages.map(message => ({
        ...message,
        createdAt: new Date(message.createdAt).toLocaleString('ru-RU'),
    }));

    return (
        <div className="container mx-auto py-10">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Техническая поддержка</h1>
            </div>

            <DataTable columns={columns} data={formattedMessages} />
        </div>
    );
} 