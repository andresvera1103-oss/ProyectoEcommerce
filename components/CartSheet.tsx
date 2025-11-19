'use client';

import Link from "next/link";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // 1. Importamos Input
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function CartSheet() {
  const { items, removeItem, updateQuantity, getTotals, getTotalItems } = useCartStore();
  const { subtotal, iva, total } = getTotals();
  const itemCount = getTotalItems();

  // Función auxiliar para manejar el cambio manual de número
  const handleInputChange = (id: number, value: string) => {
    const numValue = parseInt(value);
    // Solo actualizamos si es un número válido y mayor o igual a 1
    if (!isNaN(numValue) && numValue >= 1) {
      updateQuantity(id, numValue);
    }
  };

  return (
    <Sheet>
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

      <SheetContent className="w-full sm:max-w-md flex flex-col h-full">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">Tu Carrito ({itemCount} productos)</SheetTitle>
        </SheetHeader>
        
        <Separator className="my-4" />

        {/* Área de productos con Scroll */}
        <div className="flex-1 overflow-y-auto pr-4 -mr-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
              <div className="bg-gray-100 p-6 rounded-full">
                <ShoppingCart className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-lg font-medium">Tu carrito está vacío.</p>
              <SheetClose asChild>
                <Button variant="link">Ir a comprar</Button>
              </SheetClose>
            </div>
          ) : (
            <div className="space-y-6"> {/* Espaciado general */}
              {items.map((item, index) => (
                <div key={item.id}>
                  <div className="flex gap-4">
                    {/* Imagen del Producto */}
                    <div className="relative h-24 w-24 bg-white rounded-lg border border-gray-200 overflow-hidden flex-shrink-0 shadow-sm">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain p-2"
                      />
                    </div>

                    {/* Info y Controles */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
                          {item.title}
                        </h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-red-600 -mr-2 -mt-2"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-end justify-between mt-2">
                        {/* 2. Control de Cantidad Editable */}
                        <div className="flex items-center border border-gray-200 rounded-md bg-gray-50">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-none rounded-l-md hover:bg-white"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          
                          {/* INPUT EDITABLE AQUÍ */}
                          <Input 
                            type="number"
                            min={1}
                            className="h-8 w-12 text-center border-0 bg-transparent p-0 focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            value={item.quantity}
                            onChange={(e) => handleInputChange(item.id, e.target.value)}
                          />

                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-none rounded-r-md hover:bg-white"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="text-right">
                           <p className="text-xs text-gray-500 mb-0.5">Precio unit.: ${item.price}</p>
                           <p className="font-bold text-base text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 1. Línea separadora (solo si no es el último elemento) */}
                  {index < items.length - 1 && (
                    <Separator className="my-6 bg-gray-100" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Totales */}
        {items.length > 0 && (
          <SheetFooter className="mt-auto pt-6 border-t bg-white">
            <div className="w-full space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>IVA (15%)</span>
                <span>${iva.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold text-gray-900 pt-2 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <SheetClose asChild>
                <Link href="/checkout" className="w-full block pt-2">
                  <Button className="w-full size-lg text-base bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all">
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