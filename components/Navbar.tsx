'use client';

import Link from "next/link";
import CartSheet from "./CartSheet";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { ShoppingBag, LayoutDashboard } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { ThemeToggle } from "./ThemeToggle"; // 1. Importamos el toggle

export default function Navbar() {
  const { data: session } = useSession();
  const clearCart = useCartStore((state) => state.clearCart);

  const handleLogout = () => {
    signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-900/20">
            <ShoppingBag className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Shop<span className="text-blue-600 dark:text-blue-400">Moderno</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          {/* 2. Añadimos el botón de tema aquí */}
          <ThemeToggle />
          
          <CartSheet />

          {session?.user ? (
            <div className="flex items-center gap-4 pl-4 border-l border-slate-200 dark:border-slate-700">
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden sm:inline">Panel</span>
                </Button>
              </Link>

              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-medium leading-none text-slate-900 dark:text-white">{session.user.name}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Conectado</span>
              </div>
              
              <Button 
                variant="destructive" 
                size="sm"
                onClick={handleLogout}
                className="h-8 text-xs"
              >
                Salir
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white border-0 ml-2">
                Ingresar
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}