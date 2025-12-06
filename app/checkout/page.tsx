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
import { ArrowLeft, Lock, CheckCircle, CreditCard, MapPin, ShieldCheck, UserCircle } from "lucide-react";
import { useSession } from "next-auth/react";

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const { items, getTotals, createOrder } = useCartStore();
  const router = useRouter();
  const { subtotal, iva, total } = getTotals();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', address: '', city: '', zipCode: '' });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '') }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value.replace(/[^0-9]/g, '') }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsSuccess(true);
      createOrder(); 
      router.push('/checkout/success');
    }, 2000);
  };

  // Estilos
  const inputStyles = "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all";

  // 1. ESTADO DE CARGA DE SESIÓN
  if (status === 'loading' || !isMounted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="h-8 w-8 bg-blue-600 rounded-full"></div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Verificando sesión...</h1>
        </div>
      </div>
    );
  }

  // 2. 🔒 PANTALLA DE ACCESO DENEGADO (Si no está logueado)
  if (!session) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-xl overflow-hidden">
          <div className="bg-blue-600/10 dark:bg-blue-900/20 p-8 flex justify-center border-b border-blue-100 dark:border-blue-900/30">
            <div className="bg-white dark:bg-slate-950 p-4 rounded-full shadow-lg ring-4 ring-blue-50 dark:ring-blue-900/20">
              <Lock className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <CardContent className="text-center pt-8 pb-8 px-8">
            <h1 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">Inicia Sesión</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
              Para garantizar la seguridad de tu pedido y guardar tu historial, necesitas acceder a tu cuenta.
            </p>
            
            <div className="space-y-4">
              <Link href="/login" className="block w-full">
                <Button size="lg" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02]">
                  <UserCircle className="mr-2 h-5 w-5" />
                  Ir al Login
                </Button>
              </Link>
              
              <Link href="/" className="block w-full">
                <Button variant="ghost" className="w-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                  Volver a la tienda
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 3. PANTALLA DE ÉXITO (Post-pago)
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full">
          <div className="bg-emerald-100 dark:bg-emerald-500/10 p-6 rounded-full w-fit mx-auto mb-6 border border-emerald-200 dark:border-emerald-500/20 animate-bounce">
            <CheckCircle className="h-16 w-16 text-emerald-600 dark:text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">¡Pago Exitoso!</h1>
          <p className="text-slate-500 dark:text-slate-400 animate-pulse">Redirigiendo a tu recibo...</p>
        </div>
      </div>
    );
  }
  
  // 4. PANTALLA DE CARRITO VACÍO
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
            <CreditCard className="h-10 w-10 opacity-50" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Tu carrito está vacío</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8">Agrega productos antes de pasar por caja.</p>
          <Link href="/">
            <Button className="px-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90">
              Explorar Productos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // 5. PANTALLA DE CHECKOUT (Formulario Principal)
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-200 pb-20 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        <Link href="/" className="inline-flex items-center text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors font-medium group">
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Regresar a la tienda
        </Link>

        <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Finalizar Compra</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* COLUMNA IZQUIERDA: FORMULARIO */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-sm">
              <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Paso 1</span>
                </div>
                <CardTitle className="text-slate-900 dark:text-white text-xl">Detalles de Envío</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <form id="checkout-form" onSubmit={handleCheckout} className="space-y-5">
                   <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Nombre</label>
                      <Input required name="firstName" placeholder="Juan" value={formData.firstName} onChange={handleNameChange} className={inputStyles} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Apellido</label>
                      <Input required name="lastName" placeholder="Pérez" value={formData.lastName} onChange={handleNameChange} className={inputStyles} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Correo Electrónico</label>
                    <Input required type="email" name="email" placeholder="juan@ejemplo.com" value={formData.email} onChange={handleChange} className={inputStyles} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Dirección</label>
                    <Input required name="address" placeholder="Calle Principal 123" value={formData.address} onChange={handleChange} className={inputStyles} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Ciudad</label>
                      <Input required name="city" placeholder="Ciudad" value={formData.city} onChange={handleNameChange} className={inputStyles} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Código Postal</label>
                      <Input required name="zipCode" placeholder="00000" value={formData.zipCode} onChange={handleNumberChange} maxLength={6} className={inputStyles} />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <div className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/50 rounded-xl p-6 flex items-center gap-4 text-slate-500 dark:text-slate-400">
              <ShieldCheck className="h-6 w-6 text-emerald-500" />
              <p className="text-sm">Sus datos están encriptados con seguridad SSL. Pagos seguros.</p>
            </div>
          </div>

          {/* COLUMNA DERECHA: RESUMEN */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <Card className="bg-slate-900 border-slate-800 shadow-2xl overflow-hidden">
                <CardHeader className="bg-slate-950 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2 text-blue-400 mb-1">
                    <CreditCard className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Resumen</span>
                  </div>
                  <CardTitle className="text-white text-xl">Tu Pedido</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  {/* LISTA DE PRODUCTOS */}
                  <div className="max-h-[300px] overflow-y-auto space-y-4 pr-2 pl-2 custom-scrollbar">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 items-center group">
                        <div className="relative h-14 w-14 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-slate-700">
                          <Image src={item.image} alt={item.title} fill className="object-contain p-1 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white line-clamp-1">{item.title}</p>
                          <p className="text-xs text-slate-500">Cant: <span className="text-slate-300">{item.quantity}</span></p>
                        </div>
                        <p className="font-bold text-white text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-slate-800" />

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-slate-400"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between text-sm text-slate-400"><span>Envío</span><span className="text-emerald-400 font-medium">Gratis</span></div>
                    <div className="flex justify-between text-sm text-slate-400"><span>IVA (15%)</span><span>${iva.toFixed(2)}</span></div>
                    <Separator className="bg-slate-800 my-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-white">Total a Pagar</span>
                      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    form="checkout-form"
                    className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white text-lg font-semibold shadow-lg shadow-blue-900/50 transition-all hover:scale-[1.02]"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Procesando pago..." : "Confirmar Pago"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
