'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/store";
import Image from "next/image";

export default function AdminOrdersPage() {
  // Leemos las órdenes reales del store
  const orders = useCartStore((state) => state.orders);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Pedidos Realizados</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p>No hay pedidos registrados aún.</p>
          <p className="text-sm">Realiza una compra en la tienda para verla aquí.</p>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Historial de Ventas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                  <tr>
                    <th className="px-6 py-3">ID Pedido</th>
                    <th className="px-6 py-3">Fecha</th>
                    <th className="px-6 py-3">Productos</th>
                    <th className="px-6 py-3">Estado</th>
                    <th className="px-6 py-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="bg-white border-b hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-slate-600">
                        #{order.id}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {order.date}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex -space-x-2 overflow-hidden">
                          {order.items.slice(0, 4).map((item, i) => (
                            <div key={i} className="relative h-8 w-8 rounded-full border border-white bg-white" title={item.title}>
                               <Image src={item.image} alt="" fill className="object-cover rounded-full" />
                            </div>
                          ))}
                          {order.items.length > 4 && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white bg-gray-100 text-[10px] font-medium text-gray-600">
                              +{order.items.length - 4}
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 mt-1 block">{order.items.length} items</span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
                          {order.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-slate-900">
                        ${order.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}