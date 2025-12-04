import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingCart, Users, Package } from "lucide-react";

export default function AdminDashboard() {
  const cardStyle = "bg-slate-900 border-slate-800 text-slate-200";

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Panel de Control</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className={cardStyle}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Ingresos Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$45,231.89</div>
            <p className="text-xs text-slate-500">+20.1% mes pasado</p>
          </CardContent>
        </Card>

        <Card className={cardStyle}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Ventas</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+2350</div>
            <p className="text-xs text-slate-500">+180 esta semana</p>
          </CardContent>
        </Card>
        
        <Card className={cardStyle}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Productos Activos</CardTitle>
            <Package className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">120</div>
            <p className="text-xs text-slate-500">14 sin stock</p>
          </CardContent>
        </Card>

        <Card className={cardStyle}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Clientes Activos</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+573</div>
            <p className="text-xs text-slate-500">+201 nuevos usuarios</p>
          </CardContent>
        </Card>
      </div>

      <Card className={cardStyle}>
        <CardHeader>
          <CardTitle className="text-white">Ventas Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center bg-slate-950/50 rounded-md border border-dashed border-slate-800 text-slate-600">
            Gráfico de ventas simulado
          </div>
        </CardContent>
      </Card>
    </div>
  );
}