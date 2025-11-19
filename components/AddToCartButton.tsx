'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/lib/store";
import { Product } from "@/lib/api";
import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);
  const [inputValue, setInputValue] = useState("1");

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const quantity = parseInt(inputValue) || 1;
    addItem(product, quantity);
    setIsAdded(true);
    setInputValue("1");
    setTimeout(() => setIsAdded(false), 2000);
  };

  const increment = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const current = parseInt(inputValue) || 0;
    setInputValue((current + 1).toString());
  };

  const decrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const current = parseInt(inputValue) || 1;
    const newValue = Math.max(1, current - 1);
    setInputValue(newValue.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setInputValue(value);
  };

  const handleBlur = () => {
    if (inputValue === "" || parseInt(inputValue) === 0) {
      setInputValue("1");
    }
  };

  return (
    <div className="flex items-center gap-3 w-full">
      
      {/* Selector Minimalista */}
      <div className="flex items-center bg-slate-100 rounded-full p-1 shadow-inner">
        <button 
          onClick={decrement}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-slate-600 hover:text-black shadow-sm transition-all active:scale-90"
          type="button"
        >
          <Minus className="h-3 w-3" />
        </button>
        
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className="w-10 h-8 border-0 bg-transparent text-center focus-visible:ring-0 px-0 font-bold text-slate-700"
          onClick={(e) => e.preventDefault()}
        />

        <button 
          onClick={increment}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-slate-600 hover:text-black shadow-sm transition-all active:scale-90"
          type="button"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>

      {/* Botón Principal Negro/Azul */}
      <Button 
        onClick={handleAdd} 
        className={`flex-1 h-10 rounded-full font-semibold shadow-md hover:shadow-lg transition-all active:scale-95 ${
          isAdded 
            ? "bg-green-600 hover:bg-green-700 text-white" 
            : "bg-slate-900 hover:bg-blue-600 text-white"
        }`}
      >
        {isAdded ? (
          "¡Listo!"
        ) : (
          <div className="flex items-center justify-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            <span>Agregar</span>
          </div>
        )}
      </Button>
    </div>
  );
}