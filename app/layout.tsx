import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

// 👇 CORRECCIÓN: Usamos '@' para ir a la ruta segura
import Providers from "@/app/providers"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopModerno",
  description: "Tu tienda de confianza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {/* Quitamos el <main> de aquí para evitar el error de hidratación */}
          {children}
        </Providers>
      </body>
    </html>
  );
}