import React from 'react';
import { Phone, Mail, MapPin, Globe, Linkedin, Facebook } from 'lucide-react';
import { useAppContext } from '../context/AppProvider';

const Footer: React.FC = () => {
  const { navigate } = useAppContext();

  return (
    <footer className="bg-[#1a1a1a] text-gray-300 py-16 border-t border-white/5">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 text-primary">
                <span className="material-symbols-outlined !text-4xl">settings_input_component</span>
              </div>
              <h2 className="text-white text-xl font-extrabold">BOS-CI</h2>
            </div>
            <p className="text-xs font-bold text-primary uppercase tracking-widest">Business Opportunities Services</p>
            <p className="text-sm leading-relaxed text-gray-400">
              Distributeur de référence en équipements fibre optique, télécom, test & mesure, calibrage, formation et énergie solaire. BOS-CI accompagne la transformation numérique de la Côte d'Ivoire et de l'Afrique de l'Ouest.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"><Globe size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"><Linkedin size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"><Facebook size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-white">Liens Rapides</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              <li><a className="hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('home')}>Accueil</a></li>
              <li><a className="hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('catalog')}>Catalogue</a></li>
              <li><a className="hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('about')}>À Propos</a></li>
              <li><a className="hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('quote')}>Demander un Devis</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-white">Services</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              <li><a className="hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('formation')}>Formation</a></li>
              <li><a className="hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('expertise')}>SAV & Calibrage</a></li>
              <li><a className="hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('contact')}>Contact</a></li>
              <li><a className="hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('support')}>Support Technique</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-white">Contact</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              <li className="flex gap-3">
                <MapPin className="text-primary shrink-0" size={18} />
                <span>Zone 4, Boulevard de Marseille, Abidjan, Côte d'Ivoire</span>
              </li>
              <li className="flex gap-3">
                <Phone className="text-primary shrink-0" size={18} />
                <span>+225 27 22 23 06 39</span>
              </li>
              <li className="flex gap-3">
                <Mail className="text-primary shrink-0" size={18} />
                <span>info@bos-ci.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500">
          <p>&copy; 2026 BOS-CI - Business Opportunities Services. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a className="hover:text-white transition-colors" href="#">Mentions Légales</a>
            <a className="hover:text-white transition-colors" href="#">Politique de Confidentialité</a>
            <a className="hover:text-white transition-colors" href="#">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
