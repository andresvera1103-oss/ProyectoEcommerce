'use client';

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import { Product } from "@/lib/api";
import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react"; // Iconos necesarios

interface AddToCartButtonProps {
  product: Product;
  showQtyControl?: boolean; // Prop opcional para mostrar controles solo si queremos
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);
  const [count, setCount] = useState(1); // Estado local para la cantidad

  const handleAdd = () => {
    addItem(product, count); // Enviamos la cantidad seleccionada
    setIsAdded(true);
    setCount(1); // Reseteamos el contador a 1 después de agregar
    setTimeout(() => setIsAdded(false), 2000);
  };

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => Math.max(1, prev - 1));

  return (
    <div className="flex items-center gap-2 w-full">
      {/* Selector de Cantidad */}
      <div className="flex items-center border border-gray-300 rounded-md h-10">
        <button 
          onClick={decrement}
          className="px-3 h-full hover:bg-gray-100 text-gray-600 transition-colors"
          type="button"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center font-medium text-sm">
          {count}
        </span>
        <button 
          onClick={increment}
          className="px-3 h-full hover:bg-gray-100 text-gray-600 transition-colors"
          type="button"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Botón Principal */}
      <Button 
        onClick={handleAdd} 
        className={`flex-1 h-10 transition-all duration-200 ${isAdded ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {isAdded ? (
          "¡Agregado!"
        ) : (
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span>Añadir al Carrito</span>
          </div>
        )}
      </Button>
    </div>
  );
}