import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/constants/auth-options";
import Link from "next/link";
import { MessageSquare, ShoppingBag, Headphones } from "lucide-react";
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
        <div className="min-h-screen bg-gray-100">
            <div className="bg-white shadow-sm">
                <Header hasSearch={false} hasCart={false} />
            </div>
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <h1 className="text-xl font-bold">Админ панель</h1>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <Link
                                    href="/admin/products"
                                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    Товары
                                </Link>
                                <Link
                                    href="/admin/categories"
                                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    Категории
                                </Link>
                                <Link
                                    href="/admin/orders"
                                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                                >
                                    <ShoppingBag className="w-4 h-4 mr-2" />
                                    Заказы
                                </Link>
                                <Link
                                    href="/admin/support"
                                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                                >
                                    <Headphones className="w-4 h-4 mr-2" />
                                    Поддержка
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
} 