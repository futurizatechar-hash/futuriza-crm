import { User, Flame } from 'lucide-react';
import { getPriorityColor } from '../lib/constants';

export default function LeadCard({ lead, onClick, index = 0 }) {
  return (
    <div 
      onClick={onClick} 
      className="glass-card cursor-pointer group p-4 sm:p-5 border border-slate-200 hover:border-brand-accent/30 hover:shadow-premium-hover animate-fade-in-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex justify-between items-start mb-3">
        <span className={`px-2 py-1 sm:px-2.5 sm:py-1 text-[10px] uppercase font-bold rounded-md border ${getPriorityColor(lead.prioridad || 'Media')}`}>
          {lead.prioridad || 'Media'}
        </span>
        {lead.valor_estimado > 0 && <span className="text-emerald-700 font-bold text-[10px] sm:text-xs bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">${lead.valor_estimado}</span>}
      </div>
      <h3 className="text-sm sm:text-base font-bold text-brand-dark mb-1 flex items-center gap-2 group-hover:text-brand-accent transition-colors">
        {lead.prioridad === 'Alta' && <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500"/>} 
        {lead.empresa || 'Sin Empresa'}
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-2 mb-3 sm:mb-4"><User className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {lead.nombre || 'Sin Nombre'}</p>
      {lead.servicio_interes && <div className="mt-2 pt-3 sm:mt-3 border-t border-slate-100 text-[10px] sm:text-xs text-brand-cyan font-bold">{lead.servicio_interes}</div>}
    </div>
  );
}
