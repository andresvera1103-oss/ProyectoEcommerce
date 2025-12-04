'use client';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SOLUCIÓN CLAVE:
  // El SessionProvider debe estar SIEMPRE presente, incluso antes de que cargue el tema.
  // Esto evita el error "useSession must be wrapped..."
  
  return (
    <SessionProvider>
      {mounted ? (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      ) : (
        // Si no se ha montado el tema aún, renderizamos los hijos sin tema
        // pero DENTRO del SessionProvider para que el Navbar funcione.
        <>{children}</>
      )}
    </SessionProvider>
  );
}