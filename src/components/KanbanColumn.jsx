import LeadCard from './LeadCard';

export default function KanbanColumn({ column, leads, onLeadClick }) {
  return (
    <div className="w-full md:w-80 shrink-0 flex flex-col md:snap-start md:pb-4 md:h-full">
      <div className="sticky top-0 z-10 flex items-center justify-between mb-3 md:mb-4 bg-white/90 backdrop-blur-md p-3.5 md:p-3 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <h2 className="text-xs font-extrabold text-slate-700 uppercase tracking-widest">{column.titulo}</h2>
        <span className="bg-brand-accent/10 text-brand-accent text-xs font-bold px-2.5 py-1 rounded-md border border-brand-accent/20">{leads.length}</span>
      </div>
      <div className="flex flex-col gap-3 md:space-y-4 md:flex-1 md:overflow-y-auto pr-1 md:pr-2 custom-scrollbar pb-2 md:pb-10">
        {leads.map((lead, idx) => (
          <LeadCard key={lead.id} lead={lead} index={idx} onClick={() => onLeadClick(lead.id)} />
        ))}
        {leads.length === 0 && (
          <div className="text-center p-6 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            <span className="text-xs font-bold text-slate-400">Sin Prospectos</span>
          </div>
        )}
      </div>
    </div>
  );
}
