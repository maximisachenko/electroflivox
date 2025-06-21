'use client';

import { cn } from '@/shared/lib/utils';
import { Container } from './container';
import React from 'react';
import Image from 'next/image';
import { Button } from '../ui';
import { ArrowRight, Router, ShoppingCart, User, Shield, Info, Menu, X } from 'lucide-react';
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  hasSearchInMobileMenu?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({
  className,
  hasSearch = true,
  hasCart = true,
  hasSearchInMobileMenu = true,
}) => {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();

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

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-4 lg:py-8">
        {/* Левая часть - лого */}
        <Link href="/">
          <div className="flex items-center gap-2 lg:gap-3">
            <Image src="/logo.svg" alt="Логотип" width={40} height={40} className="lg:w-[51px] lg:h-[51px]" />
            <div>
              <h1 className="text-lg lg:text-2xl uppercase font-black text-fontColor">
                Flivox
              </h1>
              <p className="text-xs lg:text-sm text-descriptitonLogoColor leading-3">
                Качественная техника
              </p>
            </div>
          </div>
        </Link>

        {/* Центральная часть - поиск на десктопе */}
        {hasSearch && (
          <div className="hidden lg:block lg:mx-10 lg:flex-1">
            <SearchInput />
          </div>
        )}

        {/* Правая часть - кнопки на десктопе */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/about">
            <Button variant="ghost" size="icon">
              <Info className="h-5 w-5" />
            </Button>
          </Link>
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
          {hasCart && <CartButton />}
          {session?.user?.role === 'ADMIN' && (
            <Link href="/admin">
              <Button variant="ghost" size="icon">
                <Shield className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>

        {/* Мобильная версия - только корзина и бургер */}
        <div className="flex items-center gap-2 lg:hidden">
          {hasCart && <CartButton />}

          {/* Бургер-меню */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md">
              <SheetHeader className="pb-6">
                <SheetTitle className="text-left">Меню</SheetTitle>
              </SheetHeader>

              <div className="flex flex-col space-y-6">
                {/* Поиск в мобильном меню - только если разрешен */}
                {hasSearch && hasSearchInMobileMenu && (
                  <div className="w-full">
                    <SearchInput />
                  </div>
                )}

                {/* Навигационные ссылки */}
                <div className="flex flex-col space-y-4">
                  <SheetClose asChild>
                    <Link href="/about" className="flex items-center gap-3 py-2">
                      <Info className="h-5 w-5 text-gray-600" />
                      <span className="text-base">О компании</span>
                    </Link>
                  </SheetClose>

                  {session?.user?.role === 'ADMIN' && (
                    <SheetClose asChild>
                      <Link href="/admin" className="flex items-center gap-3 py-2">
                        <Shield className="h-5 w-5 text-gray-600" />
                        <span className="text-base">Админ панель</span>
                      </Link>
                    </SheetClose>
                  )}

                  {session ? (
                    <SheetClose asChild>
                      <Link href="/profile" className="flex items-center gap-3 py-2">
                        <User className="h-5 w-5 text-gray-600" />
                        <span className="text-base">Профиль</span>
                      </Link>
                    </SheetClose>
                  ) : (
                    <div className="flex items-center gap-3 py-2">
                      <User className="h-5 w-5 text-gray-600" />
                      <Button
                        variant="ghost"
                        className="p-0 h-auto text-base font-normal justify-start"
                        onClick={() => {
                          setOpenAuthModal(true);
                          closeMobileMenu();
                        }}
                      >
                        Войти
                      </Button>
                    </div>
                  )}
                </div>

                {/* Профильная информация */}
                {session && (
                  <div className="pt-6 border-t">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{session.user.name || 'Пользователь'}</p>
                        <p className="text-xs text-gray-500">Пользователь</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>

      {/* Поиск под хедером на мобильных */}
      {hasSearch && hasSearchInMobileMenu && (
        <div className="lg:hidden border-t bg-gray-50/50">
          <Container className="py-3">
            <SearchInput />
          </Container>
        </div>
      )}

      <AuthModal
        open={openAuthModal}
        onClose={() => setOpenAuthModal(false)}
      />
    </header>
  );
};
