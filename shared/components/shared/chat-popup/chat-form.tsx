'use client';

import { Button } from '@/components/ui/button';
import { FormInput } from '../form/form-input';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const chatFormSchema = z.object({
    name: z.string().min(2, { message: 'Введите ваше имя' }),
    email: z.string().email({ message: 'Введите корректный email' }),
    message: z.string().min(10, { message: 'Сообщение должно содержать минимум 10 символов' }),
});

type ChatFormValues = z.infer<typeof chatFormSchema>;

interface Props {
    onClose?: VoidFunction;
}

export const ChatForm: React.FC<Props> = ({ onClose }) => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<ChatFormValues>({
        defaultValues: {
            name: '',
            email: '',
            message: '',
        },
        resolver: zodResolver(chatFormSchema),
    });

    const onSubmit = async (data: ChatFormValues) => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    type: 'support'
                }),
            });

            if (!response.ok) {
                throw new Error('Не удалось отправить сообщение');
            }

            toast.success('Сообщение отправлено', {
                icon: '✅',
            });

            form.reset();
            onClose?.();
        } catch (error) {
            console.error('Error [CHAT]', error);
            toast.error('Не удалось отправить сообщение', {
                icon: '❌',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormProvider {...form}>
            <form
                className="flex flex-col gap-4 mt-4"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormInput name="name" label="Ваше имя" required />
                <FormInput name="email" label="Email" required />
                <div className="space-y-2">
                    <Label>Сообщение</Label>
                    <Textarea
                        {...form.register('message')}
                        placeholder="Введите ваше сообщение"
                        className="min-h-[100px]"
                    />
                    {form.formState.errors.message && (
                        <p className="text-sm text-red-500">
                            {form.formState.errors.message.message}
                        </p>
                    )}
                </div>

                <Button
                    disabled={isLoading}
                    className="h-12 text-base mt-2"
                    type="submit"
                >
                    {isLoading ? 'Отправка...' : 'Отправить'}
                </Button>
            </form>
        </FormProvider>
    );
};