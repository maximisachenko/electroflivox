import { z } from 'zod';
import { REGIONS } from '@/shared/constants/locations';

export const checkoutFormSchema = z
  .object({
    firstName: z.string().min(2, { message: 'Введите имя' }).optional(),
    lastName: z.string().min(2, { message: 'Введите фамилию' }).optional(),
    email: z.string().email({ message: 'Введите корректный email' }).optional(),
    phone: z.string().min(9, { message: 'Введите корректный номер телефона' }),
    region: z
      .enum(REGIONS.map((r) => r.id) as [string, ...string[]], {
        required_error: 'Выберите область',
      })
      .optional(),
    city: z.string().min(2, { message: 'Введите город' }).optional(),
    address: z.string().min(5, { message: 'Введите адрес' }),
    postIndex: z
      .string()
      .min(5, { message: 'Введите почтовый индекс' })
      .optional(),
    deliveryMethod: z.enum(['belpost', 'europost', 'minsk']),
    comment: z.string().optional(),
  })
  .refine(
    (data) => {
      // Если доставка не по Минску, то все поля обязательны
      if (data.deliveryMethod !== 'minsk') {
        return (
          !!data.firstName &&
          !!data.lastName &&
          !!data.email &&
          !!data.region &&
          !!data.city &&
          !!data.postIndex
        );
      }
      return true;
    },
    {
      message: 'Заполните все обязательные поля',
      path: ['firstName'], // Показываем ошибку на первом поле
    }
  );

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
