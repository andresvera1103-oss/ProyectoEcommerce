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
    // 👇 AQUÍ ESTÁ EL CAMBIO: Añadimos el fondo, padding, borde y redondeado al contenedor
    <div className="flex items-center gap-2 w-full bg-gray-50 p-1 rounded-lg border border-gray-200">
      
      {/* Selector de Cantidad */}
      <div className="flex items-center h-9 bg-white rounded-md border border-gray-200 shadow-sm shrink-0">
        <button 
          onClick={decrement}
          className="px-2 h-full hover:bg-gray-100 text-gray-600 transition-colors rounded-l-md flex items-center justify-center"
          type="button"
        >
          <Minus className="h-3 w-3" />
        </button>
        <span className="w-6 text-center font-semibold text-sm text-gray-900">
          {count}
        </span>
        <button 
          onClick={increment}
          className="px-2 h-full hover:bg-gray-100 text-gray-600 transition-colors rounded-r-md flex items-center justify-center"
          type="button"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>

      {/* Botón Principal */}
      <Button 
        onClick={handleAdd} 
        className={`flex-1 h-9 rounded-md shadow-sm transition-all duration-200 text-sm font-medium ${
          isAdded 
            ? "bg-green-600 hover:bg-green-700 text-white" 
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {isAdded ? (
          "¡Listo!"
        ) : (
          <div className="flex items-center justify-center gap-1.5">
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>Añadir</span>
          </div>
        )}
      </Button>
    </div>
  );
}