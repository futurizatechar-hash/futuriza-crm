import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Mail, Lock, LogIn, Shield } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-[#020617] p-4 text-slate-300 font-sans bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-blend-overlay">
      <div className="w-full max-w-md bg-[#0B1120] rounded-3xl p-10 shadow-2xl border border-slate-800 relative overflow-hidden">

        {/* Glow effect behind the card */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center mb-8 relative z-10 flex flex-col items-center">
          {/* MODIFIED: Increased scale of circular logo container from w-24 (96px) to w-36 (144px).
               Kept the masking strategy and blend effects that work. */}
          <div className="w-36 h-36 rounded-full bg-black border-2 border-slate-700 flex items-center justify-center overflow-hidden p-3 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)] shadow-inner">
            <img src="/icon.jpg" alt="Futuriza Icon" className="h-full object-contain mix-blend-screen brightness-[0.8] contrast-[1.2]" />
          </div>

          {/* Re-aligned typography block below the scaled icon. Slightly increased margin-top. */}
          <h2 className="text-3xl font-extrabold text-white mt-6 tracking-tighter">FUTURIZA</h2>
          <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-[0.3em] mt-2 pb-1 border-b border-cyan-500/10">CRM Automatizado</h3>
        </div>

        <form onSubmit={handleLogin} className="space-y-5 relative z-10">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
            <input type="email" placeholder="Email corporativo" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-[#050B14] border border-slate-800/80 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-600 focus:border-cyan-500 outline-none transition-all duration-200 shadow-inner" />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-[#050B14] border border-slate-800/80 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-600 focus:border-cyan-500 outline-none transition-all duration-200 shadow-inner" />
          </div>

          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-lg py-4 rounded-xl transition-all duration-200 disabled:opacity-50 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            {loading ? 'Ingresando...' : <>Ingresar al Sistema <LogIn className="w-5 h-5" /></>}
          </button>
        </form>
      </div>
    </div>
  );
}
