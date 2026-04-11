import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { 
  Shield, LayoutDashboard, KanbanSquare, MessageSquare, 
  Search, Bell, LogOut, Send, User, Building, Phone, 
  CheckCircle2, Menu, Plus, X, MoreVertical, Mail, Trash2, 
  DollarSign, Activity, TrendingUp, Calendar, Bot, Zap, Flame, AlertCircle, MessageCircle, Settings
} from 'lucide-react';

const COLUMNAS = [
  { id: 'nuevo', titulo: 'Ingreso IA' },
  { id: 'calificado', titulo: 'Calificado' },
  { id: 'demo', titulo: 'Demo Agendada' },
  { id: 'propuesta', titulo: 'Propuesta Enviada' },
  { id: 'ganado', titulo: 'Cerrado Ganado' }
];

const SERVICIOS = ['Bot WhatsApp (Typebot)', 'Automatización n8n', 'CRM a Medida', 'Consultoría IA'];
const PRIORIDADES = ['Alta', 'Media', 'Baja'];

const getPriorityColor = (prioridad) => {
  if (prioridad === 'Alta') return 'bg-red-500/10 text-red-400 border-red-500/20';
  if (prioridad === 'Baja') return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
};

export default function CrmDashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('pipeline');
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [webhookStatus, setWebhookStatus] = useState(null);
  const [activeSlideOverTab, setActiveSlideOverTab] = useState('detalles');
  
  const [newLead, setNewLead] = useState({ nombre: '', empresa: '', email: '', telefono: '', origen: 'Manual', valor_estimado: 0, servicio_interes: SERVICIOS[0], prioridad: 'Media', historial_chat: [] });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchLeads();
    const channel = supabase.channel('schema-db-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'leads_futuriza' }, () => fetchLeads()).subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  async function fetchLeads() {
    try {
      const { data, error } = await supabase.from('leads_futuriza').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      if (data) {
        setLeads(data);
        if (data.length > 0 && !selectedLeadId) setSelectedLeadId(data[0].id);
      }
    } catch (error) { console.error(error); } finally { setLoading(false); }
  }

  const handleLogout = async () => await supabase.auth.signOut();

  const handleAddLead = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = { ...newLead, estado_embudo: 'nuevo', valor_estimado: Number(newLead.valor_estimado) };
      const { error } = await supabase.from('leads_futuriza').insert([payload]);
      if (error) throw error;
      setIsNewLeadModalOpen(false);
      setNewLead({ nombre: '', empresa: '', email: '', telefono: '', origen: 'Manual', valor_estimado: 0, servicio_interes: SERVICIOS[0], prioridad: 'Media', historial_chat: [] });
    } catch (error) { alert('Error al crear prospecto.'); } finally { setIsSubmitting(false); }
  };

  const handleUpdateStatus = async (leadId, newStatus) => {
    try {
      setLeads(leads.map(l => l.id === leadId ? { ...l, estado_embudo: newStatus } : l));
      await supabase.from('leads_futuriza').update({ estado_embudo: newStatus }).eq('id', leadId);
    } catch (error) { fetchLeads(); }
  };

  const handleUpdateLeadField = async (leadId, field, value) => {
    try {
      setLeads(leads.map(l => l.id === leadId ? { ...l, [field]: value } : l));
      await supabase.from('leads_futuriza').update({ [field]: value }).eq('id', leadId);
    } catch (error) { fetchLeads(); }
  };

  const handleDeleteLead = async (leadId) => {
    if (!window.confirm('¿Eliminar lead permanentemente?')) return;
    try {
      setLeads(leads.filter(l => l.id !== leadId));
      setIsSlideOverOpen(false);
      await supabase.from('leads_futuriza').delete().eq('id', leadId);
    } catch (error) { fetchLeads(); }
  };

  const triggerWebhook = (actionName) => {
    setWebhookStatus(`Ejecutando: ${actionName}...`);
    setTimeout(() => {
      setWebhookStatus('Automatización disparada.');
      setTimeout(() => setWebhookStatus(null), 3000);
    }, 1500);
  };

  const filteredLeads = leads.filter(lead => (lead.empresa?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || (lead.nombre?.toLowerCase() || '').includes(searchTerm.toLowerCase()));
  const activeLead = leads.find(l => l.id === selectedLeadId);

  const totalPipelineValue = leads.filter(l => l.estado_embudo !== 'ganado').reduce((acc, curr) => acc + Number(curr.valor_estimado || 0), 0);
  const closedRevenue = leads.filter(l => l.estado_embudo === 'ganado').reduce((acc, curr) => acc + Number(curr.valor_estimado || 0), 0);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-cyan-400 font-bold uppercase">Iniciando Futuriza Core...</div>;

  return (
    <div className="min-h-screen bg-black font-sans text-slate-300 flex overflow-hidden selection:bg-cyan-500/30">
      {isMobileMenuOpen && <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />}

      {/* SIDEBAR */}
      <aside className={`fixed md:static inset-y-0 left-0 w-64 bg-black border-r border-slate-800/80 flex flex-col z-50 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800/80 shrink-0 bg-black">
          <div className="flex items-center">
            {/* FIX: icon.jpg perfectly framed in rounded container to hide edges */}
            <div className="w-10 h-10 rounded-full bg-black border border-slate-700 p-1 flex items-center justify-center overflow-hidden shadow-inner drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
               <img src="/icon.jpg" alt="Futuriza" className="h-full object-contain mix-blend-screen" />
            </div>
            <span className="ml-3 text-sm font-bold tracking-widest text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">FUTURIZA</span>
          </div>
          <button className="md:hidden text-slate-400" onClick={() => setIsMobileMenuOpen(false)}><X className="w-6 h-6" /></button>
        </div>
        <nav className="flex-1 py-6 px-3 space-y-2 bg-[#0a0e1b]">
          <button onClick={() => { setActiveView('pipeline'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${activeView === 'pipeline' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'hover:bg-slate-900'}`}><KanbanSquare className="w-5 h-5" /> Embudo</button>
          <button onClick={() => { setActiveView('inbox'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${activeView === 'inbox' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'hover:bg-slate-900'}`}><MessageSquare className="w-5 h-5" /> Bandeja IA</button>
          <button onClick={() => { setActiveView('analytics'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${activeView === 'analytics' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'hover:bg-slate-900'}`}><Activity className="w-5 h-5" /> Métricas</button>
        </nav>
        <div className="p-4 border-t border-slate-800/80 bg-[#0a0e1b]"><button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400"><LogOut className="w-5 h-5" /> Salir</button></div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-black relative">
        {/* HEADER */}
        <header className="h-20 bg-[#0a0e1b] border-b border-slate-800/80 flex items-center justify-between px-4 md:px-8 shrink-0 z-10">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button className="md:hidden text-slate-400" onClick={() => setIsMobileMenuOpen(true)}><Menu className="w-6 h-6" /></button>
            <div className="relative w-full md:w-96 hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input type="text" placeholder="Buscar empresas..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-full py-2.5 pl-10 pr-4 text-sm text-white focus:border-cyan-500 outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-6 shrink-0">
            <button onClick={() => setIsNewLeadModalOpen(true)} className="hidden sm:flex px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-bold rounded-lg items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.2)]"><Plus className="w-4 h-4" /> Nuevo Lead</button>
            {/* Profile Avatar instead of redundant logo */}
            <div className="w-10 h-10 rounded-full bg-[#050B14] border border-slate-700 flex items-center justify-center shadow-inner hover:border-cyan-500/50 transition-colors cursor-pointer">
               <User className="w-5 h-5 text-cyan-500" />
            </div>
          </div>
        </header>

        {/* VIEWS */}
        <div className="flex-1 overflow-hidden relative bg-[#0a0e1b]">
          
          {/* KANBAN */}
          {activeView === 'pipeline' && (
            <div className="h-full p-4 md:p-8 overflow-x-auto flex gap-6 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-blend-overlay bg-black/40">
              {COLUMNAS.map(col => (
                <div key={col.id} className="w-80 shrink-0 flex flex-col">
                  <div className="flex items-center justify-between mb-4 bg-slate-900/80 p-3 rounded-lg border border-slate-800 backdrop-blur-sm">
                    <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">{col.titulo}</h2>
                    <span className="bg-slate-950 text-cyan-400 text-xs font-bold px-2 py-1 rounded-md border border-slate-700">{filteredLeads.filter(l => (l.estado_embudo || 'nuevo') === col.id).length}</span>
                  </div>
                  <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                    {filteredLeads.filter(l => (l.estado_embudo || 'nuevo') === col.id).map(lead => (
                      <div key={lead.id} onClick={() => {setSelectedLeadId(lead.id); setIsSlideOverOpen(true); setActiveSlideOverTab('detalles');}} className="group bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-5 cursor-pointer transition-all hover:-translate-y-1 relative shadow-inner group">
                        <div className="flex justify-between items-start mb-3">
                          <span className={`px-2 py-1 text-[10px] uppercase font-bold rounded border ${getPriorityColor(lead.prioridad || 'Media')}`}>
                            {lead.prioridad || 'Media'}
                          </span>
                          {lead.valor_estimado > 0 && <span className="text-green-400 font-bold text-xs bg-green-400/10 px-2 py-1 rounded border border-green-400/20">${lead.valor_estimado}</span>}
                        </div>
                        <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2 group-hover:text-cyan-400 transition-colors">{lead.prioridad === 'Alta' && <Flame className="w-4 h-4 text-red-500"/>} {lead.empresa || 'Sin Empresa'}</h3>
                        <p className="text-sm text-slate-400 flex items-center gap-2 mb-4"><User className="w-3 h-3" /> {lead.nombre || 'Sin Nombre'}</p>
                        {lead.servicio_interes && <div className="mt-3 pt-3 border-t border-slate-800/50 text-xs text-cyan-500 font-medium">{lead.servicio_interes}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* INBOX */}
          {activeView === 'inbox' && (
             <div className="h-full flex bg-black">
             <div className="w-80 border-r border-slate-800/80 bg-[#0a0e1b] flex flex-col shrink-0">
               <div className="p-4 border-b border-slate-800/80"><h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Prospectos ({filteredLeads.length})</h2></div>
               <div className="flex-1 overflow-y-auto">
                 {filteredLeads.map(l => (
                   <div key={l.id} onClick={() => {setSelectedLeadId(l.id); setActiveSlideOverTab('chat'); setIsSlideOverOpen(true);}} className={`p-4 border-b border-slate-800/50 cursor-pointer ${selectedLeadId === l.id ? 'bg-cyan-500/10 border-l-4 border-l-cyan-500' : 'hover:bg-slate-900/50'} border-l-4 border-l-transparent transition-all duration-200`}>
                     <h3 className={`font-bold text-sm ${selectedLeadId === l.id ? 'text-white' : 'text-slate-300'}`}>{l.empresa}</h3>
                     <p className="text-xs text-slate-400 truncate">{l.nombre}</p>
                   </div>
                 ))}
               </div>
             </div>
             <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6 bg-black">
                 {/* FIX: icon.jpg perfectly rounded to hide box edges */}
                 <div className="w-24 h-24 rounded-full bg-black border-2 border-slate-700 flex items-center justify-center overflow-hidden p-2 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]">
                     <img src="/icon.jpg" alt="Futuriza Icon" className="h-full object-contain mix-blend-screen" />
                 </div>
                 <div className="max-w-md">
                     <h2 className="text-xl font-bold text-slate-200 leading-snug">Seleccioná un prospecto.</h2>
                     <p className="text-sm text-slate-500 mt-2 leading-relaxed">La ficha técnica y el chat se abrirán en el panel lateral derecho.</p>
                 </div>
             </div>
           </div>
          )}

          {/* ANALYTICS DASHBOARD */}
          {activeView === 'analytics' && (
            <div className="h-full p-8 overflow-y-auto pb-12 bg-black">
              <div className="max-w-6xl mx-auto space-y-12 flex flex-col items-center">
                
                <div className="w-full flex justify-center pb-6 border-b border-slate-800/80">
                    {/* FIX: icon.jpg instead of vertical. scaled to 120px. perfectly rounded to hide edges. p-3 border added */}
                    <div className="w-32 h-32 rounded-full bg-black border-4 border-slate-700 flex items-center justify-center overflow-hidden p-3 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
                        <img src="/icon.jpg" alt="Futuriza B2B Platform" className="h-full object-contain mix-blend-screen" />
                    </div>
                </div>

                <div className="w-full">
                   <h2 className="text-2xl font-bold text-white flex items-center gap-3 tracking-tighter"><Activity className="text-cyan-400" /> Panel Gerencial Futuriza</h2>
                   <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">Métricas claves de facturación del embudo comercial en tiempo real.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-4">
                  <div className="bg-[#0a0e1b] p-6 rounded-2xl border border-slate-800 relative overflow-hidden group shadow-inner">
                    <div className="absolute -right-6 -top-6 text-slate-800/50 group-hover:text-cyan-500/10 transition-colors duration-300"><TrendingUp className="w-32 h-32" /></div>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-2 relative z-10">Prospectos Activos</p>
                    <p className="text-5xl font-extrabold text-white relative z-10 tracking-tight">{leads.filter(l => l.estado_embudo !== 'ganado').length}</p>
                  </div>
                  <div className="bg-[#0a0e1b] p-6 rounded-2xl border border-slate-800 border-b-4 border-b-cyan-500 relative overflow-hidden group shadow-inner">
                    <div className="absolute -right-6 -top-6 text-slate-800/50 group-hover:text-cyan-500/10 transition-colors duration-300"><DollarSign className="w-32 h-32" /></div>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-2 relative z-10">Monto en Negociación</p>
                    <p className="text-5xl font-extrabold text-cyan-400 relative z-10 tracking-tight">${totalPipelineValue.toLocaleString()}</p>
                  </div>
                  <div className="bg-[#0a0e1b] p-6 rounded-2xl border border-slate-800 border-b-4 border-b-green-500 relative overflow-hidden group shadow-inner">
                    <div className="absolute -right-6 -top-6 text-slate-800/50 group-hover:text-green-500/10 transition-colors duration-300"><CheckCircle2 className="w-32 h-32" /></div>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-2 relative z-10">Facturación Cerrada</p>
                    <p className="text-5xl font-extrabold text-green-400 relative z-10 tracking-tight">${closedRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* SLIDE-OVER DETAILS & CHAT */}
        {isSlideOverOpen && activeLead && (
          <>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300" onClick={() => setIsSlideOverOpen(false)} />
            <div className="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-[#0a0e1b] border-l border-slate-800 shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-out custom-slide-in">
              
              <div className="h-20 px-6 border-b border-slate-800 flex items-center justify-between bg-black shrink-0">
                <div className="flex bg-[#0a0e1b] rounded-lg p-1 border border-slate-800 shadow-inner">
                   <button onClick={() => setActiveSlideOverTab('detalles')} className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${activeSlideOverTab === 'detalles' ? 'bg-cyan-500/10 text-cyan-400 shadow' : 'text-slate-500 hover:text-slate-300'}`}>Ficha CRM</button>
                   <button onClick={() => setActiveSlideOverTab('chat')} className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${activeSlideOverTab === 'chat' ? 'bg-cyan-500/10 text-cyan-400 shadow' : 'text-slate-500 hover:text-slate-300'}`}><MessageCircle className="w-4 h-4"/> Chat IA</button>
                </div>
                <button onClick={() => setIsSlideOverOpen(false)} className="text-slate-400 hover:text-white bg-slate-800 p-2 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
              </div>

              {activeSlideOverTab === 'detalles' ? (
                <div className="p-6 flex-1 overflow-y-auto space-y-6 custom-scrollbar">
                  
                  <div className="bg-[#0a0e1b] rounded-xl p-5 border border-slate-800 relative overflow-hidden flex justify-between items-start shadow-md">
                    <div className={`absolute top-0 left-0 w-1 h-full ${activeLead.prioridad === 'Alta' ? 'bg-red-500' : activeLead.prioridad === 'Baja' ? 'bg-slate-500' : 'bg-yellow-500'}`}></div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">{activeLead.empresa}</h3>
                      <p className="text-slate-400 font-medium">{activeLead.nombre}</p>
                    </div>
                    {activeLead.telefono && <a href={`https://wa.me/${activeLead.telefono.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="bg-[#25D366]/20 p-2.5 rounded-lg text-[#25D366] hover:bg-[#25D366]/30 transition-colors shadow-inner"><Phone className="w-5 h-5"/></a>}
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-800/80">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Estado</label>
                        <select value={activeLead.estado_embudo || 'nuevo'} onChange={(e) => handleUpdateStatus(activeLead.id, e.target.value)} className="w-full bg-[#0a0e1b] border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-cyan-500 text-sm cursor-pointer shadow-inner appearance-none transition-all">
                          {COLUMNAS.map(col => <option key={col.id} value={col.id}>{col.titulo}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5"/> Prioridad</label>
                        <select value={activeLead.prioridad || 'Media'} onChange={(e) => handleUpdateLeadField(activeLead.id, 'prioridad', e.target.value)} className="w-full bg-[#0a0e1b] border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-cyan-500 text-sm cursor-pointer shadow-inner appearance-none transition-all">
                          {PRIORIDADES.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Valor (USD)</label>
                        <input type="number" value={activeLead.valor_estimado || 0} onChange={(e) => handleUpdateLeadField(activeLead.id, 'valor_estimado', e.target.value)} className="w-full bg-[#0a0e1b] border border-slate-800 rounded-xl p-3 text-green-400 font-extrabold outline-none focus:border-cyan-500 shadow-inner transition-all" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Interés</label>
                        <select value={activeLead.servicio_interes || SERVICIOS[0]} onChange={(e) => handleUpdateLeadField(activeLead.id, 'servicio_interes', e.target.value)} className="w-full bg-[#0a0e1b] border border-slate-800 rounded-xl p-3 text-cyan-400 outline-none focus:border-cyan-500 text-sm cursor-pointer shadow-inner appearance-none transition-all text-sm">
                          {SERVICIOS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-800/80 mt-4">
                      <label className="text-xs font-bold text-cyan-500 uppercase tracking-wider mb-3.5 block flex items-center gap-2.5"><Zap className="w-4 h-4"/> Acciones Rápidas</label>
                      <div className="space-y-2.5">
                        <button onClick={() => triggerWebhook('Enviar PDF Servicios')} className="w-full bg-[#0a0e1b] hover:bg-slate-800 border border-slate-700 p-3.5 rounded-lg flex items-center justify-between text-sm text-slate-300 transition-colors group shadow-inner leading-relaxed">
                          Enviar PDF Servicios <Send className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors"/>
                        </button>
                      </div>
                      {webhookStatus && <p className="text-xs text-green-400 mt-3.5 flex items-center gap-1.5 font-medium"><CheckCircle2 className="w-3.5 h-3.5"/> {webhookStatus}</p>}
                    </div>
                  </div>

                  <div className="pt-8 mt-auto"><button onClick={() => handleDeleteLead(activeLead.id)} className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors font-medium text-sm"><Trash2 className="w-4 h-4" /> Eliminar Prospecto Definitivamente</button></div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col bg-black relative">
                  {/* Chat View */}
                  <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar bg-black">
                     {(!activeLead.historial_chat || activeLead.historial_chat.length === 0) ? (
                        <div className="flex flex-col items-center justify-center h-full text-slate-500 text-sm text-center max-w-sm mx-auto space-y-6">
                           {/* FIX: icon.jpg perfectly rounded to hide box edges */}
                           <div className="w-20 h-20 rounded-full bg-black border-2 border-slate-700 flex items-center justify-center overflow-hidden p-2 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                              <img src="/icon.jpg" alt="Futuriza Icon" className="h-full object-contain mix-blend-screen" />
                           </div>
                           <p>No hay historial de chat auditado.</p>
                        </div>
                     ) : (
                        activeLead.historial_chat.map((msg, idx) => (
                           <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                             <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-lg text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-slate-800 text-white rounded-tr-sm border border-slate-700' : 'bg-cyan-900/30 text-cyan-50 rounded-tl-sm border border-cyan-500/30'}`}>
                               {msg.sender === 'bot' && <div className="text-[10px] text-cyan-400 font-bold mb-1.5 flex items-center gap-1.5 border-b border-cyan-500/10 pb-1.5"><Shield className="w-3.5 h-3.5"/> Futuriza AI</div>}
                               {msg.text}
                             </div>
                             <span className="text-[10px] text-slate-600 mt-1.5 pr-1">{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                           </div>
                        ))
                     )}
                  </div>
                  <div className="p-4 bg-black border-t border-slate-800 shrink-0">
                     <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5"/> Historial sincronizado.</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* MODAL NUEVO LEAD */}
        {isNewLeadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsNewLeadModalOpen(false)} />
            <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl z-10 custom-scale-in">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800"><h2 className="text-2xl font-bold text-white flex items-center gap-2.5"><Plus className="w-6 h-6 text-cyan-400"/> Cargar Prospecto Manual</h2><button onClick={() => setIsNewLeadModalOpen(false)} className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800"><X className="w-6 h-6"/></button></div>
              <form onSubmit={handleAddLead} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs font-bold text-slate-500 uppercase ml-1">Empresa</label><input type="text" required value={newLead.empresa} onChange={e => setNewLead({...newLead, empresa: e.target.value})} className="w-full mt-1.5 bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-white focus:border-cyan-500 outline-none transition-all shadow-inner" placeholder="Ej: Seguridad Sur SA" /></div>
                  <div><label className="text-xs font-bold text-slate-500 uppercase ml-1">Nombre del Contacto</label><input type="text" required value={newLead.nombre} onChange={e => setNewLead({...newLead, nombre: e.target.value})} className="w-full mt-1.5 bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-white focus:border-cyan-500 outline-none transition-all shadow-inner" placeholder="Ej: Juan Pérez" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Prioridad Inicial</label>
                    <select value={newLead.prioridad} onChange={e => setNewLead({...newLead, prioridad: e.target.value})} className="w-full mt-1.5 bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-white focus:border-cyan-500 outline-none cursor-pointer appearance-none shadow-inner text-sm transition-all">
                      {PRIORIDADES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Servicio de Interés</label>
                    <select value={newLead.servicio_interes} onChange={e => setNewLead({...newLead, servicio_interes: e.target.value})} className="w-full mt-1.5 bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-white focus:border-cyan-500 outline-none cursor-pointer appearance-none shadow-inner text-sm transition-all text-sm">
                      {SERVICIOS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full mt-7 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-lg py-4 rounded-xl transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(34,211,238,0.3)]">{isSubmitting ? 'Guardando en Futuriza...' : 'Cargar Prospecto Definitivo'}</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
