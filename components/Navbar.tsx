'use client';

import Link from "next/link";
import CartSheet from "./CartSheet";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { User, ShoppingBag } from "lucide-react";
// Ya no importamos el store porque no vamos a borrar nada

export default function Navbar() {
  const { data: session } = useSession();

  const handleLogout = () => {
    // ELIMINADO: clearCart(); 
    // Ahora solo cerramos la sesión, pero el carrito se queda guardado en el navegador
    signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <ShoppingBag className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">ShopModerno</span>
        </Link>

        <div className="flex items-center gap-4">
          <CartSheet />

          {session?.user ? (
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs border border-blue-200">
                  {session.user.name?.charAt(0) || "U"}
                </div>
                <div className="hidden md:flex flex-col">
                  <span className="text-xs font-medium text-gray-900 leading-none">{session.user.name}</span>
                  <span className="text-[10px] text-gray-500 leading-none">Cliente</span>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-600"
              >
                Salir
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button size="sm" className="font-medium">Ingresar</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}