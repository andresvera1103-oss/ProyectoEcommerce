import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/api";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AddToCartButton from "@/components/AddToCartButton";
import { Star, ArrowRight } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* HERO SECTION OSCURO Y ELEGANTE */}
      <section className="bg-slate-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="text-blue-400 font-semibold tracking-wider uppercase text-xs mb-2 block">Nueva Colección 2024</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-white">
            Tecnología y Estilo <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Sin Límites.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
            Explora los productos más exclusivos con la mejor garantía del mercado. Envíos a todo el país en 24 horas.
          </p>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <main className="container mx-auto px-4 py-16 -mt-12 relative z-20">
        <div className="flex justify-between items-end mb-8 px-2">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Destacados</h2>
            <p className="text-slate-500">Selección premium para ti</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group h-full flex flex-col border-0 shadow-sm hover:shadow-2xl transition-all duration-300 bg-white overflow-hidden rounded-xl">
              
              <Link href={`/product/${product.id}`} className="flex-1 flex flex-col">
                <div className="relative h-64 w-full bg-white p-8 flex items-center justify-center overflow-hidden border-b border-slate-100">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={200}
                    height={200}
                    className="object-contain h-full w-auto group-hover:scale-110 transition-transform duration-500 ease-in-out"
                  />
                  <Badge className="absolute top-3 left-3 bg-slate-900 text-white hover:bg-slate-800">
                    {product.category}
                  </Badge>
                </div>

                <CardContent className="p-5">
                  <div className="flex items-center gap-1 text-yellow-500 text-xs mb-2">
                    <Star className="h-3 w-3 fill-current" />
                    <span className="font-bold text-slate-700">{product.rating.rate}</span>
                    <span className="text-slate-400">({product.rating.count})</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">
                    {product.title}
                  </h3>
                  <p className="text-2xl font-bold text-slate-900">
                    ${product.price}
                  </p>
                </CardContent>
              </Link>

              <CardFooter className="p-5 pt-0 mt-auto">
                <div className="w-full">
                  <AddToCartButton product={product} />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      
      <footer className="bg-white border-t border-slate-200 py-12 mt-20">
        <div className="container mx-auto text-center text-slate-500 text-sm">
          <p>© 2024 ShopModerno Inc. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}