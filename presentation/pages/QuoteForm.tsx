
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Trash2, Send, Home, Plus, Minus, Package, UserCheck, Briefcase, Globe, Info } from 'lucide-react';
import Swal from 'sweetalert2';
import { QuoteItem } from '../../domain/entities';
import { useAppContext } from '../context/AppProvider';
import { useQuote } from '../hooks/useQuote';
import { formatPrice } from '../utils/formatPrice';

const QuoteForm: React.FC = () => {
  const { navigate, settings } = useAppContext();
  const { quoteItems, removeFromQuote, updateItemQuantity, submitQuote } = useQuote();

  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const totalItems = quoteItems.reduce((acc, item) => acc + item.quantity, 0);

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-primary-surface flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white rounded-[80px] p-20 text-center shadow-premium-hover border border-gray-100 space-y-12 animate-fade-in">
          <div className="size-32 bg-primary text-white rounded-[48px] mx-auto flex items-center justify-center shadow-glow rotate-6 transform transition-transform hover:rotate-0">
            <CheckCircle2 size={64} />
          </div>
          <div className="space-y-6">
            <h2 className="text-5xl font-black text-gray-900 font-display tracking-tight leading-tight">Demande transmise avec succès !</h2>
            <p className="text-gray-500 text-xl font-medium leading-relaxed">
              Un ingénieur BOS-CI va analyser votre sélection. Un devis complet vous sera adressé sous <span className="text-primary font-extrabold">24 heures</span>.
            </p>
          </div>
          <div className="pt-10 flex flex-col gap-5">
            <button
              onClick={() => navigate('home')}
              className="w-full h-24 bg-brand-dark text-white rounded-[36px] font-extrabold uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-4 hover:bg-gray-800 transition-all shadow-xl active:scale-95"
            >
              <Home size={22} /> Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-surface pt-40 pb-32">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Elite Stepper */}
        <div className="flex items-center justify-center gap-6 mb-24">
          {[1, 2].map((s) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center gap-4">
                <div className={`size-20 rounded-[32px] flex items-center justify-center font-extrabold text-xl transition-all duration-700 ${step >= s ? 'bg-primary text-white shadow-glow' : 'bg-white text-gray-300 border-2 border-gray-100'}`}>
                  {s === 1 ? <Package size={28} /> : <UserCheck size={28} />}
                </div>
                <span className={`text-[11px] font-extrabold uppercase tracking-[0.2em] ${step >= s ? 'text-primary' : 'text-gray-300'}`}>
                  {s === 1 ? 'Articles' : 'Contact'}
                </span>
              </div>
              {s === 1 && <div className={`w-24 h-2 rounded-full transition-all duration-700 ${step > 1 ? 'bg-primary' : 'bg-gray-100'}`}></div>}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Main Form Area */}
          <div className="lg:col-span-8 space-y-10">
            <div className="bg-white rounded-[64px] shadow-premium border border-gray-100 overflow-hidden">
              <div className="p-12 lg:p-20">
                {step === 1 ? (
                  <div className="space-y-12 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <h3 className="text-3xl font-black text-gray-900 font-display tracking-tight">Sélection de Matériel.</h3>
                      <button onClick={() => navigate('catalog')} className="text-[10px] font-extrabold text-primary uppercase tracking-widest bg-primary/5 px-8 py-4 rounded-[22px] hover:bg-primary/10 transition-all flex items-center gap-3">
                        <Plus size={18} /> Ajouter des produits
                      </button>
                    </div>

                    {quoteItems.length > 0 ? (
                      <div className="space-y-6">
                        {quoteItems.map((item) => (
                          <div key={item.product.id} className="group relative flex items-center gap-10 p-8 bg-slate-50/50 rounded-[44px] border border-gray-100 hover:border-primary/20 hover:bg-white transition-all duration-500">
                            <div className="size-32 bg-white rounded-[32px] p-6 shrink-0 shadow-sm border border-gray-100 flex items-center justify-center">
                              <img src={item.product.image} className="w-full h-full object-contain mix-blend-multiply transition-transform group-hover:scale-110" alt={item.product.name} />
                            </div>
                            <div className="flex-1 min-w-0 space-y-2">
                              <span className="text-[10px] font-extrabold text-primary uppercase tracking-[0.2em]">{item.product.brand}</span>
                              <h4 className="font-extrabold text-gray-900 text-2xl leading-tight truncate">{item.product.name}</h4>
                              {settings.show_product_prices && item.product.price != null && (
                                <div className="flex items-center gap-3">
                                  <span className="text-lg font-black text-primary font-display">{formatPrice(item.product.price)}</span>
                                  {item.quantity > 1 && <span className="text-xs font-bold text-slate-400">x{item.quantity} = {formatPrice(item.product.price * item.quantity)}</span>}
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col items-end gap-6">
                              <div className="flex items-center bg-white border-2 border-slate-100 rounded-[24px] p-2 shadow-sm">
                                <button onClick={() => updateItemQuantity(item.product.id, -1)} className="p-3 text-gray-400 hover:text-primary transition-all active:scale-90"><Minus size={20} /></button>
                                <span className="w-14 text-center font-black text-2xl font-display">{item.quantity}</span>
                                <button onClick={() => updateItemQuantity(item.product.id, 1)} className="p-3 text-gray-400 hover:text-primary transition-all active:scale-90"><Plus size={20} /></button>
                              </div>
                              <button
                                className="flex items-center gap-2 text-[10px] font-extrabold text-red-400 hover:text-red-600 uppercase tracking-widest transition-colors"
                                onClick={() => removeFromQuote(item.product.id)}
                              >
                                <Trash2 size={18} /> Retirer
                              </button>
                            </div>
                          </div>
                        ))}
                        {settings.show_product_prices && quoteItems.some(i => i.product.price != null) && (
                          <div className="flex items-center justify-between p-8 bg-primary/5 rounded-[28px] border border-primary/10 mt-6">
                            <span className="text-sm font-extrabold text-gray-900 uppercase tracking-widest">Total estimé</span>
                            <span className="text-3xl font-black text-primary font-display">
                              {formatPrice(quoteItems.reduce((sum, i) => sum + (i.product.price ?? 0) * i.quantity, 0))}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="py-32 text-center border-2 border-dashed border-gray-100 rounded-[52px] bg-gray-50/30 space-y-8">
                        <Package className="mx-auto text-gray-200 mb-6" size={80} />
                        <div className="space-y-2">
                           <p className="text-gray-900 font-extrabold text-xl">Le panier est vide</p>
                           <p className="text-gray-400 font-medium">Parcourez le catalogue pour ajouter des solutions.</p>
                        </div>
                        <button onClick={() => navigate('catalog')} className="h-20 px-12 rounded-[28px] bg-brand-dark text-white font-extrabold uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all">Showroom Elite</button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-10 animate-fade-in">
                    <h3 className="text-3xl font-black text-gray-900 font-display tracking-tight">Informations de l'Acheteur.</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-[0.2em] ml-2">Société / Institution</label>
                        <div className="relative">
                          <Briefcase className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            required
                            className="w-full h-16 pl-16 pr-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all outline-none font-bold text-gray-900 shadow-inner"
                            placeholder="Nom de l'entreprise"
                            value={formData.company}
                            onChange={e => setFormData({...formData, company: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-[0.2em] ml-2">Responsable de Projet</label>
                        <input
                          required
                          className="w-full h-16 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all outline-none font-bold text-gray-900 shadow-inner"
                          placeholder="M. Nom Prénom"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-[0.2em] ml-2">Email Professionnel</label>
                        <input
                          required
                          type="email"
                          className="w-full h-16 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all outline-none font-bold text-gray-900 shadow-inner"
                          placeholder="email@societe.ci"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-[0.2em] ml-2">Téléphone (CI)</label>
                        <input
                          required
                          type="tel"
                          pattern="\+?[0-9\s]{10,16}"
                          className="w-full h-16 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all outline-none font-bold text-gray-900 shadow-inner"
                          placeholder="+225 00 00 00 00 00"
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                      <div className="md:col-span-2 space-y-3">
                        <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-[0.2em] ml-2">Détails de l'intervention / Besoins</label>
                        <textarea
                          maxLength={3000}
                          className="w-full h-36 p-8 rounded-3xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all outline-none font-bold text-gray-900 resize-none shadow-inner"
                          placeholder="Précisez l'usage ou le contexte de votre projet..."
                          value={formData.notes}
                          onChange={e => setFormData({...formData, notes: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-12 lg:p-16 bg-slate-50/50 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-10">
                <button
                  className={`flex items-center gap-3 font-extrabold text-[11px] uppercase tracking-widest transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:text-gray-900'}`}
                  onClick={() => setStep(1)}
                >
                  <ChevronLeft size={20} /> Retour
                </button>
                <button
                  className="flex items-center justify-center gap-6 w-full sm:w-auto px-20 h-24 rounded-[36px] bg-primary text-white font-extrabold text-sm uppercase tracking-[0.2em] shadow-glow hover:bg-primary-dark transition-all transform active:scale-95 disabled:opacity-50 disabled:grayscale"
                  onClick={async () => {
                    if(step === 2) {
                      if (!formData.company.trim() || !formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
                        Swal.fire({ icon: 'warning', title: 'Champs requis', text: 'Veuillez remplir tous les champs obligatoires.', customClass: { popup: 'rounded-3xl' } });
                        return;
                      }
                      setSubmitting(true);
                      try {
                        await submitQuote(formData, formData.notes);
                        setIsSuccess(true);
                      } catch {
                        Swal.fire({
                          icon: 'error',
                          title: 'Erreur',
                          text: 'Impossible d\'envoyer la demande. Veuillez reessayer.',
                          customClass: { popup: 'rounded-3xl' }
                        });
                      } finally {
                        setSubmitting(false);
                      }
                    }
                    else setStep(2);
                  }}
                  disabled={quoteItems.length === 0 || submitting}
                >
                  {step === 2 ? (
                    submitting ? (<><div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Envoi en cours...</>) : (<>Envoyer la demande <Send size={24} /></>)
                  ) : (
                    <>Continuer l'étude <ChevronRight size={24} /></>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Luxury Summary Sidebar */}
          <div className="lg:col-span-4 space-y-10 sticky top-40">
            <div className="bg-brand-dark rounded-[56px] p-12 text-white space-y-10 shadow-premium relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-12 opacity-5 transition-transform duration-1000 group-hover:scale-110">
                  <Globe size={240} className="animate-spin-slow" />
               </div>
               <h3 className="text-2xl font-black font-display relative z-10 tracking-tight">Récapitulatif.</h3>
               <div className="space-y-8 relative z-10">
                  <div className="flex justify-between items-center text-sm font-bold text-gray-400">
                    <span className="flex items-center gap-3"><Package size={20} /> Quantité</span>
                    <span className="text-white text-2xl font-display">{totalItems}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold text-gray-400">
                    <span className="flex items-center gap-3"><Briefcase size={20} /> Partenaires</span>
                    <span className="text-white text-2xl font-display">{Array.from(new Set(quoteItems.map(i => i.product.brand))).length}</span>
                  </div>
                  <div className="pt-8 border-t border-white/10 space-y-8">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-primary-light">BOS Expert Services</p>
                    <ul className="space-y-5">
                      <li className="flex items-center gap-4 text-xs font-bold text-slate-300">
                        <div className="size-2.5 rounded-full bg-primary-light shadow-glow"></div> Support Labo Zone 4
                      </li>
                      <li className="flex items-center gap-4 text-xs font-bold text-slate-300">
                        <div className="size-2.5 rounded-full bg-primary-light shadow-glow"></div> Calibration Garantie
                      </li>
                      <li className="flex items-center gap-4 text-xs font-bold text-slate-300">
                        <div className="size-2.5 rounded-full bg-primary-light shadow-glow"></div> Livraison Express CI
                      </li>
                    </ul>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;
