import React from 'react';
import { motion } from 'framer-motion';
import { XCircleIcon, CheckCircle2Icon, HistoryIcon, CloudIcon, ClipboardIcon, ZapIcon } from 'lucide-react';

const ProblemSolution = () => {
  const problems = [
    { icon: <ClipboardIcon className="w-5 h-5 text-red-500" />, text: "Planillas manuales y reportes en papel propensos a errores." },
    { icon: <HistoryIcon className="w-5 h-5 text-red-500" />, text: "Falta de visibilidad en tiempo real de los patrullajes." },
    { icon: <XCircleIcon className="w-5 h-5 text-red-500" />, text: "Altos costos operativos por procesos ineficientes." },
  ];

  const solutions = [
    { icon: <CloudIcon className="w-5 h-5 text-neon-green" />, text: "Gestión 100% en la nube con reportes automáticos." },
    { icon: <ZapIcon className="w-5 h-5 text-neon-green" />, text: "Monitoreo GPS y alertas instantáneas de incidencias." },
    { icon: <CheckCircle2Icon className="w-5 h-5 text-neon-green" />, text: "Automatización que reduce costos hasta un 35%." },
  ];

  return (
    <section id="solucion" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Del Caos Manual a la <span className="text-gradient">Eficiencia Digital</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            Muchas empresas de seguridad en la región siguen operando bajo modelos obsoletos. Nosotros traemos el futuro a tu operación actual.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Problem Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card border-red-500/20 bg-red-500/5 group hover:bg-red-500/10 transition-colors"
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-red-400">
              Gestión Tradicional
            </h3>
            <ul className="space-y-6">
              {problems.map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="mt-1">{item.icon}</div>
                  <p className="text-slate-400 group-hover:text-slate-300 transition-colors">{item.text}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solution Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card border-neon-green/30 bg-neon-green/5 group hover:bg-neon-green/10 transition-colors"
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-neon-green">
              Solución Futuriza
            </h3>
            <ul className="space-y-6">
              {solutions.map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="mt-1">{item.icon}</div>
                  <p className="text-slate-100 group-hover:text-white transition-colors">{item.text}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
