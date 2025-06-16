'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { Container } from '@/shared/components/shared/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { ScrollArea } from '@/shared/components/ui/scroll-area';

interface Message {
    id: number;
    content: string;
    isFromAdmin: boolean;
    createdAt: string;
}

export default function OrderChatPage() {
    const params = useParams();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const fetchMessages = async () => {
        try {
            const response = await fetch(`/api/orders/${params.id}/messages`);
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 5000); // Обновляем каждые 5 секунд
        return () => clearInterval(interval);
    }, [params.id]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        setLoading(true);
        try {
            const response = await fetch(`/api/orders/${params.id}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: newMessage }),
            });

            if (response.ok) {
                setNewMessage('');
                fetchMessages();
            }
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-10">
            <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold mb-6">Переписка по заказу #{params.id}</h1>

                <ScrollArea className="h-[500px] pr-4" ref={scrollRef}>
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.isFromAdmin ? 'justify-start' : 'justify-end'
                                    }`}
                            >
                                <div
                                    className={`max-w-[70%] rounded-lg p-4 ${message.isFromAdmin
                                        ? 'bg-gray-100'
                                        : 'bg-blue-500 text-white'
                                        }`}
                                >
                                    <p className="text-sm">{message.content}</p>
                                    <p className="text-xs mt-2 opacity-70">
                                        {format(new Date(message.createdAt), 'd MMMM, HH:mm', {
                                            locale: ru,
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                <form onSubmit={sendMessage} className="mt-4 flex gap-2">
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Введите сообщение..."
                        disabled={loading}
                    />
                    <Button type="submit" disabled={loading}>
                        Отправить
                    </Button>
                </form>
            </div>
        </Container>
    );
} 