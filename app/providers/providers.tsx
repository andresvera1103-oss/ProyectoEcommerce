'use client';
import { SessionProvider } from 'next-auth/react';

// Este componente simplemente envuelve la app en el SessionProvider
// para que useSession() funcione en todas las páginas de cliente.
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}