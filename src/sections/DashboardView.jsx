import { TrendingUp, DollarSign, CheckCircle2, Users, ArrowRight, Flame, Clock } from 'lucide-react';
import StatCard from '../components/StatCard';
import { COLUMNAS } from '../lib/constants';

export default function DashboardView({ leads, onViewChange, onLeadClick }) {
  const totalProspectos = leads.length;
  const pipelineValue = leads.filter(l => l.estado_embudo !== 'ganado').reduce((acc, curr) => acc + Number(curr.valor_estimado || 0), 0);
  const closedRevenue = leads.filter(l => l.estado_embudo === 'ganado').reduce((acc, curr) => acc + Number(curr.valor_estimado || 0), 0);
  const conversionRate = totalProspectos > 0 ? Math.round((leads.filter(l => l.estado_embudo === 'ganado').length / totalProspectos) * 100) : 0;
  const recentLeads = [...leads].slice(0, 5);

  return (
    <div className="h-full p-4 sm:p-8 overflow-y-auto pb-12 bg-[#F8FAFC] custom-scrollbar">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">Centro de Mando</h1>
            <p className="text-sm text-slate-500 mt-1">Resumen ejecutivo de tu pipeline comercial en tiempo real.</p>
          </div>
          <button onClick={() => onViewChange('pipeline')} className="flex items-center gap-2 text-sm font-bold text-brand-accent hover:text-[#eb5a26] transition-colors group">
            Ir al Embudo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard title="Prospectos" value={totalProspectos} icon={Users} textColor="text-brand-dark" bgIconColor="text-slate-100" />
          <StatCard title="En Negociación" value={`$${pipelineValue.toLocaleString()}`} icon={DollarSign} textColor="text-brand-accent" bgIconColor="text-brand-accent/5" borderClass="border-b-4 border-b-brand-accent" />
          <StatCard title="Cerrado" value={`$${closedRevenue.toLocaleString()}`} icon={CheckCircle2} textColor="text-brand-cyan" bgIconColor="text-brand-cyan/5" borderClass="border-b-4 border-b-brand-cyan" />
          <StatCard title="Conversión" value={`${conversionRate}%`} icon={TrendingUp} textColor="text-emerald-600" bgIconColor="text-emerald-100" borderClass="border-b-4 border-b-emerald-400" />
        </div>

        {/* Funnel Progress */}
        <div className="glass-card p-5 sm:p-6">
          <h2 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider mb-5">Distribución del Embudo</h2>
          <div className="space-y-3">
            {COLUMNAS.map(col => {
              const count = leads.filter(l => (l.estado_embudo || 'nuevo') === col.id).length;
              const percentage = totalProspectos > 0 ? (count / totalProspectos) * 100 : 0;
              return (
                <div key={col.id} className="flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-500 w-32 sm:w-40 truncate">{col.titulo}</span>
                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand-accent to-brand-cyan rounded-full transition-all duration-700 ease-out" style={{ width: `${percentage}%` }} />
                  </div>
                  <span className="text-xs font-extrabold text-brand-dark w-8 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Recent Leads */}
          <div className="glass-card p-5 sm:p-6">
            <h2 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2"><Clock className="w-4 h-4 text-brand-accent" /> Últimos Ingresos</h2>
            <div className="space-y-3">
              {recentLeads.map(lead => (
                <div key={lead.id} onClick={() => onLeadClick(lead.id)} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-brand-accent/30 hover:bg-white cursor-pointer transition-all group">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-brand-dark group-hover:text-brand-accent transition-colors truncate">{lead.empresa || 'Sin Empresa'}</p>
                    <p className="text-xs text-slate-500 truncate">{lead.nombre}</p>
                  </div>
                  {lead.valor_estimado > 0 && <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100 ml-3 shrink-0">${lead.valor_estimado}</span>}
                </div>
              ))}
              {recentLeads.length === 0 && <p className="text-sm text-slate-400 text-center py-4">Sin prospectos aún.</p>}
            </div>
          </div>

          {/* Priority Alert */}
          <div className="glass-card p-5 sm:p-6">
            <h2 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2"><Flame className="w-4 h-4 text-red-500" /> Alta Prioridad</h2>
            <div className="space-y-3">
              {leads.filter(l => l.prioridad === 'Alta').slice(0, 5).map(lead => (
                <div key={lead.id} onClick={() => onLeadClick(lead.id)} className="flex items-center justify-between p-3 rounded-xl bg-red-50/50 border border-red-100 hover:border-red-300 cursor-pointer transition-all group">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-brand-dark group-hover:text-red-600 transition-colors truncate">{lead.empresa || 'Sin Empresa'}</p>
                    <p className="text-xs text-slate-500 truncate">{lead.nombre}</p>
                  </div>
                  <Flame className="w-4 h-4 text-red-400 shrink-0 ml-3" />
                </div>
              ))}
              {leads.filter(l => l.prioridad === 'Alta').length === 0 && <p className="text-sm text-slate-400 text-center py-4">Sin leads de alta prioridad.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
