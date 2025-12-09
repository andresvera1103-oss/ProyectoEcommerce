import Image from "next/image";
import Link from "next/link";
import { getAllProducts, getCategories } from "@/lib/api";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AddToCartButton from "@/components/AddToCartButton";
import CategoryFilter from "@/components/CategoryFilter";
import ProductFilters from "@/components/ProductFilters";
import { Filter, Star, Zap, TrendingUp } from "lucide-react";

// 👇 CONFIGURACIÓN CRÍTICA PARA VERCEL
// Esto le dice a Next.js que NO intente construir esta página estáticamente.
// La página se generará en el servidor cada vez que alguien entre.
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

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

  let products = [...rawProducts];
  if (sort === 'price-asc') products.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') products.sort((a, b) => b.price - a.price);
  else if (sort === 'rating-desc') products.sort((a, b) => b.rating.rate - a.rating.rate);

  const pageTitle = query 
    ? `Resultados para: "${query}"` 
    : category 
      ? `Categoría: ${category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}` 
      : "Nuestra Colección";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-200 transition-colors duration-300">
      
      {/* HERO SECTION */}
      <section className="relative bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:hidden"></div>
        <div className="hidden dark:block absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="hidden dark:block absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wide mb-6 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-300">
            <Zap className="h-3 w-3 fill-current" /> Nueva Temporada
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-slate-900 dark:text-white drop-shadow-sm">
            Estilo que <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-emerald-400">Impacta.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Descubre nuestra selección premium de productos con la mejor calidad y garantía del mercado.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        
        {/* FILTROS */}
        <div className="mb-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-500" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white capitalize tracking-tight">{pageTitle}</h2>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {products.length} productos encontrados
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <ProductFilters /> 
            <CategoryFilter categories={categories} />
          </div>
        </div>

        {/* GRID DE PRODUCTOS */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Card 
                key={product.id} 
                className="group h-full flex flex-col bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl dark:hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.15)] transition-all duration-300 overflow-hidden rounded-2xl"
              >
                <Link href={`/product/${product.id}`} className="flex-1 flex flex-col relative">
                  
                  {/* IMAGEN */}
                  <div className="relative h-72 w-full bg-white p-8 flex items-center justify-center overflow-hidden border-b border-slate-100 dark:border-slate-800">
                    <Image
                      src={product.thumbnail || product.image}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="object-contain h-full w-auto group-hover:scale-110 transition-transform duration-500 ease-out z-10"
                    />
                    
                    <Badge className="absolute top-4 left-4 bg-slate-100 text-slate-900 border border-slate-200 dark:bg-black/60 dark:text-white dark:border-white/10 backdrop-blur-md shadow-sm pointer-events-none">
                      {product.category}
                    </Badge>

                    {product.discountPercentage > 0 && (
                      <Badge className="absolute top-4 right-4 bg-red-50 text-red-600 border border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20 font-bold pointer-events-none">
                        -{Math.round(product.discountPercentage)}%
                      </Badge>
                    )}
                  </div>

                  {/* CONTENIDO */}
                  <CardContent className="flex-1 p-6 flex flex-col">
                    <div className="mb-2">
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg leading-snug line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {product.title}
                      </h3>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                       <div className="flex text-yellow-400">
                          <Star className="h-4 w-4 fill-current" />
                       </div>
                       <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                         {product.rating.rate}
                       </span>
                       <span className="text-xs text-slate-400">
                         ({product.rating.count})
                       </span>
                    </div>

                    <div className="mt-auto pt-2 flex items-baseline gap-3">
                       <span className="text-2xl font-black text-slate-900 dark:text-white">
                        ${product.price}
                      </span>
                      {product.discountPercentage > 0 && (
                         <span className="text-sm text-slate-400 line-through font-medium">
                           ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                         </span>
                       )}
                    </div>
                  </CardContent>
                </Link>

                <CardFooter className="p-6 pt-0 mt-auto">
                  <div className="w-full pt-4 border-t border-slate-100 dark:border-slate-800/50">
                    <AddToCartButton product={product} />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 bg-white dark:bg-slate-900/30 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
              <Filter className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No encontramos productos</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm text-center">
              Intenta con otra categoría o ajusta tu búsqueda.
            </p>
            <Link href="/" className="mt-6">
              <Badge className="px-6 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                Ver todo el catálogo
              </Badge>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}