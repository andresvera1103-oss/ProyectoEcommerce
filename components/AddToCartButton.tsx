'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/lib/store";
import { Product } from "@/lib/api";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, Check } from "lucide-react";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);
  const [inputValue, setInputValue] = useState("1");

  const stopProp = (e: React.MouseEvent | React.ChangeEvent | React.FocusEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleAdd = (e: React.MouseEvent) => {
    stopProp(e);
    const quantity = parseInt(inputValue) || 1;
    addItem(product, quantity);
    setIsAdded(true);
    setInputValue("1");
    setTimeout(() => setIsAdded(false), 2000);
  };

  const increment = (e: React.MouseEvent) => {
    stopProp(e);
    const current = parseInt(inputValue) || 0;
    if (current < 99) setInputValue((current + 1).toString());
  };

  const decrement = (e: React.MouseEvent) => {
    stopProp(e);
    const current = parseInt(inputValue) || 1;
    const newValue = Math.max(1, current - 1);
    setInputValue(newValue.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    stopProp(e);
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 2) value = value.slice(0, 2);
    setInputValue(value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (inputValue === "" || parseInt(inputValue) === 0) {
      setInputValue("1");
    }
  };

  return (
    <div 
      className="flex items-center gap-3 w-full"
      onClick={(e) => stopProp(e as any)}
    >
      
      {/* Selector de Cantidad */}
      <div className="flex items-center bg-white dark:bg-slate-900 rounded-lg border-2 border-slate-200 dark:border-slate-800 h-10 overflow-hidden shadow-sm">
        <button 
          onClick={decrement}
          className="w-8 h-full flex items-center justify-center text-slate-800 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-bold hover:text-blue-600 dark:hover:text-blue-400"
          type="button"
          aria-label="Restar"
        >
          <Minus className="h-4 w-4" strokeWidth={3} />
        </button>
        
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onClick={(e) => stopProp(e as any)}
          className="w-10 h-full border-0 bg-transparent text-center focus-visible:ring-0 px-0 font-extrabold text-slate-900 dark:text-white text-base"
        />

        <button 
          onClick={increment}
          className="w-8 h-full flex items-center justify-center text-slate-800 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-bold hover:text-blue-600 dark:hover:text-blue-400"
          type="button"
          aria-label="Sumar"
        >
          <Plus className="h-4 w-4" strokeWidth={3} />
        </button>
      </div>

      {/* Botón Principal */}
      <Button 
        onClick={handleAdd} 
        className={`flex-1 h-10 rounded-lg font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all active:scale-95 ${
          isAdded 
            ? "bg-emerald-600 hover:bg-emerald-700 text-white border-2 border-emerald-700" 
            : "bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:text-white dark:border-indigo-500" // 👈 CAMBIO AQUÍ: Ahora es Indigo en modo oscuro
        }`}
      >
        {isAdded ? (
          <div className="flex items-center gap-2 animate-in fade-in zoom-in">
            <Check className="h-5 w-5" strokeWidth={3} />
            <span>LISTO</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <ShoppingBag className="h-5 w-5" strokeWidth={2.5} />
            <span>AÑADIR</span>
          </div>
        )}
      </Button>
    </div>
  );
}