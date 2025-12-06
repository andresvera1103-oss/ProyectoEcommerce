import Image from "next/image";
import Link from "next/link";
import { getAllProducts, getCategories } from "@/lib/api";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AddToCartButton from "@/components/AddToCartButton";
import CategoryFilter from "@/components/CategoryFilter";
import ProductFilters from "@/components/ProductFilters";
import { Filter, Star, Zap } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string; sort?: string }>;
}) {
  const resolvedParams = await searchParams;
  const category = resolvedParams.category;
  const query = resolvedParams.q;
  const sort = resolvedParams.sort;

  const [rawProducts, categories] = await Promise.all([
    getAllProducts(category, query),
    getCategories()
  ]);

  // Ordenamiento manual
  let products = [...rawProducts];
  if (sort === 'price-asc') {
    products.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    products.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating-desc') {
    products.sort((a, b) => b.rating.rate - a.rating.rate);
  }

  const pageTitle = query 
    ? `Resultados para: "${query}"` 
    : category 
      ? `Categoría: ${category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}` 
      : "Nuestra Colección";

  return (
    // 👇 CAMBIO CLAVE: bg-gray-50 para CLARO, bg-[#0B1120] para OSCURO
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-200 transition-colors duration-300">
      
      {/* HERO SECTION DUAL */}
      <section className="relative bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/50 py-16 md:py-20 overflow-hidden">
        {/* Fondo decorativo solo visible en dark mode */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[120px]"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="outline" className="mb-4 border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/50 dark:text-blue-300 dark:bg-blue-500/10 px-4 py-1">
            ✨ Nueva Temporada
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-slate-900 dark:text-white">
            Tecnología y <span className="text-blue-600 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-400 dark:to-emerald-400">Estilo.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Descubre los productos más exclusivos con la mejor garantía del mercado.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        
        {/* BARRA DE FILTROS */}
        <div className="mb-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
                <Filter className="h-5 w-5 text-blue-600 dark:text-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white capitalize tracking-tight">{pageTitle}</h2>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {products.length} productos disponibles
                </span>
              </div>
            </div>
          </div>

          <ProductFilters /> 
          <CategoryFilter categories={categories} />
        </div>

        {/* GRID DE PRODUCTOS */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              // TARJETA DUAL: Blanca con sombra suave en Light, Oscura con borde neón en Dark
              <Card key={product.id} className="group h-full flex flex-col bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl dark:hover:border-blue-500/40 transition-all duration-300 overflow-hidden rounded-2xl">
                
                <Link href={`/product/${product.id}`} className="flex-1 flex flex-col relative">
                  {/* Contenedor Imagen */}
                  <div className="relative h-64 w-full bg-white p-8 flex items-center justify-center overflow-hidden border-b border-slate-100 dark:border-slate-800">
                    <Image
                      src={product.thumbnail || product.image}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="object-contain h-full w-auto group-hover:scale-110 transition-transform duration-500 ease-out z-10"
                    />
                    
                    <Badge className="absolute top-3 left-3 bg-slate-100 text-slate-900 border-slate-200 dark:bg-black/50 dark:text-white dark:border-white/10 backdrop-blur-md">
                      {product.category}
                    </Badge>

                    {product.discountPercentage > 0 && (
                      <Badge className="absolute top-3 right-3 bg-red-100 text-red-600 border-red-200 dark:bg-red-900/80 dark:text-white dark:border-red-500/50">
                        -{Math.round(product.discountPercentage)}%
                      </Badge>
                    )}
                  </div>

                  <CardContent className="flex-1 p-5">
                    <div className="mb-2">
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg leading-snug line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {product.title}
                      </h3>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                       <div className="flex text-yellow-400">
                          <Star className="h-4 w-4 fill-current" />
                       </div>
                       {/* 👇 CORRECCIÓN DEL ERROR: Usamos .rate */}
                       <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                         {product.rating.rate}
                       </span>
                       <span className="text-xs text-slate-400">
                         ({product.rating.count})
                       </span>
                    </div>

                    <div className="flex items-end justify-between mt-auto">
                       <div className="flex flex-col">
                         {product.discountPercentage > 0 && (
                           <span className="text-xs text-slate-400 line-through">
                             ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                           </span>
                         )}
                         <span className="text-2xl font-bold text-slate-900 dark:text-white">
                          ${product.price}
                        </span>
                       </div>
                    </div>
                  </CardContent>
                </Link>

                <CardFooter className="p-5 pt-0 mt-auto">
                  <div className="w-full pt-4 border-t border-slate-100 dark:border-slate-800/50">
                    <AddToCartButton product={product} />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
              <Filter className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-white">No encontramos productos</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Intenta ajustar tus filtros o busca algo diferente.
            </p>
            <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline mt-4 block font-medium">
              Limpiar filtros
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}