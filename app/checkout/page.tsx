'use client';

import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const router = useRouter();
  const total = getTotalPrice();
  const [isProcessing, setIsProcessing] = useState(false);

  // Estado local para los campos del formulario
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: ''
  });

  // VALIDACIÓN 1: Solo Letras (Nombre y Apellido)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Regex: Reemplaza cualquier caracter que NO sea letra (incluye tildes y ñ) o espacio por vacío
    const cleanValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    setFormData(prev => ({ ...prev, [name]: cleanValue }));
  };

  // VALIDACIÓN 2: Solo Números (Código Postal)
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Regex: Reemplaza cualquier caracter que NO sea número por vacío
    const cleanValue = value.replace(/[^0-9]/g, '');
    setFormData(prev => ({ ...prev, [name]: cleanValue }));
  };

  // Manejo genérico para otros campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
        <Link href="/">
          <Button>Volver a comprar</Button>
        </Link>
      </div>
    );
  }

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      clearCart();
      router.push('/checkout/success');
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* COLUMNA IZQUIERDA: Formulario de Envío */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Información de Envío</CardTitle>
            </CardHeader>
            <CardContent>
              <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nombre</label>
                    <Input 
                      required 
                      name="firstName"
                      placeholder="Juan" 
                      value={formData.firstName}
                      onChange={handleNameChange} // Solo letras
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Apellido</label>
                    <Input 
                      required 
                      name="lastName"
                      placeholder="Pérez" 
                      value={formData.lastName}
                      onChange={handleNameChange} // Solo letras
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Correo Electrónico</label>
                  <Input 
                    required 
                    type="email" 
                    name="email"
                    placeholder="juan@ejemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Dirección</label>
                  <Input 
                    required 
                    name="address"
                    placeholder="Calle Principal 123" 
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ciudad</label>
                    <Input 
                      required 
                      name="city"
                      placeholder="Santo Domingo" 
                      value={formData.city}
                      onChange={handleChange} // Puede ser handleChange o handleNameChange si quieres solo letras
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Código Postal</label>
                    <Input 
                      required 
                      name="zipCode"
                      placeholder="00000" 
                      value={formData.zipCode}
                      onChange={handleNumberChange} // Solo números
                      maxLength={6} // Opcional: limitar largo
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* COLUMNA DERECHA: Resumen de Orden */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
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
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Envío</span>
                  <span className="text-green-600">Gratis</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button 
                type="submit" 
                form="checkout-form"
                className="w-full bg-blue-600 hover:bg-blue-700 mt-4"
                disabled={isProcessing}
              >
                {isProcessing ? "Procesando..." : "Confirmar y Pagar"}
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}