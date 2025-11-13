import Image from "next/image";
import Link from "next/link";
import { getAllProducts, Product } from "@/lib/api";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// 1. Importamos tu nuevo componente de botón
import AddToCartButton from "@/components/AddToCartButton";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 mt-8">Nuestra Colección</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          // 2. El <Link> YA NO envuelve toda la tarjeta.
          // La Card es el componente raíz.
          <Card key={product.id} className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
            
            {/* 3. El Link ahora envuelve la imagen y el contenido principal */}
            <Link href={`/product/${product.id}`} className="group flex-1 flex flex-col">
              <CardHeader className="p-0">
                <div className="relative h-64 w-full bg-white p-4 flex items-center justify-center rounded-t-xl overflow-hidden">
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
                  <Badge variant="secondary" className="text-xs mb-2">
                    {product.category}
                  </Badge>
                  <span className="font-bold text-lg text-green-600">
                    ${product.price}
                  </span>
                </div>
                <CardTitle className="text-base line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {product.title}
                </CardTitle>
              </CardContent>
            </Link>

            {/* 4. El Footer está FUERA del Link y contiene nuestro botón funcional */}
            <CardFooter className="p-4 pt-0">
              <AddToCartButton product={product} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}