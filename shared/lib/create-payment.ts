import { PaymentData } from '@/@types/yookassa';
import axios from 'axios';

interface Props {
  description: string;
  amount: number;
  orderId: number;
}

export async function createPayment(details: any) {
  const { data } = await axios.post<PaymentData>(
    'https://api.yookassa.ru/v1/payments',
    {
      amount: {
        value: details.amount,
        currency: 'RUB',
      },

      capture: true,
      description: details.description,
      metadata: {
        orderId: details.orderId,
      },
      confirmation: {
        type: 'redirect',
        return_url: process.env.YOOKASSA_CALLBACK_URL,
      },
    },
    {
      auth: {
        username: '391809',
        password: process.env.YOOKASSA_API_KEY as string,
      },
      headers: {
        'Content-Type': 'application/json',
        'Idempotence-Key': Math.random().toString(36).substring(7),
      },
    }
  );

  return data;
}
