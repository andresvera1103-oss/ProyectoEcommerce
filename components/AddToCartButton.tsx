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
  
  // Usamos string para permitir que el input quede vacío ("") mientras escribes
  const [inputValue, setInputValue] = useState("1");

  // Función auxiliar para detener la propagación del clic
  const stopProp = (e: React.MouseEvent | React.ChangeEvent | React.FocusEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleAdd = (e: React.MouseEvent) => {
    stopProp(e);
    
    // Convertimos el texto a número, si está vacío o es 0, mandamos 1
    const quantity = parseInt(inputValue) || 1;
    
    addItem(product, quantity);
    setIsAdded(true);
    setInputValue("1"); // Reseteamos
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

  // Manejar la escritura manual
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    stopProp(e);
    // Solo permitimos números
    let value = e.target.value.replace(/[^0-9]/g, '');
    
    // Validación máxima 99
    if (value.length > 2) value = value.slice(0, 2);
    
    setInputValue(value);
  };

  // Cuando te sales del input (blur), si está vacío, ponle un 1
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (inputValue === "" || parseInt(inputValue) === 0) {
      setInputValue("1");
    }
  };

  return (
    <div 
      className="flex items-center gap-2 w-full p-1 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 transition-colors"
      onClick={(e) => stopProp(e as any)}
    >
      
      <div className="flex items-center bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 h-9">
        <button 
          onClick={decrement}
          className="w-8 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors border-r dark:border-slate-800"
          type="button"
        >
          <Minus className="h-3 w-3" />
        </button>
        
        {/* INPUT EDITABLE MEJORADO */}
        <Input
          type="text" // Usamos text para tener control total
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onClick={(e) => stopProp(e as any)}
          className="w-10 h-full border-0 bg-transparent text-center focus-visible:ring-0 px-0 font-bold text-slate-900 dark:text-slate-200 text-sm"
        />

        <button 
          onClick={increment}
          className="w-8 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors border-l dark:border-slate-800"
          type="button"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>

      <Button 
        onClick={handleAdd} 
        className={`flex-1 h-9 rounded-lg font-semibold text-sm shadow-sm transition-all duration-300 ${
          isAdded 
            ? "bg-emerald-500 hover:bg-emerald-600 text-white" 
            : "bg-slate-900 hover:bg-slate-800 text-white dark:bg-blue-600 dark:hover:bg-blue-500"
        }`}
      >
        {isAdded ? (
          <div className="flex items-center gap-1 animate-in fade-in zoom-in">
            <Check className="h-4 w-4" />
            <span>Listo</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            <span>Añadir</span>
          </div>
        )}
      </Button>
    </div>
  );
}