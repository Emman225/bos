
import React, { useState } from 'react';
import { Sun, Battery, Zap, HelpCircle, Calculator, ArrowRight, Save, Download, CheckCircle2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { useAppContext } from '../context/AppProvider';

const SolarConfigurator: React.FC = () => {
  const { navigate } = useAppContext();
  const [consumption, setConsumption] = useState(25);
  const [backupDays, setBackupDays] = useState(2);

  const solarNeeded = Math.round(consumption * 1.5 * 100); // en Watts Crête
  const batteryNeeded = Math.round(consumption * 1.2 * backupDays);

  return (
    <div className="min-h-screen bg-primary-surface pt-36 pb-12 lg:pt-40 lg:pb-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-16">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-600 text-[10px] font-extrabold uppercase tracking-widest">
              Dimensionnement Solaire
            </div>
            <h1 className="text-4xl lg:text-7xl font-black font-display tracking-tighter text-gray-900 leading-none">
              Configurateur <span className="text-orange-500 italic">PV.</span>
            </h1>
            <p className="text-gray-500 text-lg lg:text-xl font-medium">Sécurisez vos sites télécoms avec une énergie autonome et certifiée.</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => {
                const config = { consumption, backupDays, solarNeeded, batteryNeeded, date: new Date().toLocaleDateString('fr-FR') };
                localStorage.setItem('bos_solar_config', JSON.stringify(config));
                Swal.fire({ icon: 'success', title: 'Configuration sauvegardée !', text: 'Votre dimensionnement a été enregistré.', timer: 2000, showConfirmButton: false, customClass: { popup: 'rounded-3xl' } });
              }}
              className="h-20 px-10 rounded-[28px] bg-white border border-gray-100 text-gray-900 font-extrabold uppercase tracking-widest text-[10px] shadow-sm hover:shadow-premium transition-all flex items-center gap-3 active:scale-95"
            >
              <Save size={18} /> Sauvegarder
            </button>
            <button
              onClick={() => { window.print(); }}
              className="h-20 px-10 rounded-[28px] bg-brand-dark text-white font-extrabold uppercase tracking-widest text-[10px] shadow-xl hover:bg-gray-800 transition-all flex items-center gap-3 active:scale-95"
            >
              <Download size={18} /> PDF Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-12 rounded-[56px] shadow-premium border border-gray-50 space-y-12">
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400">Charge journalière</label>
                  <span className="text-4xl font-black text-gray-900 font-display tracking-tight">{consumption} kWh</span>
                </div>
                <input
                  type="range" min="5" max="250" value={consumption}
                  onChange={(e) => setConsumption(parseInt(e.target.value))}
                  className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-[9px] font-extrabold text-gray-300 uppercase tracking-[0.3em]">
                  <span>5 kWh</span>
                  <span>125 kWh</span>
                  <span>250 kWh</span>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400">Autonomie (Jours)</label>
                  <span className="text-4xl font-black text-gray-900 font-display tracking-tight">{backupDays} J</span>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map(d => (
                    <button
                      key={d}
                      onClick={() => setBackupDays(d)}
                      className={`h-20 rounded-[28px] font-extrabold text-sm transition-all flex items-center justify-center ${backupDays === d ? 'bg-orange-500 text-white shadow-glow rotate-2' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                    >
                      {d}j
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-10 border-t border-slate-50 space-y-4">
                <div className="flex items-start gap-5 p-8 rounded-[40px] bg-blue-50/50 text-blue-600 border border-blue-100/50">
                  <HelpCircle size={24} className="shrink-0 mt-1" />
                  <p className="text-xs font-bold leading-relaxed italic">
                    Paramètres calculés pour la zone Abidjan/Sud. Nos solutions incluent le monitoring à distance Victron VRM.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-12 rounded-[64px] bg-orange-500 text-white flex flex-col justify-between gap-12 shadow-2xl relative overflow-hidden group">
              <Sun size={200} className="absolute -top-10 -right-10 opacity-10 rotate-12 transition-transform duration-1000 group-hover:scale-125" />
              <div className="space-y-4 relative z-10">
                <h3 className="text-[11px] font-extrabold uppercase tracking-[0.4em] opacity-80">Capacité Solaire</h3>
                <p className="text-7xl font-black font-display tracking-tighter">{solarNeeded} Wc</p>
              </div>
              <div className="relative z-10 flex items-center gap-3 bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/20">
                <CheckCircle2 size={20} />
                <p className="text-[10px] font-extrabold uppercase tracking-widest">Performance Optimisée</p>
              </div>
            </div>

            <div className="p-12 rounded-[64px] bg-brand-dark text-white flex flex-col justify-between gap-12 shadow-2xl relative overflow-hidden group">
              <Battery size={200} className="absolute -bottom-10 -left-10 opacity-5 -rotate-12 transition-transform duration-1000 group-hover:scale-125" />
              <div className="space-y-4 relative z-10">
                <h3 className="text-[11px] font-extrabold uppercase tracking-[0.4em] opacity-80">Stockage Lithium</h3>
                <p className="text-7xl font-black font-display tracking-tighter">{batteryNeeded} kWh</p>
              </div>
              <div className="relative z-10 flex items-center gap-3 bg-white/5 backdrop-blur-md p-5 rounded-3xl border border-white/10">
                <Zap size={20} className="text-primary" />
                <p className="text-[10px] font-extrabold uppercase tracking-widest">Cellules LiFePO4</p>
              </div>
            </div>

            <div className="md:col-span-2 bg-white p-12 rounded-[64px] shadow-premium border border-slate-50 flex flex-col md:flex-row items-center gap-12 group hover:border-primary/20 transition-all">
              <div className="size-28 rounded-[36px] bg-primary/10 text-primary flex items-center justify-center shrink-0 shadow-inner group-hover:bg-primary group-hover:text-white transition-all duration-700">
                <Calculator size={56} />
              </div>
              <div className="space-y-3 flex-1 text-center md:text-left">
                <h3 className="text-3xl font-black text-gray-900 font-display tracking-tight">Expertise Technique.</h3>
                <p className="text-slate-500 font-medium">Nos ingénieurs certifiés réalisent votre schéma unifilaire et le colisage exact sous 48h.</p>
              </div>
              <button
                onClick={() => navigate('contact')}
                className="w-full md:w-auto h-24 px-16 rounded-[36px] bg-primary text-white font-extrabold uppercase tracking-[0.2em] text-[12px] hover:bg-primary-dark transition-all flex items-center justify-center gap-4 group/btn shadow-glow active:scale-95"
              >
                Etude de Cas <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarConfigurator;
