import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/prisma/prisma-client';
import { DataTable } from '@/shared/components/shared/data-table';
import { Button } from '@/components/ui/button';
import { MessageSquare, Mail, Calendar, User } from 'lucide-react';
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
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                    Техническая поддержка
                </h1>
                <div className="flex items-center gap-2 text-sm sm:text-base text-gray-600">
                    <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Всего сообщений: {formattedMessages.length}</span>
                </div>
            </div>

            {/* Мобильная версия - карточки */}
            <div className="block lg:hidden space-y-4">
                {formattedMessages.map((message) => (
                    <div key={message.id} className="bg-white rounded-lg shadow-sm border p-4 space-y-3">
                        <div className="flex items-start justify-between">
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-gray-500" />
                                    <h3 className="font-semibold text-gray-900">
                                        {message.user?.fullName || 'Гость'}
                                    </h3>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Mail className="w-4 h-4" />
                                    <span>{message.user?.email || 'Не указан'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Calendar className="w-4 h-4" />
                                    <span>{message.createdAt}</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2 border-t">
                            <p className="text-sm text-gray-700 leading-relaxed">
                                {message.message}
                            </p>
                        </div>

                        {message.order && (
                            <div className="pt-2 border-t">
                                <div className="flex items-center gap-2 text-sm text-blue-600">
                                    <MessageSquare className="w-4 h-4" />
                                    <span>Заказ #{message.order.id}</span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Десктопная версия - таблица */}
            <div className="hidden lg:block">
                <DataTable columns={columns} data={formattedMessages} />
            </div>

            {formattedMessages.length === 0 && (
                <div className="text-center py-12">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <div className="text-gray-500 text-lg mb-2">
                        Пока нет сообщений поддержки
                    </div>
                    <p className="text-gray-400 text-sm">
                        Сообщения от пользователей будут отображаться здесь
                    </p>
                </div>
            )}
        </div>
    );
} 