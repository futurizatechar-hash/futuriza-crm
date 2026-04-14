import { Activity, TrendingUp, DollarSign, CheckCircle2 } from 'lucide-react';
import StatCard from '../components/StatCard';
import { COLUMNAS } from '../lib/constants';

export default function AnalyticsView({ leads }) {
  const totalProspectos = leads.length;
  const pipelineValue = leads.filter(l => l.estado_embudo !== 'ganado').reduce((acc, curr) => acc + Number(curr.valor_estimado || 0), 0);
  const closedRevenue = leads.filter(l => l.estado_embudo === 'ganado').reduce((acc, curr) => acc + Number(curr.valor_estimado || 0), 0);

  return (
    <div className="h-full p-4 sm:p-8 overflow-y-auto pb-12 bg-[#F8FAFC] custom-scrollbar">
      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12 flex flex-col items-center">
        
        <div className="w-full flex justify-center pb-6 border-b border-slate-200">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white border border-slate-100 flex items-center justify-center overflow-hidden p-3 shadow-premium-hover">
            <img src="/favicon.webp" alt="Futuriza B2B Platform" className="w-[85%] h-[85%] object-contain" />
          </div>
        </div>

        <div className="w-full text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-brand-dark flex items-center justify-center sm:justify-start gap-3 tracking-tighter"><Activity className="text-brand-accent" /> Panel Gerencial Futuriza</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">Métricas claves de facturación del embudo comercial en tiempo real.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full pt-4">
          <StatCard title="Prospectos Totales" value={totalProspectos} icon={TrendingUp} textColor="text-brand-dark" bgIconColor="text-slate-100" />
          <StatCard title="Negociación" value={`$${pipelineValue.toLocaleString()}`} icon={DollarSign} textColor="text-brand-accent" bgIconColor="text-brand-accent/5" borderClass="border-b-4 border-b-brand-accent" />
          <StatCard title="Cerrado" value={`$${closedRevenue.toLocaleString()}`} icon={CheckCircle2} textColor="text-brand-cyan" bgIconColor="text-brand-cyan/5" borderClass="border-b-4 border-b-brand-cyan sm:col-span-2 lg:col-span-1" />
        </div>

        {/* Funnel Breakdown */}
        <div className="glass-card p-5 sm:p-6 w-full">
          <h2 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider mb-5">Desglose por Etapa</h2>
          <div className="space-y-3">
            {COLUMNAS.map(col => {
              const count = leads.filter(l => (l.estado_embudo || 'nuevo') === col.id).length;
              const totalValue = leads.filter(l => (l.estado_embudo || 'nuevo') === col.id).reduce((acc, curr) => acc + Number(curr.valor_estimado || 0), 0);
              const percentage = totalProspectos > 0 ? (count / totalProspectos) * 100 : 0;
              return (
                <div key={col.id} className="flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-500 w-32 sm:w-40 truncate">{col.titulo}</span>
                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand-accent to-brand-cyan rounded-full transition-all duration-700 ease-out" style={{ width: `${percentage}%` }} />
                  </div>
                  <span className="text-xs font-extrabold text-brand-dark w-8 text-right">{count}</span>
                  <span className="text-xs font-bold text-emerald-600 w-20 text-right hidden sm:block">${totalValue.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
