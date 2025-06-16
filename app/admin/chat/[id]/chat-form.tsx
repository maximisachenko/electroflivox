'use client';

import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const chatFormSchema = z.object({
    message: z.string().min(1, { message: 'Введите сообщение' }),
});

type ChatFormValues = z.infer<typeof chatFormSchema>;

interface Props {
    messageId: number;
}

export const ChatForm: React.FC<Props> = ({ messageId }) => {
    const router = useRouter();
    const form = useForm<ChatFormValues>({
        defaultValues: {
            message: '',
        },
        resolver: zodResolver(chatFormSchema),
    });

    const onSubmit = async (data: ChatFormValues) => {
        try {
            const response = await fetch(`/api/chat/${messageId}/reply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Не удалось отправить ответ');
            }

            toast.success('Ответ отправлен', {
                icon: '✅',
            });

            form.reset();
            router.refresh();
        } catch (error) {
            console.error('Error [CHAT_REPLY]', error);
            toast.error('Не удалось отправить ответ', {
                icon: '❌',
            });
        }
    };

    return (
        <FormProvider {...form}>
            <form
                className="bg-white p-6 rounded-lg shadow"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="space-y-4">
                    <div>
                        <Label>Ваш ответ</Label>
                        <Textarea
                            {...form.register('message')}
                            placeholder="Введите ваш ответ"
                            className="min-h-[100px]"
                        />
                        {form.formState.errors.message && (
                            <p className="text-sm text-red-500">
                                {form.formState.errors.message.message}
                            </p>
                        )}
                    </div>

                    <Button
                        disabled={form.formState.isSubmitting}
                        className="w-full"
                        type="submit"
                    >
                        {form.formState.isSubmitting ? 'Отправка...' : 'Отправить ответ'}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
}; 