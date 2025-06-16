import { cn } from '@/shared/lib/utils';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { formLoginSchema, TFormLoginValues } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Title } from '../../../title';
import { FormInput } from '../../../form/form-input';
import { Button } from '@/shared/components/ui/button';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Props {
  onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const router = useRouter();
  const form = useForm<TFormLoginValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(formLoginSchema),
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const resp = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (!resp) {
        throw new Error('Не удалось получить ответ от сервера');
      }

      if (!resp.ok) {
        if (resp.error === 'CredentialsSignin') {
          throw new Error('Неверный email или пароль');
        }
        throw new Error(resp.error || 'Произошла ошибка при входе');
      }

      toast.success('Вы успешно вошли в аккаунт', {
        icon: '✅',
      });

      onClose?.();
      router.refresh();
      router.push('/profile');
    } catch (error) {
      console.error('Error [LOGIN]', error);
      toast.error(error instanceof Error ? error.message : 'Не удалось войти в аккаунт', {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Вход в аккаунт" size="md" className="font-bold" />
            <p className="text-gray-400">
              Введите свою почту, чтобы войти в аккаунт
            </p>
          </div>
          <img src="/phone-icon.png" alt="phone-icon" width={60} height={60} />
        </div>

        <FormInput name="email" label="E-Mail" required />
        <FormInput name="password" label="Пароль" type="password" required />

        <Button
          disabled={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          {form.formState.isSubmitting ? 'Вход...' : 'Войти'}
        </Button>
      </form>
    </FormProvider>
  );
};
