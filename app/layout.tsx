import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers"; // Importación correcta: está en la misma carpeta
import Navbar from "@/components/Navbar"; // Asegúrate de que tu Navbar esté aquí

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce Moderno",
  description: "La mejor tienda online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          {/* El Navbar va aquí para que salga en toda la tienda */}
          <Navbar /> 
          
          <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}