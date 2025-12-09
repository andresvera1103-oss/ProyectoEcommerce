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
import { ArrowLeft, Lock, CheckCircle, CreditCard, MapPin, ShieldCheck } from "lucide-react";
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

  const inputStyles = "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all";

  if (status === 'loading' || !isMounted) return <div className="min-h-screen bg-white dark:bg-[#0B1120] flex items-center justify-center"><h1 className="text-2xl font-bold text-slate-900 dark:text-white animate-pulse">Cargando pasarela...</h1></div>;

  if (!session) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0B1120] flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-2xl">
          <div className="bg-blue-100 dark:bg-blue-500/10 p-4 rounded-full w-fit mx-auto mb-6 border border-blue-200 dark:border-blue-500/20">
            <Lock className="h-10 w-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Acceso Requerido</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8">Para proteger tu compra, necesitamos que inicies sesión.</p>
          <Link href="/login">
            <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg">
              Iniciar Sesión Segura
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0B1120] flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full">
          <div className="bg-emerald-100 dark:bg-emerald-500/10 p-6 rounded-full w-fit mx-auto mb-6 border border-emerald-200 dark:border-emerald-500/20 animate-bounce">
            <CheckCircle className="h-16 w-16 text-emerald-600 dark:text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">¡Pago Exitoso!</h1>
          <p className="text-slate-500 dark:text-slate-400 animate-pulse">Generando tu recibo...</p>
        </div>
      </div>
    );
  }
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0B1120] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Tu carrito está vacío</h1>
          <Link href="/"><Button variant="outline">Volver a la tienda</Button></Link>
        </div>
      </div>
    );
  }

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
                  
                  {/* 👇 AJUSTE: Lista con más espacio */}
                  <div className="max-h-[300px] overflow-y-auto space-y-5 pr-2 pl-2 custom-scrollbar">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 items-center group">
                        {/* 👇 AJUSTE: Imagen más grande (h-20 w-20) y con más padding interno (p-2) */}
                        <div className="relative h-20 w-20 bg-white rounded-xl overflow-hidden flex-shrink-0 border border-slate-700 shadow-sm">
                          <Image 
                            src={item.image} 
                            alt={item.title} 
                            fill 
                            className="object-contain p-2 group-hover:scale-110 transition-transform" 
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white line-clamp-2 leading-tight mb-1">{item.title}</p>
                          <div className="flex items-center gap-2">
                             <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Cant: {item.quantity}</span>
                          </div>
                        </div>
                        <p className="font-bold text-white text-base">${(item.price * item.quantity).toFixed(2)}</p>
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
                      <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    form="checkout-form"
                    className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold rounded-xl shadow-lg shadow-blue-900/50 transition-all hover:scale-[1.02]"
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