import Image from "next/image";
import Link from "next/link";
import { getAllProducts, getCategories } from "@/lib/api";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AddToCartButton from "@/components/AddToCartButton";
import CategoryFilter from "@/components/CategoryFilter";
import ProductFilters from "@/components/ProductFilters";
import { Filter, Star, Zap, TrendingUp } from "lucide-react";

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
      <section className="relative bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:hidden"></div>
        <div className="hidden dark:block absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wide mb-6 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-300">
            <Zap className="h-3 w-3 fill-current" /> Nueva Temporada
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-slate-900 dark:text-white drop-shadow-sm">
            Tecnología y <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-emerald-400">Estilo.</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Descubre nuestra selección premium con la mejor calidad.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        
        {/* FILTROS */}
        <div className="mb-12 space-y-8">
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white capitalize tracking-tight">{pageTitle}</h2>
          </div>

          <div className="space-y-6">
            <ProductFilters /> 
            <CategoryFilter categories={categories} />
          </div>
        </div>

        {/* GRID DE PRODUCTOS CORREGIDO */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <Card 
                key={product.id} 
                className="group h-full flex flex-col bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden rounded-2xl"
              >
                <Link href={`/product/${product.id}`} className="flex-1 flex flex-col relative">
                  
                  {/* IMAGEN */}
                  <div className="relative h-64 w-full bg-white p-6 flex items-center justify-center overflow-hidden border-b border-slate-100 dark:border-slate-800">
                    <Image
                      src={product.thumbnail || product.image}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="object-contain h-full w-auto group-hover:scale-110 transition-transform duration-500 ease-out z-10"
                    />
                    
                    {product.discountPercentage > 0 && (
                      <Badge className="absolute top-3 right-3 bg-red-100 text-red-600 border-red-200 dark:bg-red-500/10 dark:text-red-400 font-bold pointer-events-none">
                        -{Math.round(product.discountPercentage)}%
                      </Badge>
                    )}
                  </div>

                  {/* CONTENIDO */}
                  <CardContent className="flex-1 p-5 flex flex-col">
                    <div className="mb-2">
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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
                    </div>

                    <div className="mt-auto flex items-baseline gap-2">
                       <span className="text-xl font-black text-slate-900 dark:text-white">
                        ${product.price}
                      </span>
                    </div>
                  </CardContent>
                </Link>

                {/* FOOTER CON BOTÓN DE ACCIÓN */}
                <CardFooter className="p-5 pt-0 mt-auto">
                  <div className="w-full">
                    <AddToCartButton product={product} />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
            <p className="text-slate-500">No encontramos productos.</p>
          </div>
        )}
      </main>
    </div>
  );
}