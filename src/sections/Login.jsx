import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 sm:p-8 font-sans bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-blend-overlay relative overflow-hidden">
      {/* Dynamic Background Elements for UI polish */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-screen bg-gradient-to-bl from-brand-cyan/5 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full md:w-1/2 h-screen bg-gradient-to-tr from-brand-accent/5 to-transparent pointer-events-none"></div>

      <div className="w-full max-w-[420px] glass-card relative z-10 p-8 sm:p-10 shadow-premium-hover border border-white">
        
        {/* Glow effect behind the card */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-cyan/15 rounded-full blur-[60px] pointer-events-none"></div>

        <div className="text-center mb-8 relative z-10 flex flex-col items-center">
          {/* Responsive logo size */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white flex items-center justify-center overflow-hidden p-3 sm:p-4 shadow-sm mb-4 border border-slate-100 transition-transform hover:scale-105 duration-500">
            <img src="/favicon.webp" alt="Futuriza Icon" className="w-[90%] h-[90%] object-contain" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tighter">FUTURIZA</h2>
          <h3 className="text-[10px] sm:text-xs font-bold text-brand-accent uppercase tracking-[0.25em] mt-2 pb-1 border-b border-brand-accent/20">CRM Inteligente</h3>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5 relative z-10">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-accent transition-colors" />
            <input type="email" placeholder="Email corporativo" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-slate-50/50 border border-slate-200 rounded-xl py-3.5 sm:py-4 pl-11 pr-4 text-sm sm:text-base text-slate-700 placeholder-slate-400 focus:border-brand-accent focus:bg-white focus:ring-4 focus:ring-brand-accent/10 outline-none transition-all duration-200" />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-accent transition-colors" />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-slate-50/50 border border-slate-200 rounded-xl py-3.5 sm:py-4 pl-11 pr-4 text-sm sm:text-base text-slate-700 placeholder-slate-400 focus:border-brand-accent focus:bg-white focus:ring-4 focus:ring-brand-accent/10 outline-none transition-all duration-200" />
          </div>

          <button type="submit" disabled={loading} className="w-full btn-primary text-base sm:text-lg mt-2 py-4">
            {loading ? 'Validando...' : <>Ingresar al Sistema <LogIn className="w-5 h-5" /></>}
          </button>
        </form>
      </div>
    </div>
  );
}
