import { LayoutDashboard, KanbanSquare, MessageSquare, Activity, LogOut, X } from 'lucide-react';

export default function Sidebar({ activeView, onViewChange, leads, onLogout, isMobileOpen, onCloseMobile }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pipeline', label: 'Embudo', icon: KanbanSquare, badge: leads.filter(l => l.estado_embudo !== 'ganado').length },
    { id: 'inbox', label: 'Bandeja IA', icon: MessageSquare, badge: leads.filter(l => l.historial_chat && l.historial_chat.length > 0).length },
    { id: 'analytics', label: 'Métricas', icon: Activity },
  ];

  return (
    <aside className={`fixed md:static inset-y-0 left-0 w-64 bg-white border-r border-slate-200 flex flex-col z-50 shadow-sm transition-transform duration-300 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
      <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100 shrink-0 bg-white">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-white border border-slate-200 p-1 flex items-center justify-center overflow-hidden shadow-sm">
            <img src="/favicon.webp" alt="Futuriza" className="w-[90%] h-[90%] object-contain" />
          </div>
          <span className="ml-3 text-sm font-bold tracking-widest text-brand-dark">FUTURIZA</span>
        </div>
        <button className="md:hidden text-slate-400 hover:text-brand-dark transition-colors" onClick={onCloseMobile}><X className="w-6 h-6" /></button>
      </div>
      <nav className="flex-1 py-6 px-3 space-y-2 bg-[#F8FAFC] overflow-y-auto custom-scrollbar">
        {navItems.map(item => (
          <button key={item.id} onClick={() => { onViewChange(item.id); onCloseMobile(); }} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all ${activeView === item.id ? 'bg-white text-brand-accent shadow-sm border border-slate-100' : 'text-slate-600 hover:bg-slate-100/50'}`}>
            <div className="flex items-center gap-3"><item.icon className="w-5 h-5 shrink-0" /> {item.label}</div>
            {item.badge !== undefined && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeView === item.id ? 'bg-brand-accent/10 text-brand-accent' : 'bg-slate-200 text-slate-500'}`}>{item.badge}</span>
            )}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-200 bg-white shrink-0">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors border border-red-100">
          <LogOut className="w-5 h-5 shrink-0" /> Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
