import React from 'react';
import { motion } from 'framer-motion';
import { AwardIcon, CodeIcon, BuildingIcon, UserCheckIcon } from 'lucide-react';

const Authority = () => {
  return (
    <section id="trayectoria" className="py-24 bg-slate-900/50 backdrop-blur-sm border-y border-slate-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Donde la Experiencia <br />
              <span className="text-gradient">Encuentra la Innovación</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              No somos solo desarrolladores de software. Somos operativos que entienden el terreno. Futuriza nace de la fusión entre dos mundos.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20">
                  <BuildingIcon className="text-cyan-400 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white tracking-tight">15 Años de Campo</h4>
                  <p className="text-sm text-slate-400">Operaciones reales de seguridad privada.</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-neon-green/10 rounded-xl flex items-center justify-center border border-neon-green/20">
                  <CodeIcon className="text-neon-green w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white tracking-tight">7 Años de Desarrollo</h4>
                  <p className="text-sm text-slate-400">Ingeniería de software de alta performance.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:w-1/2 relative"
          >
             <div className="relative z-10 glass-card bg-slate-950/80 p-10 border-slate-700">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border-2 border-slate-700">
                      <UserCheckIcon className="w-10 h-10 text-slate-500" />
                   </div>
                   <div>
                      <h4 className="text-xl font-bold text-white">Liderazgo Dual</h4>
                      <p className="text-cyan-400 text-sm">Security Operations & Software Engineering</p>
                   </div>
                </div>
                <blockquote className="text-xl text-slate-300 italic mb-8 border-l-4 border-cyan-500 pl-6 py-2">
                  "Entendemos el operativo porque estuvimos allí. Desarrollamos la solución porque sabemos cómo optimizarla."
                </blockquote>
                <div className="flex gap-4">
                   <AwardIcon className="text-neon-green w-6 h-6" />
                   <span className="text-slate-400 text-sm">Más de 25 Proyectos de Automatización Entregados</span>
                </div>
             </div>
             {/* Decorative Frame */}
             <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-neon-green opacity-20 blur-2xl -z-10 translate-x-4 translate-y-4" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Authority;
