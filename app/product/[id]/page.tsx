import Image from "next/image";
import Link from "next/link";
import { getProductById } from "@/lib/api";
import AddToCartButton from "@/components/AddToCartButton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, ArrowLeft, Check, Truck, Shield } from "lucide-react";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.id);
  return {
    title: `${product.title} | ShopModerno`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.id);

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-200 py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors font-medium group">
          <div className="bg-slate-800 p-2 rounded-full mr-3 group-hover:bg-blue-600 transition-colors">
            <ArrowLeft className="h-4 w-4 text-white" />
          </div>
          Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* COLUMNA IZQUIERDA: Imagen Heroica */}
          <div className="relative h-[500px] w-full bg-white rounded-3xl overflow-hidden flex items-center justify-center shadow-2xl shadow-blue-900/10 group">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-12 hover:scale-110 transition-transform duration-500 ease-out"
              priority 
            />
          </div>

          {/* COLUMNA DERECHA: Detalles */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-blue-600 hover:bg-blue-700 text-white border-0 px-3 py-1">{product.category}</Badge>
                <div className="flex items-center gap-1 text-yellow-400 text-sm font-medium bg-yellow-400/10 px-2 py-1 rounded-full">
                  <Star className="fill-current h-3 w-3" />
                  <span>{product.rating.rate}</span>
                  <span className="text-slate-500 ml-1">({product.rating.count} reviews)</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {product.title}
              </h1>
              
              <div className="flex items-baseline gap-4">
                 <span className="text-4xl font-bold text-white">${product.price}</span>
                 <span className="text-lg text-slate-500 line-through">${(product.price * 1.2).toFixed(2)}</span>
              </div>
            </div>

            <div className="prose prose-invert text-slate-400 leading-relaxed border-l-2 border-slate-800 pl-4">
              <p>{product.description}</p>
            </div>

            {/* Características Extra */}
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
                  <Truck className="h-8 w-8 text-blue-500" />
                  <div className="text-sm">
                    <p className="font-bold text-white">Envío Gratis</p>
                    <p className="text-slate-500">En 24-48 horas</p>
                  </div>
               </div>
               <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
                  <Shield className="h-8 w-8 text-emerald-500" />
                  <div className="text-sm">
                    <p className="font-bold text-white">Garantía</p>
                    <p className="text-slate-500">2 años incluidos</p>
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
                 <Check className="h-3 w-3" /> Stock disponible para envío inmediato
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}