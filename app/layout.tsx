import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "./providers"; 

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
          {/* 👇 CORRECCIÓN: Quitamos la etiqueta <main> de aquí.
              Dejamos que cada página (children) maneje su propia estructura.
          */}
          {children}
        </Providers>
      </body>
    </html>
  );
}