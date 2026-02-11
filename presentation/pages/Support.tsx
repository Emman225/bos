
import React, { useState } from 'react';
import { Search, ChevronDown, Mail, Phone, MessageCircle, FileText, Info, Zap } from 'lucide-react';
import { useAppContext } from '../context/AppProvider';

const Support: React.FC = () => {
  const { navigate } = useAppContext();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { q: "Où se trouve votre agence à Abidjan ?", a: "Nous sommes situés en Zone 4, Boulevard de Marseille, Immeuble BOS. Vous pouvez nous rendre visite du Lundi au Vendredi, de 8h à 18h." },
    { q: "Comment bénéficier de la maintenance ?", a: "Déposez votre équipement (soudeuse, OTDR) à notre Labo en Zone 4. Un diagnostic technique gratuit est effectué sous 24h." },
    { q: "Livrez-vous à San-Pedro ou Korhogo ?", a: "Oui, nous livrons partout en Côte d'Ivoire via nos partenaires logistiques sécurisés sous 48h à 72h." },
    { q: "Puis-je payer par Mobile Money ?", a: "Absolument. Nous acceptons Orange Money, MTN MoMo et Wave pour toutes vos commandes de consommables et petits outillages." }
  ];

  return (
    <div className="min-h-screen bg-brand-surface">
      {/* Hero with local Support Agent */}
      <section className="bg-brand-dark pt-40 pb-32 px-6 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="space-y-10">
            <h1 className="text-5xl lg:text-8xl font-black text-white font-display tracking-tighter leading-none">
              Besoin d'un <br/> <span className="text-primary italic">Expert ?</span>
            </h1>
            <p className="text-gray-400 text-xl lg:text-2xl max-w-lg font-medium">
              Notre équipe technique basée à Abidjan est à votre disposition pour vous accompagner sur tous vos chantiers.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="https://wa.me/2252722230639" className="h-20 px-10 rounded-[28px] bg-[#25D366] text-white font-extrabold uppercase tracking-widest text-xs flex items-center gap-4 shadow-2xl shadow-green-500/20 hover:scale-105 transition-all">
                <MessageCircle size={24} /> WhatsApp Direct
              </a>
              <a href="tel:+2252722230639" className="h-20 px-10 rounded-[28px] bg-white text-gray-900 font-extrabold uppercase tracking-widest text-xs flex items-center gap-4 shadow-xl hover:bg-gray-50 transition-all">
                <Phone size={24} /> +225 27 22 23 06 39
              </a>
            </div>
          </div>
          <div className="relative hidden lg:block">
             <div className="aspect-square rounded-[60px] overflow-hidden border-[16px] border-white/5 shadow-2xl transform rotate-3">
                {/* Localized Image: Ivorian support professional in a modern setting */}
                <img src="https://plus.unsplash.com/premium_photo-1661611098886-a6e9753d438e?auto=format&fit=crop&q=80&w=1000" alt="Support Agent Ivoirien" className="w-full h-full object-cover" />
             </div>
             <div className="absolute top-10 -right-10 bg-white p-10 rounded-[40px] shadow-2xl flex items-center gap-6 border border-gray-100 animate-bounce-slow">
                <div className="size-16 rounded-3xl bg-green-50 text-green-600 flex items-center justify-center">
                   <Zap size={32} className="animate-pulse" />
                </div>
                <div>
                   <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Réponse Rapide</p>
                   <p className="text-xl font-extrabold text-gray-900">Moins de 10 min</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5 space-y-12">
            <h2 className="text-4xl lg:text-5xl font-black font-display tracking-tight text-gray-900 leading-none">Questions <span className="text-primary italic">Fréquentes.</span></h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm transition-all hover:shadow-md">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-8 text-left group"
                  >
                    <span className={`font-bold transition-colors ${openFaq === i ? 'text-primary' : 'text-gray-900'}`}>{faq.q}</span>
                    <ChevronDown className={`text-gray-400 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-primary' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="p-8 pt-0 text-gray-500 font-medium leading-relaxed border-t border-gray-50 mt-2 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="p-12 rounded-[52px] bg-white border border-gray-100 shadow-sm flex flex-col gap-10 group hover:border-primary/20 transition-all hover:shadow-2xl">
                <div className="size-20 rounded-3xl bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                   <FileText size={40} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-gray-900 font-display">Guides Techniques</h3>
                  <p className="text-base text-gray-500 font-medium leading-relaxed">Téléchargez les notices officielles Fujikura et VIAVI pour vos techniciens terrain.</p>
                </div>
                <button className="text-xs font-extrabold text-primary uppercase tracking-widest hover:underline mt-auto flex items-center gap-2">Documentation →</button>
             </div>
             <div className="p-12 rounded-[52px] bg-white border border-gray-100 shadow-sm flex flex-col gap-10 group hover:border-primary/20 transition-all hover:shadow-2xl">
                <div className="size-20 rounded-3xl bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                   <Info size={40} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-gray-900 font-display">Suivi de Commande</h3>
                  <p className="text-base text-gray-500 font-medium leading-relaxed">Vérifiez l'état de votre livraison ou de votre intervention en laboratoire.</p>
                </div>
                <button className="text-xs font-extrabold text-primary uppercase tracking-widest hover:underline mt-auto flex items-center gap-2">Suivre mon colis →</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
