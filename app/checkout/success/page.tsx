import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react"; // Ícono de éxito

export default function SuccessPage() {
  return (
    <div className="container mx-auto p-4 h-[60vh] flex flex-col items-center justify-center text-center">
      <div className="bg-green-100 p-6 rounded-full mb-6">
        <CheckCircle className="h-16 w-16 text-green-600" />
      </div>
      
      <h1 className="text-3xl font-bold mb-4">¡Gracias por tu compra!</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        Tu pedido ha sido procesado correctamente. Hemos enviado un correo de confirmación (simulado) a tu bandeja de entrada.
      </p>
      
      <Link href="/">
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
          Volver a la Tienda
        </Button>
      </Link>
    </div>
  );
}