import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/api";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AddToCartButton from "@/components/AddToCartButton";
import { Sparkles, Zap, Award } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-200"> {/* Fondo oscuro profundo */}
      
      {/* HERO SECTION FUTURISTA */}
      <section className="relative py-20 overflow-hidden">
        {/* Luces de fondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="outline" className="mb-6 border-blue-500/50 text-blue-300 bg-blue-500/10 px-4 py-1">
            ✨ Nueva Temporada
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 drop-shadow-sm">
            El Futuro del Estilo.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Descubre productos diseñados para destacar. Calidad premium, estética inigualable.
          </p>
        </div>
      </section>

      {/* GRID DE PRODUCTOS DARK MODE */}
      <main className="container mx-auto px-4 pb-20">
        <div className="flex items-center gap-3 mb-10">
          <Zap className="h-6 w-6 text-yellow-400 fill-current" />
          <h2 className="text-2xl font-bold text-white tracking-wide">Trending Now</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className="group h-full flex flex-col bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.2)] transition-all duration-500 overflow-hidden rounded-2xl"
            >
              
              <Link href={`/product/${product.id}`} className="flex-1 flex flex-col relative">
                
                {/* Imagen con contenedor oscuro pero iluminado */}
                <div className="relative h-72 w-full bg-[#161f32] p-8 flex items-center justify-center overflow-hidden">
                  {/* Círculo de luz detrás del producto */}
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
                  
                  <div className="flex items-center gap-2 mb-4">
                     <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} filled={i < Math.round(product.rating.rate)} />
                        ))}
                     </div>
                     <span className="text-xs text-slate-500">({product.rating.count})</span>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                     <span className="text-2xl font-bold text-white">
                      ${product.price}
                    </span>
                  </div>
                </CardContent>
              </Link>

              {/* Footer integrado */}
              <CardFooter className="p-6 pt-0 bg-slate-900/50">
                <div className="w-full pt-4 border-t border-slate-800/50">
                  <AddToCartButton product={product} />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <footer className="bg-slate-950 border-t border-slate-900 py-16 mt-10">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Shop<span className="text-blue-500">Moderno</span></h3>
          <p className="text-slate-500 text-sm mb-6">Diseñado para el futuro del comercio.</p>
          <div className="flex justify-center gap-6 text-slate-400">
             <span>Instagram</span> • <span>Twitter</span> • <span>LinkedIn</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Pequeño componente auxiliar para estrellas
function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-3 w-3 ${filled ? "text-yellow-400" : "text-slate-600"}`}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}