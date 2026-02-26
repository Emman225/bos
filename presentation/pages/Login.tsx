
import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Lock, Mail, Info, Wifi, Server, Zap, ChevronLeft, KeyRound, Hash } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useAppContext } from '../context/AppProvider';
import { apiClient } from '../../infrastructure/api/ApiClient';
import Swal from 'sweetalert2';

const Login: React.FC = () => {
  const { login } = useAuth();
  const { navigate } = useAppContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Forgot password state
  const [forgotStep, setForgotStep] = useState<'none' | 'email' | 'code'>('none');
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (!success) {
      Swal.fire({
        icon: 'error',
        title: 'Echec de connexion',
        text: 'Identifiants invalides. Veuillez reessayer.',
        customClass: { popup: 'rounded-3xl' }
      });
    }
  };

  const handleForgotEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    try {
      await apiClient.post('/auth/forgot-password', { email: forgotEmail });
      Swal.fire({ icon: 'success', title: 'Code envoyé', text: 'Vérifiez votre boîte email.', customClass: { popup: 'rounded-3xl' } });
      setForgotStep('code');
    } catch {
      Swal.fire({ icon: 'error', title: 'Erreur', text: 'Aucun compte associé à cette adresse email.', customClass: { popup: 'rounded-3xl' } });
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== newPasswordConfirm) {
      Swal.fire({ icon: 'error', title: 'Erreur', text: 'Les mots de passe ne correspondent pas.', customClass: { popup: 'rounded-3xl' } });
      return;
    }
    setForgotLoading(true);
    try {
      await apiClient.post('/auth/reset-password', { email: forgotEmail, code: resetCode, password: newPassword, password_confirmation: newPasswordConfirm });
      await Swal.fire({ icon: 'success', title: 'Mot de passe réinitialisé', text: 'Vous pouvez maintenant vous connecter.', customClass: { popup: 'rounded-3xl' } });
      setForgotStep('none');
      setForgotEmail('');
      setResetCode('');
      setNewPassword('');
      setNewPasswordConfirm('');
    } catch {
      Swal.fire({ icon: 'error', title: 'Erreur', text: 'Code invalide ou expiré.', customClass: { popup: 'rounded-3xl' } });
    } finally {
      setForgotLoading(false);
    }
  };

  const backToLogin = () => {
    setForgotStep('none');
    setForgotEmail('');
    setResetCode('');
    setNewPassword('');
    setNewPasswordConfirm('');
  };

  const features = [
    { icon: <Server size={20} />, text: 'Gestion catalogue en temps réel' },
    { icon: <Wifi size={20} />, text: 'Suivi des demandes de devis' },
    { icon: <Zap size={20} />, text: 'Analytics et rapports avancés' },
  ];

  const inputClass = "w-full h-16 pl-14 pr-6 rounded-2xl bg-slate-50/80 border-2 border-slate-100 focus:border-primary/30 focus:bg-white transition-all outline-none font-bold text-gray-900 placeholder:text-slate-300";
  const labelClass = "text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.2em] ml-1";
  const btnClass = "w-full h-16 bg-primary text-white rounded-2xl font-extrabold uppercase tracking-widest text-[11px] shadow-xl shadow-primary/20 hover:bg-primary-dark hover:shadow-2xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-4 active:scale-[0.97] disabled:opacity-60";

  const renderRightPanel = () => {
    if (forgotStep === 'email') {
      return (
        <>
          <button onClick={backToLogin} className="flex items-center gap-2 text-slate-400 hover:text-primary font-bold text-xs mb-12 transition-colors group">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Retour à la connexion
          </button>
          <div className="space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-[9px] font-extrabold uppercase tracking-[0.3em]">
              <KeyRound size={12} /> Récupération
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-gray-900 font-display tracking-tight">Mot de passe oublié</h2>
            <p className="text-slate-400 font-medium text-lg">Entrez votre email pour recevoir un code de réinitialisation</p>
          </div>
          <form onSubmit={handleForgotEmail} className="space-y-6">
            <div className="space-y-2">
              <label className={labelClass}>Adresse email</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                <input type="email" required className={inputClass} placeholder="votre@email.com" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} />
              </div>
            </div>
            <button type="submit" disabled={forgotLoading} className={btnClass}>
              {forgotLoading ? (
                <><div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Envoi...</>
              ) : (
                <>Envoyer le code <ArrowRight size={18} /></>
              )}
            </button>
          </form>
        </>
      );
    }

    if (forgotStep === 'code') {
      return (
        <>
          <button onClick={backToLogin} className="flex items-center gap-2 text-slate-400 hover:text-primary font-bold text-xs mb-12 transition-colors group">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Retour à la connexion
          </button>
          <div className="space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-surface border border-primary/10 text-primary text-[9px] font-extrabold uppercase tracking-[0.3em]">
              <Hash size={12} /> Vérification
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-gray-900 font-display tracking-tight">Réinitialisation</h2>
            <p className="text-slate-400 font-medium text-lg">Entrez le code reçu par email et votre nouveau mot de passe</p>
          </div>
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <label className={labelClass}>Code de vérification</label>
                <div className="relative group">
                  <Hash className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                  <input type="text" required maxLength={6} minLength={6} className={inputClass} placeholder="000000" value={resetCode} onChange={e => setResetCode(e.target.value.replace(/\D/g, '').slice(0, 6))} />
                </div>
              </div>
              <div className="space-y-2">
                <label className={labelClass}>Nouveau mot de passe</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                  <input type="password" required minLength={6} className={inputClass} placeholder="Minimum 6 caractères" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <label className={labelClass}>Confirmer le mot de passe</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                  <input type="password" required minLength={6} className={inputClass} placeholder="Répétez le mot de passe" value={newPasswordConfirm} onChange={e => setNewPasswordConfirm(e.target.value)} />
                </div>
              </div>
            </div>
            <button type="submit" disabled={forgotLoading} className={btnClass}>
              {forgotLoading ? (
                <><div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Réinitialisation...</>
              ) : (
                <>Réinitialiser le mot de passe</>
              )}
            </button>
          </form>
        </>
      );
    }

    // Default: login form
    return (
      <>
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-4 mb-10">
          <div className="size-14 bg-primary text-white rounded-[20px] flex items-center justify-center shadow-glow">
            <span className="material-symbols-outlined font-extrabold !text-2xl">settings_input_component</span>
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tighter leading-none">BOS-CI</h2>
            <p className="text-[9px] font-extrabold text-primary uppercase tracking-[0.3em] mt-1">Console Admin</p>
          </div>
        </div>
        <div className="space-y-3 mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-gray-900 font-display tracking-tight">Connexion</h2>
          <p className="text-slate-400 font-medium text-lg">Accédez à votre tableau de bord</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="login-email" className={labelClass}>Adresse email</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                <input id="login-email" type="email" required className={inputClass} placeholder="admin@bos-ci.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="login-password" className={labelClass}>Mot de passe</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                <input id="login-password" type="password" required minLength={4} className={inputClass} placeholder="Votre mot de passe" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
            </div>
          </div>
          <button type="submit" disabled={loading} className={btnClass}>
            {loading ? (
              <><div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Connexion...</>
            ) : (
              <>Se connecter <ArrowRight size={18} /></>
            )}
          </button>
        </form>

        {/* Forgot password link */}
        <button
          onClick={() => setForgotStep('email')}
          className="w-full text-center mt-5 text-sm font-bold text-slate-400 hover:text-primary transition-colors"
        >
          Mot de passe oublié ?
        </button>

      </>
    );
  };

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden flex">
      {/* Left panel - Visual brand side */}
      <div className="hidden lg:flex lg:w-[55%] bg-gradient-to-br from-brand-dark via-[#0d1a0d] to-brand-dark relative overflow-hidden items-end p-16">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-20 size-[500px] rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute bottom-40 left-20 size-[300px] rounded-full bg-primary/8 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02]">
            <ShieldCheck size={800} className="text-white" />
          </div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(46,125,50,0.08) 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>
        <div className="relative z-10 space-y-12 max-w-xl">
          <div className="flex items-center gap-5">
            <div className="size-16 bg-primary text-white rounded-[22px] flex items-center justify-center shadow-glow border border-white/10">
              <span className="material-symbols-outlined font-extrabold !text-3xl">settings_input_component</span>
            </div>
            <div>
              <h2 className="text-3xl font-black text-white tracking-tighter leading-none">BOS-CI</h2>
              <p className="text-[9px] font-extrabold text-primary uppercase tracking-[0.4em] mt-1">Solutions Industrielles</p>
            </div>
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl xl:text-7xl font-black text-white font-display tracking-tighter leading-[0.9]">
              Console <br />
              <span className="text-primary italic">Admin.</span>
            </h1>
            <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-md">
              Pilotez votre activité depuis un tableau de bord unifié et sécurisé.
            </p>
          </div>
          <div className="space-y-4 pt-4">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-5 p-5 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
                <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  {f.icon}
                </div>
                <span className="text-sm font-bold text-slate-300">{f.text}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 pt-8 border-t border-white/5">
            <ShieldCheck size={16} className="text-primary" />
            <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Connexion sécurisée SSL/TLS 256-bit</span>
          </div>
        </div>
      </div>

      {/* Right panel - Form side */}
      <div className="flex-1 bg-gray-100 flex items-center justify-center p-4 sm:p-8 lg:p-16 relative">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #2E7D32 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}></div>
        <div className="w-full max-w-[440px] relative z-10 animate-fade-in space-y-4">
          <button onClick={() => navigate('home')} className="flex items-center gap-2 text-slate-400 hover:text-primary font-bold text-xs transition-colors group">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Retour au site
          </button>
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm border border-gray-200">
          {renderRightPanel()}
        </div>
          <p className="text-center mt-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
            BOS-CI &copy; 2026 &mdash; Tous droits réservés
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
