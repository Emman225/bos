
import React from 'react';
import { Target, Users, ShieldCheck, Globe, ArrowRight, Award, Eye, Heart, Clock, MapPin, GraduationCap, Wrench, Building2, Lightbulb, Handshake } from 'lucide-react';
import { useAppContext } from '../context/AppProvider';

const TIMELINE = [
  { year: "2015", label: "Création de BOS-CI à Abidjan" },
  { year: "2017", label: "Partenariat Fujikura et VIAVI" },
  { year: "2020", label: "Ouverture du laboratoire Zone 4" },
  { year: "2023", label: "Lancement BOS Academy" }
];

const TEAM = [
  { name: "Amina Cissé", role: "Gérante", avatar: "https://images.unsplash.com/photo-1630541579163-1495cd5f6d29?auto=format&fit=crop&crop=face&q=80&w=300&h=300" },
  { name: "Kouadio N'Guessan", role: "Directeur Technique", avatar: "https://images.unsplash.com/photo-1770191954675-06f770e6cbd0?auto=format&fit=crop&crop=face&q=80&w=300&h=300" },
  { name: "Fatou Diallo", role: "Responsable Formation", avatar: "https://images.unsplash.com/photo-1627634432023-95713e2ff3f0?auto=format&fit=crop&crop=face&q=80&w=300&h=300" },
  { name: "Yao Konan", role: "Responsable Commercial", avatar: "https://images.unsplash.com/photo-1763739528420-bdc297ff4ec7?auto=format&fit=crop&crop=face&q=80&w=300&h=300" },
  { name: "Ibrahim Touré", role: "Ingénieur Laboratoire", avatar: "https://images.unsplash.com/photo-1586232902955-df204f34b36e?auto=format&fit=crop&crop=face&q=80&w=300&h=300" }
];

const PARTNERS = ['Fujikura', 'VIAVI', 'EXFO', 'Cisco', 'Fortinet', 'Victron Energy', 'Pylontech', 'CommScope', 'Prysmian'];

const COVERAGE = [
  { country: "Côte d'Ivoire", flag: "🇨🇮", detail: "Siège social, Abidjan Zone 4" },
  { country: "Sénégal", flag: "🇸🇳", detail: "Dakar" },
  { country: "Mali", flag: "🇲🇱", detail: "Bamako" },
  { country: "Burkina Faso", flag: "🇧🇫", detail: "Ouagadougou" },
  { country: "Guinée", flag: "🇬🇳", detail: "Conakry" },
  { country: "Togo", flag: "🇹🇬", detail: "Lomé" },
  { country: "Bénin", flag: "🇧🇯", detail: "Cotonou" },
  { country: "Niger", flag: "🇳🇪", detail: "Niamey" }
];

