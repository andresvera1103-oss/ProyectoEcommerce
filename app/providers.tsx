'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    // 👇 SOLUCIÓN: SessionProvider va PRIMERO y siempre envuelve todo
    <SessionProvider>
      {mounted ? (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      ) : (
        // Si el tema no ha cargado, mostramos el contenido "crudo" pero CON sesión
        <>{children}</>
      )}
    </SessionProvider>
  );
}