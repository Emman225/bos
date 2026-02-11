
import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRight, Activity, Globe, Zap, Cpu, ShieldCheck, HardHat, CheckCircle2, ArrowUpRight, MapPin, ChevronLeft, ChevronRight, Award, Wrench, Building2, Calendar, BookOpen, ShoppingCart, ImageIcon } from 'lucide-react';
import { CATEGORIES } from '../../infrastructure/seed/constants';
import { useAppContext } from '../context/AppProvider';
import { useQuote } from '../hooks/useQuote';

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1632255659350-44e0efe04b3f?auto=format&fit=crop&q=80&w=1200",
    tag: "Ingénierie de Pointe",
    title: "Connecter l'avenir de la CI.",
    desc: "Solutions haute performance certifiées pour les réseaux critiques ivoiriens."
  },
  {
    image: "https://images.unsplash.com/photo-1728743264694-4ac39fa29385?auto=format&fit=crop&q=80&w=1200",
    tag: "Académie & Formation",
    title: "Le Savoir-Faire Ivoirien.",
    desc: "Formez vos équipes aux standards mondiaux FTTH directement à Abidjan."
  },
  {
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=1200",
    tag: "Labo Zone 4",
    title: "Précision & Certification.",
    desc: "Unique laboratoire certifié Fujikura & VIAVI en Afrique de l'Ouest."
  }
];

const BRANDS = ['Fujikura', 'VIAVI', 'EXFO', 'Sumitomo', 'CommScope', 'Prysmian', 'Cisco', 'Huawei', 'Nokia', 'Victron Energy'];

const BLOG_ARTICLES = [
  {
    date: "12 Jan 2026",
    title: "Déploiement FTTH à Abidjan : BOS-CI accompagne les opérateurs",
    description: "Le programme national de fibre optique s'accélère. BOS-CI fournit les équipements certifiés et forme les techniciens pour garantir un réseau de classe mondiale dans la capitale économique.",
    slug: "deploiement-ftth-abidjan"
  },
  {
    date: "28 Déc 2025",
    title: "Nouveau programme de formation fibre optique chez BOS Academy",
    description: "BOS Academy lance un cursus certifiant de 5 semaines destiné aux techniciens FTTH. Le programme couvre la soudure, la mesure OTDR et le raccordement, avec certification Fujikura.",
    slug: "formation-fibre-bos-academy"
  },
  {
    date: "15 Nov 2025",
    title: "Énergie solaire et télécoms : alimenter les sites isolés en Côte d'Ivoire",
    description: "Les solutions hybrides Victron Energy et Pylontech permettent désormais d'alimenter les stations relais en zone rurale. BOS-CI déploie ces systèmes sur plus de 50 sites.",
    slug: "energie-solaire-telecoms"
  }
];

