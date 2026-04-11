import React from 'react';
import { ShieldIcon, MailIcon, MapPinIcon } from 'lucide-react';
import iconLogo from '../assets/icon-logo.png';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <img 
                src={iconLogo} 
                alt="Futuriza Logo" 
                className="h-8 w-8 object-contain mr-2" 
              />
              <span className="text-2xl font-display font-bold text-white tracking-tighter">
                FUTURIZA
              </span>
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed">
              Liderando la transformación digital en la industria de la seguridad privada en LATAM y España. Soluciones reales, tecnología avanzada.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-slate-500 hover:text-cyan-400 border border-slate-800 hover:border-cyan-400 transition-all">
                <MailIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Navegación</h4>
            <ul className="space-y-4">
              <li><a href="#solucion" className="text-slate-500 hover:text-cyan-400 text-sm transition-colors">Solución</a></li>
              <li><a href="#trayectoria" className="text-slate-500 hover:text-cyan-400 text-sm transition-colors">Trayectoria</a></li>
              <li><a href="#casos" className="text-slate-500 hover:text-cyan-400 text-sm transition-colors">Casos de Éxito</a></li>
              <li><a href="#contacto" className="text-slate-500 hover:text-cyan-400 text-sm transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Ubicación</h4>
            <div className="flex gap-3 text-slate-500">
               <MapPinIcon className="w-5 h-5 text-cyan-400 shrink-0" />
               <p className="text-sm leading-relaxed">
                 Córdoba, Argentina<br />
                 Hub de Innovación Tecnológica
               </p>
            </div>
            <p className="text-xs text-slate-600 font-medium">
               Real-world operations, world-class software.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Futuriza. Todos los derechos reservados.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">Privacidad</a>
            <a href="#" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
