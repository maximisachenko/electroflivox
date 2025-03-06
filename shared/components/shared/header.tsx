'use client';

import { cn } from '@/shared/lib/utils';
import { Container } from './container';
import React from 'react';
import Image from 'next/image';
import { Button } from '../ui';
import { ArrowRight, Router, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { SearchInput } from './search-input';
import { CartButton } from './cart-button';
import { useSession, signIn } from 'next-auth/react';
import { ProfileButton } from './profile-button';
import { AuthModal } from './modals';
import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { BackgroundInfo } from './background-info';

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({
  className,
  hasSearch = true,
  hasCart = true,
}) => {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  React.useEffect(() => {
    let toastMessage = '';

    if (searchParams.has('verified')) {
      toastMessage = 'Вы успешно подтвердили свою электронную почту';
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace('/');
        toast.success(toastMessage, {
          duration: 3000,
        });
      }, 1000);
    }
  });
  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Левая часть */}

        <Link href="/">
          <div className="flex item-center gap-3">
            <Image src="/logo.svg" alt="Logo" width={51} height={51} />
            <div>
              <h1 className="text-2xl uppercase font-black text-fontColor">
                Flivox
              </h1>
              <p className="text-sm text-descriptitonLogoColor leading-3">
                Качественная техника
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Правая часть */}

        {/* Кнопка Войти */}
        <div className="flex item-center gap-4">
          <BackgroundInfo />
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
