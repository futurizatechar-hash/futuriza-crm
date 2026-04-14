export const COLUMNAS = [
  { id: 'nuevo', titulo: 'Ingreso IA' },
  { id: 'calificado', titulo: 'Calificado' },
  { id: 'demo', titulo: 'Demo Agendada' },
  { id: 'propuesta', titulo: 'Propuesta Enviada' },
  { id: 'ganado', titulo: 'Cerrado Ganado' }
];

export const SERVICIOS = ['Bot WhatsApp (Typebot)', 'Automatización n8n', 'CRM a Medida', 'Consultoría IA'];
export const PRIORIDADES = ['Alta', 'Media', 'Baja'];

export const getPriorityColor = (prioridad) => {
  if (prioridad === 'Alta') return 'bg-red-50 text-red-700 border-red-200';
  if (prioridad === 'Baja') return 'bg-slate-100 text-slate-600 border-slate-200';
  return 'bg-amber-50 text-amber-700 border-amber-200';
};
