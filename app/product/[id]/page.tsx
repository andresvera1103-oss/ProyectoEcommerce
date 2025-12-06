import Image from "next/image";
import Link from "next/link";
import { getProductById } from "@/lib/api";
import AddToCartButton from "@/components/AddToCartButton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, ArrowLeft, Truck, Shield, Check } from "lucide-react";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.id);
  if (!product) return { title: 'Producto no encontrado' };
  return {
    title: `${product.title} | ShopModerno`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.id);

  if (!product) return <div className="text-white text-center py-20">Producto no encontrado</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-200 py-10 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <Link href="/" className="inline-flex items-center text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white mb-8 transition-colors font-medium group">
          <div className="bg-white dark:bg-slate-800 p-2 rounded-full mr-3 shadow-sm group-hover:bg-blue-600 transition-colors border border-slate-200 dark:border-slate-700">
            <ArrowLeft className="h-4 w-4 text-slate-600 dark:text-white group-hover:text-white" />
          </div>
          Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          {/* Imagen */}
          <div className="relative h-[400px] md:h-[500px] w-full bg-white p-8 rounded-3xl overflow-hidden flex items-center justify-center shadow-xl border border-slate-200 dark:border-slate-800">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-4 hover:scale-105 transition-transform duration-500 ease-out"
              priority 
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-1 capitalize">{product.category}</Badge>
                <div className="flex items-center gap-1 text-yellow-500 dark:text-yellow-400 text-sm font-medium bg-yellow-50 dark:bg-yellow-400/10 px-2 py-1 rounded-full border border-yellow-100 dark:border-transparent">
                  <Star className="fill-current h-3 w-3" />
                  {/* 👇 CORRECCIÓN: Usamos .rate para obtener el número */}
                  <span>{product.rating.rate}</span>
                  <span className="text-slate-500 ml-1">({product.rating.count} reviews)</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">{product.title}</h1>
              
              <div className="flex items-center gap-4">
                 <span className="text-4xl font-bold text-slate-900 dark:text-white">${product.price}</span>
                 {product.discountPercentage > 0 && (
                   <Badge variant="destructive" className="text-sm">-{Math.round(product.discountPercentage)}% OFF</Badge>
                 )}
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg border-l-4 border-slate-200 dark:border-slate-700 pl-4">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3 shadow-sm">
                  <Truck className="h-6 w-6 text-blue-500" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">Envío Gratis</p>
                    <p className="text-xs text-slate-500">Global</p>
                  </div>
               </div>
               <div className="bg-white dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3 shadow-sm">
                  <Shield className="h-6 w-6 text-emerald-500" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">Garantía</p>
                    <p className="text-xs text-slate-500">Original</p>
                  </div>
               </div>
            </div>

            <Separator className="bg-slate-200 dark:bg-slate-800" />

            <div className="space-y-4">
              <p className="text-sm font-medium text-slate-900 dark:text-white">Cantidad:</p>
              <div className="w-full max-w-md">
                <AddToCartButton product={product} />
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 mt-2">
                 <Check className="h-3 w-3" /> Stock disponible ({product.stock} unidades)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}