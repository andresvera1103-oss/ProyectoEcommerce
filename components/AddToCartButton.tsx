'use client';

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import { Product } from "@/lib/api";
import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);
  const [count, setCount] = useState(1);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevenir navegación si está dentro de un Link
    e.stopPropagation(); // Detener propagación de clics
    
    addItem(product, count);
    setIsAdded(true);
    setCount(1);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const increment = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCount(prev => prev + 1);
  };

  const decrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCount(prev => Math.max(1, prev - 1));
  };

  return (
    <div className="flex items-center gap-2 w-full">
      {/* Selector de Cantidad - Con bordes redondeados explícitos */}
      <div className="flex items-center border border-gray-300 rounded-md h-10 bg-white shrink-0">
        <button 
          onClick={decrement}
          className="px-3 h-full hover:bg-gray-100 text-gray-600 transition-colors rounded-l-md"
          type="button"
        >
          <Minus className="h-3 w-3" />
        </button>
        <span className="w-8 text-center font-medium text-sm">
          {count}
        </span>
        <button 
          onClick={increment}
          className="px-3 h-full hover:bg-gray-100 text-gray-600 transition-colors rounded-r-md"
          type="button"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>

      {/* Botón Principal - Con bordes redondeados explícitos */}
      <Button 
        onClick={handleAdd} 
        className={`flex-1 h-10 rounded-md transition-all duration-200 ${isAdded ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {isAdded ? (
          "¡Agregado!"
        ) : (
          <div className="flex items-center justify-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span className="whitespace-nowrap">Añadir</span>
          </div>
        )}
      </Button>
    </div>
  );
}