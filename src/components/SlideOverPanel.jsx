import { X, Phone, AlertCircle, Zap, Send, CheckCircle2, Trash2, MessageCircle, Shield, Users, Mail, Globe } from 'lucide-react';
import { COLUMNAS, SERVICIOS, PRIORIDADES } from '../lib/constants';

// Extrae el tamaño de equipo/flota del campo resumen_chat
function parseTeamSize(resumenChat) {
  if (!resumenChat) return null;
  const match = resumenChat.match(/Tama[ñn]o de equipo\/flota:\s*(.+)/i);
  return match ? match[1].trim() : null;
}

export default function SlideOverPanel({ 
  lead, isOpen, onClose, onUpdateStatus, onUpdateField, onDelete, 
  activeTab, onTabChange, webhookStatus, onTriggerWebhook 
}) {
  if (!isOpen || !lead) return null;

  return (
    <>
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 animate-fade-in" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-[#F8FAFC] border-l border-slate-200 shadow-2xl z-50 flex flex-col animate-slide-in-right">
        
        {/* Tabs Header */}
        <div className="h-16 px-4 sm:h-20 sm:px-6 border-b border-slate-200 flex items-center justify-between bg-white shrink-0 shadow-sm relative z-10">
          <div className="flex bg-slate-100 rounded-lg p-1 border border-slate-200 overflow-x-auto hide-scrollbar w-full sm:w-auto mr-3">
            <button onClick={() => onTabChange('detalles')} className={`px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'detalles' ? 'bg-white text-brand-accent shadow' : 'text-slate-500 hover:text-slate-700'}`}>Ficha CRM</button>
            <button onClick={() => onTabChange('chat')} className={`px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${activeTab === 'chat' ? 'bg-white text-brand-accent shadow' : 'text-slate-500 hover:text-slate-700'}`}><MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4"/> Chat IA</button>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-brand-dark bg-slate-50 border border-slate-200 p-1.5 sm:p-2 rounded-lg transition-colors shrink-0"><X className="w-5 h-5" /></button>
        </div>

        {activeTab === 'detalles' ? (
          <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-4 sm:space-y-6 custom-scrollbar bg-[#F8FAFC]">
            
            {/* Lead Header Card */}
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 relative overflow-hidden shadow-sm">
              <div className={`absolute top-0 left-0 w-1.5 h-full ${lead.prioridad === 'Alta' ? 'bg-red-500' : lead.prioridad === 'Baja' ? 'bg-slate-400' : 'bg-amber-400'}`}></div>
              <div className="flex justify-between items-start pl-3 sm:pl-2 mb-3">
                <div>
                  <h3 className="text-lg sm:text-2xl font-bold text-brand-dark mb-0.5 sm:mb-1 tracking-tight">{lead.empresa}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">{lead.nombre}</p>
                </div>
                {lead.telefono && <a href={`https://wa.me/${lead.telefono.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="bg-[#25D366]/10 border border-[#25D366]/20 p-2 sm:p-2.5 rounded-lg text-[#25D366] hover:bg-[#25D366]/20 transition-colors shrink-0"><Phone className="w-4 h-4 sm:w-5 sm:h-5"/></a>}
              </div>

              {/* Datos de contacto de solo lectura */}
              <div className="pl-3 sm:pl-2 space-y-2 pt-3 border-t border-slate-100">
                {lead.email && (
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <a href={`mailto:${lead.email}`} className="hover:text-brand-accent transition-colors truncate font-medium">{lead.email}</a>
                  </div>
                )}
                {parseTeamSize(lead.resumen_chat) && (
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-medium">Equipo/Flota: </span>
                    <span className="bg-brand-accent/10 text-brand-accent font-bold px-2 py-0.5 rounded-md border border-brand-accent/20">{parseTeamSize(lead.resumen_chat)}</span>
                  </div>
                )}
                {lead.origen && (
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Origen: <span className="font-semibold">{lead.origen}</span></span>
                  </div>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Estado</label>
                  <select value={lead.estado_embudo || 'nuevo'} onChange={(e) => onUpdateStatus(lead.id, e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-700 outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 text-sm cursor-pointer appearance-none transition-all shadow-sm">
                    {COLUMNAS.map(col => <option key={col.id} value={col.id}>{col.titulo}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5"/> Prioridad</label>
                  <select value={lead.prioridad || 'Media'} onChange={(e) => onUpdateField(lead.id, 'prioridad', e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-700 outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 text-sm cursor-pointer appearance-none transition-all shadow-sm">
                    {PRIORIDADES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Valor (USD)</label>
                  <input type="number" value={lead.valor_estimado || 0} onChange={(e) => onUpdateField(lead.id, 'valor_estimado', e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl p-3 text-emerald-600 font-extrabold outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-all shadow-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Interés</label>
                  <select value={lead.servicio_interes || SERVICIOS[0]} onChange={(e) => onUpdateField(lead.id, 'servicio_interes', e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl p-3 text-brand-cyan font-bold outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 text-sm cursor-pointer appearance-none transition-all shadow-sm">
                    {SERVICIOS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-6 border-t border-slate-200 mt-4">
                <label className="text-xs font-bold text-brand-accent uppercase tracking-wider mb-3.5 block flex items-center gap-2.5"><Zap className="w-4 h-4"/> Acciones Rápidas</label>
                <div className="space-y-2.5">
                  <button onClick={() => onTriggerWebhook('Enviar PDF Servicios')} className="w-full bg-white hover:bg-slate-50 border border-slate-200 p-3.5 rounded-lg flex items-center justify-between text-sm text-slate-700 transition-colors group shadow-sm font-semibold">
                    Enviar PDF Servicios <Send className="w-4 h-4 text-slate-400 group-hover:text-brand-accent transition-colors"/>
                  </button>
                </div>
                {webhookStatus && <p className="text-xs text-emerald-600 mt-3.5 flex items-center gap-1.5 font-medium"><CheckCircle2 className="w-3.5 h-3.5"/> {webhookStatus}</p>}
              </div>
            </div>

            {/* Delete Button */}
            <div className="pt-8 mt-auto">
              <button onClick={() => onDelete(lead.id)} className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl border border-red-200 bg-white text-red-500 hover:bg-red-50 transition-colors font-bold text-sm shadow-sm">
                <Trash2 className="w-4 h-4" /> Eliminar Prospecto Definitivamente
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col bg-slate-50 relative">
            {/* Chat View */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
              {(!lead.historial_chat || lead.historial_chat.length === 0) ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 text-sm text-center max-w-sm mx-auto space-y-6">
                  <div className="w-20 h-20 rounded-full bg-white border border-slate-200 flex items-center justify-center overflow-hidden p-2 shadow-sm">
                    <img src="/favicon.webp" alt="Futuriza Icon" className="w-[85%] h-[85%] object-contain" />
                  </div>
                  <p>No hay historial de chat auditado.</p>
                </div>
              ) : (
                lead.historial_chat.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-brand-accent text-white rounded-tr-sm border border-orange-600' : 'bg-white text-slate-700 rounded-tl-sm border border-slate-200'}`}>
                      {msg.sender === 'bot' && <div className="text-[10px] text-brand-dark font-bold mb-1.5 flex items-center gap-1.5 border-b border-slate-100 pb-1.5"><Shield className="w-3.5 h-3.5 text-brand-cyan"/> Futuriza AI</div>}
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1.5 pr-1 font-medium">{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                ))
              )}
            </div>
            <div className="p-4 bg-white border-t border-slate-200 shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
              <p className="text-xs text-slate-400 text-center flex items-center justify-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500"/> Historial sincronizado vía IA.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
