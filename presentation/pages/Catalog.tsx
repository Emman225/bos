
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, SlidersHorizontal, Package, ArrowRight, Sparkles, Send, ShoppingCart, ImageIcon, ChevronLeft, ChevronRight, RotateCcw, Bot, User } from 'lucide-react';
import { Product, Category } from '../../domain/entities';
import { useAppContext } from '../context/AppProvider';
import { useQuote } from '../hooks/useQuote';
import { formatPrice } from '../utils/formatPrice';

const ProductRow: React.FC<{ product: Product; imageCount: number; navigate: (page: string, params?: any) => void; addToQuote: (p: Product) => void; showPrices: boolean }> = ({ product, imageCount, navigate, addToQuote, showPrices }) => (
  <div className="group bg-white rounded-[32px] border border-slate-100 overflow-hidden flex flex-row shadow-premium hover:shadow-premium-hover hover:border-primary/20 transition-all duration-500">
    <div className="w-[280px] shrink-0 bg-slate-50 relative overflow-hidden cursor-pointer rounded-2xl m-4" onClick={() => navigate('product', { productId: product.id })}>
      <img className="w-full h-full object-contain mix-blend-multiply p-8 transition-all duration-700 group-hover:scale-110" src={product.image} alt={product.name} />
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
    <div className="flex-1 p-8 flex items-center gap-8">
      <div className="flex-1 space-y-3 min-w-0">
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
        <h3 className="font-black text-gray-900 text-lg leading-tight font-display tracking-tight cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('product', { productId: product.id })}>{product.name}</h3>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ref: {product.ref}</p>
        <p className="text-sm text-slate-500 font-medium line-clamp-2 leading-relaxed">{product.description}</p>
        {showPrices && product.price != null && (
          <p className="text-2xl font-black text-primary font-display">{formatPrice(product.price)}</p>
        )}
      </div>
      <div className="flex flex-col gap-3 shrink-0">
        <button className="bg-primary text-white h-14 px-8 rounded-2xl font-extrabold text-[10px] uppercase tracking-[0.15em] shadow-glow hover:bg-primary-dark transition-all flex items-center justify-center gap-3 active:scale-95" onClick={() => addToQuote(product)}>
          {showPrices && product.price != null ? 'Ajouter' : 'Devis'} <ShoppingCart size={16} />
        </button>
        <button className="h-14 px-8 rounded-2xl bg-brand-dark text-white flex items-center justify-center gap-2 hover:bg-gray-800 transition-all text-[10px] font-extrabold uppercase tracking-widest active:scale-95" onClick={() => navigate('product', { productId: product.id })}>
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
      <section className="bg-brand-dark pt-40 pb-56 px-6 lg:px-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-40 opacity-5 pointer-events-none">
           <Package size={500} className="text-white rotate-12" />
        </div>
        <div className="max-w-[1440px] mx-auto space-y-10 relative z-10">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-primary-light text-[11px] font-extrabold uppercase tracking-[0.2em]">
            <span className="size-2.5 rounded-full bg-primary animate-pulse shadow-glow"></span>
            Stock Permanent Abidjan Zone 4
          </div>
          <h1 className="text-7xl lg:text-[110px] font-black text-white font-display tracking-tighter leading-[0.85] text-balance">
            Solutions <br/> <span className="text-primary italic">Elite.</span>
          </h1>
          <p className="text-slate-400 text-2xl font-medium max-w-3xl leading-relaxed">Le standard industriel pour les réseaux critiques, supporté localement.</p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 -mt-36 relative z-20">
        <div className="flex flex-col lg:flex-row gap-16">
          <aside className="w-full lg:w-[380px] shrink-0 space-y-12">
            <div className="bg-white rounded-[56px] shadow-premium border border-slate-50 overflow-hidden">
              {/* Header */}
              <div className="p-10 pb-0">
                <div className="flex items-center gap-5">
                  <div className="size-14 rounded-[20px] bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center shadow-glow">
                    <Sparkles size={26} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-base text-gray-900 font-display leading-none">Conseiller IA</h3>
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mt-1">Ingénierie Réseau</p>
                  </div>
                  {aiMessages.length > 0 && (
                    <button onClick={() => setAiMessages([])} className="size-10 rounded-xl bg-slate-100 text-slate-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-all" title="Nouvelle conversation">
                      <RotateCcw size={16} />
                    </button>
                  )}
                </div>
              </div>

              <div className="p-10 pt-6 space-y-6">
                {/* Chat messages */}
                {aiMessages.length > 0 ? (
                  <div ref={aiChatRef} className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
                    {aiMessages.map((msg, i) => (
                      <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'ai' && (
                          <div className="size-8 rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center shrink-0 mt-1">
                            <Bot size={14} />
                          </div>
                        )}
                        <div className={`max-w-[85%] rounded-2xl px-5 py-4 ${msg.role === 'user' ? 'bg-primary text-white rounded-br-md' : 'bg-slate-50 text-gray-800 rounded-bl-md border border-slate-100'}`}>
                          {msg.role === 'user' ? (
                            <p className="text-sm font-bold leading-relaxed">{msg.text}</p>
                          ) : (
                            <div className="text-sm font-medium leading-relaxed space-y-1.5 [&_strong]:font-extrabold [&_strong]:text-primary" dangerouslySetInnerHTML={{ __html: formatAiText(msg.text) }} />
                          )}
                        </div>
                        {msg.role === 'user' && (
                          <div className="size-8 rounded-xl bg-brand-dark text-white flex items-center justify-center shrink-0 mt-1">
                            <User size={14} />
                          </div>
                        )}
                      </div>
                    ))}
                    {isAiLoading && (
                      <div className="flex gap-3 justify-start">
                        <div className="size-8 rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center shrink-0 mt-1">
                          <Bot size={14} />
                        </div>
                        <div className="bg-slate-50 rounded-2xl rounded-bl-md px-5 py-4 border border-slate-100">
                          <div className="flex gap-1.5 items-center h-5">
                            <span className="size-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="size-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="size-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-bold text-slate-500 leading-relaxed">Décrivez votre projet terrain pour une recommandation sur-mesure.</p>
                    <div className="flex flex-wrap gap-2">
                      {aiSuggestions.map((s, i) => (
                        <button key={i} onClick={() => handleAiAsk(s)} className="text-[11px] font-bold text-primary bg-primary/5 hover:bg-primary/10 border border-primary/10 px-4 py-2 rounded-xl transition-all hover:scale-[1.02] active:scale-95 text-left leading-snug">
                          {s}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {/* Input area */}
                <div className="relative group">
                  <textarea
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    onKeyDown={handleAiKeyDown}
                    className="w-full h-28 p-5 pr-16 text-sm font-bold bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-primary/20 focus:bg-white transition-all resize-none"
                    placeholder="Ex: besoin d'équiper 3 techniciens fibre..."
                  />
                  <button
                    onClick={() => handleAiAsk()}
                    disabled={isAiLoading || !aiInput.trim()}
                    className="absolute bottom-4 right-4 size-11 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all disabled:opacity-30 shadow-glow flex items-center justify-center active:scale-90"
                  >
                    {isAiLoading ? <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Send size={18} />}
                  </button>
                </div>
                <p className="text-[10px] font-bold text-slate-300 text-center">Entrée pour envoyer &middot; Shift+Entrée pour un saut de ligne</p>
              </div>
            </div>

            <div className="bg-white rounded-[56px] shadow-premium overflow-hidden sticky top-40 border border-slate-50">
              <div className="p-12 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                <h3 className="font-extrabold text-xs uppercase tracking-[0.2em] text-gray-900 flex items-center gap-4">
                  <SlidersHorizontal size={20} className="text-primary" /> Filtrer
                </h3>
              </div>
              <div className="p-10 space-y-6">
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

          <div className="flex-1 space-y-16">
            <div className="relative group">
              <Search size={28} className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full h-24 bg-white border border-slate-100 rounded-[40px] pl-24 pr-12 text-lg font-bold outline-none focus:border-primary/20 shadow-premium transition-all"
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
                    <h2 className="text-5xl font-black text-gray-900 font-display tracking-tight">Toutes les collections</h2>
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
                        <h2 className="text-5xl font-black text-gray-900 font-display tracking-tight">{catName}</h2>
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
              <div className="py-60 text-center bg-slate-50 rounded-[80px] border-4 border-dashed border-white">
                 <h3 className="text-4xl font-black text-gray-900 font-display tracking-tight text-balance">Aucune référence trouvée</h3>
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
