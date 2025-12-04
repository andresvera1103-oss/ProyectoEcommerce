'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/lib/store";
import { Product } from "@/lib/api";
import { useState, useEffect } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);
  
  // Usamos string para permitir que el input quede vacío ("") mientras escribes
  const [inputValue, setInputValue] = useState("1");

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Convertimos el texto a número, si está vacío o es 0, mandamos 1
    const quantity = parseInt(inputValue) || 1;
    
    addItem(product, quantity);
    setIsAdded(true);
    setInputValue("1"); // Reseteamos
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

  // Manejar la escritura manual
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Solo permitimos números
    const value = e.target.value.replace(/[^0-9]/g, '');
    setInputValue(value);
  };

  // Cuando te sales del input (blur), si está vacío, ponle un 1
  const handleBlur = () => {
    if (inputValue === "" || parseInt(inputValue) === 0) {
      setInputValue("1");
    }
  };

  return (
    <div className="flex items-center gap-2 w-full bg-gray-50 p-1 rounded-lg border border-gray-200">
      
      <div className="flex items-center h-9 bg-white rounded-md border border-gray-200 shadow-sm shrink-0 w-28">
        <button 
          onClick={decrement}
          className="px-2 h-full hover:bg-gray-100 text-gray-600 transition-colors rounded-l-md flex items-center justify-center border-r"
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
          className="h-full border-0 text-center focus-visible:ring-0 px-0 shadow-none font-semibold text-gray-900"
          onClick={(e) => e.preventDefault()} // Evita click en el Link padre
        />

        <button 
          onClick={increment}
          className="px-2 h-full hover:bg-gray-100 text-gray-600 transition-colors rounded-r-md flex items-center justify-center border-l"
          type="button"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>

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