'use client';

import Link from "next/link"; // 1. Importamos Link
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose, // 2. Importamos SheetClose para cerrar el menú al navegar
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function CartSheet() {
  // Obtenemos las funciones y datos del store
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();
  const total = getTotalPrice();
  const itemCount = getTotalItems();

  return (
    <Sheet>
      {/* El Trigger es el botón que abre el carrito */}
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-600">
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Tu Carrito ({itemCount} productos)</SheetTitle>
        </SheetHeader>
        
        <Separator className="my-4" />

        {/* Lista de Productos (Área con scroll) */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ShoppingCart className="h-16 w-16 mb-4 opacity-20" />
              <p>Tu carrito está vacío.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative h-20 w-20 bg-white rounded-md border overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <h4 className="text-sm font-semibold line-clamp-2">{item.title}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm w-4 text-center">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-100"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pie del Carrito (Totales y Botón Pagar) */}
        {items.length > 0 && (
          <SheetFooter className="mt-auto pt-4">
            <div className="w-full space-y-4">
              <Separator />
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              {/* 3. Botón conectado con Link y SheetClose */}
              <SheetClose asChild>
                <Link href="/checkout" className="w-full block">
                  <Button className="w-full size-lg bg-blue-600 hover:bg-blue-700">
                    Proceder al Pago
                  </Button>
                </Link>
              </SheetClose>
              
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}