import { PaymentData } from '@/@types/yookassa';
import axios from 'axios';

interface Props {
  description: string;
  amount: number;
  orderId: number;
}

export async function createPayment(details: Props) {
  const shopId = process.env.YOOKASSA_SHOP_ID || '391809';
  const secretKey = process.env.YOOKASSA_API_KEY;

  console.log('Payment creation debug:', {
    shopId,
    hasSecretKey: !!secretKey,
    secretKeyLength: secretKey?.length,
    callbackUrl: process.env.YOOKASSA_CALLBACK_URL,
  });

  if (!secretKey) {
    throw new Error('YOOKASSA_API_KEY is not set in environment variables');
  }

  const authHeader = `Basic ${Buffer.from(`${shopId}:${secretKey}`).toString('base64')}`;
  console.log('Auth header length:', authHeader.length);

  const { data } = await axios.post<PaymentData>(
    'https://api.yookassa.ru/v3/payments',
    {
      amount: {
        value: details.amount.toString(),
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
      headers: {
        'Content-Type': 'application/json',
        'Idempotence-Key': Math.random().toString(36).substring(7),
        Authorization: authHeader,
      },
    }
  );

  return data;
}
