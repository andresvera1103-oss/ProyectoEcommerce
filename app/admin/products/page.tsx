import Image from "next/image";
import { getAllProducts } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Inventario de Productos</h1>
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader className="border-b border-slate-800">
          <CardTitle className="text-white">Listado General</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 uppercase bg-slate-950 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Producto</th>
                  <th className="px-6 py-4">Categoría</th>
                  <th className="px-6 py-4">Precio</th>
                  <th className="px-6 py-4">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-200 flex items-center gap-4">
                      <div className="relative h-10 w-10 bg-white rounded border border-slate-600 p-1">
                        <Image src={product.image} alt="" fill className="object-contain" />
                      </div>
                      <span className="line-clamp-1 max-w-[200px]">{product.title}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="border-slate-600 text-slate-300">{product.category}</Badge>
                    </td>
                    <td className="px-6 py-4 font-bold text-white">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-slate-400">
                        <span className="text-yellow-500">★</span> {product.rating.rate}
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