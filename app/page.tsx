import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/api";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AddToCartButton from "@/components/AddToCartButton";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* 1. HERO SECTION COMPACTO: Sin botones y con menos altura */}
      {/* Cambié py-16 a py-8 para reducir la altura a la mitad */}
      <section className="bg-[#0f172a] text-white py-8 md:py-12 shadow-lg relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
            Estilo que define tu <span className="text-blue-400">esencia</span>.
          </h1>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
            Descubre nuestra colección exclusiva de productos seleccionados.
          </p>
          {/* Se eliminaron los botones que no funcionaban */}
        </div>
      </section>

      {/* 2. GRID DE PRODUCTOS */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group h-full flex flex-col border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden bg-white rounded-xl">
              
              <Link href={`/product/${product.id}`} className="flex-1 flex flex-col relative">
                
                <div className="relative h-64 w-full bg-gray-50 p-6 flex items-center justify-center overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={200}
                    height={200}
                    className="object-contain h-full w-auto mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-3 left-3 bg-white text-gray-900 hover:bg-white shadow-sm border border-gray-100 uppercase text-[10px] tracking-wider">
                    {product.category}
                  </Badge>
                </div>

                <CardContent className="flex-1 p-5 pt-6">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </h3>
                    <span className="font-bold text-lg text-gray-900 shrink-0">
                      ${product.price}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                    {product.description}
                  </p>
                </CardContent>
              </Link>

              <CardFooter className="p-5 pt-0 mt-auto">
                <div className="w-full pt-4 border-t border-gray-100">
                  <AddToCartButton product={product} />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}