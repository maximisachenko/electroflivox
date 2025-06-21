import { prisma } from '@/prisma/prisma-client';
import { ProfileForm } from '@/shared/components/shared';
import { getUserSession } from '@/shared/lib/get-user-session';
import { redirect } from 'next/navigation';
import { Container } from '@/shared/components/shared/container';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { cookies, headers } from 'next/headers';

export default async function ProfilePage() {
  const session = await getUserSession();

  console.log('Profile page session:', session);

  if (!session) {
    console.log('No session found, redirecting to not-auth');
    return redirect('/not-auth');
  }

  const user = await prisma.user.findFirst({
    where: { id: Number(session.id) },
  });

  console.log('Found user:', user);

  if (!user) {
    console.log('No user found, redirecting to not-auth');
    return redirect('/not-auth');
  }

  return (
    <Container className="mt-6 lg:mt-10">
      <div className="space-y-4 lg:space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-xl lg:text-2xl font-bold">Профиль</h1>
          <Link href="/profile/orders">
            <Button className="w-full sm:w-auto">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Мои заказы
            </Button>
          </Link>
        </div>
        <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
          <ProfileForm data={user} />
        </div>
      </div>
    </Container>
  );
}
