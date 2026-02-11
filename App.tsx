
import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowUp } from 'lucide-react';
import { AppProvider, useAppContext } from './presentation/context/AppProvider';
import Navbar from './presentation/components/Navbar';
import Footer from './presentation/components/Footer';
import Notification from './presentation/components/Notification';
import Home from './presentation/pages/Home';
import Catalog from './presentation/pages/Catalog';
import QuoteForm from './presentation/pages/QuoteForm';
import ProductDetail from './presentation/pages/ProductDetail';
import Support from './presentation/pages/Support';
import About from './presentation/pages/About';
import SolarConfigurator from './presentation/pages/SolarConfigurator';
import Expertise from './presentation/pages/Expertise';
import Formation from './presentation/pages/Formation';
import Contact from './presentation/pages/Contact';
import Login from './presentation/pages/Login';
import ForcePasswordChange from './presentation/pages/ForcePasswordChange';
import AdminDashboard from './presentation/pages/admin/AdminDashboard';

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`size-14 rounded-full bg-primary text-white flex items-center justify-center shadow-glow hover:bg-primary-dark hover:-translate-y-1 transition-all duration-500 active:scale-90 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      title="Remonter en haut"
    >
      <ArrowUp size={22} />
    </button>
  );
};

const Router: React.FC = () => {
  const { currentPage, currentUser, navigate } = useAppContext();

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home />;
      case 'catalog': return <Catalog />;
      case 'quote': return <QuoteForm />;
      case 'product': return <ProductDetail />;
      case 'support': return <Support />;
      case 'about': return <About />;
      case 'solar': return <SolarConfigurator />;
      case 'expertise': return <Expertise />;
      case 'formation': return <Formation />;
      case 'contact': return <Contact />;
      case 'login': return <Login />;
      case 'admin': return currentUser ? (currentUser.mustChangePassword ? <ForcePasswordChange /> : <AdminDashboard />) : <Login />;
      default: return <Home />;
    }
  };

  const isAdminView = currentPage === 'admin' || currentPage === 'login';

  return (
    <div className="flex flex-col min-h-screen bg-brand-surface font-sans selection:bg-primary/20 selection:text-primary-dark">
      {!isAdminView && <Navbar />}

      <main className="flex-1">
        {renderPage()}
      </main>

      {!isAdminView && <Footer />}

      <Notification />

      {!isAdminView && (
        <div className="fixed bottom-12 right-12 z-[60] flex flex-col items-end gap-3">
          <ScrollToTop />
          <div className="group relative">
            <a
              href="https://wa.me/2252722230639"
              className="flex items-center justify-center size-20 rounded-[28px] bg-[#25D366] text-white shadow-[0_20px_50px_-10px_rgba(37,211,102,0.4)] transition-all hover:scale-110 active:scale-95 hover:rotate-6"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageSquare size={36} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => (
  <AppProvider>
    <Router />
  </AppProvider>
);

export default App;
