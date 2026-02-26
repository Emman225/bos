import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Menu, X, Zap, Target, ShoppingCart, GraduationCap, MapPin, Phone, Mail, FileText, Wrench, Store } from 'lucide-react';
import { useAppContext } from '../context/AppProvider';
import { CATEGORIES } from '../../infrastructure/seed/constants';

const Navbar: React.FC = () => {
  const { navigate, currentPage, quoteItems } = useAppContext();
  const quoteCount = quoteItems.reduce((acc, item) => acc + item.quantity, 0);

  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page: string, params?: any) => {
    navigate(page, params);
    setMobileMenuOpen(false);
    setShowMegaMenu(false);
  };

  return (
    <>
      {/* Top Bar - Contact Info */}
      <div className={`fixed top-0 z-[151] w-full bg-brand-dark text-white/70 text-[11px] font-bold transition-all duration-500 ${isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-10'}`}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 h-full flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="tel:+2252722230639" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone size={12} /> +225 27 22 23 06 39
            </a>
            <a href="mailto:info@bos-ci.com" className="hidden sm:flex items-center gap-2 hover:text-primary transition-colors">
              <Mail size={12} /> info@bos-ci.com
            </a>
          </div>
          <div className="flex items-center gap-6">
            <span className="hidden sm:flex items-center gap-2 text-white/40 text-[11px] font-bold">
              <MapPin size={12} /> Zone 4, Abidjan
            </span>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/bosci.officiel" target="_blank" rel="noopener noreferrer" className="size-6 flex items-center justify-center rounded-md bg-white/5 text-white/40 hover:bg-primary hover:text-white transition-all">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/bos-ci" target="_blank" rel="noopener noreferrer" className="size-6 flex items-center justify-center rounded-md bg-white/5 text-white/40 hover:bg-[#0A66C2] hover:text-white transition-all">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://www.instagram.com/bosci.officiel" target="_blank" rel="noopener noreferrer" className="size-6 flex items-center justify-center rounded-md bg-white/5 text-white/40 hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white transition-all">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://wa.me/2250722230639" target="_blank" rel="noopener noreferrer" className="size-6 flex items-center justify-center rounded-md bg-white/5 text-white/40 hover:bg-[#25D366] hover:text-white transition-all">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`fixed z-[150] w-full transition-all duration-700 ${isScrolled ? 'top-0 bg-white/80 backdrop-blur-2xl border-b border-slate-100 py-3 shadow-premium' : 'top-10 bg-white/60 backdrop-blur-xl py-4'}`}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 flex items-center justify-between gap-10">
          {/* Logo Section */}
          <div className="flex items-center gap-4 cursor-pointer shrink-0 group" onClick={() => handleNav('home')}>
            <div className="w-12 h-12 text-primary flex items-center justify-center bg-white border border-slate-100 rounded-[18px] group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-premium">
              <span className="material-symbols-outlined font-bold !text-3xl">settings_input_component</span>
            </div>
            <div className="flex flex-col">
              <h2 className="text-gray-900 text-2xl font-extrabold tracking-tighter leading-none">BOS-CI</h2>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-2">
            <a className={`text-[13px] font-extrabold uppercase tracking-[0.2em] px-5 py-3 hover:bg-slate-50 rounded-[18px] transition-all cursor-pointer ${currentPage === 'home' ? 'text-primary bg-primary/5' : 'text-slate-600'}`} onClick={() => handleNav('home')}>Accueil</a>
            <a className={`text-[13px] font-extrabold uppercase tracking-[0.2em] px-5 py-3 hover:bg-slate-50 rounded-[18px] transition-all cursor-pointer whitespace-nowrap ${currentPage === 'about' ? 'text-primary bg-primary/5' : 'text-slate-600'}`} onClick={() => handleNav('about')}>À&nbsp;Propos</a>

            <div
              className="relative h-14 flex items-center group cursor-pointer px-5"
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => setShowMegaMenu(false)}
            >
              <span className={`text-[13px] font-extrabold uppercase tracking-[0.2em] flex items-center gap-3 transition-all ${currentPage === 'catalog' ? 'text-primary' : 'text-slate-600 hover:text-primary'}`}>
                Produits <ChevronDown size={14} className={`transition-transform duration-500 ${showMegaMenu ? 'rotate-180' : ''}`} />
              </span>

              {/* Mega Menu - Compact */}
              <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[780px] max-w-[90vw] bg-white shadow-premium-hover rounded-2xl border border-slate-100 overflow-hidden transition-all duration-500 ease-out ${showMegaMenu ? 'opacity-100 visible translate-y-2' : 'opacity-0 invisible translate-y-4'}`}>
                <div className="flex">
                  <div className="w-[250px] p-5 border-r border-slate-100">
                    <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.25em] mb-3 px-2">Catégories</h3>
                    <ul className="space-y-0.5">
                      {CATEGORIES.map(cat => (
                        <li key={cat.id} onClick={() => handleNav('catalog', { category: cat.name })}>
                          <a className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-primary/5 hover:text-primary text-slate-600 font-semibold transition-all cursor-pointer group/item">
                            <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center group-hover/item:border-primary/20 group-hover/item:bg-primary/5 transition-all">
                              <span className="material-symbols-outlined !text-[18px]">{cat.icon}</span>
                            </div>
                            <span className="text-[13px]">{cat.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-[220px] p-5 flex flex-col border-r border-slate-100">
                    <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.25em] mb-3 px-1">Solutions</h3>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-amber-50 cursor-pointer group/tool transition-all" onClick={() => handleNav('catalog')}>
                        <div className="size-8 rounded-lg bg-amber-50 text-amber-600 group-hover/tool:bg-amber-600 group-hover/tool:text-white transition-all flex items-center justify-center">
                          <Store size={16} />
                        </div>
                        <div>
                          <h4 className="text-[13px] font-bold text-gray-900 leading-tight">Espace Revendeur</h4>
                          <p className="text-[11px] text-slate-400">Tarifs & volumes</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-blue-50 cursor-pointer group/tool transition-all" onClick={() => handleNav('expertise')}>
                        <div className="size-8 rounded-lg bg-blue-50 text-blue-600 group-hover/tool:bg-blue-600 group-hover/tool:text-white transition-all flex items-center justify-center">
                          <Target size={16} />
                        </div>
                        <div>
                          <h4 className="text-[13px] font-bold text-gray-900 leading-tight">Tests & Mesures</h4>
                          <p className="text-[11px] text-slate-400">Labo certifié Zone 4</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-slate-50 cursor-pointer group/tool transition-all" onClick={() => handleNav('contact')}>
                        <div className="size-8 rounded-lg bg-slate-50 text-slate-600 group-hover/tool:bg-brand-dark group-hover/tool:text-white transition-all flex items-center justify-center">
                          <MapPin size={16} />
                        </div>
                        <div>
                          <h4 className="text-[13px] font-bold text-gray-900 leading-tight">Showroom</h4>
                          <p className="text-[11px] text-slate-400">Abidjan, Zone 4</p>
                        </div>
                      </div>
                    </div>
                    <button className="mt-3 w-full py-2.5 rounded-xl bg-primary/5 text-primary text-[12px] font-bold hover:bg-primary hover:text-white transition-all" onClick={() => handleNav('catalog', { category: 'all' })}>
                      Voir tout le catalogue
                    </button>
                  </div>
                  {/* Promo Dark Section */}
                  <div className="flex-1 bg-brand-dark rounded-r-2xl flex flex-col relative overflow-hidden">
                    <div className="relative h-[120px] overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover animate-[pulse_8s_ease-in-out_infinite] scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-dark/50 to-brand-dark"></div>
                      <Target size={80} className="absolute top-3 right-3 text-white/20 animate-spin-slow" />
                    </div>
                    <div className="p-6 pt-2 flex flex-col justify-between flex-1 relative z-10">
                      <div className="space-y-3">
                        <h3 className="text-xl font-black text-white font-display tracking-tight leading-tight">Standard Mondial Localisé.</h3>
                        <p className="text-slate-400 text-[12px] leading-relaxed font-medium">Logistique intégrée et support technique localisé à Abidjan pour une réactivité maximale.</p>
                      </div>
                      <button
                        onClick={() => handleNav('about')}
                        className="w-full py-3 mt-4 rounded-xl bg-white text-brand-dark text-[11px] font-extrabold uppercase tracking-[0.15em] hover:bg-primary hover:text-white transition-all"
                      >
                        L'Histoire BOS-CI
                      </button>
                    </div>
                    <span className="absolute bottom-2 right-4 text-[9px] font-extrabold text-white/10 uppercase tracking-[0.3em]">BOS-CI Zone 4</span>
                  </div>
                </div>
              </div>
            </div>

            <a className={`text-[13px] font-extrabold uppercase tracking-[0.2em] px-5 py-3 hover:bg-slate-50 rounded-[18px] transition-all cursor-pointer whitespace-nowrap ${currentPage === 'support' ? 'text-primary bg-primary/5' : 'text-slate-600'}`} onClick={() => handleNav('support')}>S.A.V</a>
            <a className={`text-[13px] font-extrabold uppercase tracking-[0.2em] px-5 py-3 hover:bg-slate-50 rounded-[18px] transition-all cursor-pointer ${currentPage === 'formation' ? 'text-primary bg-primary/5' : 'text-slate-600'}`} onClick={() => handleNav('formation')}>Formation</a>
            <a className={`text-[13px] font-extrabold uppercase tracking-[0.2em] px-5 py-3 hover:bg-slate-50 rounded-[18px] transition-all cursor-pointer ${currentPage === 'contact' ? 'text-primary bg-primary/5' : 'text-slate-600'}`} onClick={() => handleNav('contact')}>Contact</a>
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex relative group">
              <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input className="bg-slate-50/50 border-2 border-transparent focus:border-primary/20 focus:bg-white w-[160px] xl:w-[200px] h-14 pl-14 pr-6 rounded-[24px] text-sm font-bold outline-none transition-all shadow-sm" placeholder="Rechercher..." />
            </div>

            <button className="size-14 bg-white text-slate-600 border border-slate-100 hover:text-primary hover:bg-primary/5 rounded-[20px] transition-all relative flex items-center justify-center shadow-premium" onClick={() => handleNav('quote')}>
              <ShoppingCart size={24} />
              {quoteCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 size-7 bg-primary text-white text-[11px] font-extrabold flex items-center justify-center rounded-full border-[3px] border-white shadow-glow">
                  {quoteCount}
                </span>
              )}
            </button>

            <button
              className="hidden xl:flex h-14 px-8 bg-primary text-white rounded-2xl font-extrabold uppercase tracking-widest text-[10px] shadow-glow items-center gap-3 hover:bg-primary-dark transition-all"
              onClick={() => handleNav('quote')}
            >
              <FileText size={18} /> Demander un devis
            </button>

            <button className="xl:hidden size-14 bg-white border border-slate-100 text-slate-600 hover:bg-slate-50 rounded-[20px] flex items-center justify-center shadow-premium" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-brand-dark/40 backdrop-blur-md z-[200] transition-opacity duration-500 xl:hidden ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setMobileMenuOpen(false)}>
        <div
          className={`absolute right-0 top-0 h-full w-[90%] max-w-sm bg-white shadow-premium-hover transition-transform duration-700 p-6 sm:p-10 flex flex-col gap-8 sm:gap-12 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-primary text-white rounded-[14px] flex items-center justify-center"><Zap size={20} /></div>
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tighter">BOS-CI</h2>
            </div>
            <button className="p-4 bg-slate-50 rounded-2xl" onClick={() => setMobileMenuOpen(false)}><X size={24} /></button>
          </div>
          <nav className="flex flex-col gap-2">
            <button onClick={() => handleNav('home')} className="text-xl sm:text-2xl font-extrabold text-left py-4 sm:py-6 border-b border-slate-50 hover:text-primary transition-colors">Accueil</button>
            <button onClick={() => handleNav('about')} className="text-xl sm:text-2xl font-extrabold text-left py-4 sm:py-6 border-b border-slate-50 hover:text-primary transition-colors">À Propos</button>
            <button onClick={() => handleNav('catalog')} className="text-xl sm:text-2xl font-extrabold text-left py-4 sm:py-6 border-b border-slate-50 hover:text-primary transition-colors">Produits</button>
            <button onClick={() => handleNav('support')} className="text-xl sm:text-2xl font-extrabold text-left py-4 sm:py-6 border-b border-slate-50 hover:text-primary transition-colors">S.A.V</button>
            <button onClick={() => handleNav('formation')} className="text-xl sm:text-2xl font-extrabold text-left py-4 sm:py-6 border-b border-slate-50 hover:text-primary transition-colors">Formation</button>
            <button onClick={() => handleNav('expertise')} className="text-xl sm:text-2xl font-extrabold text-left py-4 sm:py-6 border-b border-slate-50 hover:text-primary transition-colors">Tests & Mesures</button>
            <button onClick={() => handleNav('contact')} className="text-xl sm:text-2xl font-extrabold text-left py-4 sm:py-6 border-b border-slate-50 hover:text-primary transition-colors">Contact</button>
          </nav>
          <div className="text-sm text-slate-400 space-y-2">
            <p className="flex items-center gap-2"><Phone size={14} /> +225 27 22 23 06 39</p>
            <p className="flex items-center gap-2"><Mail size={14} /> info@bos-ci.com</p>
          </div>
          <button onClick={() => handleNav('quote')} className="mt-auto h-16 sm:h-20 w-full rounded-[28px] bg-primary text-white text-base sm:text-lg font-extrabold uppercase tracking-[0.2em] shadow-glow">Demander un devis</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
