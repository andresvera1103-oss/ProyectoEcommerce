import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Efectos de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[128px]"></div>

      <div className="relative z-10 max-w-md w-full text-center">
        <div className="mx-auto bg-emerald-500/10 p-6 rounded-full w-fit mb-8 ring-1 ring-emerald-500/30 animate-bounce">
          <CheckCircle className="h-20 w-20 text-emerald-400" />
        </div>
        
        <h1 className="text-4xl font-black text-white mb-4 tracking-tight">¡Pago Exitoso!</h1>
        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
          Tu pedido ha sido procesado correctamente. Hemos enviado el recibo a tu correo electrónico.
        </p>
        
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 mb-8 backdrop-blur-sm">
          <p className="text-sm text-slate-500 mb-1">ID de Transacción</p>
          <p className="text-emerald-400 font-mono font-bold tracking-wider">ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        </div>

        <Link href="/">
          <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold h-12 shadow-lg shadow-blue-900/20 group">
            Volver a la Tienda <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}