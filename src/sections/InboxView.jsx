import { User } from 'lucide-react';

export default function InboxView({ leads, selectedLeadId, onLeadClick }) {
  return (
    <div className="h-full flex flex-col md:flex-row bg-[#F8FAFC]">
      <div className="w-full md:w-80 border-r border-slate-200 bg-white flex flex-col shrink-0 border-b md:border-b-0">
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <h2 className="text-sm font-bold text-slate-700 tracking-wider">Conversaciones IA</h2>
          <span className="bg-brand-accent/10 text-brand-accent text-xs font-bold px-2 py-0.5 rounded-md">{leads.filter(l => l.historial_chat && l.historial_chat.length > 0).length} Activos</span>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {leads.map(l => (
            <div key={l.id} onClick={() => onLeadClick(l.id)} className={`p-4 border-b border-slate-100 cursor-pointer ${selectedLeadId === l.id ? 'bg-brand-accent/5 border-l-brand-accent' : 'hover:bg-slate-50 bg-white'} border-l-4 border-l-transparent transition-all duration-200 group`}>
              <div className="flex justify-between items-start mb-1.5">
                <h3 className={`font-extrabold text-sm ${selectedLeadId === l.id ? 'text-brand-dark' : 'text-slate-700'} group-hover:text-brand-accent transition-colors`}>{l.empresa}</h3>
                {l.historial_chat && l.historial_chat.length > 0 && <div className="w-2 h-2 rounded-full bg-brand-cyan shadow-[0_0_5px_rgba(0,229,255,0.6)] shrink-0 mt-1"></div>}
              </div>
              <p className="text-xs text-brand-accent font-medium mb-2 flex items-center gap-1.5"><User className="w-3.5 h-3.5"/> {l.nombre}</p>
              <p className="text-xs text-slate-500 truncate bg-slate-50 p-1.5 rounded border border-slate-100 italic">{l.historial_chat && l.historial_chat.length > 0 ? l.historial_chat[l.historial_chat.length - 1].text : 'Sin mensajes de Mía (IA) aún...'}</p>
            </div>
          ))}
          {leads.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-sm font-medium">No hay prospectos en la bandeja.</div>
          )}
        </div>
      </div>
      
      {/* Right View - Desktop Only */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center p-8 text-center space-y-6 bg-[#F8FAFC]">
        <div className="w-24 h-24 rounded-full bg-white border border-slate-200 flex items-center justify-center overflow-hidden p-2 shadow-sm transition-transform hover:scale-105 duration-300">
          <img src="/favicon.webp" alt="Futuriza Icon" className="w-[85%] h-[85%] object-contain" />
        </div>
        <div className="max-w-md">
          <h2 className="text-xl font-bold text-brand-dark leading-snug">Bandeja de IA Inactiva.</h2>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">Selecciona un prospecto a la izquierda para interactuar con la línea temporal y el chat auditado de la Inteligencia Artificial.</p>
        </div>
      </div>
    </div>
  );
}