const Home: React.FC = () => {
  const { navigate, products } = useAppContext();
  const { addToQuote } = useQuote();
  const [currentSlide, setCurrentSlide] = useState(0);

  const latestProducts = useMemo(() => {
    return [...products].reverse().slice(0, 4);
  }, [products]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col bg-white overflow-x-hidden">
      {/* Hero Section - Multi-Slide Experience */}
      <section className="relative min-h-screen flex items-center pt-32 lg:pt-40 pb-20 overflow-hidden bg-gradient-to-b from-[#e8f5e9] via-[#f0f9f1] to-white">
        {/* Animated Background Gradients - Adjusted position */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-5%] right-[-10%] w-[70%] h-[120%] bg-primary/10 rounded-[120px] rotate-[18deg] blur-[100px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[45%] h-[60%] bg-primary/8 rounded-full blur-[140px] opacity-50"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
          {/* Content Area */}
          <div className="flex flex-col gap-12 max-w-[780px]">
            <div className="flex flex-col gap-10">
              <div key={`tag-${currentSlide}`} className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white border border-gray-100 shadow-premium text-gray-900 text-[11px] font-extrabold uppercase tracking-[0.2em] w-fit animate-fade-in">
                <span className="flex size-2.5 rounded-full bg-primary animate-pulse shadow-glow"></span>
                {HERO_SLIDES[currentSlide].tag}
              </div>

              <h1 key={`title-${currentSlide}`} className="text-7xl lg:text-[112px] font-black leading-[0.82] tracking-tighter font-display text-gray-900 text-balance animate-slide-up">
                {HERO_SLIDES[currentSlide].title.split(' ').map((word, i) => (
                  <React.Fragment key={i}>
                    {word === 'l\'avenir' || word === 'Savoir-Faire' || word === 'Certification.' ? <span className="text-primary italic">{word} </span> : word + ' '}
                    {i === 1 && <br/>}
                  </React.Fragment>
                ))}
              </h1>

              <p key={`desc-${currentSlide}`} className="text-slate-500 text-xl lg:text-2xl font-medium leading-relaxed max-w-xl text-balance animate-fade-in delay-200">
                {HERO_SLIDES[currentSlide].desc}
              </p>
            </div>

            <div className="flex flex-wrap gap-6 pt-6">
              <button
                className="group relative flex items-center justify-center gap-5 min-w-[300px] h-20 rounded-[32px] bg-primary text-white text-lg font-extrabold transition-all hover:bg-primary-dark shadow-[0_25px_50px_-12px_rgba(47,127,52,0.4)] hover:-translate-y-1.5 active:scale-95"
                onClick={() => navigate('catalog')}
              >
                Découvrir nos produits
                <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-300" />
              </button>
              <button
                className="flex items-center justify-center gap-4 min-w-[260px] h-20 rounded-[32px] bg-white border-2 border-slate-100 text-gray-900 text-lg font-bold transition-all hover:bg-slate-50 hover:border-slate-300 shadow-sm"
                onClick={() => navigate('quote')}
              >
                Demander un devis
              </button>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-6 mt-6">
              <div className="flex gap-3">
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-2 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-12 bg-primary' : 'w-2 bg-slate-200 hover:bg-slate-300'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Visual Slider Area */}
          <div className="relative hidden lg:block">
            <div className="relative z-10 rounded-[80px] overflow-hidden shadow-[0_100px_180px_-40px_rgba(0,0,0,0.25)] border-[22px] border-white transform rotate-2 transition-all duration-1000 hover:rotate-0">
              <div className="relative aspect-[4/5] w-full h-full overflow-hidden">
                {HERO_SLIDES.map((slide, i) => (
                  <div
                    key={i}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${currentSlide === i ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-20 scale-110 pointer-events-none'}`}
                  >
                    <img className="w-full h-full object-cover" src={slide.image} alt={slide.tag} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-16 left-16 right-16 text-white z-20">
                <div className="flex items-center gap-4 mb-5">
                  <div className="size-3 bg-primary rounded-full shadow-glow"></div>
                  <span className="text-[12px] font-extrabold uppercase tracking-[0.3em] opacity-90">BOS-CI Zone 4</span>
                </div>
                <h4 className="text-4xl font-black font-display tracking-tight leading-none">Support Technique 225</h4>
              </div>
            </div>

            {/* Floating Detail Card - Adjusted position to avoid menu collision */}
            <div className="absolute top-10 -right-10 bg-white/90 backdrop-blur-xl p-10 rounded-[48px] shadow-premium border border-white/50 z-20 animate-float">
               <div className="flex items-center gap-8">
                  <div className="size-20 rounded-[28px] bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                    <Activity size={36} />
                  </div>
                  <div>
                    <p className="text-[12px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mb-1">Livraison CI</p>
                    <p className="text-2xl font-black text-gray-900 font-display leading-none">24h Chrono</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qui sommes-nous - Brief Intro */}
      <section className="py-24 px-6 lg:px-16 bg-slate-100">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="shrink-0">
              <div className="size-28 lg:size-36 rounded-[40px] bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                <Building2 size={56} />
              </div>
            </div>
            <div className="space-y-6 max-w-4xl text-center lg:text-left">
              <h2 className="text-4xl lg:text-6xl font-black font-display tracking-tighter text-gray-900 leading-[0.9]">
                Qui sommes-<span className="text-primary italic">nous ?</span>
              </h2>
              <p className="text-slate-500 text-xl lg:text-2xl font-medium leading-relaxed">
                BOS-CI est le distributeur de reference en Afrique de l'Ouest pour les equipements de fibre optique, telecom, test & mesure et energie solaire.
                Basee a Abidjan Zone 4, notre equipe d'experts accompagne les operateurs, integrateurs et entreprises avec des solutions certifiees constructeur et un support technique de proximite.
              </p>
              <p className="text-slate-400 text-lg font-medium leading-relaxed">
                Showroom, laboratoire certifie et centre de formation : tout est reuni sous un meme toit pour garantir l'excellence de vos projets.
              </p>
              <button
                onClick={() => navigate('about')}
                className="inline-flex items-center gap-4 h-16 px-10 rounded-[32px] bg-primary text-white font-extrabold uppercase tracking-[0.15em] text-xs shadow-xl shadow-primary/20 hover:bg-primary-dark hover:-translate-y-1 transition-all active:scale-95 group"
              >
                En savoir plus sur BOS-CI
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Slider - Infinite Marquee */}
      <section className="py-24 bg-slate-800 overflow-hidden relative">
        <div className="max-w-[1440px] mx-auto px-12 space-y-16 relative z-10">
          <p className="text-center text-slate-300 font-extrabold uppercase tracking-[0.6em] text-[10px]">Leader du marche • Alliances Technologiques Strategiques</p>

          <div className="mask-marquee overflow-hidden">
            <div className="flex animate-marquee gap-24 lg:gap-40 items-center grayscale hover:grayscale-0 transition-all duration-700">
              {BRANDS.map((brand, i) => (
                <span key={`brand1-${i}`} className="text-5xl lg:text-7xl font-black text-white/30 tracking-tighter cursor-default font-display hover:text-primary transition-colors whitespace-nowrap">
                  {brand}
                </span>
              ))}
              {BRANDS.map((brand, i) => (
                <span key={`brand2-${i}`} className="text-5xl lg:text-7xl font-black text-white/30 tracking-tighter cursor-default font-display hover:text-primary transition-colors whitespace-nowrap">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-800 to-transparent z-20"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-800 to-transparent z-20"></div>
      </section>

      {/* Catalogue de produits - 4 derniers */}
      {latestProducts.length > 0 && (
      <section className="py-40 px-6 lg:px-16 bg-white">
        <div className="max-w-[1440px] mx-auto space-y-20">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="max-w-4xl space-y-8">
              <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white border border-gray-100 shadow-premium text-gray-900 text-[11px] font-extrabold uppercase tracking-[0.2em] w-fit">
                <span className="flex size-2.5 rounded-full bg-primary animate-pulse shadow-glow"></span>
                Nouveautes
              </div>
              <h2 className="text-6xl lg:text-[100px] font-black font-display tracking-tighter text-gray-900 leading-[0.85] text-balance">
                Catalogue de <span className="text-primary italic">produits.</span>
              </h2>
              <p className="text-slate-500 text-2xl font-medium leading-relaxed max-w-2xl">Les derniers equipements ajoutes a notre stock permanent Abidjan Zone 4.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {latestProducts.map((product) => {
              const imageCount = (product.images?.length || 0) + (product.images?.length ? 0 : 1);
              return (
              <div
                key={product.id}
                className="group bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-premium hover:shadow-premium-hover hover:border-primary/20 transition-all duration-700 hover:-translate-y-3 cursor-pointer flex flex-col"
                onClick={() => navigate('product', { productId: product.id })}
              >
                <div className="relative aspect-square bg-slate-50 overflow-hidden">
                  <img className="w-full h-full object-contain mix-blend-multiply p-10 transition-all duration-700 group-hover:scale-110" src={product.image} alt={product.name} />
                  <div className="absolute top-5 left-5 flex flex-col gap-1.5">
                    {product.isNew && (
                      <div className="flex items-center gap-1.5 bg-primary text-white px-3 py-1 rounded-full shadow-glow">
                        <span className="size-1.5 rounded-full bg-white animate-pulse"></span>
                        <span className="text-[8px] font-extrabold uppercase tracking-widest">Nouveau</span>
                      </div>
                    )}
                  </div>
                  {imageCount > 1 && (
                    <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-xl px-2.5 py-1 rounded-full shadow-sm border border-white/50">
                      <ImageIcon size={10} className="text-slate-500" />
                      <span className="text-[9px] font-extrabold text-slate-500">{imageCount}</span>
                    </div>
                  )}
                </div>
                <div className="p-8 flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 text-[10px] font-extrabold text-primary uppercase tracking-[0.3em]">
                      <span className="size-1.5 rounded-full bg-primary"></span>
                      {product.brand}
                    </span>
                    {product.stock && (
                      <span className="ml-auto flex items-center gap-1">
                        <span className="size-1.5 rounded-full bg-primary animate-pulse shadow-glow"></span>
                        <span className="text-[8px] font-extrabold text-primary uppercase tracking-widest">Stock</span>
                      </span>
                    )}
                  </div>
                  <h3 className="font-black text-gray-900 text-base leading-tight font-display tracking-tight group-hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ref: {product.ref}</p>
                  <p className="text-sm text-slate-500 font-medium line-clamp-2 leading-relaxed flex-1">{product.description}</p>
                  <div className="mt-4 flex gap-3">
                    <button
                      className="flex-1 h-12 bg-primary text-white rounded-2xl font-extrabold text-[10px] uppercase tracking-[0.15em] shadow-glow hover:bg-primary-dark transition-all flex items-center justify-center gap-2 active:scale-95"
                      onClick={(e) => { e.stopPropagation(); addToQuote(product); }}
                    >
                      Devis <ShoppingCart size={14} />
                    </button>
                    <button
                      className="flex-1 h-12 bg-brand-dark text-white rounded-2xl font-extrabold text-[10px] uppercase tracking-[0.15em] hover:bg-gray-800 transition-all flex items-center justify-center gap-2 active:scale-95"
                      onClick={(e) => { e.stopPropagation(); navigate('product', { productId: product.id }); }}
                    >
                      Détails <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
              );
            })}
          </div>

          <div className="flex justify-center pt-8">
            <button
              onClick={() => navigate('catalog')}
              className="flex items-center gap-5 group h-20 px-16 rounded-[32px] bg-primary text-white font-extrabold uppercase tracking-[0.2em] text-[12px] shadow-xl shadow-primary/20 hover:bg-primary-dark hover:-translate-y-1 transition-all active:scale-95"
            >
              Voir le Catalogue Complet <ArrowUpRight size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
      )}

      {/* Categories Grid - Immersive Bento Style */}
      <section className="py-40 px-6 lg:px-16 bg-[#fcfcfc]">
        <div className="max-w-[1440px] mx-auto space-y-32">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="max-w-4xl space-y-8">
              <h2 className="text-6xl lg:text-9xl font-black font-display tracking-tighter text-gray-900 leading-[0.8] text-balance">
                Maitrisez votre <span className="text-primary italic">Reseau.</span>
              </h2>
              <p className="text-slate-500 text-2xl font-medium leading-relaxed max-w-2xl">L'equipement de reference pour les professionnels exigeants, disponible immediatement a Abidjan.</p>
            </div>
            <button
              onClick={() => navigate('catalog')}
              className="flex items-center gap-5 group h-20 px-12 rounded-[32px] bg-primary text-white font-extrabold uppercase tracking-[0.2em] text-[11px] shadow-xl shadow-primary/20 hover:bg-primary-dark hover:-translate-y-1 transition-all active:scale-95"
            >
              Voir le Catalogue Complet <ArrowUpRight size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {CATEGORIES.map((cat, idx) => {
              const isLast = idx === CATEGORIES.length - 1;
              const lastAloneIn3 = isLast && CATEGORIES.length % 3 === 1;
              const lastAloneIn2 = isLast && CATEGORIES.length % 2 === 1;
              return (
              <div
                key={cat.id}
                className={`group relative rounded-[48px] overflow-hidden cursor-pointer shadow-premium hover:shadow-premium-hover transition-all duration-700 ${lastAloneIn3 ? 'lg:col-span-3 h-[400px]' : 'h-[620px]'} ${lastAloneIn2 ? 'md:col-span-2' : ''} `}
                onClick={() => navigate('catalog', { category: cat.name })}
              >
                <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 text-transparent" src={cat.image} alt={cat.name} />
                <div className={`absolute inset-0 ${lastAloneIn3 ? 'bg-gradient-to-r from-black/90 via-black/50 to-transparent' : 'bg-gradient-to-t from-black/95 via-black/30 to-transparent'} group-hover:from-primary/90 transition-colors duration-700`}></div>

                <div className={`absolute ${lastAloneIn3 ? 'inset-0 p-12 lg:p-16 flex flex-row items-end gap-12' : 'bottom-0 left-0 right-0 p-10 lg:p-14 flex flex-col gap-4'}`}>
                  <div className="size-14 lg:size-16 rounded-[24px] bg-white/10 backdrop-blur-2xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100 shadow-2xl shrink-0">
                    <span className="material-symbols-outlined !text-2xl lg:!text-3xl">{cat.icon}</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl lg:text-4xl font-black text-white font-display leading-tight tracking-tight">{cat.name}</h3>
                    <p className="text-white/70 text-sm lg:text-base leading-relaxed max-w-sm">{cat.description}</p>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pourquoi choisir BOS ? - 4 Pillars with Parallax */}
      <section className="py-32 lg:py-40 px-6 lg:px-16 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2000')", backgroundAttachment: 'fixed' }}
        ></div>
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px]"></div>

        <div className="max-w-[1440px] mx-auto space-y-20 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 border border-white/15 text-primary text-[10px] font-extrabold uppercase tracking-[0.3em]">
                <span className="size-2 rounded-full bg-primary animate-pulse shadow-glow"></span>
                Nos Engagements
              </div>
              <h2 className="text-5xl lg:text-8xl font-black font-display tracking-tighter text-white leading-[0.85]">
                Pourquoi choisir <span className="text-primary italic">BOS ?</span>
              </h2>
            </div>
            <p className="text-slate-300 text-lg lg:text-xl font-medium leading-relaxed max-w-md">
              Quatre piliers qui font de BOS-CI le partenaire de confiance des professionnels telecom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                icon: <ShieldCheck size={32} />,
                num: "01",
                title: "Fiabilite",
                desc: "Produits 100% certifies constructeur, aucune contrefacon. Chaque equipement est garanti authentique et tracable."
              },
              {
                icon: <Award size={32} />,
                num: "02",
                title: "Expertise",
                desc: "Equipe technique formee directement chez les constructeurs. Nos ingenieurs maitrisent chaque produit que nous distribuons."
              },
              {
                icon: <MapPin size={32} />,
                num: "03",
                title: "Proximite",
                desc: "Showroom et laboratoire a Abidjan Zone 4, reactivite 24h. Votre interlocuteur est toujours a portee de main."
              },
              {
                icon: <Wrench size={32} />,
                num: "04",
                title: "SAV",
                desc: "Unique laboratoire certifie Fujikura en Afrique de l'Ouest francophone. Calibration, reparation et remise a neuf sur place."
              }
            ].map((pillar, i) => (
              <div
                key={i}
                className="group relative bg-white/10 backdrop-blur-md border border-white/15 rounded-[40px] p-10 lg:p-14 flex gap-8 lg:gap-10 items-start hover:bg-white/20 hover:border-primary/30 transition-all duration-700"
              >
                <span className="text-[80px] lg:text-[100px] font-black font-display leading-none text-white/[0.06] absolute top-6 right-10 select-none group-hover:text-primary/15 transition-colors duration-700">{pillar.num}</span>

                <div className="size-16 lg:size-20 rounded-[28px] bg-primary/15 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  {pillar.icon}
                </div>

                <div className="space-y-3 relative z-10">
                  <h3 className="text-2xl lg:text-3xl font-black text-white font-display tracking-tight">{pillar.title}</h3>
                  <p className="text-slate-300 text-sm lg:text-base leading-relaxed font-medium">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Expertise - Interactive Layout */}
      <section className="bg-white py-40 px-6 lg:px-16">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="relative group">
             <div className="rounded-[100px] overflow-hidden shadow-premium-hover border-[20px] border-slate-50 transition-all duration-1000 group-hover:-rotate-1 group-hover:scale-[1.01]">
                <img src="https://images.unsplash.com/photo-1728743264694-4ac39fa29385?auto=format&fit=crop&q=80&w=1400" alt="Formation BOS-CI Abidjan" className="w-full h-full object-cover" />
             </div>
             <div className="absolute -bottom-16 -right-12 bg-primary p-16 rounded-[64px] shadow-premium text-white space-y-8 border-[10px] border-white max-w-sm animate-float">
                <div className="flex items-center gap-8">
                   <div className="size-24 rounded-full bg-white/20 border-4 border-white overflow-hidden shadow-xl shrink-0">
                      <img src="https://i.pravatar.cc/150?u=manager225" alt="Manager BOS-CI" />
                   </div>
                   <div>
                      <p className="text-4xl font-black font-display leading-none tracking-tight">100%</p>
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] opacity-80 mt-2">Local & Certifie</p>
                   </div>
                </div>
                <p className="text-lg font-bold leading-relaxed italic opacity-95">"Le succes de vos deploiements est notre unique mesure de performance."</p>
             </div>
          </div>

          <div className="space-y-16">
            <h2 className="text-5xl lg:text-7xl font-black font-display tracking-tighter text-gray-900 leading-tight">
              L'excellence <br className="hidden lg:block"/> sans <span className="text-primary italic">frontieres.</span>
            </h2>
            <div className="grid grid-cols-1 gap-14">
              <div className="flex gap-10 group cursor-default">
                <div className="size-24 rounded-[36px] bg-primary/5 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-inner">
                  <ShieldCheck size={44} />
                </div>
                <div className="space-y-4">
                  <h4 className="text-3xl font-black text-gray-900 font-display tracking-tight">Maintenance Labo 24h</h4>
                  <p className="text-slate-500 text-xl leading-relaxed">Unique laboratoire certifie Fujikura en Afrique de l'Ouest. Calibration et remise a neuf immediate.</p>
                </div>
              </div>
              <div className="flex gap-10 group cursor-default">
                <div className="size-24 rounded-[36px] bg-primary/5 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-inner">
                  <HardHat size={44} />
                </div>
                <div className="space-y-4">
                  <h4 className="text-3xl font-black text-gray-900 font-display tracking-tight">BOS Training Academy</h4>
                  <p className="text-slate-500 text-xl leading-relaxed">Centre de formation agree pour les techniciens FTTH. Certification reconnue par les operateurs majeurs.</p>
                </div>
              </div>
            </div>
            <button
              className="h-14 px-10 rounded-2xl bg-brand-dark text-white font-extrabold uppercase tracking-[0.2em] text-[11px] hover:bg-slate-800 transition-all shadow-premium-hover flex items-center gap-4 hover:scale-105"
              onClick={() => navigate('about')}
            >
              L'Esprit BOS-CI <Globe size={24} className="text-primary" />
            </button>
          </div>
        </div>
      </section>

      {/* Blog / Actualites */}
      <section className="py-40 px-6 lg:px-16 bg-[#fcfcfc]">
        <div className="max-w-[1440px] mx-auto space-y-24">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="max-w-3xl space-y-8">
              <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white border border-gray-100 shadow-premium text-gray-900 text-[11px] font-extrabold uppercase tracking-[0.2em] w-fit">
                <span className="flex size-2.5 rounded-full bg-primary animate-pulse shadow-glow"></span>
                Blog & Actualites
              </div>
              <h2 className="text-6xl lg:text-[100px] font-black font-display tracking-tighter text-gray-900 leading-[0.85] text-balance">
                Les dernieres <span className="text-primary italic">nouvelles.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {BLOG_ARTICLES.map((article, i) => (
              <article
                key={i}
                className="group bg-white rounded-[52px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-premium hover:-translate-y-3 transition-all duration-700 flex flex-col"
              >
                <div className="h-3 bg-primary/10 group-hover:bg-primary transition-colors duration-500"></div>
                <div className="p-12 flex flex-col gap-6 flex-1">
                  <div className="flex items-center gap-3 text-slate-400">
                    <Calendar size={16} />
                    <span className="text-[12px] font-extrabold uppercase tracking-[0.2em]">{article.date}</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 font-display tracking-tight leading-tight group-hover:text-primary transition-colors duration-300">
                    {article.title}
                  </h3>
                  <p className="text-slate-500 text-base leading-relaxed font-medium flex-1">
                    {article.description}
                  </p>
                  <button className="flex items-center gap-3 text-primary font-extrabold text-sm uppercase tracking-[0.15em] group-hover:gap-5 transition-all duration-300 mt-4">
                    <BookOpen size={18} />
                    Lire la suite
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Immersive Dark Surface */}
      <section className="py-40 px-6 lg:px-16">
        <div className="max-w-[1440px] mx-auto bg-brand-dark rounded-[100px] p-20 lg:p-40 text-center relative overflow-hidden shadow-premium-hover">
           <div className="absolute top-0 right-0 p-40 opacity-10 pointer-events-none">
              <Globe size={500} className="text-white animate-spin-slow" />
           </div>

           <div className="relative z-10 space-y-16 max-w-5xl mx-auto">
              <h2 className="text-6xl lg:text-[120px] font-black text-white font-display tracking-tighter leading-[0.85] text-balance">
                Pret pour le <br/> <span className="text-primary italic">prochain saut ?</span>
              </h2>
              <p className="text-slate-400 text-2xl lg:text-3xl font-medium leading-relaxed max-w-3xl mx-auto text-balance">
                Equipez vos chantiers avec le meilleur de la technologie mondiale, supporte localement par des experts.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8">
                <button
                  onClick={() => navigate('quote')}
                  className="w-full sm:w-auto h-24 px-20 rounded-[36px] bg-primary text-white font-extrabold uppercase tracking-[0.2em] text-[12px] shadow-[0_30px_60px_-15px_rgba(47,127,52,0.4)] hover:bg-primary-dark transition-all hover:-translate-y-2 active:scale-95"
                >
                  Demarrer l'Etude
                </button>
                <a
                  href="tel:+2252722230639"
                  className="w-full sm:w-auto h-24 px-16 rounded-[36px] bg-white/5 border border-white/10 text-white font-extrabold uppercase tracking-[0.2em] text-[12px] hover:bg-white/10 transition-all flex items-center justify-center gap-5 hover:scale-105"
                >
                  <MapPin size={24} className="text-primary" /> Zone 4, Abidjan
                </a>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
