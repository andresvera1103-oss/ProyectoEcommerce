'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Category } from "@/lib/api";
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: Category[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  return (
    <div className="w-full">
      {/* 👇 AQUI ESTÁ EL CAMBIO: Añadimos 'scrollbar-premium' en lugar de 'no-scrollbar' */}
      <div className="flex overflow-x-auto pb-4 pt-2 gap-3 scrollbar-premium">
        
        {/* Botón "Todas" */}
        <Link href="/" className="shrink-0"> {/* shrink-0 evita que se aplasten */}
          <Button
            variant={currentCategory === 'all' ? "default" : "outline"}
            className={`rounded-full px-6 font-medium transition-all duration-300 h-10 ${
              currentCategory === 'all'
                ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/50 border-transparent"
                : "bg-slate-900/50 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-600 backdrop-blur-sm"
            }`}
          >
            Todas
          </Button>
        </Link>

        {/* Botones de Categorías Dinámicas */}
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/?category=${cat.slug}`} className="shrink-0">
            <Button
              variant={currentCategory === cat.slug ? "default" : "outline"}
              className={`rounded-full px-6 font-medium transition-all duration-300 capitalize h-10 ${
                currentCategory === cat.slug
                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/50 border-transparent"
                  : "bg-slate-900/50 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-600 backdrop-blur-sm"
              }`}
            >
              {cat.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}