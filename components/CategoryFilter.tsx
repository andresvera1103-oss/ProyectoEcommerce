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
  // Leemos la categoría actual de la URL (si no hay, es 'all')
  const currentCategory = searchParams.get('category') || 'all';

  return (
    <div className="w-full overflow-x-auto pb-4 pt-2 no-scrollbar">
      <div className="flex gap-3 min-w-max px-1">
        {/* Botón "Todas" */}
        <Link href="/">
          <Button
            variant={currentCategory === 'all' ? "default" : "outline"}
            className={`rounded-full px-6 font-medium transition-all duration-300 ${
              currentCategory === 'all'
                ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/50 border-transparent"
                : "bg-slate-900/50 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-600"
            }`}
          >
            Todas
          </Button>
        </Link>

        {/* Botones de Categorías Dinámicas */}
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/?category=${cat.slug}`}>
            <Button
              variant={currentCategory === cat.slug ? "default" : "outline"}
              className={`rounded-full px-6 font-medium transition-all duration-300 capitalize ${
                currentCategory === cat.slug
                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/50 border-transparent"
                  : "bg-slate-900/50 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-600"
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