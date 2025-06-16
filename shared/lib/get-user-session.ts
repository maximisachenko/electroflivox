import { getServerSession } from 'next-auth';
import { authOptions } from '../constants/auth-options';
import { cookies, headers } from 'next/headers';

export const getUserSession = async () => {
  const session = await getServerSession(authOptions);

  console.log('getUserSession result:', session);

  return session?.user ?? null;
};
