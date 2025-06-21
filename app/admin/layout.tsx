import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/constants/auth-options";
import Link from "next/link";
import { MessageSquare, ShoppingBag, Headphones, Menu } from "lucide-react";
import { LayoutDashboard, ShoppingCart, Package, List } from "lucide-react";
import { Header } from "@/shared/components/shared";

const routes = [
    {
        label: 'Обзор',
        icon: LayoutDashboard,
        href: '/admin',
        color: 'text-sky-500',
    },
    {
        label: 'Заказы',
        icon: ShoppingCart,
        href: '/admin/orders',
        color: 'text-violet-500',
    },
    {
        label: 'Товары',
        icon: Package,
        href: '/admin/products',
        color: 'text-pink-700',
    },
    {
        label: 'Категории',
        icon: List,
        href: '/admin/categories',
        color: 'text-orange-700',
    },
    {
        label: 'Поддержка',
        icon: Headphones,
        href: '/admin/support',
        color: 'text-blue-500',
    },
];

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
        redirect("/");
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <Header hasSearch={false} hasCart={false} />
            </div>

            <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-14 sm:h-16">
                        <div className="flex items-center w-full">
                            <div className="flex-shrink-0">
                                <h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                                    Админ панель
                                </h1>
                            </div>

                            {/* Десктопное меню */}
                            <div className="hidden lg:ml-8 lg:flex lg:space-x-6">
                                <Link
                                    href="/admin/products"
                                    className="border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900 inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium transition-colors duration-150"
                                >
                                    <Package className="w-4 h-4 mr-2" />
                                    Товары
                                </Link>
                                <Link
                                    href="/admin/categories"
                                    className="border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900 inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium transition-colors duration-150"
                                >
                                    <List className="w-4 h-4 mr-2" />
                                    Категории
                                </Link>
                                <Link
                                    href="/admin/orders"
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-150"
                                >
                                    <ShoppingBag className="w-4 h-4 mr-2" />
                                    Заказы
                                </Link>
                                <Link
                                    href="/admin/support"
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-150"
                                >
                                    <Headphones className="w-4 h-4 mr-2" />
                                    Поддержка
                                </Link>
                            </div>

                            {/* Мобильное меню - горизонтальная прокрутка */}
                            <div className="lg:hidden ml-4 flex-1 overflow-hidden">
                                <div className="flex space-x-1 overflow-x-auto scrollbar-hide pb-2">
                                    <Link
                                        href="/admin/products"
                                        className="whitespace-nowrap text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-xs sm:text-sm font-medium px-2 sm:px-3 py-2 rounded-md transition-colors duration-150 flex items-center flex-shrink-0"
                                    >
                                        <Package className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                        Товары
                                    </Link>
                                    <Link
                                        href="/admin/categories"
                                        className="whitespace-nowrap text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-xs sm:text-sm font-medium px-2 sm:px-3 py-2 rounded-md transition-colors duration-150 flex items-center flex-shrink-0"
                                    >
                                        <List className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                        Категории
                                    </Link>
                                    <Link
                                        href="/admin/orders"
                                        className="whitespace-nowrap text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-xs sm:text-sm font-medium px-2 sm:px-3 py-2 rounded-md transition-colors duration-150 flex items-center flex-shrink-0"
                                    >
                                        <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                        Заказы
                                    </Link>
                                    <Link
                                        href="/admin/support"
                                        className="whitespace-nowrap text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-xs sm:text-sm font-medium px-2 sm:px-3 py-2 rounded-md transition-colors duration-150 flex items-center flex-shrink-0"
                                    >
                                        <Headphones className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                        Поддержка
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
} 