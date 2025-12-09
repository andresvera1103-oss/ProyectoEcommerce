import Image from "next/image";
import Link from "next/link";
import { getAllProducts, getCategories } from "@/lib/api";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AddToCartButton from "@/components/AddToCartButton";
import CategoryFilter from "@/components/CategoryFilter";
import ProductFilters from "@/components/ProductFilters";
import { Filter, Star, Zap, TrendingUp, Tag } from "lucide-react";

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
    ? `Búsqueda: "${query}"` 
    : category 
      ? `Categoría: ${category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}` 
      : "Catálogo Completo";

  return (
    // FONDO BASE: Gris suave en claro (para contraste) | Oscuro profundo en dark
    <div className="min-h-screen bg-slate-100 dark:bg-[#020617] text-slate-900 dark:text-slate-200 transition-colors duration-300">
      
      {/* HERO SECTION */}
      <section className="relative bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 pt-16 pb-20 overflow-hidden shadow-sm">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] dark:hidden"></div>
        <div className="hidden dark:block absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wide mb-6 dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-300">
            <Zap className="h-3 w-3 fill-current" /> Ofertas de Temporada
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-slate-900 dark:text-white drop-shadow-sm">
            Calidad que <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">Inspira.</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Explora lo último en tendencias con la garantía de ShopModerno.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        
        {/* BARRA DE HERRAMIENTAS */}
        <div className="mb-12 space-y-6 bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-50 dark:bg-slate-800 rounded-lg text-indigo-600 dark:text-indigo-400">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white capitalize">{pageTitle}</h2>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {products.length} productos disponibles
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <ProductFilters /> 
            <CategoryFilter categories={categories} />
          </div>
        </div>

        {/* GRID DE PRODUCTOS PROFESIONAL */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <Card 
                key={product.id} 
                className="group h-full flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden rounded-2xl"
              >
                <Link href={`/product/${product.id}`} className="flex-1 flex flex-col relative">
                  
                  {/* IMAGEN DEL PRODUCTO (Aquí está la mejora de color) */}
                  <div className="relative h-64 w-full p-6 flex items-center justify-center overflow-hidden border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 transition-colors">
                    <Image
                      src={product.thumbnail || product.image}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="object-contain h-full w-auto group-hover:scale-110 transition-transform duration-500 ease-out z-10 mix-blend-multiply dark:mix-blend-normal"
                    />
                    
                    {/* Badge Categoría */}
                    <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="bg-slate-100/90 dark:bg-black/40 backdrop-blur-sm border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-200">
                        {product.category}
                        </Badge>
                    </div>

                    {/* Badge Descuento */}
                    {product.discountPercentage > 0 && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 px-2 py-1 rounded-md">
                        <Tag className="h-3 w-3 text-red-600 dark:text-red-400" />
                        <span className="text-[10px] font-bold text-red-600 dark:text-red-400">
                            -{Math.round(product.discountPercentage)}%
                        </span>
                      </div>
                    )}
                  </div>

                  {/* CONTENIDO DE LA TARJETA */}
                  <CardContent className="flex-1 p-5 flex flex-col">
                    <div className="mb-2">
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base leading-snug line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {product.title}
                      </h3>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                       <div className="flex text-amber-400">
                          <Star className="h-3.5 w-3.5 fill-current" />
                       </div>
                       <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                         {product.rating.rate}
                       </span>
                       <span className="text-xs text-slate-400">
                         ({product.rating.count})
                       </span>
                    </div>

                    <div className="mt-auto pt-2 flex items-end justify-between border-t border-slate-50 dark:border-slate-800/50">
                       <div className="flex flex-col">
                         {product.discountPercentage > 0 && (
                             <span className="text-[10px] text-slate-400 line-through mb-0.5">
                               ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                             </span>
                         )}
                         <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                          ${product.price}
                        </span>
                       </div>
                    </div>
                  </CardContent>
                </Link>

                {/* FOOTER SEPARADO PARA EL BOTÓN */}
                <CardFooter className="p-5 pt-0 mt-auto">
                  <div className="w-full">
                    <AddToCartButton product={product} />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 bg-white dark:bg-slate-900/30 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 shadow-sm">
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-full mb-4">
              <Filter className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No encontramos productos</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm text-center text-sm">
              Intenta con otra categoría o ajusta tus filtros de búsqueda.
            </p>
            <Link href="/" className="mt-6">
              <Badge className="px-6 py-2.5 text-sm bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 cursor-pointer transition-colors">
                Ver todo el catálogo
              </Badge>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}