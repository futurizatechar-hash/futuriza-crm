import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SendIcon, CheckCircleIcon, MailIcon, BuildingIcon, UserIcon, UsersIcon } from 'lucide-react';

const LeadForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    teamSize: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Lead Captured:', formData);
    setIsSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contacto" className="py-24 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto glass-card p-0 overflow-hidden border-slate-700 flex flex-col md:flex-row">
          {/* Form Info Panel */}
          <div className="md:w-1/3 bg-slate-950 p-10 flex flex-col justify-center border-r border-slate-800">
             <h2 className="text-3xl font-bold mb-6 italic leading-tight uppercase tracking-tight">
               Agenda tu <br />
               <span className="text-cyan-400">Auditoría</span>
             </h2>
             <p className="text-slate-400 text-sm mb-10 leading-relaxed">
               Analizamos tus procesos actuales y detectamos fugas de eficiencia. Descubrí cómo la tecnología puede transformar tu margen operativo.
             </p>
             <div className="space-y-6">
                <div className="flex items-center gap-4">
                   <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                      <CheckCircleIcon className="w-4 h-4 text-neon-green" />
                   </div>
                   <span className="text-xs text-slate-300 font-bold tracking-widest uppercase">Diagnóstico ROI</span>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                      <CheckCircleIcon className="w-4 h-4 text-neon-green" />
                   </div>
                   <span className="text-xs text-slate-300 font-bold tracking-widest uppercase">Mapa de Automatización</span>
                </div>
             </div>
          </div>

          {/* Actual Form */}
          <div className="md:w-2/3 p-10 bg-slate-900/40 relative">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Nombre Completo</label>
                      <div className="relative">
                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                          required
                          type="text" 
                          name="name" 
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Tu nombre"
                          className="w-full bg-slate-950/50 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 transition-all outline-none" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Empresa / Razón Social</label>
                       <div className="relative">
                          <BuildingIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input 
                            required
                            type="text" 
                            name="company" 
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Nombre de la firma"
                            className="w-full bg-slate-950/50 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 transition-all outline-none" 
                          />
                       </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Corporativo</label>
                     <div className="relative">
                        <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                          required
                          type="email" 
                          name="email" 
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="ejemplo@empresa.com"
                          className="w-full bg-slate-950/50 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 transition-all outline-none" 
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Tamaño de Equipo / Flota</label>
                    <div className="relative">
                       <UsersIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                       <select 
                        required
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={handleChange}
                        className="w-full bg-slate-950/50 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl py-3 pl-12 pr-4 text-white appearance-none transition-all outline-none"
                       >
                         <option value="" disabled className="bg-slate-950">Seleccionar tamaño...</option>
                         <option value="1-20" className="bg-slate-950">1 - 20 personas</option>
                         <option value="21-100" className="bg-slate-950">21 - 100 personas</option>
                         <option value="101-500" className="bg-slate-950">101 - 500 personas</option>
                         <option value="500+" className="bg-slate-950">Más de 500 personas</option>
                       </select>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center gap-3 py-4 text-lg font-bold group"
                  >
                    Enviar Solicitud <SendIcon className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-10"
                >
                  <div className="w-20 h-20 bg-neon-green/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircleIcon className="text-neon-green w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">¡Solicitud Enviada!</h3>
                  <p className="text-slate-400 max-w-sm mb-8">
                    Gracias por confiar en Futuriza. Un consultor senior se pondrá en contacto contigo en las próximas 24 horas.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-cyan-400 font-bold hover:underline"
                  >
                    Enviar otra consulta
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
