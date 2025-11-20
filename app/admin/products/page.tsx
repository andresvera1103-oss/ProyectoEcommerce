import Image from "next/image";
import { getAllProducts } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Inventario de Productos</h1>
        {/* 👇 ELIMINADO: El botón de "Nuevo Producto" ya no está aquí. */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listado General</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3">Producto</th>
                  <th className="px-6 py-3">Categoría</th>
                  <th className="px-6 py-3">Precio</th>
                  <th className="px-6 py-3">Rating</th>
                  <th className="px-6 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="bg-white border-b hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-4">
                      <div className="relative h-10 w-10 bg-white rounded border p-1">
                        <Image src={product.image} alt="" fill className="object-contain" />
                      </div>
                      <span className="line-clamp-1 max-w-[200px]">{product.title}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline">{product.category}</Badge>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-700">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span> {product.rating.rate}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {/* Botones decorativos (no hacen nada por seguridad en este demo) */}
                        <Button variant="outline" size="icon" className="h-8 w-8 text-blue-600 opacity-50 cursor-not-allowed">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50 opacity-50 cursor-not-allowed">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}