import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { SERVICIOS, PRIORIDADES } from '../lib/constants';

export default function NewLeadModal({ isOpen, onClose, onSubmit }) {
  const [newLead, setNewLead] = useState({ 
    nombre: '', empresa: '', email: '', telefono: '', origen: 'Manual', 
    valor_estimado: 0, servicio_interes: SERVICIOS[0], prioridad: 'Media', historial_chat: [] 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(newLead);
      setNewLead({ nombre: '', empresa: '', email: '', telefono: '', origen: 'Manual', valor_estimado: 0, servicio_interes: SERVICIOS[0], prioridad: 'Media', historial_chat: [] });
    } catch (error) {
      alert('Error al crear prospecto.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative w-full max-w-lg glass-card z-10 animate-scale-in p-6 sm:p-8 max-h-[95vh] overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
          <h2 className="text-xl sm:text-2xl font-bold text-brand-dark flex items-center gap-2.5"><Plus className="w-5 h-5 sm:w-6 sm:h-6 text-brand-accent"/> Cargar Prospecto</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-brand-dark p-1.5 sm:p-2 rounded-lg bg-slate-50 border border-slate-100 transition-colors"><X className="w-4 h-4 sm:w-5 sm:h-5"/></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Empresa</label>
              <input type="text" required value={newLead.empresa} onChange={e => setNewLead({...newLead, empresa: e.target.value})} className="w-full mt-1.5 bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-3.5 text-slate-700 focus:border-brand-accent focus:bg-white focus:ring-4 focus:ring-brand-accent/10 outline-none transition-all shadow-inner text-sm sm:text-base" placeholder="Ej: Seguridad Sur SA" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Nombre del Contacto</label>
              <input type="text" required value={newLead.nombre} onChange={e => setNewLead({...newLead, nombre: e.target.value})} className="w-full mt-1.5 bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-3.5 text-slate-700 focus:border-brand-accent focus:bg-white focus:ring-4 focus:ring-brand-accent/10 outline-none transition-all shadow-inner text-sm sm:text-base" placeholder="Ej: Juan Pérez" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Prioridad Inicial</label>
              <select value={newLead.prioridad} onChange={e => setNewLead({...newLead, prioridad: e.target.value})} className="w-full mt-1.5 bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-3.5 text-brand-dark focus:border-brand-accent focus:bg-white focus:ring-4 focus:ring-brand-accent/10 outline-none cursor-pointer appearance-none shadow-inner text-sm transition-all">
                {PRIORIDADES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Servicio de Interés</label>
              <select value={newLead.servicio_interes} onChange={e => setNewLead({...newLead, servicio_interes: e.target.value})} className="w-full mt-1.5 bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-3.5 text-brand-cyan font-bold focus:border-brand-accent focus:bg-white focus:ring-4 focus:ring-brand-accent/10 outline-none cursor-pointer appearance-none shadow-inner text-sm transition-all">
                {SERVICIOS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full mt-6 bg-brand-accent text-white font-bold text-base sm:text-lg py-3.5 sm:py-4 rounded-xl transition-all duration-300 hover:bg-[#eb5a26] flex items-center justify-center shadow-premium-hover">{isSubmitting ? 'Guardando en Futuriza...' : 'Cargar Prospecto Definitivo'}</button>
        </form>
      </div>
    </div>
  );
}
