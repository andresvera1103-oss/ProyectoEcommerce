import Image from "next/image";
import { getProductById } from "@/lib/api";
import AddToCartButton from "@/components/AddToCartButton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react"; // Ícono de estrella para el rating

// Metadata dinámica para SEO (El título de la pestaña cambia según el producto)
export async function generateMetadata({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.id);
  return {
    title: `${product.title} | ShopModerno`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  // 1. "Desempaquetamos" los params (recordando lo que aprendimos en el proyecto anterior)
  const resolvedParams = await params;
  
  // 2. Obtenemos los datos del producto específico
  const product = await getProductById(resolvedParams.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        
        {/* COLUMNA IZQUIERDA: Imagen Grande */}
        <div className="relative h-[400px] md:h-[500px] w-full bg-white rounded-xl border p-8 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4 hover:scale-105 transition-transform duration-300"
            priority // Carga esta imagen con prioridad (es lo más importante de la página)
          />
        </div>

        {/* COLUMNA DERECHA: Información */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <Badge className="mb-4 text-sm">{product.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            
            {/* Rating (Estrellas y conteo) */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="flex items-center text-yellow-500">
                <Star className="fill-current h-4 w-4" />
                <span className="ml-1 font-semibold">{product.rating.rate}</span>
              </div>
              <span>•</span>
              <span>{product.rating.count} reseñas</span>
            </div>
          </div>

          <div className="text-3xl font-bold text-green-600">
            ${product.price}
          </div>

          <div className="prose prose-sm text-gray-600 leading-relaxed">
            <p>{product.description}</p>
          </div>

          <Separator />

          {/* Acciones */}
          <div className="flex flex-col gap-4">
            {/* Reutilizamos nuestro botón inteligente */}
            <AddToCartButton product={product} />
            
            <p className="text-xs text-gray-400 text-center">
              Envío gratis en pedidos superiores a $50. Devoluciones gratuitas en 30 días.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}