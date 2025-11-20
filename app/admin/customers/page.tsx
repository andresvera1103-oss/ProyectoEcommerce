import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Mail, Phone } from "lucide-react";
import Image from "next/image";

// Datos simulados (Mock Data)
const customers = [
  {
    id: 1,
    name: "Emily Smith",
    email: "emilys@dummyjson.com",
    username: "emilys",
    role: "Cliente VIP",
    status: "Activo",
    spent: "$1,240.50",
    image: "https://dummyjson.com/icon/emilys/128", // Avatar de la API
    lastOrder: "2024-03-10"
  },
  {
    id: 2,
    name: "Michael Williams",
    email: "michaelw@dummyjson.com",
    username: "michaelw",
    role: "Cliente",
    status: "Activo",
    spent: "$450.00",
    image: "https://dummyjson.com/icon/michaelw/128",
    lastOrder: "2024-02-28"
  },
  {
    id: 3,
    name: "Sophia Brown",
    email: "sophiab@dummyjson.com",
    username: "sophiab",
    role: "Cliente",
    status: "Inactivo",
    spent: "$0.00",
    image: "https://dummyjson.com/icon/sophiab/128",
    lastOrder: "-"
  }
];

export default function CustomersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Gestión de Clientes</h1>

      <Card>
        <CardHeader>
          <CardTitle>Usuarios Registrados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3">Usuario</th>
                  <th className="px-6 py-3">Estado</th>
                  <th className="px-6 py-3">Rol</th>
                  <th className="px-6 py-3">Total Gastado</th>
                  <th className="px-6 py-3">Última Compra</th>
                  <th className="px-6 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="bg-white border-b hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden border border-slate-200">
                          <Image src={customer.image} alt={customer.name} fill className="object-cover" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{customer.name}</div>
                          <div className="text-xs text-slate-500 flex items-center gap-1">
                             <Mail className="h-3 w-3" /> {customer.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={customer.status === "Activo" ? "default" : "secondary"} className={customer.status === "Activo" ? "bg-green-600 hover:bg-green-700" : ""}>
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {customer.role}
                    </td>
                    <td className="px-6 py-4 font-mono font-medium text-slate-900">
                      {customer.spent}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {customer.lastOrder}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4 text-slate-400" />
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