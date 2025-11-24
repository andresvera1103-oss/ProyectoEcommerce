import Image from "next/image";
import Link from "next/link";
import { getAllProducts, getCategories } from "@/lib/api";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AddToCartButton from "@/components/AddToCartButton";
import CategoryFilter from "@/components/CategoryFilter";
import { Truck, ShieldCheck, RefreshCw, ArrowRight, Filter } from "lucide-react";

export const dynamic = 'force-dynamic';

// 👇 CAMBIO 1: Definimos searchParams como Promise
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  // 👇 CAMBIO 2: "Esperamos" a que los parámetros se resuelvan
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams.category;

  // Obtenemos productos y categorías
  const [products, categories] = await Promise.all([
    getAllProducts(category),
    getCategories()
  ]);

  // Formateamos el título para que se vea bonito (ej: "beauty" -> "Beauty")
  const pageTitle = category 
    ? `Categoría: ${category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}` 
    : "Nuestra Colección";

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-200">
      
      {/* HERO SECTION */}
      <section className="relative bg-slate-950 text-white py-12 md:py-16 overflow-hidden border-b border-slate-800/50">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Tecnología y Estilo.
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Explora los productos más exclusivos con la mejor garantía del mercado.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        
        {/* BARRA DE FILTROS Y TÍTULO */}
        <div className="mb-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Filter className="h-6 w-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-white tracking-tight">{pageTitle}</h2>
              <span className="text-sm text-slate-500 bg-slate-900 px-2 py-1 rounded-md border border-slate-800">
                {products.length} resultados
              </span>
            </div>
          </div>

          {/* Componente de Filtros */}
          <CategoryFilter categories={categories} />
        </div>

        {/* GRID DE PRODUCTOS */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="group h-full flex flex-col bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.2)] transition-all duration-500 overflow-hidden rounded-2xl">
                
                <Link href={`/product/${product.id}`} className="flex-1 flex flex-col relative">
                  <div className="relative h-64 w-full bg-[#161f32] p-8 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="object-contain h-full w-auto drop-shadow-xl group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-500 ease-out z-10"
                    />
                    
                    <Badge className="absolute top-4 left-4 bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-black/70">
                      {product.category}
                    </Badge>
                  </div>

                  <CardContent className="flex-1 p-6 bg-slate-900/50 backdrop-blur-sm">
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <h3 className="font-bold text-slate-100 text-lg leading-snug line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {product.title}
                      </h3>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto">
                       <span className="text-2xl font-bold text-white">
                        ${product.price}
                      </span>
                    </div>
                  </CardContent>
                </Link>

                <CardFooter className="p-6 pt-0 bg-slate-900/50">
                  <div className="w-full pt-4 border-t border-slate-800/50">
                    <AddToCartButton product={product} />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/30 rounded-xl border border-slate-800 border-dashed">
            <p className="text-xl text-slate-500">No se encontraron productos en esta categoría.</p>
            <Link href="/" className="text-blue-500 hover:text-blue-400 font-medium hover:underline mt-4 block transition-colors">
              Ver todos los productos
            </Link>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 mt-10">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Shop<span className="text-blue-500">Moderno</span></h3>
          <p className="text-slate-500 text-sm">© 2025 ShopModerno Inc.</p>
        </div>
      </footer>
    </div>
  );
}