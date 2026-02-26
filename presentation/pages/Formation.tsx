
import React, { useState, useRef, useEffect } from 'react';
import { GraduationCap, Monitor, Zap, Network, CheckCircle, Calendar, ArrowRight, Award, Users, ShieldCheck, BadgeCheck, FileCheck, MapPin, Clock, UserCheck, X } from 'lucide-react';
import { useAppContext } from '../context/AppProvider';
import { useSessions } from '../hooks/useSessions';
import { apiClient } from '../../infrastructure/api/ApiClient';
import Swal from 'sweetalert2';

const Formation: React.FC = () => {
  const { navigate } = useAppContext();
  const { sessions } = useSessions();

  const modules = [
    {
      id: 'fiber',
      title: 'Expertise Fibre Optique',
      icon: <Network size={32} />,
      desc: 'Maitrisez le raccordement, la soudure et les mesures OTDR sur le terrain.',
      items: ['Raccordement & Soudure', 'Mesures & Recettes OTDR', 'Maintenance preventive']
    },
    {
      id: 'it',
      title: 'Bureautique & IT',
      icon: <Monitor size={32} />,
      desc: 'Formations certifiantes sur les outils Windows, Office et administration reseaux.',
      items: ['Pack Office (Excel, Word)', 'Windows Server', 'Administration reseaux']
    },
    {
      id: 'network',
      title: 'Reseaux & Telecommunications',
      icon: <Network size={32} />,
      desc: 'Administration reseaux, configuration switches et routeurs, securite reseau.',
      items: ['Configuration Switches & Routeurs', 'Securite reseau (Firewall)', 'Administration VLAN / QoS']
    },
    {
      id: 'solar',
      title: 'Energie Solaire',
      icon: <Zap size={32} />,
      desc: 'Dimensionnement et installation de systemes photovoltaiques pour sites telecom.',
      items: ['Dimensionnement kits', 'Installation & Securite', 'Maintenance batteries']
    }
  ];

  const formRef = useRef<HTMLDivElement>(null);
  const sessionsRef = useRef<HTMLDivElement>(null);
  const [regSending, setRegSending] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);
  const [regForm, setRegForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    formation: modules[0].title,
    message: ''
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showRegModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showRegModal]);

  const handleSessionClick = (session: { places: number; module: string; subject: string; date: string; duration: string }) => {
    if (session.places === 0) return;
    const matchingModule = modules.find(m => m.title === session.module);
    setRegForm(prev => ({
      ...prev,
      formation: matchingModule?.title || prev.formation,
      message: `Inscription session "${session.subject}" du ${session.date} (${session.duration}).`
    }));
    setShowRegModal(true);
  };

  const handleRegSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegSending(true);
    try {
      await apiClient.post('/contact', {
        name: regForm.fullName,
        email: regForm.email,
        phone: regForm.phone,
        subject: `Inscription Formation: ${regForm.formation}`,
        message: regForm.message || `Demande d'inscription a la formation: ${regForm.formation}`,
      });
      setRegForm({ fullName: '', email: '', phone: '', formation: modules[0].title, message: '' });
      setShowRegModal(false);
      Swal.fire({
        icon: 'success',
        title: 'Demande envoyee !',
        text: 'Notre equipe pedagogique reviendra vers vous tres rapidement.',
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
      setRegSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-surface">
      {/* Hero Section avec Image Professionnelle Ivoirienne */}
      <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 lg:pb-32 px-6 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
        <div className="max-w-[1440px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-[10px] font-extrabold uppercase tracking-widest">
              BOS Training Academy
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-8xl font-black text-white font-display tracking-tighter leading-none">
              Propulsez votre <br/> <span className="text-primary italic">Carriere.</span>
            </h1>
            <p className="text-gray-400 text-xl font-medium max-w-lg leading-relaxed">
              Des formations certifiantes dispensees par des experts terrain a Abidjan pour maitriser les technologies de demain.
            </p>
            <div className="flex flex-wrap gap-5">
              <button onClick={() => sessionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="h-14 px-10 rounded-2xl bg-primary text-white font-extrabold uppercase tracking-widest text-xs shadow-2xl shadow-primary/30 hover:bg-primary-dark transition-all">
                Voir le calendrier
              </button>
              <button onClick={() => { setRegForm(prev => ({ ...prev, message: 'Je souhaite recevoir la brochure PDF des formations BOS Training Academy.' })); setShowRegModal(true); }} className="h-14 px-10 rounded-2xl bg-white/10 text-white border border-white/20 font-extrabold uppercase tracking-widest text-xs hover:bg-white/20 transition-all">
                Brochure PDF
              </button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="rounded-[60px] overflow-hidden border-[16px] border-white/5 shadow-2xl transform rotate-3">
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200" alt="Formation Abidjan" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24 lg:py-32 space-y-16 sm:space-y-24 lg:space-y-32">
        {/* Domaines de Formation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {modules.map((m) => (
            <div key={m.id} className="bg-white p-12 rounded-[52px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group">
              <div className="size-20 rounded-3xl bg-primary/5 text-primary flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                {m.icon}
              </div>
              <h3 className="text-xl font-black text-gray-900 font-display mb-4 leading-tight">{m.title}</h3>
              <p className="text-gray-500 font-medium mb-8 leading-relaxed">{m.desc}</p>
              <ul className="space-y-4 mb-10">
                {m.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle size={18} className="text-primary" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-5 rounded-2xl bg-gray-50 text-gray-900 font-extrabold uppercase tracking-widest text-[10px] hover:bg-primary hover:text-white transition-all">
                Details du programme
              </button>
            </div>
          ))}
        </div>

        {/* Calendar / Prochaines sessions */}
        <div className="bg-[#f0f9f1] py-12 sm:py-16 lg:py-20" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', width: '100vw' }}>
        <div ref={sessionsRef} className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative overflow-hidden">

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-extrabold uppercase tracking-[0.3em]">
                <Calendar size={14} /> Planning 2026
              </div>
              <h2 className="text-4xl lg:text-5xl font-black font-display tracking-tight leading-[0.9] text-gray-900">Prochaines <span className="text-primary italic">Sessions.</span></h2>
              <p className="text-gray-500 text-base leading-relaxed">Inscrivez vos equipes des maintenant pour nos sessions en presentiel a Abidjan Zone 4.</p>

              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-white border border-gray-200 flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><Award size={18} /></div>
                  <div><p className="text-xs font-extrabold text-gray-900">Certifications Agreees</p><p className="text-[10px] text-gray-400 font-medium">Reconnues par les operateurs</p></div>
                </div>
                <div className="p-6 rounded-2xl bg-white border border-gray-200 flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><MapPin size={18} /></div>
                  <div><p className="text-xs font-extrabold text-gray-900">Abidjan Zone 4</p><p className="text-[10px] text-gray-400 font-medium">Centre de formation equipe</p></div>
                </div>
                <div className="p-6 rounded-2xl bg-white border border-gray-200 flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><UserCheck size={18} /></div>
                  <div><p className="text-xs font-extrabold text-gray-900">Groupes restreints</p><p className="text-[10px] text-gray-400 font-medium">8 a 12 participants max</p></div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-3">
              {/* Header */}
              <div className="hidden lg:grid grid-cols-12 gap-4 px-6 pb-3 border-b border-gray-200">
                <span className="col-span-2 text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">Date</span>
                <span className="col-span-4 text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">Formation</span>
                <span className="col-span-2 text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">Duree</span>
                <span className="col-span-2 text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">Places</span>
                <span className="col-span-2 text-[9px] font-extrabold text-gray-400 uppercase tracking-widest text-right">Action</span>
              </div>

              {sessions.map((session) => {
                const isFull = session.places === 0;
                const fillPercent = ((session.total - session.places) / session.total) * 100;
                const dateParts = session.date.split(' ');
                return (
                  <div
                    key={session.id}
                    onClick={() => handleSessionClick(session)}
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-4 items-center p-5 rounded-2xl border transition-all duration-300 ${isFull ? 'bg-gray-50 border-gray-100 opacity-50 cursor-not-allowed' : 'bg-white border-gray-200 hover:bg-primary/5 hover:border-primary/30 cursor-pointer group'}`}
                  >
                    {/* Date */}
                    <div className="lg:col-span-2 flex items-center gap-3">
                      <div className="text-center">
                        <span className="text-xl font-black text-primary font-display leading-none">{dateParts[0]}</span>
                        <span className="block text-[9px] font-extrabold uppercase tracking-widest text-gray-400">{dateParts[1]}</span>
                      </div>
                    </div>

                    {/* Subject + Module */}
                    <div className="lg:col-span-4">
                      <h4 className="text-sm font-extrabold leading-tight text-gray-900">{session.subject}</h4>
                      <p className="text-[10px] font-bold text-gray-400 mt-0.5">{session.module}</p>
                    </div>

                    {/* Duration */}
                    <div className="lg:col-span-2 flex items-center gap-2">
                      <Clock size={12} className="text-gray-400" />
                      <span className="text-xs font-bold text-gray-500">{session.duration}</span>
                    </div>

                    {/* Places */}
                    <div className="lg:col-span-2">
                      {isFull ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-extrabold uppercase tracking-widest">Complet</span>
                      ) : (
                        <div className="space-y-1.5">
                          <span className="text-xs font-extrabold text-primary">{session.places} places</span>
                          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${fillPercent}%` }}></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="lg:col-span-2 flex justify-end">
                      {isFull ? (
                        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Liste d'attente</span>
                      ) : (
                        <span className="flex items-center gap-2 text-[10px] font-extrabold text-primary uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                          S'inscrire <ArrowRight size={14} />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Summary */}
              <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-200">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{sessions.filter(s => s.places > 0).length} sessions ouvertes sur {sessions.length}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{sessions.reduce((sum, s) => sum + s.places, 0)} places disponibles au total</p>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Certifications Delivrees */}
        <section className="bg-gray-100 py-24 relative overflow-hidden !mt-0" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', width: '100vw' }}>
          <div className="space-y-16 max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-extrabold uppercase tracking-[0.3em]">
                <ShieldCheck size={14} /> Reconnu par les operateurs
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-6xl font-black font-display tracking-tight text-gray-900">Certifications <span className="italic text-primary">Delivrees.</span></h2>
              <p className="text-gray-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                Nos formations delivrent des certifications reconnues par les operateurs et conformes aux normes internationales.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Award size={28} />, title: "Certificat d'Aptitude Constructeur", desc: 'Certification delivree directement par les constructeurs partenaires (EXFO, AFL, Corning).' },
                { icon: <BadgeCheck size={28} />, title: 'Reconnaissance Operateurs', desc: 'Certificats reconnus par les operateurs majeurs de la sous-region (Orange, MTN, Moov).' },
                { icon: <ShieldCheck size={28} />, title: 'Conformite ISO', desc: 'Programmes conformes aux standards ISO 9001 et aux exigences de qualite internationales.' },
                { icon: <FileCheck size={28} />, title: 'Attestation de Competences', desc: 'Attestation individuelle detaillant les competences acquises et les modules valides.' },
              ].map((cert, i) => (
                <div key={i} className="group bg-white p-8 rounded-[32px] border border-gray-200 shadow-sm hover:shadow-premium hover:border-primary/20 transition-all duration-500 text-center space-y-5 hover:-translate-y-2" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="size-16 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-white group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
                    {cert.icon}
                  </div>
                  <h4 className="text-base font-black text-gray-900 font-display leading-tight">{cert.title}</h4>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed">{cert.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials with Local Faces */}
        <section className="py-20 text-center space-y-20">
          <h2 className="text-2xl sm:text-3xl lg:text-6xl font-black font-display tracking-tight text-gray-900">Ils nous font <span className="text-primary italic">confiance.</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="bg-white p-12 rounded-[52px] shadow-sm border border-gray-100 flex flex-col items-center gap-8">
                <div className="size-24 rounded-full overflow-hidden border-4 border-primary/10">
                  <img src={`https://i.pravatar.cc/150?u=student${i}`} alt="Etudiant" className="w-full h-full object-cover" />
                </div>
                <p className="text-lg font-medium text-gray-600 italic">"La formation fibre de BOS-CI a radicalement change ma productivite sur le terrain. L'equipement est de pointe."</p>
                <div>
                  <p className="font-extrabold text-gray-900">M. Kouassi</p>
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Ingenieur Reseaux, Abidjan</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Registration Form */}
        <section ref={formRef} className="space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-6xl font-black font-display tracking-tight text-gray-900">Inscrivez-vous a une <span className="text-primary italic">formation.</span></h2>
            <p className="text-gray-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Remplissez le formulaire ci-dessous et notre equipe vous recontactera dans les meilleurs delais.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-[28px] sm:rounded-[40px] lg:rounded-[52px] shadow-premium border border-gray-100 p-6 sm:p-10 lg:p-20">
            <form onSubmit={handleRegSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-5">
                  <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-[0.2em] ml-2">Nom Complet</label>
                  <input
                    required
                    className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all outline-none font-bold text-gray-900"
                    placeholder="Ex: Jean Kouame"
                    value={regForm.fullName}
                    onChange={e => setRegForm({...regForm, fullName: e.target.value})}
                  />
                </div>
                <div className="space-y-5">
                  <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-[0.2em] ml-2">Email</label>
                  <input
                    required
                    type="email"
                    className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all outline-none font-bold text-gray-900"
                    placeholder="jean@societe.ci"
                    value={regForm.email}
                    onChange={e => setRegForm({...regForm, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-5">
                  <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-[0.2em] ml-2">Telephone</label>
                  <input
                    required
                    type="tel"
                    pattern="\+?[0-9\s]{10,16}"
                    className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all outline-none font-bold text-gray-900"
                    placeholder="+225 00 00 00 00 00"
                    value={regForm.phone}
                    onChange={e => setRegForm({...regForm, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-5">
                  <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-[0.2em] ml-2">Formation Souhaitee</label>
                  <select
                    className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all outline-none font-bold text-gray-900 cursor-pointer appearance-none"
                    value={regForm.formation}
                    onChange={e => setRegForm({...regForm, formation: e.target.value})}
                  >
                    {modules.map(m => (
                      <option key={m.id} value={m.title}>{m.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-5">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-[0.2em] ml-2">Message</label>
                <textarea
                  maxLength={3000}
                  className="w-full h-32 p-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all outline-none font-bold text-gray-900 resize-none"
                  placeholder="Precisions sur votre demande (dates souhaitees, nombre de participants...)"
                  value={regForm.message}
                  onChange={e => setRegForm({...regForm, message: e.target.value})}
                />
              </div>

              <button
                type="submit"
                disabled={regSending}
                className="w-full h-14 bg-primary text-white rounded-2xl font-extrabold uppercase tracking-[0.2em] text-xs shadow-glow hover:bg-primary-dark transition-all flex items-center justify-center gap-4 group active:scale-95 disabled:opacity-60"
              >
                {regSending ? (<><div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Envoi en cours...</>) : (<>Envoyer ma demande <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-300" /></>)}
              </button>
            </form>
          </div>
        </section>
      </div>

      {/* Registration Modal */}
      {showRegModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6" onClick={() => setShowRegModal(false)}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-md animate-fade-in"></div>

          {/* Modal Content */}
          <div
            className="relative bg-white w-full max-w-2xl rounded-[28px] sm:rounded-[40px] lg:rounded-[48px] shadow-2xl p-6 sm:p-10 lg:p-14 animate-slide-up max-h-[90vh] overflow-y-auto no-scrollbar border border-slate-100"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowRegModal(false)}
              className="absolute top-8 right-8 size-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all border border-slate-100"
            >
              <X size={22} />
            </button>

            {/* Header */}
            <div className="mb-10 pr-14 space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-extrabold uppercase tracking-[0.3em]">
                <Calendar size={12} /> Inscription
              </div>
              <h3 className="text-2xl lg:text-3xl font-black font-display text-gray-900 tracking-tight leading-tight">
                Inscrivez-vous a une <span className="text-primary italic">formation.</span>
              </h3>
              <p className="text-sm text-slate-400 font-medium">Notre equipe vous recontactera dans les meilleurs delais.</p>
            </div>

            {/* Session info badge */}
            {regForm.message && (
              <div className="mb-8 p-5 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4">
                <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle size={18} />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-1">Session selectionnee</p>
                  <p className="text-sm font-medium text-slate-500">{regForm.message}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleRegSubmit} className="space-y-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.2em] ml-2">Nom Complet</label>
                  <input
                    required
                    className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all outline-none font-bold text-gray-900"
                    placeholder="Ex: Jean Kouame"
                    value={regForm.fullName}
                    onChange={e => setRegForm({...regForm, fullName: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.2em] ml-2">Email</label>
                  <input
                    required
                    type="email"
                    className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all outline-none font-bold text-gray-900"
                    placeholder="jean@societe.ci"
                    value={regForm.email}
                    onChange={e => setRegForm({...regForm, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.2em] ml-2">Telephone</label>
                  <input
                    required
                    type="tel"
                    pattern="\+?[0-9\s]{10,16}"
                    className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all outline-none font-bold text-gray-900"
                    placeholder="+225 00 00 00 00 00"
                    value={regForm.phone}
                    onChange={e => setRegForm({...regForm, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.2em] ml-2">Formation</label>
                  <select
                    className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all outline-none font-bold text-gray-900 cursor-pointer appearance-none"
                    value={regForm.formation}
                    onChange={e => setRegForm({...regForm, formation: e.target.value})}
                  >
                    {modules.map(m => (
                      <option key={m.id} value={m.title}>{m.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.2em] ml-2">Message</label>
                <textarea
                  maxLength={3000}
                  className="w-full h-28 p-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all outline-none font-bold text-gray-900 resize-none"
                  placeholder="Precisions sur votre demande..."
                  value={regForm.message}
                  onChange={e => setRegForm({...regForm, message: e.target.value})}
                />
              </div>

              <button
                type="submit"
                disabled={regSending}
                className="w-full h-14 bg-primary text-white rounded-2xl font-extrabold uppercase tracking-[0.2em] text-xs shadow-glow hover:bg-primary-dark transition-all flex items-center justify-center gap-4 group active:scale-95 disabled:opacity-60"
              >
                {regSending ? (<><div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Envoi en cours...</>) : (<>Confirmer l'inscription <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" /></>)}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Formation;
