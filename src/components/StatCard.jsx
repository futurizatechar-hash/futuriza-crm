export default function StatCard({ title, value, icon: Icon, textColor = 'text-brand-dark', bgIconColor = 'text-slate-100', borderClass = '' }) {
  return (
    <div className={`glass-card relative overflow-hidden group p-5 sm:p-6 ${borderClass}`}>
      <div className={`absolute -right-4 -top-4 sm:-right-6 sm:-top-6 ${bgIconColor} group-hover:opacity-70 transition-opacity duration-300`}>
        <Icon className="w-24 h-24 sm:w-32 sm:h-32" />
      </div>
      <p className="text-xs sm:text-sm text-slate-500 font-bold uppercase tracking-wider mb-2 relative z-10">{title}</p>
      <p className={`text-4xl sm:text-5xl font-extrabold relative z-10 tracking-tight ${textColor}`}>{value}</p>
    </div>
  );
}
