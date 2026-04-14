import { Search, Menu, Plus, User } from 'lucide-react';

export default function Header({ searchTerm, onSearch, onNewLead, onMenuToggle }) {
  return (
    <header className="h-16 md:h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0 z-10 shadow-sm">
      <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
        <button className="md:hidden text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200 hover:bg-slate-100" onClick={onMenuToggle}><Menu className="w-5 h-5" /></button>
        
        {/* Branding Header en Modo Móvil */}
        <div className="flex md:hidden items-center">
          <div className="w-8 h-8 rounded-full bg-white border border-slate-200 p-1 flex items-center justify-center overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
            <img src="/favicon.webp" alt="Futuriza" className="w-[85%] h-[85%] object-contain" />
          </div>
          <span className="ml-2.5 text-[11px] font-extrabold tracking-widest text-brand-dark">FUTURIZA</span>
        </div>

        <div className="relative w-full md:w-96 hidden md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input type="text" placeholder="Buscar empresas..." value={searchTerm} onChange={e => onSearch(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-full py-2.5 pl-11 pr-4 text-sm text-slate-700 placeholder-slate-400 focus:border-brand-accent focus:bg-white focus:ring-4 focus:ring-brand-accent/10 outline-none transition-all shadow-inner" />
        </div>
      </div>
      <div className="flex items-center gap-3 md:gap-6 shrink-0">
        <button onClick={onNewLead} className="flex items-center justify-center bg-brand-accent text-white p-2.5 md:py-2 md:px-4 rounded-xl font-bold transition-all duration-300 hover:bg-[#eb5a26] shadow-premium-light hover:shadow-premium-hover">
          <Plus className="w-5 h-5 md:w-4 md:h-4" /> <span className="hidden md:inline-block ml-2 text-sm">Nuevo Lead</span>
        </button>
        <div className="hidden md:flex w-10 h-10 rounded-full bg-slate-50 border border-slate-200 items-center justify-center shadow-sm hover:border-brand-accent transition-colors cursor-pointer">
          <User className="w-5 h-5 text-brand-dark" />
        </div>
      </div>
    </header>
  );
}
