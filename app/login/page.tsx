'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertCircle, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Usuario o contraseña incorrectos.");
      setLoading(false);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Fondos decorativos */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]"></div>

      <Card className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border-slate-800 shadow-2xl relative z-10">
        <CardHeader className="space-y-2 text-center pb-8">
          <div className="mx-auto bg-slate-800 p-3 rounded-xl w-fit mb-2 border border-slate-700 shadow-inner">
            <Lock className="h-6 w-6 text-blue-400" />
          </div>
          <CardTitle className="text-3xl font-bold text-white tracking-tight">Bienvenido</CardTitle>
          <CardDescription className="text-slate-400">
            Accede a tu cuenta para gestionar tus pedidos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg flex items-center gap-2 text-sm animate-in slide-in-from-top-2">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Usuario</label>
              <Input 
                placeholder="emilys"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-slate-950 border-slate-800 text-white focus-visible:ring-blue-500 h-11"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Contraseña</label>
                <span className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer">¿Olvidaste tu contraseña?</span>
              </div>
              <Input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-slate-950 border-slate-800 text-white focus-visible:ring-blue-500 h-11"
              />
            </div>

            <Button 
              className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-900/30 transition-all" 
              type="submit" 
              disabled={loading}
            >
              {loading ? "Verificando..." : <span className="flex items-center gap-2">Ingresar <ArrowRight className="h-4 w-4" /></span>}
            </Button>

            <div className="mt-6 pt-6 border-t border-slate-800 text-center">
              <p className="text-xs text-slate-500 mb-2">Credenciales Demo:</p>
              <code className="bg-slate-950 px-3 py-1 rounded border border-slate-800 text-xs text-slate-300 font-mono">emilys / emilyspass</code>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}