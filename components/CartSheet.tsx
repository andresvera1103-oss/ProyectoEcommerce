'use client';

import Link from "next/link";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

// --- SUB-COMPONENTE PARA CADA PRODUCTO ---
// Esto nos permite manejar el estado del input (borrar, escribir) sin que el store nos interrumpa
function CartItemRow({ item, removeItem, updateQuantity }: any) {
  const [inputValue, setInputValue] = useState(item.quantity.toString());

  // Si la cantidad cambia desde fuera (ej. otro botón), actualizamos el input
  useEffect(() => {
    setInputValue(item.quantity.toString());
  }, [item.quantity]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); // Solo números
    
    // Validación máxima 99
    if (value.length > 2) value = value.slice(0, 2);

    setInputValue(value);
    
    // Actualizamos el store en tiempo real SOLO si hay un número válido
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 1) {
      updateQuantity(item.id, numValue);
    }
  };

  const handleBlur = () => {
    // Si el usuario deja vacío el campo, volvemos a poner la cantidad real
    if (inputValue === "" || parseInt(inputValue) < 1) {
      setInputValue(item.quantity.toString());
      updateQuantity(item.id, item.quantity); // Restaurar valor seguro
    }
  };

  return (
    <div>
      <div className="flex gap-4 py-2">
        <div className="relative h-20 w-20 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden flex-shrink-0 shadow-sm">
          <Image src={item.image} alt={item.title} fill className="object-contain p-2" />
        </div>

        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div className="flex justify-between items-start gap-1">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-200 line-clamp-2 leading-snug pr-2">
              {item.title}
            </h4>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 shrink-0"
              onClick={() => removeItem(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-end justify-between mt-2">
            {/* Control Editable */}
            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-900 h-8 shadow-sm">
              <Button 
                variant="ghost" size="icon" className="h-full w-8 rounded-none rounded-l-md hover:bg-white dark:hover:bg-slate-800"
                onClick={() => updateQuantity(item.id, Math.min(99, item.quantity - 1))}
              >
                <Minus className="h-3 w-3 text-slate-600 dark:text-slate-400" />
              </Button>
              
              <Input 
                type="text"
                className="h-full w-10 text-center border-0 bg-transparent p-0 focus-visible:ring-0 shadow-none text-sm font-bold text-slate-900 dark:text-white"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />

              <Button 
                variant="ghost" size="icon" className="h-full w-8 rounded-none rounded-r-md hover:bg-white dark:hover:bg-slate-800"
                onClick={() => updateQuantity(item.id, Math.min(99, item.quantity + 1))}
              >
                <Plus className="h-3 w-3 text-slate-600 dark:text-slate-400" />
              </Button>
            </div>

            {/* PRECIO (Corregido: Solo mostramos el total, quitamos el "Precio unit") */}
            <div className="text-right pl-2">
               <p className="font-bold text-base text-slate-900 dark:text-white">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-4 bg-slate-100 dark:bg-slate-800" />
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
        <Button variant="ghost" size="icon" className="relative text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-blue-600 border-2 border-white dark:border-slate-950 text-white font-bold text-[10px]">
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold text-slate-900 dark:text-white">Tu Carrito ({itemCount} productos)</SheetTitle>
        </SheetHeader>
        
        <Separator className="my-4 bg-slate-200 dark:bg-slate-800" />

        <div className="flex-1 overflow-y-auto pr-2">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
              <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-full">
                <ShoppingCart className="h-12 w-12 text-slate-400" />
              </div>
              <p className="text-lg font-medium">Tu carrito está vacío.</p>
              <SheetClose asChild>
                <Button variant="link" className="text-blue-600 dark:text-blue-400">Ir a comprar</Button>
              </SheetClose>
            </div>
          ) : (
            <div className="space-y-1">
              {items.map((item) => (
                // Usamos el sub-componente aquí
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
          <SheetFooter className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
            <div className="w-full space-y-3">
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                <span>IVA (15%)</span>
                <span>${iva.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <SheetClose asChild>
                <Link href="/checkout" className="w-full block pt-2">
                  <Button className="w-full size-lg text-base bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all">
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