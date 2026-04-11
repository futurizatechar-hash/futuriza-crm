import React from 'react';
import { motion } from 'framer-motion';
import { MousePointer2Icon, ShieldCheckIcon, ZapIcon, ArrowRightIcon } from 'lucide-react';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 -left-20 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-0 -right-20 w-[400px] h-[400px] bg-neon-green/5 blur-[100px] rounded-full -z-10" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-left"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 mb-6"
          >
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
              Futuriza Automation Hub
            </span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-display font-bold mb-6 leading-[1.1]"
          >
            Automatización <br />
            <span className="text-gradient">Inteligente para Seguridad</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl text-slate-400 mb-8 max-w-xl leading-relaxed"
          >
            Reducimos costos operativos y errores humanos en empresas de seguridad privada de LATAM y España mediante soluciones cloud de nueva generación.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="btn-primary flex items-center justify-center gap-2 text-lg">
              Empezar Ahora <ArrowRightIcon className="w-5 h-5" />
            </button>
            <button className="btn-secondary flex items-center justify-center gap-2 text-lg">
              Ver Demo
            </button>
          </motion.div>

          {/* Social Proof / Stats */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 flex flex-wrap gap-8 items-center text-slate-500 border-t border-slate-900 pt-8"
          >
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">15+</span>
              <span className="text-xs uppercase tracking-widest">Años en Operaciones</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">100%</span>
              <span className="text-xs uppercase tracking-widest">Cloud Software</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">99.9%</span>
              <span className="text-xs uppercase tracking-widest">Uptime Garantizado</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Visual Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative hidden md:block"
        >
          <div className="relative z-10 p-4 bg-slate-900/40 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-xl group overflow-hidden">
            {/* Animated UI Mockup Interface */}
            <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800">
               <div className="h-8 bg-slate-900 border-b border-slate-800 px-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500/50" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                  <div className="w-2 h-2 rounded-full bg-green-500/50" />
               </div>
               <div className="p-6 space-y-4">
                  <div className="h-4 w-1/3 bg-slate-800 rounded animate-pulse" />
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-24 bg-cyan-950/30 border border-cyan-500/20 rounded-xl" />
                    <div className="h-24 bg-neon-green/10 border border-neon-green/10 rounded-xl" />
                    <div className="h-24 bg-slate-800/50 rounded-xl" />
                  </div>
                  <div className="h-32 bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-end">
                    <div className="h-2 w-full bg-slate-800 mb-2 rounded" />
                    <div className="h-2 w-2/3 bg-slate-800 rounded" />
                  </div>
               </div>
            </div>
            
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -15, 0] }} 
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 p-4 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl"
            >
              <ShieldCheckIcon className="w-8 h-8 text-cyan-400" />
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0] }} 
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-6 p-4 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl flex items-center gap-3"
            >
              <ZapIcon className="w-6 h-6 text-neon-green" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white tracking-widest uppercase">Real-Time</span>
                <span className="text-[10px] text-slate-400">Monitoring Active</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
