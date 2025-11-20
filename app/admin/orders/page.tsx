'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import Image from "next/image";
import { Eye, Package } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export default function AdminOrdersPage() {
  const orders = useCartStore((state) => state.orders);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Pedidos Realizados</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
          <Package className="h-12 w-12 mx-auto mb-4 opacity-20" />
          <p>No hay pedidos registrados aún.</p>
          <p className="text-sm">Realiza una compra en la tienda para verla aquí.</p>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Historial de Ventas Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                  <tr>
                    <th className="px-6 py-3">ID Pedido</th>
                    <th className="px-6 py-3">Fecha</th>
                    <th className="px-6 py-3">Estado</th>
                    <th className="px-6 py-3">Total</th>
                    <th className="px-6 py-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="bg-white border-b hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-slate-600">#{order.id}</td>
                      <td className="px-6 py-4 text-slate-600">{order.date}</td>
                      <td className="px-6 py-4">
                        <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-200">
                          {order.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        
                        {/* MODAL DE DETALLES */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2">
                              <Eye className="h-4 w-4" /> Ver Productos
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Detalles del Pedido #{order.id}</DialogTitle>
                            </DialogHeader>
                            <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex gap-4 items-center">
                                  <div className="relative h-16 w-16 bg-white border rounded-md overflow-hidden flex-shrink-0">
                                    <Image src={item.image} alt={item.title} fill className="object-contain p-1" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium line-clamp-2">{item.title}</p>
                                    <p className="text-xs text-gray-500">
                                      {item.quantity} x ${item.price}
                                    </p>
                                  </div>
                                  <div className="font-bold text-sm">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center pt-2">
                              <span className="font-bold">Total Pagado:</span>
                              <span className="text-xl font-bold text-green-600">${order.total.toFixed(2)}</span>
                            </div>
                          </DialogContent>
                        </Dialog>

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