import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0B1120]">
      {/* Sidebar Lateral Fija Dark */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 hidden md:block flex-shrink-0">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-2xl font-bold tracking-tight text-white">Admin<span className="text-blue-500">Panel</span></h2>
        </div>
        <nav className="mt-6 px-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-900 hover:text-white rounded-lg transition-colors">
            <LayoutDashboard className="h-5 w-5" />
            Resumen
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-900 hover:text-white rounded-lg transition-colors">
            <Package className="h-5 w-5" />
            Productos
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-900 hover:text-white rounded-lg transition-colors">
            <ShoppingCart className="h-5 w-5" />
            Pedidos
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-900 hover:text-white rounded-lg transition-colors">
            <Users className="h-5 w-5" />
            Clientes
          </Link>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-8 overflow-y-auto text-slate-200">
        {children}
      </main>
    </div>
  );
}