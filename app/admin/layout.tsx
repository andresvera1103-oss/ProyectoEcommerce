import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar Lateral Fija */}
      <aside className="w-64 bg-slate-900 text-white hidden md:block flex-shrink-0">
        <div className="p-6">
          <h2 className="text-2xl font-bold tracking-tight">Admin<span className="text-blue-500">Panel</span></h2>
        </div>
        <nav className="mt-6 px-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            <LayoutDashboard className="h-5 w-5" />
            Resumen
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            <Package className="h-5 w-5" />
            Productos
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            <ShoppingCart className="h-5 w-5" />
            Pedidos
          </Link>
          {/* 👇 CAMBIO: Ahora apunta a /admin/customers */}
          <Link href="/admin/customers" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            <Users className="h-5 w-5" />
            Clientes
          </Link>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}