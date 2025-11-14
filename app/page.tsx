import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/api";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AddToCartButton from "@/components/AddToCartButton";

// Forzamos renderizado dinámico para evitar errores en Vercel
export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await getAllProducts();

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 mt-8">Nuestra Colección</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200 overflow-hidden">
            
            <Link href={`/product/${product.id}`} className="group flex-1 flex flex-col cursor-pointer">
              <CardHeader className="p-0">
                <div className="relative h-64 w-full bg-white p-4 flex items-center justify-center border-b">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={200}
                    height={200}
                    className="object-contain h-full w-auto group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="text-xs mb-2 truncate max-w-[120px]">
                    {product.category}
                  </Badge>
                  <span className="font-bold text-lg text-green-600 shrink-0 ml-2">
                    ${product.price}
                  </span>
                </div>
                <CardTitle className="text-base line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                  {product.title}
                </CardTitle>
              </CardContent>
            </Link>

            {/* Aquí arreglamos el borde: añadimos padding (p-4) */}
            <CardFooter className="p-4 pt-0 mt-auto">
              <div className="w-full">
                <AddToCartButton product={product} />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}