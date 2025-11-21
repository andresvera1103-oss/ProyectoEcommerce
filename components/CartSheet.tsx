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

function CartItemRow({ item, removeItem, updateQuantity }: any) {
  const [inputValue, setInputValue] = useState(item.quantity.toString());

  useEffect(() => {
    setInputValue(item.quantity.toString());
  }, [item.quantity]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 2) value = value.slice(0, 2);
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
      <div className="flex gap-4 py-2">
        <div className="relative h-20 w-20 bg-slate-800 rounded-lg border border-slate-700 overflow-hidden flex-shrink-0 shadow-sm">
          <Image src={item.image} alt={item.title} fill className="object-contain p-2" />
        </div>

        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div className="flex justify-between items-start gap-1">
            <h4 className="text-sm font-semibold text-slate-200 line-clamp-2 leading-snug pr-2">
              {item.title}
            </h4>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-500 hover:text-red-400 hover:bg-red-900/20 shrink-0"
              onClick={() => removeItem(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-end justify-between mt-2">
            <div className="flex items-center border border-slate-700 rounded-md bg-slate-900 h-8 shadow-sm">
              <Button 
                variant="ghost" size="icon" className="h-full w-8 rounded-none rounded-l-md hover:bg-slate-800 text-slate-400"
                onClick={() => updateQuantity(item.id, Math.min(99, item.quantity - 1))}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <Input 
                type="text"
                className="h-full w-10 text-center border-0 bg-transparent p-0 focus-visible:ring-0 shadow-none text-sm text-white font-bold"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <Button 
                variant="ghost" size="icon" className="h-full w-8 rounded-none rounded-r-md hover:bg-slate-800 text-slate-400"
                onClick={() => updateQuantity(item.id, Math.min(99, item.quantity + 1))}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <div className="text-right pl-2">
               <p className="font-bold text-base text-white">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-4 bg-slate-800" />
    </div>
  );
}

export default function CartSheet() {
  const { items, removeItem, updateQuantity, getTotals, getTotalItems } = useCartStore();
  const { subtotal, iva, total } = getTotals();
  const itemCount = getTotalItems();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative bg-slate-800 text-white hover:bg-slate-700 border border-slate-700">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-blue-600 border-2 border-[#0B1120] text-white font-bold">
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      {/* 🎨 AQUI CAMBIAMOS EL FONDO DEL SHEET */}
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-slate-950 border-l border-slate-800 text-slate-200">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold text-white">Tu Carrito ({itemCount} productos)</SheetTitle>
        </SheetHeader>
        <Separator className="my-4 bg-slate-800" />
        
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar-dark">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
              <div className="bg-slate-900 p-6 rounded-full border border-slate-800">
                <ShoppingCart className="h-12 w-12 text-slate-600" />
              </div>
              <p className="text-lg font-medium">Tu carrito está vacío.</p>
              <SheetClose asChild>
                <Button variant="link" className="text-blue-400">Ir a comprar</Button>
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
          <SheetFooter className="mt-auto pt-6 border-t border-slate-800 bg-slate-950">
            <div className="w-full space-y-3">
              <div className="flex justify-between text-sm text-slate-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-400">
                <span>IVA (15%)</span>
                <span>${iva.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold text-white pt-2 border-t border-slate-800/50">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <SheetClose asChild>
                <Link href="/checkout" className="w-full block pt-2">
                  <Button className="w-full size-lg text-base bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 border-0">
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