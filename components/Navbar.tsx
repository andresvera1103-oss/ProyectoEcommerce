'use client';

import Link from "next/link";
import CartSheet from "./CartSheet";
import { Button } from "@/components/ui/button";
import { useSession, signOut, SessionProvider } from "next-auth/react";
import { User, ShoppingBag, LayoutDashboard } from "lucide-react";

function NavbarContent() {
  const { data: session } = useSession();

  const handleLogout = () => {
    // CORRECCIÓN: Ya NO llamamos a clearCart().
    // El carrito se queda guardado en el navegador.
    signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950 text-white shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo más elegante */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-900/20">
            <ShoppingBag className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Shop<span className="text-blue-400">Moderno</span></span>
        </Link>

        <div className="flex items-center gap-4">
          <CartSheet />

          {session?.user ? (
            <div className="flex items-center gap-4 pl-4 border-l border-slate-700">
              
              {/* Botón al Panel de Admin */}
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800 gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden sm:inline">Panel</span>
                </Button>
              </Link>

              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-medium leading-none">{session.user.name}</span>
                <span className="text-[10px] text-slate-400">Conectado</span>
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
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white border-0">
                Ingresar
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default function Navbar() {
  return (
    <SessionProvider>
      <NavbarContent />
    </SessionProvider>
  );
}