'use client';

import Link from "next/link";
import CartSheet from "./CartSheet";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { User, ShoppingBag, Search, Menu } from "lucide-react";
import { useCartStore } from "@/lib/store";

export default function Navbar() {
  const { data: session } = useSession();
  const clearCart = useCartStore((state) => state.clearCart);

  const handleLogout = () => {
    clearCart();
    signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        
        {/* Logo Moderno */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-black text-white p-2 rounded-xl group-hover:scale-105 transition-transform">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-slate-900">
            Shop<span className="text-blue-600">Moderno</span>.
          </span>
        </Link>

        {/* Menú Central (Decorativo para pro look) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="#" className="hover:text-blue-600 transition-colors">Novedades</Link>
          <Link href="#" className="hover:text-blue-600 transition-colors">Hombre</Link>
          <Link href="#" className="hover:text-blue-600 transition-colors">Mujer</Link>
          <Link href="#" className="hover:text-blue-600 transition-colors">Tecnología</Link>
        </nav>

        {/* Acciones Derecha */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5 text-slate-500" />
          </Button>

          <CartSheet />

          {session?.user ? (
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-xs font-bold text-slate-900">{session.user.name}</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wide">Miembro</span>
              </div>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={handleLogout}
                className="text-xs font-semibold bg-slate-100 hover:bg-red-50 hover:text-red-600"
              >
                Salir
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button className="bg-black hover:bg-slate-800 text-white font-semibold rounded-full px-6">
                Ingresar
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}