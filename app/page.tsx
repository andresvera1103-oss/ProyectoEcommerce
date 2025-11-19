import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/api";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AddToCartButton from "@/components/AddToCartButton";
import { Truck, ShieldCheck, RefreshCw, ArrowRight } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. HERO SECTION PREMIUM */}
      <section className="relative bg-slate-950 text-white overflow-hidden">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full blur-[128px] opacity-20"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500 rounded-full blur-[128px] opacity-20"></div>

        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10 text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-1 text-sm bg-blue-500/10 text-blue-200 border-blue-500/20 backdrop-blur-md">
            Nueva Colección 2025
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Redefine tu Estilo.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Explora nuestra selección curada de productos premium. Calidad excepcional, diseño innovador y precios justos.
          </p>
          
          {/* Badges de Confianza */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm font-medium text-slate-300">
            <div className="flex items-center gap-2"><Truck className="h-5 w-5 text-blue-400" /> Envío Gratis</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-blue-400" /> Garantía de 2 años</div>
            <div className="flex items-center gap-2"><RefreshCw className="h-5 w-5 text-blue-400" /> Devolución 30 días</div>
          </div>
        </div>
      </section>

      {/* 2. GRID DE PRODUCTOS MODERNO */}
      <main className="container mx-auto px-4 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Tendencias</h2>
            <p className="text-slate-500 mt-1">Los productos más deseados del momento.</p>
          </div>
          <Link href="#" className="hidden md:flex items-center text-blue-600 font-medium hover:underline">
            Ver todo <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group border-0 shadow-none hover:shadow-2xl transition-all duration-500 rounded-2xl bg-white overflow-hidden ring-1 ring-slate-100">
              
              <Link href={`/product/${product.id}`} className="block relative">
                {/* Contenedor de Imagen con Efecto */}
                <div className="relative aspect-square bg-slate-50 p-8 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  {/* Categoría Flotante */}
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-900 rounded-full shadow-sm">
                    {product.category}
                  </span>
                </div>

                {/* Información */}
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-slate-900 text-lg leading-tight line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4 h-10">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                     <span className="text-xl font-bold text-slate-900">
                      ${product.price}
                    </span>
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      Disponible
                    </span>
                  </div>
                </CardContent>
              </Link>

              {/* Footer con el botón */}
              <CardFooter className="p-6 pt-0">
                <div className="w-full transform translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <AddToCartButton product={product} />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      {/* 3. FOOTER SIMPLE (Profesionalismo extra) */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-900 font-bold text-lg mb-2">ShopModerno</p>
          <p className="text-slate-500 text-sm">
            © 2025 ShopModerno Inc. Diseñado para la excelencia.
          </p>
        </div>
      </footer>
    </div>
  );
}