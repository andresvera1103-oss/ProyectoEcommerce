'use client';

import Link from "next/link";
import CartSheet from "./CartSheet";
import { Button } from "@/components/ui/button";
import { useSession, signOut, SessionProvider } from "next-auth/react";
import { User } from "lucide-react";

// Componente interno con la lógica del usuario
function NavbarContent() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600">ShopModerno</span>
        </Link>

        <div className="flex items-center gap-4">
          {/* Carrito */}
          <CartSheet />

          {/* Lógica de Autenticación */}
          {session?.user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <div className="bg-gray-100 p-1 rounded-full">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <span className="hidden sm:inline">{session.user.name}</span>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => signOut()} 
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Salir
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button>Ingresar</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

// Exportamos el Navbar envuelto en el Proveedor de Sesión
export default function Navbar() {
  return (
    <SessionProvider>
      <NavbarContent />
    </SessionProvider>
  );
}