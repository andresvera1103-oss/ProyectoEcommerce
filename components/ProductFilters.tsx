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
  
  // Estado local para lo que escribes en el buscador
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q')?.toString() || "");

  // Efecto "Debounce": Espera 300ms después de que dejes de escribir para hacer la búsqueda
  // Esto evita que la página se recargue con cada letra que escribes
  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      
      if (searchTerm) {
        params.set('q', searchTerm);
        // Si buscamos por texto, quitamos la categoría para evitar conflictos
        params.delete('category');
      } else {
        params.delete('q');
      }
      
      replace(`/?${params.toString()}`);
    }, 300); // 300ms de espera

    // Limpieza del temporizador
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
          className="pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-500 focus-visible:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Selector de Ordenar */}
      <Select onValueChange={handleSort} defaultValue={searchParams.get('sort') || "default"}>
        <SelectTrigger className="w-full md:w-[200px] bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
          <SelectItem value="default">Relevancia</SelectItem>
          <SelectItem value="price-asc">Precio: Bajo a Alto</SelectItem>
          <SelectItem value="price-desc">Precio: Alto a Bajo</SelectItem>
          <SelectItem value="rating-desc">Mejor Calificados</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}