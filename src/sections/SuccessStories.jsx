import React from 'react';
import { motion } from 'framer-motion';
import { ShieldIcon, LayoutIcon, ArrowUpRightIcon, TrendingDownIcon } from 'lucide-react';

const SuccessStories = () => {
  const cases = [
    {
      title: "GuardForceSegurity",
      subtitle: "Flagship Security SaaS",
      description: "Plataforma integral para empresas de seguridad privada que automatiza el control de rondas, asistencia y reportes de incidencias.",
      stats: [
        { label: "Costos Operativos", value: "-25%", icon: <TrendingDownIcon className="w-4 h-4 text-neon-green" /> },
        { label: "Uptime de Cloud", value: "99.9%", icon: <ArrowUpRightIcon className="w-4 h-4 text-cyan-400" /> }
      ],
      icon: <ShieldIcon className="w-8 h-8 text-cyan-400" />,
      color: "from-cyan-500/20 to-cyan-500/5",
      borderColor: "border-cyan-500/20"
    }
  ];

  return (
    <section id="casos" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Nuestros <span className="text-gradient">Casos de Éxito</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-400 max-w-xl mx-auto"
          >
            Soluciones reales para problemas reales. Conocé las herramientas que están transformando la industria.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          {cases.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`glass-card border-slate-800 relative group overflow-hidden`}
            >
              {/* Card Highlight Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="flex items-start justify-between mb-8">
                 <div className={`w-16 h-16 rounded-2xl bg-slate-950 flex items-center justify-center border border-slate-800 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                 </div>
                 <div className="px-3 py-1 bg-slate-800 rounded-full border border-slate-700 text-xs font-bold text-white tracking-widest uppercase mt-4">
                    Case Study
                 </div>
              </div>

              <h3 className="text-3xl font-bold mb-2 group-hover:text-white transition-colors">
                {item.title}
              </h3>
              <p className="text-cyan-400/80 font-semibold mb-6 tracking-wide uppercase text-sm">
                {item.subtitle}
              </p>
              
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                {item.description}
              </p>

              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-800">
                {item.stats.map((stat, sIndex) => (
                  <div key={sIndex}>
                    <div className="flex items-center gap-2 mb-1">
                      {stat.icon}
                      <span className="text-2xl font-bold text-white tracking-tight">{stat.value}</span>
                    </div>
                    <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Decorative Arrow */}
              <div className="absolute bottom-8 right-8 text-slate-700 group-hover:text-cyan-400 transition-colors">
                 <ArrowUpRightIcon className="w-8 h-8" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
