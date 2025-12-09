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
    <div className="min-h-screen bg-[#0B1120] text-slate-200 py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors font-medium group">
          <div className="bg-slate-800 p-2 rounded-full mr-3 group-hover:bg-blue-600 transition-colors">
            <ArrowLeft className="h-4 w-4 text-white" />
          </div>
          Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          {/* Imagen */}
          <div className="relative h-[400px] md:h-[500px] w-full bg-white rounded-3xl overflow-hidden flex items-center justify-center shadow-2xl shadow-blue-900/10">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-8 hover:scale-105 transition-transform duration-500 ease-out"
              priority 
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-1 capitalize">{product.category}</Badge>
                <div className="flex items-center gap-1 text-yellow-400 text-sm font-medium bg-yellow-400/10 px-2 py-1 rounded-full">
                  <Star className="fill-current h-3 w-3" />
                  {/* 👇 CORRECCIÓN: Añadido .rate para mostrar el número */}
                  <span>{product.rating.rate}</span>
                  <span className="text-slate-500 ml-1">({product.rating.count} reviews)</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">{product.title}</h1>
              
              <div className="flex items-center gap-4">
                 <span className="text-4xl font-bold text-white">${product.price}</span>
                 {product.discountPercentage > 0 && (
                   <Badge variant="destructive" className="text-sm">-{Math.round(product.discountPercentage)}% OFF</Badge>
                 )}
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-lg border-l-2 border-slate-700 pl-4">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
                  <Truck className="h-6 w-6 text-blue-500" />
                  <div>
                    <p className="font-bold text-white text-sm">Envío Gratis</p>
                    <p className="text-xs text-slate-500">Global</p>
                  </div>
               </div>
               <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
                  <Shield className="h-6 w-6 text-emerald-500" />
                  <div>
                    <p className="font-bold text-white text-sm">Garantía</p>
                    <p className="text-xs text-slate-500">Original</p>
                  </div>
               </div>
            </div>

            <Separator className="bg-slate-800" />

            <div className="space-y-4">
              <p className="text-sm font-medium text-white">Cantidad:</p>
              <div className="w-full max-w-md">
                <AddToCartButton product={product} />
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-400 mt-2">
                 <Check className="h-3 w-3" /> Stock disponible ({product.stock} unidades)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}