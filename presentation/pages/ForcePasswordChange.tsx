
import React, { useState } from 'react';
import { ShieldCheck, Lock, KeyRound, ChevronLeft } from 'lucide-react';
import { useAppContext } from '../context/AppProvider';
import Swal from 'sweetalert2';

const ForcePasswordChange: React.FC = () => {
  const { changePassword, currentUser, setCurrentUser, navigate, logout } = useAppContext();

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      Swal.fire({ icon: 'error', title: 'Erreur', text: 'Les mots de passe ne correspondent pas.', customClass: { popup: 'rounded-3xl' } });
      return;
    }
    if (password.length < 6) {
      Swal.fire({ icon: 'error', title: 'Erreur', text: 'Le mot de passe doit contenir au moins 6 caractères.', customClass: { popup: 'rounded-3xl' } });
      return;
    }
    setLoading(true);
    try {
      await changePassword(null, password, passwordConfirmation);
      if (currentUser) {
        const updated = { ...currentUser, mustChangePassword: false };
        setCurrentUser(updated);
        localStorage.setItem('bos_session_user', JSON.stringify(updated));
      }
      await Swal.fire({ icon: 'success', title: 'Mot de passe modifié', text: 'Vous pouvez maintenant accéder à votre espace.', customClass: { popup: 'rounded-3xl' } });
      navigate('admin');
    } catch {
      Swal.fire({ icon: 'error', title: 'Erreur', text: 'Une erreur est survenue. Veuillez réessayer.', customClass: { popup: 'rounded-3xl' } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[55%] bg-gradient-to-br from-brand-dark via-[#0d1a0d] to-brand-dark relative overflow-hidden items-end p-16">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-20 size-[500px] rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute bottom-40 left-20 size-[300px] rounded-full bg-primary/8 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02]">
            <KeyRound size={800} className="text-white" />
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
            <h1 className="text-6xl xl:text-7xl font-black text-white font-display tracking-tighter leading-[0.9]">
              Sécurisez <br />
              <span className="text-primary italic">votre compte.</span>
            </h1>
            <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-md">
              Pour votre sécurité, veuillez définir un nouveau mot de passe personnel.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-8 border-t border-white/5">
            <ShieldCheck size={16} className="text-primary" />
            <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Première connexion — changement obligatoire</span>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 bg-white flex items-center justify-center p-8 lg:p-16 relative">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #2E7D32 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}></div>

        <div className="w-full max-w-[440px] relative z-10 animate-fade-in">
          <button
            onClick={() => { logout(); navigate('login'); }}
            className="flex items-center gap-2 text-slate-400 hover:text-primary font-bold text-xs mb-12 transition-colors group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Se déconnecter
          </button>

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-4 mb-10">
            <div className="size-14 bg-primary text-white rounded-[20px] flex items-center justify-center shadow-glow">
              <span className="material-symbols-outlined font-extrabold !text-2xl">settings_input_component</span>
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tighter leading-none">BOS-CI</h2>
              <p className="text-[9px] font-extrabold text-primary uppercase tracking-[0.3em] mt-1">Sécurité</p>
            </div>
          </div>

          <div className="space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-[9px] font-extrabold uppercase tracking-[0.3em]">
              <KeyRound size={12} /> Changement requis
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 font-display tracking-tight">Nouveau mot de passe</h2>
            <p className="text-slate-400 font-medium text-lg">Choisissez un mot de passe sécurisé pour continuer</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.2em] ml-1">Nouveau mot de passe</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                  <input
                    type="password"
                    required
                    minLength={6}
                    className="w-full h-16 pl-14 pr-6 rounded-2xl bg-slate-50/80 border-2 border-slate-100 focus:border-primary/30 focus:bg-white transition-all outline-none font-bold text-gray-900 placeholder:text-slate-300"
                    placeholder="Minimum 6 caractères"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.2em] ml-1">Confirmer le mot de passe</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                  <input
                    type="password"
                    required
                    minLength={6}
                    className="w-full h-16 pl-14 pr-6 rounded-2xl bg-slate-50/80 border-2 border-slate-100 focus:border-primary/30 focus:bg-white transition-all outline-none font-bold text-gray-900 placeholder:text-slate-300"
                    placeholder="Répétez le mot de passe"
                    value={passwordConfirmation}
                    onChange={e => setPasswordConfirmation(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-16 bg-primary text-white rounded-2xl font-extrabold uppercase tracking-widest text-[11px] shadow-xl shadow-primary/20 hover:bg-primary-dark hover:shadow-2xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-4 active:scale-[0.97] disabled:opacity-60"
            >
              {loading ? (
                <><div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Enregistrement...</>
              ) : (
                <>Valider le nouveau mot de passe</>
              )}
            </button>
          </form>

          <p className="text-center mt-10 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
            BOS-CI &copy; 2026 &mdash; Tous droits réservés
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForcePasswordChange;
