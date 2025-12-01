'use client';

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProductFilters() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  
  // Estado local para el valor del input, inicializado con lo que haya en la URL
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q')?.toString() || "");

  // Efecto "Debounce": Espera 300ms después de que dejes de escribir antes de buscar
  // Esto evita recargas constantes mientras escribes
  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      
      if (searchTerm) {
        params.set('q', searchTerm);
      } else {
        params.delete('q');
      }
      
      // Si buscamos texto, quitamos la categoría para evitar conflictos de filtrado
      if (searchTerm) params.delete('category');
      
      replace(`/?${params.toString()}`);
    }, 300); // 300ms de espera

    // Limpieza del timeout si el usuario sigue escribiendo
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, replace, searchParams]);

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);
    replace(`/?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      {/* Buscador */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <Input 
          placeholder="Buscar productos (ej. Laptop, Watch...)" 
          className="pl-10 bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-blue-500 h-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Ordenar */}
      <Select onValueChange={handleSort} defaultValue={searchParams.get('sort') || "default"}>
        <SelectTrigger className="w-full md:w-[200px] bg-slate-900/50 border-slate-800 text-slate-200 h-10">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
          <SelectItem value="default">Relevancia</SelectItem>
          <SelectItem value="price-asc">Precio: Bajo a Alto</SelectItem>
          <SelectItem value="price-desc">Precio: Alto a Bajo</SelectItem>
          <SelectItem value="rating-desc">Mejor Calificados</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}