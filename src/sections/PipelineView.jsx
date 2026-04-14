import KanbanColumn from '../components/KanbanColumn';
import { COLUMNAS } from '../lib/constants';

export default function PipelineView({ leads, onLeadClick }) {
  return (
    <div className="h-full p-4 md:p-8 overflow-y-auto overflow-x-hidden md:overflow-y-hidden md:overflow-x-auto flex flex-col md:flex-row gap-8 md:gap-6 md:snap-x md:snap-mandatory md:scroll-pl-8 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-blend-overlay bg-slate-50/50">
      {COLUMNAS.map(col => {
        const columnLeads = leads.filter(l => (l.estado_embudo || 'nuevo') === col.id);
        return <KanbanColumn key={col.id} column={col} leads={columnLeads} onLeadClick={onLeadClick} />;
      })}
    </div>
  );
}