const About: React.FC = () => {
  const { navigate } = useAppContext();

  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section */}
      <section className="pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 lg:pb-32 px-6 relative overflow-hidden bg-primary-surface">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
          <div className="space-y-10 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-extrabold uppercase tracking-widest">
              Distributeur Telecom de Reference en Afrique de l'Ouest
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-[90px] font-black font-display tracking-tighter leading-tight lg:leading-[1.05] text-gray-900">
              Connecter l'Afrique avec une expertise <span className="text-primary italic">locale.</span>
            </h1>
            <p className="text-gray-500 text-xl lg:text-2xl leading-relaxed max-w-xl">
              Fondee a Abidjan, BOS-CI est le partenaire privilegie des operateurs, integrateurs et entreprises qui batissent les reseaux de demain en Afrique de l'Ouest.
            </p>
            <button onClick={() => navigate('catalog')} className="h-16 px-10 rounded-[32px] bg-primary text-white font-extrabold uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all hover:-translate-y-1">
              Decouvrir nos solutions
            </button>
          </div>
          <div className="relative pb-6 sm:pb-14 lg:pb-6">
            <div className="aspect-[4/5] rounded-[32px] sm:rounded-[44px] lg:rounded-[60px] overflow-hidden shadow-2xl transform lg:-rotate-2 border-4 sm:border-8 border-white">
               <img src="https://images.unsplash.com/photo-1653566031535-bcf33e1c2893?auto=format&fit=crop&q=80&w=1000" alt="L'equipe BOS-CI" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:flex absolute -bottom-4 sm:-bottom-6 left-4 sm:-left-6 lg:-bottom-10 lg:-left-10 bg-brand-dark p-6 sm:p-8 lg:p-12 rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] shadow-2xl text-white flex-col space-y-3 sm:space-y-4">
               <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary font-display">100%</p>
               <p className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest opacity-60">Engagement Ivoirien</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Valeurs */}
      <section className="py-16 sm:py-24 lg:py-32 bg-brand-surface px-6">
        <div className="max-w-[1440px] mx-auto space-y-20">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-7xl font-black font-display tracking-tighter text-gray-900 leading-[0.85]">
              Ce qui nous <span className="text-primary italic">anime.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Mission */}
            <div className="bg-white p-14 rounded-[52px] shadow-sm border border-gray-100 flex flex-col items-center text-center gap-8 group hover:shadow-premium hover:-translate-y-2 transition-all duration-700">
              <div className="size-24 rounded-[36px] bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-inner">
                <Target size={44} />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black text-gray-900 font-display tracking-tight">Mission</h3>
                <p className="text-gray-500 text-lg leading-relaxed font-medium">
                  Fournir aux professionnels ivoiriens et ouest-africains des solutions telecom de classe mondiale, avec un accompagnement technique de proximite et des produits 100% certifies constructeur.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-white p-14 rounded-[52px] shadow-sm border border-gray-100 flex flex-col items-center text-center gap-8 group hover:shadow-premium hover:-translate-y-2 transition-all duration-700">
              <div className="size-24 rounded-[36px] bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-inner">
                <Eye size={44} />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black text-gray-900 font-display tracking-tight">Vision</h3>
                <p className="text-gray-500 text-lg leading-relaxed font-medium">
                  Devenir le leader incontournable de la distribution telecom en Afrique de l'Ouest, en combinant excellence technique, innovation continue et ancrage local.
                </p>
              </div>
            </div>

            {/* Valeurs */}
            <div className="bg-white p-14 rounded-[52px] shadow-sm border border-gray-100 flex flex-col items-center text-center gap-8 group hover:shadow-premium hover:-translate-y-2 transition-all duration-700">
              <div className="size-24 rounded-[36px] bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-inner">
                <Heart size={44} />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black text-gray-900 font-display tracking-tight">Valeurs</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 justify-center">
                    <Award size={18} className="text-primary shrink-0" />
                    <span className="text-gray-500 text-lg font-medium">Excellence technique</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center">
                    <Handshake size={18} className="text-primary shrink-0" />
                    <span className="text-gray-500 text-lg font-medium">Proximite client</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center">
                    <Lightbulb size={18} className="text-primary shrink-0" />
                    <span className="text-gray-500 text-lg font-medium">Innovation continue</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Historique - Timeline */}
      <section className="py-16 sm:py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto space-y-12 sm:space-y-20">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-7xl font-black font-display tracking-tighter text-gray-900 leading-[0.85]">
              Notre <span className="text-primary italic">parcours.</span>
            </h2>
            <p className="text-gray-500 text-xl font-medium leading-relaxed">
              Depuis notre creation, chaque etape a renforce notre engagement envers l'excellence telecom en Afrique de l'Ouest.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-1 bg-primary/10 -translate-x-1/2 rounded-full"></div>

            <div className="space-y-16">
              {TIMELINE.map((item, i) => (
                <div key={i} className={`relative flex items-center gap-12 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  {/* Dot */}
                  <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 z-10">
                    <div className="size-6 rounded-full bg-primary shadow-glow border-4 border-white"></div>
                  </div>

                  {/* Content */}
                  <div className={`ml-20 lg:ml-0 lg:w-1/2 ${i % 2 === 0 ? 'lg:pr-20 lg:text-right' : 'lg:pl-20 lg:text-left'}`}>
                    <div className="bg-[#fcfcfc] p-10 rounded-[40px] shadow-sm border border-gray-100 hover:shadow-premium transition-all duration-500 group">
                      <div className="flex items-center gap-6 ${i % 2 === 0 ? 'lg:flex-row-reverse' : ''}">
                        <div className="size-16 rounded-[24px] bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                          <Clock size={28} />
                        </div>
                        <div className="space-y-2">
                          <p className="text-4xl font-black text-primary font-display tracking-tight">{item.year}</p>
                          <p className="text-gray-700 text-lg font-bold">{item.label}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Equipe Dirigeante */}
      <section className="py-16 sm:py-24 lg:py-32 px-6 bg-[#f0f9f1]">
        <div className="max-w-[1440px] mx-auto space-y-20">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-extrabold uppercase tracking-[0.3em] mx-auto">
              <Users size={14} /> Leadership
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-7xl font-black font-display tracking-tighter text-gray-900 leading-[0.85]">
              L'equipe <span className="text-primary italic">dirigeante.</span>
            </h2>
            <p className="text-gray-500 text-xl font-medium leading-relaxed">
              Des experts passionnes, au service de l'infrastructure telecom africaine.
            </p>
          </div>

          {/* Featured Leader */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 group">
              <div className="bg-white rounded-[52px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-premium transition-all duration-700 h-full">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={TEAM[0].avatar.replace('w=300&h=300', 'w=800&h=600').replace('crop=face&', '')} alt={TEAM[0].name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-[10px] font-extrabold uppercase tracking-[0.2em] shadow-glow">
                      <span className="size-2 rounded-full bg-white animate-pulse"></span> Fondatrice
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-3xl font-black text-white font-display tracking-tight">{TEAM[0].name}</h3>
                    <p className="text-white/70 text-sm font-extrabold uppercase tracking-[0.2em] mt-1">{TEAM[0].role}</p>
                  </div>
                </div>
                <div className="p-10 space-y-6">
                  <p className="text-gray-500 text-base font-medium leading-relaxed">
                    A la tete de BOS-CI depuis sa creation, elle porte la vision d'une Afrique de l'Ouest connectee grace a des equipements de classe mondiale et un accompagnement de proximite.
                  </p>
                  <div className="flex gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/5 border border-primary/10">
                      <Award size={14} className="text-primary" />
                      <span className="text-[10px] font-extrabold text-gray-600 uppercase tracking-widest">10+ ans Telecom</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/5 border border-primary/10">
                      <Globe size={14} className="text-primary" />
                      <span className="text-[10px] font-extrabold text-gray-600 uppercase tracking-widest">8 pays</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Team Members */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {TEAM.slice(1).map((member, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-premium hover:-translate-y-2 transition-all duration-700"
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <img src={member.avatar.replace('w=300&h=300', 'w=600&h=400').replace('crop=face&', '')} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <div className="absolute bottom-5 left-5 right-5">
                      <h4 className="text-lg font-black text-white font-display tracking-tight leading-tight">{member.name}</h4>
                      <p className="text-white/60 text-[10px] font-extrabold uppercase tracking-[0.2em] mt-1">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Zones de Couverture */}
      <section className="py-16 sm:py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto space-y-12 sm:space-y-20">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-7xl font-black font-display tracking-tighter text-gray-900 leading-[0.85]">
              Zones de <span className="text-primary italic">couverture.</span>
            </h2>
            <p className="text-gray-500 text-xl font-medium leading-relaxed">
              Basee en Cote d'Ivoire, BOS-CI intervient dans toute l'Afrique de l'Ouest francophone.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {COVERAGE.map((zone, i) => (
              <div
                key={i}
                className={`group bg-[#fcfcfc] p-8 rounded-[36px] shadow-sm border flex flex-col items-center text-center gap-4 hover:shadow-premium hover:-translate-y-2 transition-all duration-500 ${i === 0 ? 'border-primary/30 ring-2 ring-primary/10 bg-primary/5' : 'border-gray-100'}`}
              >
                <span className="text-4xl">{zone.flag}</span>
                <div className="space-y-1">
                  <h4 className="text-lg font-black text-gray-900 font-display tracking-tight">{zone.country}</h4>
                  <p className="text-slate-400 text-sm font-medium">{zone.detail}</p>
                </div>
                {i === 0 && (
                  <div className="flex items-center gap-2 text-primary">
                    <MapPin size={14} />
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]">Siege</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Partenariats */}
      <section className="py-16 sm:py-24 lg:py-32 px-6 bg-brand-dark">
        <div className="max-w-[1440px] mx-auto space-y-20">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-7xl font-black font-display tracking-tighter text-white leading-[0.85]">
              Certifications & <span className="text-primary italic">Partenaires.</span>
            </h2>
            <p className="text-slate-400 text-xl font-medium leading-relaxed">
              Nous distribuons exclusivement des marques de reference mondiale, avec des certifications directes constructeur.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {PARTNERS.map((partner, i) => (
              <div
                key={i}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-[36px] p-10 flex items-center justify-center hover:bg-white/10 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2"
              >
                <span className="text-2xl lg:text-3xl font-black text-white/40 font-display tracking-tight group-hover:text-primary transition-colors duration-500">
                  {partner}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-6 pt-8">
            <div className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10">
              <ShieldCheck size={20} className="text-primary" />
              <span className="text-white/70 text-sm font-bold">Distributeur Agree Fujikura</span>
            </div>
            <div className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10">
              <Award size={20} className="text-primary" />
              <span className="text-white/70 text-sm font-bold">Centre Certifie VIAVI</span>
            </div>
            <div className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10">
              <Wrench size={20} className="text-primary" />
              <span className="text-white/70 text-sm font-bold">Labo Agree Afrique de l'Ouest</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section - Amina Cisse */}
      <section className="py-16 sm:py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto bg-primary rounded-[32px] sm:rounded-[44px] lg:rounded-[60px] p-8 sm:p-12 lg:p-24 text-white relative overflow-hidden shadow-2xl shadow-primary/30">
           <div className="absolute top-0 right-0 p-20 opacity-10">
              <Globe size={300} className="animate-spin-slow" />
           </div>
           <div className="relative z-10 max-w-3xl space-y-12">
              <p className="text-xl sm:text-2xl lg:text-5xl font-black font-display leading-tight italic">
                "Notre mission est d'equiper chaque professionnel ouest-africain avec le meilleur de la technologie mondiale, pour batir des reseaux fiables et perennes."
              </p>
              <div className="flex items-center gap-6">
                 <div className="size-20 rounded-full border-4 border-white/40 overflow-hidden shadow-xl">
                    <img src="https://images.unsplash.com/photo-1630541579163-1495cd5f6d29?auto=format&fit=crop&crop=face&q=80&w=300&h=300" alt="Amina Cisse, Gerante BOS-CI" />
                 </div>
                 <div>
                    <p className="text-2xl font-black font-display">Amina Cisse</p>
                    <p className="text-xs font-extrabold uppercase tracking-widest opacity-60">Gerante, BOS-CI</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-6">
        <div className="max-w-[1440px] mx-auto bg-brand-dark rounded-[32px] sm:rounded-[52px] lg:rounded-[80px] p-8 sm:p-14 lg:p-32 text-center relative overflow-hidden shadow-premium-hover">
          <div className="absolute top-0 right-0 p-32 opacity-10 pointer-events-none">
            <Globe size={400} className="text-white animate-spin-slow" />
          </div>
          <div className="relative z-10 space-y-12 max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl lg:text-[100px] font-black text-white font-display tracking-tighter leading-tight lg:leading-[1.05] text-balance">
              Pret a <span className="text-primary italic">collaborer ?</span>
            </h2>
            <p className="text-slate-400 text-xl lg:text-2xl font-medium leading-relaxed max-w-2xl mx-auto text-balance">
              Contactez notre equipe pour decouvrir comment BOS-CI peut accompagner vos projets telecom en Afrique de l'Ouest.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8">
              <button
                onClick={() => navigate('quote')}
                className="w-full sm:w-auto h-20 px-16 rounded-[36px] bg-primary text-white font-extrabold uppercase tracking-[0.2em] text-[12px] shadow-[0_30px_60px_-15px_rgba(47,127,52,0.4)] hover:bg-primary-dark transition-all hover:-translate-y-2 active:scale-95"
              >
                Demander un devis
              </button>
              <button
                onClick={() => navigate('catalog')}
                className="w-full sm:w-auto h-20 px-14 rounded-[36px] bg-white/5 border border-white/10 text-white font-extrabold uppercase tracking-[0.2em] text-[12px] hover:bg-white/10 transition-all flex items-center justify-center gap-5 hover:scale-105"
              >
                Explorer le catalogue <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
