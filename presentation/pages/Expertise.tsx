
import React from 'react';
import { ShieldCheck, Zap, Target, Award, ArrowRight, Microchip } from 'lucide-react';
import { useAppContext } from '../context/AppProvider';

const Expertise: React.FC = () => {
  const { navigate } = useAppContext();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 lg:pb-32 px-6 overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20"></div>
        <div className="max-w-[1200px] mx-auto relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-[10px] font-extrabold uppercase tracking-widest">
            Expertise Laboratoire
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-8xl font-black font-display tracking-tighter text-white leading-[0.9]">
            Certification & <span className="text-primary italic">Précision.</span>
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Seul laboratoire en Afrique de l'Ouest équipé pour la calibration et la maintenance certifiée des équipements VIAVI et Fujikura.
          </p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-16 sm:mb-24 lg:mb-32">
          <div className="space-y-10">
            <h2 className="text-2xl sm:text-3xl lg:text-6xl font-black font-display tracking-tight text-gray-900 leading-[0.95]">
              Pourquoi calibrer vos <span className="text-primary italic">instruments ?</span>
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="size-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0">
                  <Target size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-extrabold text-gray-900 mb-2">Précision des Mesures</h4>
                  <p className="text-gray-500 leading-relaxed">Évitez les faux positifs et les erreurs de diagnostic sur vos réseaux fibre critiques.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="size-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0">
                  <Award size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-extrabold text-gray-900 mb-2">Conformité Normative</h4>
                  <p className="text-gray-500 leading-relaxed">Répondez aux exigences des cahiers des charges des grands opérateurs (Orange, MTN, Moov).</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="size-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-extrabold text-gray-900 mb-2">Longévité Matérielle</h4>
                  <p className="text-gray-500 leading-relaxed">Une maintenance préventive régulière multiplie par deux la durée de vie de vos soudeuses.</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate('quote')}
              className="h-16 px-10 rounded-2xl bg-brand-dark text-white font-extrabold uppercase tracking-widest text-sm hover:bg-gray-800 transition-all flex items-center gap-3"
            >
              Demander un devis calibrage <ArrowRight size={18} />
            </button>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-[32px] sm:rounded-[44px] lg:rounded-[60px] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=1000" alt="Laboratory" className="w-full h-full object-cover" />
            </div>
            <div className="hidden lg:flex absolute top-10 -right-10 bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100 flex-col gap-4">
              <div className="size-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Microchip size={32} />
              </div>
              <p className="text-sm font-extrabold uppercase tracking-widest text-gray-900">Labo Certifié ISO</p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { title: "OTDR & Mesure", desc: "Calibration complète des longueurs d'onde, linéarité et distance." },
            { title: "Soudeuses Fibre", desc: "Alignement des moteurs, calibration de l'arc et mise à jour firmware." },
            { title: "Certification Site", desc: "Audit de conformité de vos infrastructures réseaux existantes." }
          ].map((s, i) => (
            <div key={i} className="p-6 sm:p-8 lg:p-12 rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] bg-gray-50 border border-gray-100 space-y-6 hover:bg-primary hover:text-white transition-all group">
              <h3 className="text-2xl font-extrabold">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed group-hover:text-white/70">{s.desc}</p>
              <div className="pt-6">
                <span className="text-xs font-extrabold uppercase tracking-widest opacity-40 group-hover:opacity-100">Détails techniques →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Expertise;
