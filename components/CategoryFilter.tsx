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
      <div className="flex overflow-x-auto pb-4 pt-2 gap-3 scrollbar-premium px-1">
        
        {/* Botón "Todas" */}
        <Link href="/" className="shrink-0">
          <Button
            variant={currentCategory === 'all' ? "default" : "outline"}
            className={`rounded-full px-6 h-10 font-bold tracking-wide transition-all duration-200 shadow-sm ${
              currentCategory === 'all'
                ? "bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-700"
                : "bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-400 hover:bg-slate-50"
            }`}
          >
            Todas
          </Button>
        </Link>

        {/* Botones de Categorías */}
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/?category=${cat.slug}`} className="shrink-0">
            <Button
              variant={currentCategory === cat.slug ? "default" : "outline"}
              className={`rounded-full px-6 h-10 font-bold tracking-wide transition-all duration-200 capitalize shadow-sm ${
                currentCategory === cat.slug
                  ? "bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-700"
                  : "bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-400 hover:bg-slate-50"
              }`}
            >
              {cat.name.replace('-', ' ')}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}