"use client";

import Image from "next/image";
import { ShoppingCart, Plus, Minus } from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      
      {/* Badge de Categoría */}
      <div className="absolute left-3 top-3 z-10">
        <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-gray-800 backdrop-blur-md dark:bg-white/10 dark:text-gray-200">
          {product.category}
        </span>
      </div>

      {/* Imagen del Producto */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50 p-4 dark:bg-gray-800/50">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Información del Producto */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 dark:text-white">
          {product.title}
        </h3>
        
        <div className="mt-2 text-xl font-bold text-blue-600 dark:text-blue-400">
          ${product.price.toFixed(2)}
        </div>

        <div className="mt-auto pt-4">
          <div className="flex items-center gap-3">
            {/* Selector de Cantidad CORREGIDO */}
            <div className="flex items-center rounded-lg border border-gray-300 bg-transparent dark:border-gray-600">
              <button className="px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-black dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white">
                <Minus size={16} />
              </button>
              <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-white">
                1
              </span>
              <button className="px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-black dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white">
                <Plus size={16} />
              </button>
            </div>

            {/* Botón Añadir */}
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:scale-95">
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Añadir</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}