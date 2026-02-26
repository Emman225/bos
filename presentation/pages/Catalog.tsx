
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Search, SlidersHorizontal, Package, ArrowRight, Sparkles, Send, ShoppingCart, ImageIcon, ChevronLeft, ChevronRight, RotateCcw, Bot, User, Zap, Truck, Award, Star } from 'lucide-react';
import { Product, Category } from '../../domain/entities';
import { useAppContext } from '../context/AppProvider';
import { useQuote } from '../hooks/useQuote';
import { formatPrice } from '../utils/formatPrice';

const ProductRow: React.FC<{ product: Product; imageCount: number; navigate: (page: string, params?: any) => void; addToQuote: (p: Product) => void; showPrices: boolean }> = ({ product, imageCount, navigate, addToQuote, showPrices }) => (
  <div className="group bg-white rounded-[24px] sm:rounded-[32px] border border-slate-100 overflow-hidden flex flex-col sm:flex-row shadow-premium hover:shadow-premium-hover hover:border-primary/20 transition-all duration-500">
    <div className="w-full sm:w-[200px] lg:w-[280px] shrink-0 bg-slate-50 relative overflow-hidden cursor-pointer rounded-2xl m-3 sm:m-4 aspect-square sm:aspect-auto" onClick={() => navigate('product', { productId: product.id })}>
      <img className="w-full h-full object-contain mix-blend-multiply p-6 sm:p-8 transition-all duration-700 group-hover:scale-110" src={product.image} alt={product.name} />
      <div className="absolute top-4 left-4 flex flex-col gap-1.5">
        {product.isNew && (
          <div className="flex items-center gap-1.5 bg-primary text-white px-3 py-1 rounded-full shadow-glow">
            <span className="size-1.5 rounded-full bg-white animate-pulse"></span>
            <span className="text-[8px] font-extrabold uppercase tracking-widest">Nouveau</span>
          </div>
        )}
        {!product.stock && (
          <div className="flex items-center gap-1.5 bg-red-500/90 text-white px-3 py-1 rounded-full">
            <span className="text-[8px] font-extrabold uppercase tracking-widest">Sur commande</span>
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
    <div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
      <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[10px] font-extrabold text-primary uppercase tracking-[0.3em]">
            <span className="size-1.5 rounded-full bg-primary"></span>
            {product.brand}
          </span>
          {product.stock && (
            <span className="flex items-center gap-1.5 ml-auto">
              <span className="size-1.5 rounded-full bg-primary animate-pulse shadow-glow"></span>
              <span className="text-[9px] font-extrabold text-primary uppercase tracking-widest">En stock</span>
            </span>
          )}
        </div>
        <h3 className="font-black text-gray-900 text-base sm:text-lg leading-tight font-display tracking-tight cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('product', { productId: product.id })}>{product.name}</h3>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ref: {product.ref}</p>
        <p className="text-sm text-slate-500 font-medium line-clamp-2 leading-relaxed hidden sm:block">{product.description}</p>
        {showPrices && product.price != null && (
          <p className="text-xl sm:text-2xl font-black text-primary font-display">{formatPrice(product.price)}</p>
        )}
      </div>
      <div className="flex flex-row sm:flex-col gap-3 shrink-0 w-full sm:w-auto">
        <button className="bg-primary text-white h-12 sm:h-14 px-4 sm:px-8 rounded-2xl font-extrabold text-[10px] uppercase tracking-[0.15em] shadow-glow hover:bg-primary-dark transition-all flex items-center justify-center gap-2 sm:gap-3 active:scale-95 flex-1 sm:flex-initial" onClick={() => addToQuote(product)}>
          {showPrices && product.price != null ? 'Ajouter' : 'Devis'} <ShoppingCart size={16} />
        </button>
        <button className="h-12 sm:h-14 px-4 sm:px-8 rounded-2xl bg-brand-dark text-white flex items-center justify-center gap-2 hover:bg-gray-800 transition-all text-[10px] font-extrabold uppercase tracking-widest active:scale-95 flex-1 sm:flex-initial" onClick={() => navigate('product', { productId: product.id })}>
          Détails <ArrowRight size={16} />
        </button>
      </div>
    </div>
  </div>
);

const Catalog: React.FC = () => {
  const { navigate, navParams, products, categories, getRecommendation, isLoading, settings } = useAppContext();
  const { addToQuote } = useQuote();

  const [selectedCategory, setSelectedCategory] = useState<string>(navParams?.category || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    if (navParams?.category) setSelectedCategory(navParams.category);
  }, [navParams]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const aiChatRef = useRef<HTMLDivElement>(null);

  // Slider
  const [sliderIndex, setSliderIndex] = useState(0);
  const sliderTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const SLIDES_COUNT = 4;

  const heroSlides = [
    {
      tag: 'Nouveautés',
      title: 'Découvrez nos\ndernières références',
      subtitle: 'Les technologies les plus récentes pour vos infrastructures réseau, disponibles en stock à Abidjan.',
      cta: 'Explorer le catalogue',
      bg: 'from-[#0a1628] via-[#162850] to-[#0d2137]',
      accent: 'from-primary to-blue-400',
      icon: Zap,
      decorColor: 'bg-primary/20',
    },
    {
      tag: 'Stock permanent',
      title: 'Livraison express\nAbidjan Zone 4',
      subtitle: 'Disponibilité immédiate sur des centaines de références. Retrait en agence ou livraison le jour même.',
      cta: 'Voir les disponibilités',
      bg: 'from-[#0f2027] via-[#203a43] to-[#2c5364]',
      accent: 'from-emerald-400 to-teal-500',
      icon: Truck,
      decorColor: 'bg-emerald-400/20',
    },
    {
      tag: 'Qualité certifiée',
      title: 'Les plus grandes\nmarques du secteur',
      subtitle: 'Équipements professionnels certifiés des leaders mondiaux du réseau et de la fibre optique.',
      cta: 'Nos marques partenaires',
      bg: 'from-[#1a0a2e] via-[#2d1b69] to-[#16213e]',
      accent: 'from-violet-400 to-purple-500',
      icon: Award,
      decorColor: 'bg-violet-400/20',
    },
    {
      tag: 'Sur mesure',
      title: 'Solutions clé en main\npour vos projets',
      subtitle: 'Conseil expert, devis personnalisé et accompagnement technique pour chaque projet d\'envergure.',
      cta: 'Demander un devis',
      bg: 'from-[#1c1107] via-[#3d2508] to-[#1a1a2e]',
      accent: 'from-amber-400 to-orange-500',
      icon: Star,
      decorColor: 'bg-amber-400/20',
    },
  ];

  const startAutoplay = useCallback(() => {
    if (sliderTimer.current) clearInterval(sliderTimer.current);
    sliderTimer.current = setInterval(() => {
      setSliderIndex(prev => (prev + 1) % SLIDES_COUNT);
    }, 6000);
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => { if (sliderTimer.current) clearInterval(sliderTimer.current); };
  }, [startAutoplay]);

  const goToSlide = (i: number) => { setSliderIndex(i); startAutoplay(); };

  const aiSuggestions = [
    'Équiper 3 techniciens fibre optique FTTH',
    'Câblage réseau cuivre pour immeuble 10 étages',
    'Kit de test et mesure pour maintenance réseau',
    'Solution WiFi entreprise 200 utilisateurs',
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCat = selectedCategory === 'all' || p.category.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.ref.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery, products]);

  const productsByCategory = useMemo(() => {
    const grouped: Record<string, Product[]> = {};
    categories.forEach(cat => {
      const prods = filteredProducts.filter(p => p.category.toLowerCase() === cat.name.toLowerCase());
      if (prods.length > 0) grouped[cat.name] = prods;
    });
    return grouped;
  }, [filteredProducts, categories]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleAiAsk = async (input?: string) => {
    const question = (input || aiInput).trim();
    if (!question) return;
    setAiMessages(prev => [...prev, { role: 'user', text: question }]);
    setAiInput('');
    setIsAiLoading(true);
    const result = await getRecommendation(question);
    setAiMessages(prev => [...prev, { role: 'ai', text: result || "Erreur de connexion." }]);
    setIsAiLoading(false);
    setTimeout(() => aiChatRef.current?.scrollTo({ top: aiChatRef.current.scrollHeight, behavior: 'smooth' }), 100);
  };

  const handleAiKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAiAsk(); }
  };

  const formatAiText = (text: string) => {
    return text.split('\n').map((line, i) => {
      let formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      const isBullet = /^[\-\*•]\s/.test(line.trim());
      if (isBullet) {
        formatted = formatted.replace(/^[\-\*•]\s/, '');
        return `<div class="flex gap-2 items-start ml-2"><span class="size-1.5 rounded-full bg-primary mt-2 shrink-0"></span><span>${formatted}</span></div>`;
      }
      return formatted ? `<p>${formatted}</p>` : '<br/>';
    }).join('');
  };

  return (
    <div className="min-h-screen bg-white pb-40">
      {/* Hero Slider */}
      <section className="relative overflow-hidden">
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${sliderIndex * 100}%)` }}>
            {heroSlides.map((slide, idx) => {
              const Icon = slide.icon;
              return (
                <div key={idx} className={`w-full shrink-0 bg-gradient-to-br ${slide.bg}`}>
                  <div className="relative pt-28 pb-20 sm:pt-32 sm:pb-28 lg:pt-36 lg:pb-48 px-6 lg:px-16 overflow-hidden">
                    {/* Decorative elements */}
                    <div className={`absolute -top-20 -right-20 size-[400px] ${slide.decorColor} rounded-full blur-[120px]`}></div>
                    <div className={`absolute -bottom-20 -left-20 size-[300px] ${slide.decorColor} rounded-full blur-[100px]`}></div>
                    <div className="absolute top-10 right-10 opacity-[0.03]">
                      <Icon size={350} className="text-white rotate-12" />
                    </div>

                    <div className="max-w-[1440px] mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                      {/* Text */}
                      <div className="w-full lg:w-[65%] space-y-5">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                          <span className={`size-2 rounded-full bg-gradient-to-r ${slide.accent} animate-pulse`}></span>
                          <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-white/70">{slide.tag}</span>
                        </div>
                        <h1 className="text-xl sm:text-2xl lg:text-5xl xl:text-6xl font-black text-white font-display tracking-tighter leading-[0.95] whitespace-pre-line">
                          {slide.title}
                        </h1>
                        <p className="text-slate-400 text-base lg:text-lg font-medium max-w-xl leading-relaxed">{slide.subtitle}</p>
                        <button
                          onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
                          className={`inline-flex items-center gap-3 h-12 px-8 rounded-2xl bg-gradient-to-r ${slide.accent} text-white font-extrabold text-[10px] uppercase tracking-[0.15em] shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all active:scale-95`}
                        >
                          {slide.cta} <ArrowRight size={16} />
                        </button>
                      </div>

                      {/* Visual */}
                      <div className="hidden lg:flex w-full lg:w-[35%] items-center justify-center">
                        <div className={`relative size-48 lg:size-56 rounded-full bg-gradient-to-br ${slide.accent} opacity-10 blur-2xl absolute`}></div>
                        <div className="relative size-36 lg:size-44 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center">
                          <Icon size={56} className={`text-white/80`} strokeWidth={1.2} />
                          <div className={`absolute -top-3 -right-3 size-12 rounded-xl bg-gradient-to-br ${slide.accent} flex items-center justify-center shadow-lg`}>
                            <Sparkles size={18} className="text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={() => goToSlide((sliderIndex - 1 + SLIDES_COUNT) % SLIDES_COUNT)}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 size-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all active:scale-90 z-20"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => goToSlide((sliderIndex + 1) % SLIDES_COUNT)}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 size-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all active:scale-90 z-20"
        >
          <ChevronRight size={20} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
          {heroSlides.map((slide, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`rounded-full transition-all duration-500 ${i === sliderIndex ? `w-10 h-3 bg-gradient-to-r ${slide.accent} shadow-lg` : 'size-3 bg-white/20 hover:bg-white/40'}`}
            />
          ))}
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 -mt-8 sm:-mt-16 lg:-mt-24 relative z-20">
        <div className="flex flex-col-reverse lg:flex-row gap-8 sm:gap-12 lg:gap-16">
          <aside className="w-full lg:w-[380px] shrink-0 space-y-8 lg:space-y-12">
            <div className="bg-white rounded-[32px] sm:rounded-[44px] lg:rounded-[56px] shadow-premium overflow-hidden lg:sticky lg:top-40 border border-slate-50">
              <div className="p-6 sm:p-8 lg:p-12 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                <h3 className="font-extrabold text-xs uppercase tracking-[0.2em] text-gray-900 flex items-center gap-4">
                  <SlidersHorizontal size={20} className="text-primary" /> Filtrer
                </h3>
              </div>
              <div className="p-4 sm:p-6 lg:p-10 space-y-4 sm:space-y-6">
                {['all', ...categories.map(c => c.name)].map(cat => (
                  <label key={cat} className="flex items-center gap-6 cursor-pointer group px-4 py-2 hover:bg-slate-50 rounded-2xl transition-all">
                    <input
                      type="radio"
                      name="cat"
                      className="size-6 border-2 border-slate-200 text-primary focus:ring-primary checked:border-primary transition-all cursor-pointer"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                    />
                    <span className={`text-[13px] font-extrabold uppercase tracking-widest transition-colors ${selectedCategory === cat ? 'text-primary' : 'text-slate-400 group-hover:text-gray-900'}`}>
                      {cat === 'all' ? 'Toutes les collections' : cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1 space-y-12 -mt-4">
            <div className="relative group">
              <Search size={22} className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full h-16 bg-white border border-slate-100 rounded-[32px] pl-20 pr-10 text-base font-bold outline-none focus:border-primary/20 shadow-premium transition-all"
                placeholder="Référence, Marque, Technologie..."
              />
            </div>

            {isLoading ? (
              <div className="space-y-12 animate-pulse">
                {[1, 2].map(g => (
                  <div key={g} className="space-y-8">
                    <div className="h-8 bg-slate-100 rounded-2xl w-64"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-10">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="bg-white rounded-[48px] border border-slate-50 overflow-hidden shadow-sm">
                          <div className="aspect-[4/3] bg-slate-100"></div>
                          <div className="p-10 space-y-4">
                            <div className="h-3 bg-slate-100 rounded w-20"></div>
                            <div className="h-6 bg-slate-100 rounded-xl w-full"></div>
                            <div className="h-12 bg-slate-100 rounded-[28px] w-full mt-6"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (<>
            {/* Grouped by category OR flat paginated */}
            {selectedCategory === 'all' ? (
              <div className="space-y-12 animate-fade-in">
                <div className="flex items-end justify-between border-b border-slate-100 pb-10">
                  <div className="space-y-2">
                    <span className="text-[11px] font-extrabold text-primary uppercase tracking-[0.4em]">Catalogue</span>
                    <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-gray-900 font-display tracking-tight">Toutes les collections</h2>
                  </div>
                  <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">{filteredProducts.length} Références</span>
                </div>

                <div className="space-y-6">
                  {paginatedProducts.map((product) => {
                    const imageCount = (product.images?.length || 0) + (product.images?.length ? 0 : 1);
                    return (<ProductRow key={product.id} product={product} imageCount={imageCount} navigate={navigate} addToQuote={addToQuote} showPrices={settings.show_product_prices} />);
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 pt-10">
                    <button
                      onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                      disabled={currentPage === 1}
                      className="size-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/20 transition-all disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => { setCurrentPage(page); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                        className={`size-12 rounded-2xl font-extrabold text-sm transition-all ${currentPage === page ? 'bg-primary text-white shadow-glow' : 'bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20'}`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                      disabled={currentPage === totalPages}
                      className="size-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/20 transition-all disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-32">
                {(Object.entries(productsByCategory) as [string, Product[]][]).map(([catName, prods]) => (
                  <div key={catName} className="space-y-12 animate-fade-in">
                    <div className="flex items-end justify-between border-b border-slate-100 pb-10">
                      <div className="space-y-2">
                        <span className="text-[11px] font-extrabold text-primary uppercase tracking-[0.4em]">Collection</span>
                        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-gray-900 font-display tracking-tight">{catName}</h2>
                      </div>
                      <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">{prods.length} Références</span>
                    </div>

                    <div className="space-y-6">
                      {prods.map((product) => {
                        const imageCount = (product.images?.length || 0) + (product.images?.length ? 0 : 1);
                        return (<ProductRow key={product.id} product={product} imageCount={imageCount} navigate={navigate} addToQuote={addToQuote} showPrices={settings.show_product_prices} />);
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="py-20 sm:py-40 lg:py-60 text-center bg-slate-50 rounded-[32px] sm:rounded-[52px] lg:rounded-[80px] border-4 border-dashed border-white">
                 <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 font-display tracking-tight text-balance">Aucune référence trouvée</h3>
                 <p className="text-slate-500 text-xl font-medium mt-4">Nos stocks varient rapidement en Zone 4.</p>
              </div>
            )}
            </>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
