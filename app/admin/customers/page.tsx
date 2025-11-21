import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Mail } from "lucide-react";
import Image from "next/image";

const customers = [
  { id: 1, name: "Emily Smith", email: "emilys@dummyjson.com", username: "emilys", role: "Cliente VIP", status: "Activo", spent: "$1,240.50", image: "https://dummyjson.com/icon/emilys/128", lastOrder: "2024-03-10" },
  { id: 2, name: "Michael Williams", email: "michaelw@dummyjson.com", username: "michaelw", role: "Cliente", status: "Activo", spent: "$450.00", image: "https://dummyjson.com/icon/michaelw/128", lastOrder: "2024-02-28" },
  { id: 3, name: "Sophia Brown", email: "sophiab@dummyjson.com", username: "sophiab", role: "Cliente", status: "Inactivo", spent: "$0.00", image: "https://dummyjson.com/icon/sophiab/128", lastOrder: "-" }
];

export default function CustomersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Gestión de Clientes</h1>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader className="border-b border-slate-800">
          <CardTitle className="text-white">Usuarios Registrados</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 uppercase bg-slate-950 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Usuario</th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4">Rol</th>
                  <th className="px-6 py-4">Total Gastado</th>
                  <th className="px-6 py-4">Última Compra</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden border border-slate-700">
                          <Image src={customer.image} alt={customer.name} fill className="object-cover" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-200">{customer.name}</div>
                          <div className="text-xs text-slate-500 flex items-center gap-1">
                             <Mail className="h-3 w-3" /> {customer.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={customer.status === "Activo" ? "border-green-500/50 text-green-400 bg-green-500/10" : "border-slate-700 text-slate-500"}>
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{customer.role}</td>
                    <td className="px-6 py-4 font-mono font-medium text-white">{customer.spent}</td>
                    <td className="px-6 py-4 text-slate-500">{customer.lastOrder}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}