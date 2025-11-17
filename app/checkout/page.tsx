'use client';

import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Lock } from "lucide-react";
import { useSession } from "next-auth/react";

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const { items, getTotals, clearCart } = useCartStore();
  const router = useRouter();
  const { subtotal, iva, total } = getTotals();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // --- INICIO DEL CÓDIGO FALTANTE ---

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const cleanValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    setFormData(prev => ({ ...prev, [name]: cleanValue }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const cleanValue = value.replace(/[^0-9]/g, '');
    setFormData(prev => ({ ...prev, [name]: cleanValue }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      clearCart();
      router.push('/checkout/success');
    }, 2000);
  };

  // --- FIN DEL CÓDIGO FALTANTE ---


  // Lógica de renderizado
  
  if (status === 'loading' || !isMounted) {
    return (
      <div className="container mx-auto p-4 text-center py-20 h-[60vh] flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold">Cargando...</h1>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="container mx-auto p-4 text-center py-20 h-[60vh] flex flex-col justify-center items-center">
        <div className="bg-orange-100 p-6 rounded-full mb-6">
          <Lock className="h-16 w-16 text-orange-600" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Acceso Requerido</h1>
        <p className="text-gray-600 mb-8 max-w-md">
          Por favor, inicia sesión para poder finalizar tu compra.
        </p>
        <Link href="/login">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Ir a Iniciar Sesión
          </Button>
        </Link>
      </div>
    );
  }
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center py-20 h-[60vh] flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
        <Link href="/">
          <Button>Volver a la tienda</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 py-8">
      
      <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors font-medium">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Regresar
      </Link>

      <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Formulario */}
        <div>
          <Card>
            <CardHeader><CardTitle>Información de Envío</CardTitle></CardHeader>
            <CardContent>
              <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nombre</label>
                    <Input required name="firstName" placeholder="Juan" value={formData.firstName} onChange={handleNameChange} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Apellido</label>
                    <Input required name="lastName" placeholder="Pérez" value={formData.lastName} onChange={handleNameChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Correo Electrónico</label>
                  <Input required type="email" name="email" placeholder="juan@ejemplo.com" value={formData.email} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Dirección</label>
                  <Input required name="address" placeholder="Calle Principal 123" value={formData.address} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ciudad</label>
                    <Input required name="city" placeholder="Ciudad" value={formData.city} onChange={handleNameChange} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Código Postal</label>
                    <Input required name="zipCode" placeholder="00000" value={formData.zipCode} onChange={handleNumberChange} maxLength={6} />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Resumen */}
        <div>
          <Card>
            <CardHeader><CardTitle>Resumen del Pedido</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="max-h-[300px] overflow-y-auto space-y-3 pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="relative h-12 w-12 bg-white border rounded overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-contain p-1" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                      <p className="text-xs text-gray-500">Cant: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between text-sm"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span>Envío</span><span className="text-green-600">Gratis</span></div>
                <div className="flex justify-between text-sm"><span>IVA (15%)</span><span>${iva.toFixed(2)}</span></div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-bold pt-2"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </div>
              <Button type="submit" form="checkout-form" className="w-full bg-blue-600 hover:bg-blue-700 mt-4" disabled={isProcessing}>
                {isProcessing ? "Procesando..." : "Confirmar y Pagar"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}