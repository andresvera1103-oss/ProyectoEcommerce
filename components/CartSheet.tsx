'use client';

import Link from "next/link";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useState, useEffect } from "react";

// --- SUB-COMPONENTE PARA CADA PRODUCTO ---
function CartItemRow({ item, removeItem, updateQuantity }: any) {
  const [inputValue, setInputValue] = useState(item.quantity.toString());

  useEffect(() => {
    setInputValue(item.quantity.toString());
  }, [item.quantity]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setInputValue(value);
    
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 1) {
      updateQuantity(item.id, numValue);
    }
  };

  const handleBlur = () => {
    if (inputValue === "" || parseInt(inputValue) < 1) {
      setInputValue(item.quantity.toString());
      updateQuantity(item.id, item.quantity);
    }
  };

  return (
    <div>
      <div className="flex gap-4 py-2"> {/* Añadido un poco de padding vertical */}
        
        {/* Imagen */}
        <div className="relative h-20 w-20 bg-white rounded-lg border border-gray-200 overflow-hidden flex-shrink-0 shadow-sm">
          <Image src={item.image} alt={item.title} fill className="object-contain p-2" />
        </div>

        {/* Contenido */}
        <div className="flex-1 flex flex-col justify-between min-w-0"> {/* min-w-0 evita desbordes en flex */}
          
          <div className="flex justify-between items-start gap-1">
            <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug pr-2">
              {item.title}
            </h4>
            
            {/* Botón Eliminar: Quitamos los márgenes negativos (-mr) */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-red-600 shrink-0"
              onClick={() => removeItem(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-end justify-between mt-2">
            {/* Control Editable */}
            <div className="flex items-center border border-gray-200 rounded-md bg-gray-50 h-8 shadow-sm">
              <Button 
                variant="ghost" size="icon" className="h-full w-8 rounded-none rounded-l-md hover:bg-white"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              
              <Input 
                type="text"
                className="h-full w-10 text-center border-0 bg-transparent p-0 focus-visible:ring-0 shadow-none text-sm"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />

              <Button 
                variant="ghost" size="icon" className="h-full w-8 rounded-none rounded-r-md hover:bg-white"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            {/* PRECIO TOTAL */}
            <div className="text-right pl-2">
               <p className="font-bold text-base text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-4 bg-gray-100" />
    </div>
  );
}

// --- COMPONENTE PRINCIPAL ---
export default function CartSheet() {
  const { items, removeItem, updateQuantity, getTotals, getTotalItems } = useCartStore();
  const { subtotal, iva, total } = getTotals();
  const itemCount = getTotalItems();

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

        {/* AQUÍ ESTABA EL PROBLEMA:
           Quitamos '-mr-4' y dejamos solo un padding normal 'pr-2' para el scrollbar.
        */}
        <div className="flex-1 overflow-y-auto pr-2">
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
            <div className="space-y-1">
              {items.map((item) => (
                <CartItemRow 
                  key={item.id} 
                  item={item} 
                  removeItem={removeItem} 
                  updateQuantity={updateQuantity} 
                />
              ))}
            </div>
          )}
        </div>

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