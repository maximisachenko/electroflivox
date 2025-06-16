import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ChatForm } from './chat-form';
import { authOptions } from '@/shared/constants/auth-options';
import { prisma } from '@/lib/prisma';

interface Props {
    params: {
        id: string;
    };
}

export default async function ChatMessagePage({ params }: Props) {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== 'ADMIN') {
        redirect('/');
    }

    const message = await prisma.chatMessage.findUnique({
        where: { id: Number(params.id) },
        include: {
            order: true,
            user: true,
        },
    });

    if (!message) {
        redirect('/admin/chat');
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/chat">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold">Сообщение #{message.id}</h1>
            </div>

            <div className="grid gap-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="grid gap-4">
                        <div>
                            <Label>Тип</Label>
                            <p>{message.type === 'order' ? 'Заказ' : 'Поддержка'}</p>
                        </div>
                        <div>
                            <Label>От</Label>
                            <p>{message.name} ({message.email})</p>
                        </div>
                        {message.orderId && (
                            <div>
                                <Label>Заказ</Label>
                                <Link href={`/admin/orders/${message.orderId}`}>
                                    <Button variant="link">Заказ #{message.orderId}</Button>
                                </Link>
                            </div>
                        )}
                        <div>
                            <Label>Сообщение</Label>
                            <p className="whitespace-pre-wrap">{message.message}</p>
                        </div>
                        <div>
                            <Label>Дата</Label>
                            <p>{format(message.createdAt, 'dd MMMM yyyy HH:mm', { locale: ru })}</p>
                        </div>
                    </div>
                </div>

                <ChatForm messageId={message.id} />
            </div>
        </div>
    );
} 