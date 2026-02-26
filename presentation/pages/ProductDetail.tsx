
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Truck, RotateCcw, ShoppingCart, ImageIcon, X, ZoomIn } from 'lucide-react';
import { Product } from '../../domain/entities';
import { useAppContext } from '../context/AppProvider';
import { useQuote } from '../hooks/useQuote';
import { formatPrice } from '../utils/formatPrice';

const ProductDetail: React.FC = () => {
  const { navigate, navParams, products, settings } = useAppContext();
  const { addToQuote } = useQuote();

  const [activeTab, setActiveTab] = useState('specs');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const product = products.find(p => p.id === navParams?.productId) || products[0];

  const allImages = useMemo(() => {
    const imgs: string[] = [];
    if (product.image) imgs.push(product.image);
    if (product.images) {
      product.images.forEach(img => {
        if (!imgs.includes(img)) imgs.push(img);
      });
    }
    return imgs.length > 0 ? imgs : ['https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1000'];
  }, [product]);

  const currentImage = allImages[selectedImageIndex] || allImages[0];

  const nextImage = () => setSelectedImageIndex(i => (i + 1) % allImages.length);
  const prevImage = () => setSelectedImageIndex(i => (i - 1 + allImages.length) % allImages.length);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!lightboxOpen) return;
    if (e.key === 'Escape') setLightboxOpen(false);
    if (e.key === 'ArrowRight') setSelectedImageIndex(i => (i + 1) % allImages.length);
    if (e.key === 'ArrowLeft') setSelectedImageIndex(i => (i - 1 + allImages.length) % allImages.length);
  }, [lightboxOpen, allImages.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxOpen]);

  const dynamicSpecs = [
    ...product.features.map((f) => {
      const parts = f.split(':');
      if (parts.length >= 2) {
        return { l: parts[0].trim(), v: parts.slice(1).join(':').trim() };
      }
      return { l: f, v: 'Oui' };
    }),
    { l: "Garantie", v: "2 ans standard" },
    { l: "Certification", v: "ISO / CE" },
    { l: "Support", v: "Inclus localement" }
  ];

  const trustBadges = [
    { icon: <ShieldCheck size={22} />, label: 'Garantie', sub: '2 ans constructeur' },
    { icon: <Truck size={22} />, label: 'Livraison', sub: '24-48h Abidjan' },
    { icon: <RotateCcw size={22} />, label: 'SAV Local', sub: 'Zone 4, Abidjan' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Dark hero band */}
      <div className="bg-brand-dark h-[420px] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-dark/50"></div>
      </div>

      {/* Main content overlapping hero */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 -mt-[320px] relative z-10 pb-32">
        {/* Back button */}
        <button onClick={() => navigate('catalog')} className="flex items-center gap-2 text-white/60 hover:text-white font-bold text-sm mb-10 transition-colors">
          <ChevronLeft size={20} /> Retour au catalogue
        </button>

        {/* Main product card */}
        <div className="bg-white rounded-[48px] shadow-2xl border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image gallery column */}
            <div className="p-10 lg:p-14 space-y-6">
              {/* Main image */}
              <div className="relative aspect-square rounded-[40px] bg-slate-50 border border-slate-100 overflow-hidden group cursor-pointer" onClick={() => setLightboxOpen(true)}>
                <img
                  src={currentImage}
                  className="w-full h-full object-contain mix-blend-multiply p-12 transition-all duration-500"
                  alt={product.name}
                />

                {/* Zoom hint */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-slate-100 opacity-0 group-hover:opacity-100 transition-all">
                  <ZoomIn size={14} className="text-slate-500" />
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Agrandir</span>
                </div>

                {/* Navigation arrows (only if multi-images) */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 size-12 rounded-2xl bg-white/90 backdrop-blur-sm text-slate-600 hover:text-primary hover:bg-white flex items-center justify-center shadow-lg border border-slate-100 opacity-0 group-hover:opacity-100 transition-all active:scale-90"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 size-12 rounded-2xl bg-white/90 backdrop-blur-sm text-slate-600 hover:text-primary hover:bg-white flex items-center justify-center shadow-lg border border-slate-100 opacity-0 group-hover:opacity-100 transition-all active:scale-90"
                    >
                      <ChevronRight size={24} />
                    </button>

                    {/* Image counter badge */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-slate-100">
                      <ImageIcon size={14} className="text-slate-500" />
                      <span className="text-xs font-extrabold text-slate-600">{selectedImageIndex + 1}/{allImages.length}</span>
                    </div>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <div className="flex items-center gap-2 bg-primary text-white px-4 py-1.5 rounded-full shadow-glow">
                      <span className="size-1.5 rounded-full bg-white animate-pulse"></span>
                      <span className="text-[9px] font-extrabold uppercase tracking-widest">Nouveau</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnails row */}
              {allImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`shrink-0 size-20 rounded-2xl bg-slate-50 border-2 overflow-hidden transition-all ${
                        idx === selectedImageIndex
                          ? 'border-primary shadow-glow'
                          : 'border-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <img src={img} className="w-full h-full object-contain mix-blend-multiply p-2" alt={`Vue ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product info column */}
            <div className="p-10 lg:p-14 flex flex-col gap-10 lg:border-l border-slate-50">
              {/* Brand pill + name */}
              <div className="space-y-5">
                <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-primary bg-primary/5 px-4 py-2 rounded-full">
                  <span className="size-1.5 rounded-full bg-primary"></span>
                  {product.brand}
                </span>
                <h1 className="text-4xl lg:text-5xl font-black font-display tracking-tight text-gray-900 leading-[0.95]">{product.name}</h1>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Ref: {product.ref}</p>
                {settings.show_product_prices && product.price != null && (
                  <div className="pt-2">
                    <p className="text-4xl font-black text-primary font-display tracking-tight">{formatPrice(product.price)}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Prix HT</p>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-slate-500 text-lg leading-relaxed font-medium">{product.description}</p>

              {/* Trust badges row */}
              <div className="flex gap-4">
                {trustBadges.map((badge, i) => (
                  <div key={i} className="flex-1 flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="text-primary">{badge.icon}</div>
                    <div>
                      <p className="text-[10px] font-extrabold text-gray-900 uppercase tracking-widest">{badge.label}</p>
                      <p className="text-[9px] font-bold text-slate-400">{badge.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Features grid */}
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-primary-surface border border-primary/5 text-xs font-bold text-gray-700">
                    <CheckCircle2 size={16} className="text-primary shrink-0" /> {f}
                  </li>
                ))}
              </ul>

              {/* CTA + Stock */}
              <div className="pt-8 border-t border-slate-100 flex items-center gap-6 mt-auto">
                <button
                  onClick={() => addToQuote(product)}
                  className="flex-1 h-14 bg-primary text-white rounded-2xl font-extrabold uppercase tracking-widest text-xs shadow-2xl shadow-primary/30 hover:bg-primary-dark transition-all flex items-center justify-center gap-4 active:scale-[0.97]"
                >
                  <ShoppingCart size={22} /> {settings.show_product_prices && product.price != null ? 'Ajouter au panier' : 'Demander un devis'}
                </button>
                <div className="flex flex-col items-end shrink-0">
                  <div className="flex items-center gap-2">
                    <span className={`size-2 rounded-full ${product.stock ? 'bg-primary animate-pulse shadow-glow' : 'bg-red-400'}`}></span>
                    <span className={`font-extrabold text-sm uppercase tracking-widest ${product.stock ? 'text-primary' : 'text-red-500'}`}>
                      {product.stock ? 'En Stock CI' : 'Sur commande'}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{product.stock ? 'Livraison 24/48h' : 'Délai à confirmer'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs section */}
        <div className="mt-12 bg-white rounded-[48px] shadow-premium border border-slate-100 p-10 lg:p-14">
          <div className="flex gap-12 border-b border-slate-100 mb-12 overflow-x-auto no-scrollbar">
            {['specs', 'accessoires', 'docs'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-extrabold uppercase tracking-widest pb-6 transition-all border-b-4 whitespace-nowrap ${activeTab === tab ? 'text-gray-900 border-primary' : 'text-slate-300 border-transparent hover:text-slate-500'}`}
              >
                {tab === 'specs' ? 'Specifications' : tab === 'accessoires' ? 'Accessoires' : 'Documentation'}
              </button>
            ))}
          </div>

          <div className="min-h-[200px] animate-fadeIn">
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-4">
                {dynamicSpecs.map((s, i) => (
                  <div key={i} className="flex justify-between py-4 border-b border-slate-50">
                    <span className="text-slate-400 font-bold uppercase text-[10px]">{s.l}</span>
                    <span className="text-gray-900 font-extrabold text-sm">{s.v}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'accessoires' && <p className="text-slate-500 font-medium">Liste des accessoires compatibles disponible sur demande de devis.</p>}
            {activeTab === 'docs' && (
              <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100">
                <p className="text-slate-600 font-medium leading-relaxed">
                  Les fiches techniques sont disponibles sur demande. Contactez notre equipe commerciale a{' '}
                  <a href="mailto:info@bos-ci.com" className="text-primary font-extrabold hover:underline">info@bos-ci.com</a>{' '}
                  ou via le formulaire de devis.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center animate-fade-in" onClick={() => setLightboxOpen(false)}>
          {/* Close button */}
          <button className="absolute top-6 right-6 size-14 rounded-2xl bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-all z-10">
            <X size={28} />
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-6 flex items-center gap-3 bg-white/10 px-5 py-3 rounded-full">
            <ImageIcon size={16} className="text-white/60" />
            <span className="text-sm font-extrabold text-white">{selectedImageIndex + 1} / {allImages.length}</span>
          </div>

          {/* Main image */}
          <div className="flex-1 flex items-center justify-center w-full px-24 py-20" onClick={(e) => e.stopPropagation()}>
            <img
              src={currentImage}
              className="max-w-full max-h-full object-contain rounded-3xl shadow-2xl"
              alt={product.name}
            />
          </div>

          {/* Navigation arrows */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-6 top-1/2 -translate-y-1/2 size-16 rounded-2xl bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-all active:scale-90"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-6 top-1/2 -translate-y-1/2 size-16 rounded-2xl bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-all active:scale-90"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-3 pb-8 pt-4" onClick={(e) => e.stopPropagation()}>
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`shrink-0 size-16 rounded-xl overflow-hidden border-2 transition-all ${
                    idx === selectedImageIndex
                      ? 'border-primary shadow-glow scale-110'
                      : 'border-white/20 opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} className="w-full h-full object-contain bg-white/10 p-1" alt={`Vue ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
