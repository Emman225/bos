
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Globe, CheckCircle2, Linkedin, Facebook, Twitter } from 'lucide-react';
import { apiClient } from '../../infrastructure/api/ApiClient';
import Swal from 'sweetalert2';

const Contact: React.FC = () => {
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Demande d\'informations',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await apiClient.post('/contact', formData);
      setFormData({ name: '', email: '', phone: '', subject: 'Demande d\'informations', message: '' });
      Swal.fire({
        icon: 'success',
        title: 'Message transmis !',
        text: 'L\'equipe technique revient vers vous tres rapidement.',
        timer: 3000,
        showConfirmButton: false,
        customClass: { popup: 'rounded-3xl' }
      });
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue. Veuillez reessayer.',
        customClass: { popup: 'rounded-3xl' }
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-surface">
      {/* Hero Section */}
      <section className="bg-brand-dark py-28 sm:py-32 lg:py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center relative z-10">
          <div className="space-y-8 sm:space-y-12 animate-fade-in">
            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 text-primary-light text-[11px] font-extrabold uppercase tracking-[0.2em] border border-white/10">
              <span className="size-2.5 rounded-full bg-primary-light animate-pulse shadow-glow"></span>
              Siege Social Abidjan Zone 4
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-9xl font-black text-white font-display tracking-tighter leading-[0.8] text-balance">
              Parlons de <br/> <span className="text-primary italic">vos projets.</span>
            </h1>
            <p className="text-slate-400 text-lg sm:text-xl lg:text-3xl max-w-lg leading-relaxed font-medium">
              Nos experts en infrastructure sont a votre ecoute pour deployer le meilleur de la technologie.
            </p>
          </div>
          <div className="hidden lg:block relative">
            <div className="rounded-[80px] overflow-hidden border-[20px] border-white/5 shadow-2xl transform rotate-3 relative group transition-transform duration-1000 hover:rotate-0">
              <img src="https://images.unsplash.com/photo-1758519290830-5462f4924bb5?auto=format&fit=crop&q=80&w=1200" alt="Accueil BOS-CI" className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-16 left-16">
                <p className="text-white font-black text-4xl font-display tracking-tight">Mme. Kone</p>
                <p className="text-primary-light text-[11px] font-extrabold uppercase tracking-[0.4em] mt-2">Expertise Clientele</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 -mt-16 sm:-mt-24 lg:-mt-32 pb-16 sm:pb-24 lg:pb-40 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16">
          {/* Info Cards */}
          <div className="lg:col-span-4 space-y-10">
            <div className="bg-white p-6 sm:p-10 lg:p-16 rounded-[32px] sm:rounded-[48px] lg:rounded-[64px] shadow-premium border border-gray-100 space-y-10 sm:space-y-16">
              <div className="space-y-12">
                <h3 className="text-3xl font-black text-gray-900 font-display tracking-tight border-b border-slate-50 pb-10">Nos Canaux.</h3>

                <div className="flex gap-8 group">
                  <div className="size-16 rounded-[24px] bg-primary/5 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                    <MapPin size={28} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.2em]">Adresse</p>
                    <p className="text-base font-bold text-gray-900 leading-relaxed">Zone 4, Boulevard de Marseille, Immeuble BOS, Abidjan</p>
                  </div>
                </div>

                <div className="flex gap-8 group">
                  <div className="size-16 rounded-[24px] bg-primary/5 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                    <Phone size={28} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.2em]">Telephone</p>
                    <p className="text-base font-bold text-gray-900">+225 27 22 23 06 39</p>
                  </div>
                </div>

                <div className="flex gap-8 group">
                  <div className="size-16 rounded-[24px] bg-primary/5 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                    <Mail size={28} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.2em]">Email</p>
                    <p className="text-base font-bold text-gray-900">info@bos-ci.com</p>
                  </div>
                </div>
              </div>

              <div className="pt-10 border-t border-slate-50 flex gap-4 flex-wrap">
                 <button className="flex-1 min-w-[48px] h-14 sm:h-16 lg:h-20 bg-brand-dark rounded-[20px] sm:rounded-[24px] flex items-center justify-center text-white hover:bg-slate-800 transition-all shadow-lg active:scale-95"><Globe size={22} /></button>
                 <button className="flex-1 min-w-[48px] h-14 sm:h-16 lg:h-20 bg-[#25D366] rounded-[20px] sm:rounded-[24px] flex items-center justify-center text-white hover:scale-105 transition-all shadow-lg active:scale-95 shadow-green-500/20"><MessageSquare size={22} /></button>
                 <button className="flex-1 min-w-[48px] h-14 sm:h-16 lg:h-20 bg-[#0A66C2] rounded-[20px] sm:rounded-[24px] flex items-center justify-center text-white hover:scale-105 transition-all shadow-lg active:scale-95 shadow-blue-500/20"><Linkedin size={22} /></button>
                 <button className="flex-1 min-w-[48px] h-14 sm:h-16 lg:h-20 bg-[#1877F2] rounded-[20px] sm:rounded-[24px] flex items-center justify-center text-white hover:scale-105 transition-all shadow-lg active:scale-95 shadow-blue-400/20"><Facebook size={22} /></button>
                 <button className="flex-1 min-w-[48px] h-14 sm:h-16 lg:h-20 bg-[#1DA1F2] rounded-[20px] sm:rounded-[24px] flex items-center justify-center text-white hover:scale-105 transition-all shadow-lg active:scale-95 shadow-sky-400/20"><Twitter size={22} /></button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[32px] sm:rounded-[48px] lg:rounded-[72px] shadow-premium border border-gray-100 overflow-hidden">
              <div className="p-6 sm:p-10 lg:p-16 space-y-8 sm:space-y-12">
                <div className="space-y-4">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 font-display tracking-tighter">Echangez avec nos experts.</h3>
                  <p className="text-slate-500 text-lg font-medium">Reponse garantie sous 2 heures ouvrables.</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-[0.2em] ml-2">Nom Complet</label>
                    <input
                      required
                      className="w-full h-16 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all outline-none font-bold text-gray-900 shadow-inner"
                      placeholder="Ex: Jean Kouame"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-[0.2em] ml-2">Email Pro</label>
                    <input
                      required
                      type="email"
                      className="w-full h-16 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all outline-none font-bold text-gray-900 shadow-inner"
                      placeholder="jean@societe.ci"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-[0.2em] ml-2">Telephone</label>
                    <input
                      type="tel"
                      pattern="\+?[0-9\s]{10,16}"
                      className="w-full h-16 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all outline-none font-bold text-gray-900 shadow-inner"
                      placeholder="+225 00 00 00 00 00"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-[0.2em] ml-2">Objet</label>
                    <select
                      className="w-full h-16 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all outline-none font-bold text-gray-900 shadow-inner cursor-pointer appearance-none"
                      value={formData.subject}
                      onChange={e => setFormData({...formData, subject: e.target.value})}
                    >
                      <option>Demande d'informations</option>
                      <option>Demande de devis</option>
                      <option>Informations generales</option>
                      <option>Information Technique</option>
                      <option>SAV / Laboratoire</option>
                      <option>BOS Training Academy</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-[0.2em] ml-2">Message</label>
                    <textarea
                      required
                      maxLength={5000}
                      className="w-full h-36 p-8 rounded-3xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all outline-none font-bold text-gray-900 shadow-inner resize-none"
                      placeholder="Comment pouvons-nous vous aider ?"
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2 pt-4">
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full h-20 bg-primary text-white rounded-2xl font-extrabold uppercase tracking-[0.2em] text-sm shadow-glow hover:bg-primary-dark transition-all flex items-center justify-center gap-6 group active:scale-95 disabled:opacity-60"
                    >
                      {sending ? (<><div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Envoi en cours...</>) : (<>Envoyer le message <Send size={22} className="group-hover:translate-x-2 transition-transform duration-300" /></>)}
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>

        {/* Google Maps - Pleine largeur */}
        <div className="mt-10 sm:mt-16 lg:mt-20 bg-white rounded-[24px] sm:rounded-[36px] lg:rounded-[52px] shadow-premium border border-gray-100 overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.5!2d-3.99!3d5.32!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMTknMTIuMCJOIDPCsDU5JzI0LjAiVw!5e0!3m2!1sfr!2sci!4v1"
            width="100%"
            height="300"
            className="h-[250px] sm:h-[300px] lg:h-[400px]"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Localisation BOS-CI Abidjan"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
