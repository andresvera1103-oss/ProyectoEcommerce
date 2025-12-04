'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import Image from "next/image";
import { Eye, Package } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export default function AdminOrdersPage() {
  const orders = useCartStore((state) => state.orders);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Pedidos Realizados</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20 text-slate-500 bg-slate-900 rounded-xl border border-dashed border-slate-800">
          <Package className="h-12 w-12 mx-auto mb-4 opacity-20" />
          <p>No hay pedidos registrados aún.</p>
        </div>
      ) : (
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="border-b border-slate-800">
            <CardTitle className="text-white">Historial de Ventas Recientes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-400 uppercase bg-slate-950 border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">ID Pedido</th>
                    <th className="px-6 py-4">Fecha</th>
                    <th className="px-6 py-4">Estado</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-slate-400">#{order.id}</td>
                      <td className="px-6 py-4 text-slate-400">{order.date}</td>
                      <td className="px-6 py-4">
                        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20">
                          {order.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 font-bold text-white">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2 border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white">
                              <Eye className="h-4 w-4" /> Ver
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-800 text-slate-200">
                            <DialogHeader>
                              <DialogTitle className="text-white">Detalles del Pedido #{order.id}</DialogTitle>
                            </DialogHeader>
                            <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar-dark">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex gap-4 items-center bg-slate-950/50 p-2 rounded-lg border border-slate-800">
                                  <div className="relative h-12 w-12 bg-white rounded overflow-hidden flex-shrink-0">
                                    <Image src={item.image} alt={item.title} fill className="object-contain p-1" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-white line-clamp-1">{item.title}</p>
                                    <p className="text-xs text-slate-500">
                                      {item.quantity} x ${item.price}
                                    </p>
                                  </div>
                                  <div className="font-bold text-sm text-emerald-400">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <Separator className="bg-slate-800" />
                            <div className="flex justify-between items-center pt-2">
                              <span className="font-bold text-slate-400">Total Pagado:</span>
                              <span className="text-xl font-bold text-white">${order.total.toFixed(2)}</span>
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
