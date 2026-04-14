import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SlideOverPanel from '../components/SlideOverPanel';
import NewLeadModal from '../components/NewLeadModal';
import DashboardView from './DashboardView';
import PipelineView from './PipelineView';
import InboxView from './InboxView';
import AnalyticsView from './AnalyticsView';

export default function CrmDashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [webhookStatus, setWebhookStatus] = useState(null);
  const [activeSlideOverTab, setActiveSlideOverTab] = useState('detalles');

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

  const handleAddLead = async (newLead) => {
    const payload = { ...newLead, estado_embudo: 'nuevo', valor_estimado: Number(newLead.valor_estimado) };
    const { error } = await supabase.from('leads_futuriza').insert([payload]);
    if (error) throw error;
    setIsNewLeadModalOpen(false);
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

  const handleLeadClick = (leadId) => {
    setSelectedLeadId(leadId);
    setIsSlideOverOpen(true);
    setActiveSlideOverTab('detalles');
  };

  const handleInboxLeadClick = (leadId) => {
    setSelectedLeadId(leadId);
    setActiveSlideOverTab('chat');
    setIsSlideOverOpen(true);
  };

  const filteredLeads = leads.filter(lead => 
    (lead.empresa?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
    (lead.nombre?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );
  const activeLead = leads.find(l => l.id === selectedLeadId);

  if (loading) return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center gap-4">
      <div className="w-16 h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center overflow-hidden p-2 shadow-sm animate-pulse">
        <img src="/favicon.webp" alt="Futuriza" className="w-[85%] h-[85%] object-contain" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="h-2 w-48 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full w-1/2 bg-gradient-to-r from-brand-accent to-brand-cyan rounded-full animate-loading-bar" />
        </div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Iniciando Futuriza Core...</span>
      </div>
    </div>
  );

  return (
    <div className="h-[100dvh] bg-[#F8FAFC] font-sans text-slate-700 flex overflow-hidden selection:bg-brand-accent/20">
      {isMobileMenuOpen && <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />}
      
      <Sidebar activeView={activeView} onViewChange={setActiveView} leads={leads} onLogout={handleLogout} isMobileOpen={isMobileMenuOpen} onCloseMobile={() => setIsMobileMenuOpen(false)} />

      <main className="flex-1 flex flex-col h-[100dvh] overflow-hidden bg-slate-50 relative">
        <Header searchTerm={searchTerm} onSearch={setSearchTerm} onNewLead={() => setIsNewLeadModalOpen(true)} onMenuToggle={() => setIsMobileMenuOpen(true)} />

        <div className="flex-1 overflow-hidden relative bg-[#F8FAFC]">
          {activeView === 'dashboard' && <DashboardView leads={leads} onViewChange={setActiveView} onLeadClick={handleLeadClick} />}
          {activeView === 'pipeline' && <PipelineView leads={filteredLeads} onLeadClick={handleLeadClick} />}
          {activeView === 'inbox' && <InboxView leads={filteredLeads} selectedLeadId={selectedLeadId} onLeadClick={handleInboxLeadClick} />}
          {activeView === 'analytics' && <AnalyticsView leads={leads} />}
        </div>

        <SlideOverPanel 
          lead={activeLead} isOpen={isSlideOverOpen} onClose={() => setIsSlideOverOpen(false)}
          onUpdateStatus={handleUpdateStatus} onUpdateField={handleUpdateLeadField} onDelete={handleDeleteLead}
          activeTab={activeSlideOverTab} onTabChange={setActiveSlideOverTab}
          webhookStatus={webhookStatus} onTriggerWebhook={triggerWebhook}
        />
        <NewLeadModal isOpen={isNewLeadModalOpen} onClose={() => setIsNewLeadModalOpen(false)} onSubmit={handleAddLead} />
      </main>
    </div>
  );
}
