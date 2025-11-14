'use client';

import Link from "next/link";
import CartSheet from "./CartSheet";
import { Button } from "@/components/ui/button";
import { useSession, signOut, SessionProvider } from "next-auth/react";
import { User, ShoppingBag } from "lucide-react"; // Cambié el icono a ShoppingBag para variar

function NavbarContent() {
  const { data: session } = useSession();

  return (
    // CAMBIO: sticky, backdrop-blur y un borde sutil
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
                {/* Avatar sutil */}
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
                onClick={() => signOut()} 
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

export default function Navbar() {
  return (
    <SessionProvider>
      <NavbarContent />
    </SessionProvider>
  );
}