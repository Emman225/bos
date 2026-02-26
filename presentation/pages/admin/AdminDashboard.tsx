import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Product } from '../../../domain/entities/Product';
import { Category } from '../../../domain/entities/Category';
import { User } from '../../../domain/entities/User';
import { QuoteRequest } from '../../../domain/entities/QuoteRequest';
import { Session } from '../../../domain/entities/Session';
import { useAppContext } from '../../context/AppProvider';
import { apiClient, storageUrl } from '../../../infrastructure/api/ApiClient';
import { formatPrice } from '../../utils/formatPrice';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { useQuote } from '../../hooks/useQuote';
import { useUsers } from '../../hooks/useUsers';
import { useAuth } from '../../hooks/useAuth';
import { useSessions } from '../../hooks/useSessions';
import DataTable from '../../components/DataTable';
import {
  LayoutDashboard, Package, ListTree, Users,
  ShoppingCart, LogOut, Plus, Trash2, Edit2,
  X, Globe, TrendingUp, Search, UserCheck, Briefcase, Eye,
  User as UserIcon, Bell, Mail, Phone, MessageSquare,
  Download, FileSpreadsheet, Printer, ChevronLeft, ChevronRight, Filter,
  Settings, ImagePlus, ImageIcon, Calendar, Upload, Link, GraduationCap
} from 'lucide-react';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

// --- Admin tab URL routing ---
type AdminTab = 'stats' | 'products' | 'categories' | 'quotes' | 'users' | 'clients' | 'sessions' | 'messages' | 'notifications' | 'configuration';

const TAB_SLUGS: Record<AdminTab, string> = {
  stats: '',
  products: 'produits',
  categories: 'rayons',
  quotes: 'devis',
  sessions: 'sessions',
  clients: 'clients',
  users: 'equipe',
  messages: 'messages',
  notifications: 'notifications',
  configuration: 'configuration',
};

const SLUG_TO_TAB: Record<string, AdminTab> = Object.fromEntries(
  Object.entries(TAB_SLUGS).map(([tab, slug]) => [slug, tab as AdminTab])
) as Record<string, AdminTab>;

const TAB_TITLES: Record<AdminTab, string> = {
  stats: 'Administration | BOS-CI',
  products: 'Produits | Admin BOS-CI',
  categories: 'Rayons | Admin BOS-CI',
  quotes: 'Devis | Admin BOS-CI',
  sessions: 'Sessions | Admin BOS-CI',
  clients: 'Clients | Admin BOS-CI',
  users: 'Équipe | Admin BOS-CI',
  messages: 'Messages | Admin BOS-CI',
  notifications: 'Notifications | Admin BOS-CI',
  configuration: 'Configuration | Admin BOS-CI',
};

function getTabFromPath(): AdminTab {
  const path = window.location.pathname;
  if (!path.startsWith('/admin')) return 'stats';
  const slug = path.replace('/admin/', '').replace('/admin', '');
  return SLUG_TO_TAB[slug] || 'stats';
}

const AdminDashboard: React.FC = () => {
  const { products, createProduct, updateProduct, deleteProduct } = useProducts();
  const { categories, createCategory, updateCategory, deleteCategory } = useCategories();
  const { quotes, updateQuoteStatus } = useQuote();
  const { users, createUser, updateUser, deleteUser } = useUsers();
  const { currentUser, logout } = useAuth();
  const { sessions, createSession, updateSession, deleteSession } = useSessions();
  const { updateProfile, uploadAvatar, changePassword, setCurrentUser, settings, updateSettings } = useAppContext();

  const [activeTab, setActiveTab] = useState<AdminTab>(getTabFromPath);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'product' | 'category' | 'user' | 'quote' | 'session' | 'profile'>('product');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [formCategory, setFormCategory] = useState('');
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [mainImageMode, setMainImageMode] = useState<'url' | 'upload'>('url');
  const [uploading, setUploading] = useState(false);
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const [showNotifPopup, setShowNotifPopup] = useState(false);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    apiClient.get<ContactMessage[]>('/contact').then(setContactMessages).catch(() => {});
  }, []);

  // Build a map: email → formation names (from contact messages with "Inscription Formation:" subject)
  const clientFormations = React.useMemo(() => {
    const map = new Map<string, string[]>();
    for (const msg of contactMessages) {
      if (msg.subject.startsWith('Inscription Formation:')) {
        const formation = msg.subject.replace('Inscription Formation:', '').trim();
        const email = msg.email.toLowerCase();
        const existing = map.get(email) || [];
        if (!existing.includes(formation)) existing.push(formation);
        map.set(email, existing);
      }
    }
    return map;
  }, [contactMessages]);

  const markMessageRead = (msgId: number) => {
    apiClient.patch(`/contact/${msgId}/read`, {}).catch(() => {});
    setContactMessages(prev => prev.map(m => m.id === msgId ? { ...m, read: true } : m));
  };

  // Navigate to an admin tab and update the URL
  const navigateTab = (tab: AdminTab) => {
    setActiveTab(tab);
    const slug = TAB_SLUGS[tab];
    const path = slug ? `/admin/${slug}` : '/admin';
    document.title = TAB_TITLES[tab];
    window.history.pushState({ page: 'admin', adminTab: tab }, '', path);
  };

  // Handle browser back/forward within admin
  useEffect(() => {
    const onPopState = () => {
      setActiveTab(getTabFromPath());
      const tab = getTabFromPath();
      document.title = TAB_TITLES[tab];
    };
    window.addEventListener('popstate', onPopState);
    // Set initial title
    document.title = TAB_TITLES[activeTab];
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Build unified notifications from all public forms
  const notifications = React.useMemo(() => {
    const items: { id: string; type: 'message' | 'quote' | 'inscription'; title: string; subtitle: string; date: string; read: boolean }[] = [];

    // Unread contact messages (excluding formation inscriptions)
    for (const msg of contactMessages) {
      const isInscription = msg.subject.startsWith('Inscription Formation:');
      items.push({
        id: `msg-${msg.id}`,
        type: isInscription ? 'inscription' : 'message',
        title: isInscription ? msg.subject.replace('Inscription Formation:', '').trim() : msg.subject,
        subtitle: `${msg.name} — ${msg.email}`,
        date: msg.created_at,
        read: msg.read,
      });
    }

    // Pending quotes
    for (const q of quotes) {
      if (q.status === 'pending') {
        items.push({
          id: `quote-${q.id}`,
          type: 'quote',
          title: `Devis ${q.id}`,
          subtitle: `${q.customer.company || q.customer.name} — ${q.items.length} article(s)`,
          date: q.date,
          read: false,
        });
      }
    }

    // Sort by date descending
    items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return items;
  }, [contactMessages, quotes]);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowUserPopup(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifPopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openModal = (type: typeof modalType, item: any = null) => {
    setModalType(type);
    setEditingItem(item);
    if (type === 'product') {
      setImageUrls(item?.images || []);
      setFormCategory(item?.category || '');
      setMainImageFile(null);
      setMainImagePreview(null);
      setMainImageMode('url');
    }
    if (type === 'profile') {
      setAvatarFile(null);
      setAvatarPreview(null);
    }
    setIsModalOpen(true);
  };

  const uploadProductImage = async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append('image', file);
    const res = await apiClient.postFormData<{ url: string }>('/products/upload-image', fd);
    return res.url;
  };

  const handleGalleryUpload = async (files: FileList) => {
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        const url = await uploadProductImage(file);
        urls.push(url);
      }
      setImageUrls(prev => [...prev, ...urls]);
    } catch {
      await Swal.fire({ icon: 'error', title: 'Erreur', text: 'Erreur lors de l\'upload des images.', customClass: { popup: 'rounded-3xl' } });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      setSaving(true);

      if (modalType === 'product') {
        let mainImage = (formData.get('image') as string || '').trim();
        if (mainImageFile) {
          mainImage = await uploadProductImage(mainImageFile);
        }
        const filteredImages = imageUrls.filter(url => url.trim() !== '');
        const product: Product = {
          id: editingItem?.id || '',
          name: formData.get('name') as string,
          brand: formData.get('brand') as string,
          category: formCategory,
          ref: formData.get('ref') as string,
          image: mainImage || editingItem?.image || 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1000',
          images: filteredImages,
          description: formData.get('description') as string,
          features: (formData.get('features') as string || '').split(',').map(f => f.trim()).filter(Boolean),
          stock: formData.get('stock') === 'on',
          isNew: editingItem?.isNew ?? false,
          price: (formData.get('price') as string)?.trim() ? parseFloat(formData.get('price') as string) : null,
        };
        if (editingItem) await updateProduct(editingItem.id, product);
        else await createProduct(product);
      }

      if (modalType === 'category') {
        const category: Category = {
          id: editingItem?.id || `cat-${Date.now()}`,
          name: formData.get('name') as string,
          description: formData.get('description') as string,
          icon: formData.get('icon') as string || 'package',
          image: formData.get('image') as string || 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200'
        };
        if (editingItem) await updateCategory(editingItem.id, category);
        else await createCategory(category);
      }

      if (modalType === 'user') {
        const user: User = {
          id: editingItem?.id || `user-${Date.now()}`,
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          role: formData.get('role') as 'admin' | 'editor',
        };
        if (editingItem) await updateUser(editingItem.id, user);
        else await createUser(user);
      }

      if (modalType === 'session') {
        const session: Session = {
          id: editingItem?.id || '',
          date: formData.get('date') as string,
          subject: formData.get('subject') as string,
          module: formData.get('module') as string,
          duration: formData.get('duration') as string,
          location: formData.get('location') as string,
          places: parseInt(formData.get('places') as string) || 0,
          total: parseInt(formData.get('total') as string) || 1,
        };
        if (editingItem) await updateSession(editingItem.id, session);
        else await createSession(session);
      }

      if (modalType === 'profile') {
        if (avatarFile) {
          await uploadAvatar(avatarFile);
        }
        await updateProfile({
          name: formData.get('name') as string,
          email: formData.get('email') as string,
        });

        const newPwd = (formData.get('new_password') as string || '').trim();
        const confirmPwd = (formData.get('confirm_password') as string || '').trim();
        if (newPwd) {
          if (newPwd !== confirmPwd) {
            await Swal.fire({ icon: 'error', title: 'Erreur', text: 'Les mots de passe ne correspondent pas.', customClass: { popup: 'rounded-3xl' } });
            setSaving(false);
            return;
          }
          const currentPwd = (formData.get('current_password') as string || '').trim();
          await changePassword(currentPwd || null, newPwd, confirmPwd);
        }
      }

      setIsModalOpen(false);
      setEditingItem(null);

      await Swal.fire({
        icon: 'success',
        title: 'Enregistré !',
        text: 'Les modifications ont été sauvegardées.',
        timer: 2000,
        showConfirmButton: false,
        customClass: { popup: 'rounded-3xl' }
      });
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue.',
        customClass: { popup: 'rounded-3xl' }
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteItem = async (id: string, type: 'product' | 'category' | 'user' | 'session') => {
    if (type === 'user' && id === '1') {
      await Swal.fire({
        icon: 'warning',
        title: 'Interdit',
        text: 'Impossible de supprimer le compte racine.',
        customClass: { popup: 'rounded-3xl' }
      });
      return;
    }

    const result = await Swal.fire({
      title: 'Confirmer la suppression ?',
      text: 'Cette action est irréversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e53e3e',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      customClass: { popup: 'rounded-3xl' }
    });
    if (!result.isConfirmed) return;

    try {
      if (type === 'product') await deleteProduct(id);
      if (type === 'category') await deleteCategory(id);
      if (type === 'user') await deleteUser(id);
      if (type === 'session') await deleteSession(id);

      await Swal.fire({
        icon: 'success',
        title: 'Supprimé !',
        text: 'L\'élément a été supprimé avec succès.',
        timer: 2000,
        showConfirmButton: false,
        customClass: { popup: 'rounded-3xl' }
      });
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue.',
        customClass: { popup: 'rounded-3xl' }
      });
    }
  };

  if (!currentUser) return null;

  const sidebarItems = [
    { id: 'stats', label: 'Vue d\'ensemble', icon: <LayoutDashboard size={20} /> },
    { id: 'products', label: 'Catalogue Produits', icon: <Package size={20} /> },
    { id: 'categories', label: 'Rayons / Cat.', icon: <ListTree size={20} /> },
    { id: 'quotes', label: 'Commandes Devis', icon: <ShoppingCart size={20} /> },
    { id: 'sessions', label: 'Sessions Formation', icon: <Calendar size={20} /> },
    { id: 'clients', label: 'Base Clients', icon: <Briefcase size={20} /> },
    { id: 'messages', label: 'Messages Contact', icon: <Mail size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} />, badge: unreadCount },
    { id: 'users', label: 'Gestion Équipe', icon: <Users size={20} /> },
    { id: 'configuration', label: 'Configuration', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar */}
      <aside className="w-80 bg-brand-dark flex flex-col fixed h-full z-[100] border-r border-white/5 shadow-2xl print:hidden">
        <div className="p-12 flex items-center gap-5">
          <div className="size-14 bg-primary text-white rounded-[20px] flex items-center justify-center shadow-glow border border-white/10">
            <span className="material-symbols-outlined font-extrabold !text-3xl">settings_input_component</span>
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-extrabold text-white tracking-tighter leading-none">BOS-CI</h2>
            <p className="text-[10px] font-extrabold text-primary uppercase tracking-[0.3em] mt-1.5">Console Admin</p>
          </div>
        </div>

        <nav className="flex-1 px-6 space-y-2 pt-10 overflow-y-auto min-h-0">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => navigateTab(item.id as AdminTab)}
              className={`w-full flex items-center gap-6 px-8 py-4 rounded-2xl font-extrabold text-[12px] uppercase tracking-widest transition-all ${activeTab === item.id ? 'bg-primary text-white shadow-glow' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
            >
              {item.icon} <span className="flex-1 text-left">{item.label}</span>
              {'badge' in item && (item as any).badge > 0 && (
                <span className="size-6 bg-red-500 text-white rounded-full flex items-center justify-center text-[9px] font-black">{(item as any).badge > 99 ? '99+' : (item as any).badge}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5 shrink-0">
          <button onClick={() => window.location.href = '/'} className="w-full h-14 rounded-[18px] flex items-center justify-center gap-4 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest hover:text-white transition-all hover:bg-white/5 border border-white/5">
            <X size={14} /> Quitter
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="ml-80 min-h-screen flex flex-col w-[calc(100vw-20rem)] overflow-x-hidden">
        {/* Header */}
        <header className="h-28 bg-primary sticky top-0 z-[90] flex items-center justify-between px-12 lg:px-20 shadow-xl border-b border-primary-dark/20 print:hidden">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-white font-display tracking-tight leading-none uppercase">
              {sidebarItems.find(i => i.id === activeTab)?.label}
            </h1>
            <p className="text-white/60 text-[10px] font-extrabold uppercase tracking-widest mt-1.5">Système de gestion industrielle BOS-CI</p>
          </div>

          <div className="flex items-center gap-6">
            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotifPopup(!showNotifPopup)}
                className="relative size-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 size-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[9px] font-black animate-pulse shadow-lg">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </button>

              {showNotifPopup && (
                <div className="absolute top-full right-0 mt-4 w-[420px] bg-white rounded-[28px] shadow-2xl border border-slate-100 animate-slide-up overflow-hidden">
                  <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                    <h4 className="font-extrabold text-gray-900 text-sm">Notifications</h4>
                    {unreadCount > 0 && (
                      <span className="px-3 py-1 bg-red-50 text-red-500 rounded-full text-[10px] font-extrabold">{unreadCount} nouveau{unreadCount > 1 ? 'x' : ''}</span>
                    )}
                  </div>
                  <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                    {notifications.length === 0 ? (
                      <div className="p-10 text-center">
                        <Bell size={32} className="mx-auto text-slate-200 mb-3" />
                        <p className="text-sm font-bold text-slate-400">Aucune notification</p>
                      </div>
                    ) : (
                      notifications.slice(0, 20).map((n) => (
                        <button
                          key={n.id}
                          className={`w-full text-left px-6 py-4 flex items-start gap-4 hover:bg-slate-50 transition-colors border-b border-slate-50/50 last:border-b-0 ${!n.read ? 'bg-primary/[0.02]' : ''}`}
                          onClick={() => {
                            setShowNotifPopup(false);
                            if (!n.read && (n.type === 'message' || n.type === 'inscription')) {
                              const msgId = parseInt(n.id.replace('msg-', ''));
                              if (!isNaN(msgId)) markMessageRead(msgId);
                            }
                            if (n.type === 'quote') navigateTab('quotes');
                            else if (n.type === 'inscription') navigateTab('clients');
                            else navigateTab('messages');
                          }}
                        >
                          <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                            n.type === 'message' ? 'bg-blue-50 text-blue-500' :
                            n.type === 'quote' ? 'bg-amber-50 text-amber-500' :
                            'bg-primary/10 text-primary'
                          }`}>
                            {n.type === 'message' ? <MessageSquare size={16} /> :
                             n.type === 'quote' ? <ShoppingCart size={16} /> :
                             <GraduationCap size={16} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              {!n.read && <div className="size-2 rounded-full bg-primary shrink-0"></div>}
                              <p className={`text-sm truncate ${!n.read ? 'font-extrabold text-gray-900' : 'font-bold text-gray-600'}`}>{n.title}</p>
                            </div>
                            <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">{n.subtitle}</p>
                            <p className="text-[10px] text-slate-300 font-bold mt-1">
                              {new Date(n.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </p>
                          </div>
                          <span className={`shrink-0 px-2.5 py-1 rounded-lg text-[8px] font-extrabold uppercase tracking-widest ${
                            n.type === 'message' ? 'bg-blue-50 text-blue-500' :
                            n.type === 'quote' ? 'bg-amber-50 text-amber-500' :
                            'bg-primary/10 text-primary'
                          }`}>
                            {n.type === 'message' ? 'Contact' : n.type === 'quote' ? 'Devis' : 'Formation'}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <div className="p-4 border-t border-slate-50 flex justify-center">
                      <button
                        onClick={() => { setShowNotifPopup(false); navigateTab('notifications'); }}
                        className="text-[10px] font-extrabold text-primary uppercase tracking-widest hover:underline"
                      >
                        Toutes les notifications
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="relative" ref={popupRef}>
              <div
                className="flex items-center gap-5 cursor-pointer group bg-white/10 pl-6 pr-2 py-2 rounded-2xl border border-white/10 hover:bg-white/20 transition-all"
                onClick={() => setShowUserPopup(!showUserPopup)}
              >
                <div className="text-right hidden sm:block">
                  <p className="font-extrabold text-white leading-none text-sm">{currentUser.name}</p>
                  <p className="text-[10px] text-white/50 font-extrabold uppercase tracking-widest mt-1">Accès {currentUser.role}</p>
                </div>
                <div className="size-12 rounded-xl bg-white/10 border-2 border-white/20 shadow-lg overflow-hidden">
                  <img src={storageUrl(currentUser.avatar) || `https://i.pravatar.cc/150?u=${currentUser.id}`} alt="Profile" className="w-full h-full object-cover" />
                </div>
              </div>

              {showUserPopup && (
                <div className="absolute top-full right-0 mt-6 w-80 bg-white rounded-[32px] shadow-2xl border border-slate-100 p-8 animate-slide-up overflow-hidden">
                  <div className="pb-8 border-b border-slate-50 mb-6 flex flex-col items-center text-center gap-4">
                    <div className="size-20 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center text-primary shadow-inner">
                      <UserIcon size={32} />
                    </div>
                    <div>
                      <p className="text-lg font-extrabold text-gray-900 leading-none">{currentUser.name}</p>
                      <p className="text-xs font-medium text-slate-400 mt-1">{currentUser.email}</p>
                    </div>
                  </div>

                  <nav className="space-y-2">
                    <button onClick={() => { setShowUserPopup(false); openModal('profile', currentUser); }} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-extrabold uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-primary transition-all">
                      <Settings size={18} /> Profil Agent
                    </button>
                    <button onClick={logout} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-extrabold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all">
                      <LogOut size={18} /> Déconnexion
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-12 lg:p-16 flex-1">
          {activeTab === 'stats' && (
            <div className="space-y-12 animate-fade-in print:hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { label: 'Catalogue', val: products.length, icon: <Package />, color: 'bg-blue-500' },
                  { label: 'Demandes', val: quotes.length, icon: <ShoppingCart />, color: 'bg-primary' },
                  { label: 'Clients', val: Array.from(new Set(quotes.map(q => q.customer.email))).length, icon: <Briefcase />, color: 'bg-orange-500' },
                  { label: 'Collaborateurs', val: users.length, icon: <Users />, color: 'bg-purple-500' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 flex items-center gap-8 hover:shadow-xl transition-all">
                    <div className={`size-16 rounded-[22px] ${stat.color} text-white flex items-center justify-center shadow-lg`}>
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                      <p className="text-3xl font-black text-gray-900 font-display">{stat.val}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 bg-white rounded-[56px] p-12 shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-2xl font-black font-display text-gray-900">Activité Récente</h3>
                    <TrendingUp className="text-primary" />
                  </div>
                  <div className="space-y-6">
                    {quotes.slice(0, 5).map(q => (
                      <div key={q.id} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-[28px] border border-transparent hover:border-slate-100 transition-all">
                        <div className="flex items-center gap-6">
                          <div className={`size-12 rounded-2xl flex items-center justify-center ${q.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-primary/10 text-primary'}`}>
                            <ShoppingCart size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{q.customer.company || q.customer.name}</p>
                            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">{q.items.length} articles &bull; {q.date}</p>
                          </div>
                        </div>
                        <button onClick={() => openModal('quote', q)} className="text-[10px] font-extrabold uppercase text-primary hover:underline">Voir</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-brand-dark rounded-[56px] p-12 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl">
                  <div className="absolute top-0 right-0 p-10 opacity-10"><Globe size={240} className="animate-spin-slow" /></div>
                  <div className="space-y-6 relative z-10">
                    <h3 className="text-3xl font-black font-display tracking-tight leading-none">Environnement Contrôlé.</h3>
                    <div className="p-8 bg-white/5 rounded-[32px] border border-white/10 flex items-center gap-6">
                      <div className="size-14 rounded-2xl bg-primary flex items-center justify-center text-white"><UserIcon size={24} /></div>
                      <div>
                        <p className="font-extrabold text-lg">{currentUser.name}</p>
                        <p className="text-[10px] opacity-40 font-extrabold uppercase tracking-widest">Connecté</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <DataTable
              title="Inventaire Produits"
              data={products}
              columns={['Produit', 'Détails', 'Prix', 'Stock', 'Actions']}
              onAdd={() => openModal('product')}
              renderRow={(p: Product) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <div className="relative">
                      <img src={p.image} className="size-12 rounded-xl bg-slate-50 object-contain p-1.5 border border-slate-100" alt="" />
                      {(p.images?.length || 0) > 0 && (
                        <div className="absolute -top-1.5 -right-1.5 size-5 bg-primary text-white rounded-full flex items-center justify-center text-[7px] font-extrabold shadow-sm">{p.images!.length}</div>
                      )}
                    </div>
                    <div><p className="font-extrabold text-gray-900 text-sm leading-none mb-1">{p.name}</p><p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{p.ref}</p></div>
                  </td>
                  <td className="px-6 py-4"><p className="font-extrabold text-gray-900 text-sm">{p.brand}</p><p className="text-[10px] text-primary font-extrabold uppercase tracking-widest mt-0.5">{p.category}</p></td>
                  <td className="px-6 py-4">{p.price != null ? <span className="font-extrabold text-primary text-sm">{formatPrice(p.price)}</span> : <span className="text-[10px] text-slate-400 font-bold italic">Sur devis</span>}</td>
                  <td className="px-6 py-4"><span className={`px-3 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${p.stock ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>{p.stock ? 'Disponible' : 'Indisponible'}</span></td>
                  <td className="px-6 py-4 print:hidden">
                    <div className="flex gap-2">
                      <button onClick={() => openModal('product', p)} className="size-9 rounded-lg bg-slate-50 text-slate-400 hover:bg-primary/10 hover:text-primary transition-all flex items-center justify-center"><Edit2 size={15} /></button>
                      <button onClick={() => handleDeleteItem(p.id, 'product')} className="size-9 rounded-lg bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              )}
            />
          )}

          {activeTab === 'categories' && (
            <DataTable
              title="Rayons du Catalogue"
              data={categories}
              columns={['Rayon', 'Description', 'Actions']}
              onAdd={() => openModal('category')}
              renderRow={(cat: Category) => (
                <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center"><span className="material-symbols-outlined text-lg">{cat.icon}</span></div>
                    <p className="font-extrabold text-gray-900 text-sm">{cat.name}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium max-w-xs truncate">{cat.description}</td>
                  <td className="px-6 py-4 print:hidden">
                    <div className="flex gap-2">
                      <button onClick={() => openModal('category', cat)} className="size-9 rounded-lg bg-slate-50 text-slate-400 hover:bg-primary/10 hover:text-primary transition-all flex items-center justify-center"><Edit2 size={15} /></button>
                      <button onClick={() => handleDeleteItem(cat.id, 'category')} className="size-9 rounded-lg bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              )}
            />
          )}

          {activeTab === 'quotes' && (
            <DataTable
              title="Journal des Devis"
              data={quotes}
              columns={['Référence', 'Client / Entité', 'Montant', 'État', 'Actions']}
              renderRow={(q: QuoteRequest) => {
                const quoteTotal = q.items.reduce((sum, i: any) => sum + (i.product.price ?? 0) * i.quantity, 0);
                return (
                <tr key={q.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4"><p className="font-extrabold text-gray-900 text-sm leading-none mb-1">{q.id}</p><p className="text-[10px] text-slate-400 font-bold">{q.date}</p></td>
                  <td className="px-6 py-4"><p className="font-extrabold text-gray-900 text-sm">{q.customer.name}</p><p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mt-0.5">{q.customer.company || 'Particulier'}</p></td>
                  <td className="px-6 py-4">{quoteTotal > 0 ? <span className="font-extrabold text-primary text-sm">{formatPrice(quoteTotal)}</span> : <span className="text-[10px] text-slate-400 font-bold italic">Sur devis</span>}</td>
                  <td className="px-6 py-4">
                    <select
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-extrabold uppercase tracking-widest border-none outline-none cursor-pointer transition-all ${q.status === 'pending' ? 'bg-orange-100 text-orange-600' : q.status === 'processed' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'}`}
                      value={q.status}
                      onChange={(e) => updateQuoteStatus(q.id, e.target.value as QuoteRequest['status'])}
                    >
                      <option value="pending">En Attente</option>
                      <option value="processed">Traité</option>
                      <option value="cancelled">Annulé</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 print:hidden">
                    <button onClick={() => openModal('quote', q)} className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-primary hover:underline">Détails <ChevronRight size={14} /></button>
                  </td>
                </tr>
              );}}
            />
          )}

          {activeTab === 'clients' && (
            <DataTable
              title="Base de Données Clients"
              data={Array.from(new Map(quotes.map(q => [q.customer.email, q])).values())}
              columns={['Client', 'Contact', 'Formation', 'Historique', 'Activité']}
              renderRow={(q: QuoteRequest) => {
                const formations = clientFormations.get(q.customer.email.toLowerCase()) || [];
                return (
                <tr key={q.customer.email} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center"><Briefcase size={18} /></div>
                    <div><p className="font-extrabold text-gray-900 text-sm leading-none mb-1">{q.customer.company || 'Compte Particulier'}</p><p className="text-[10px] text-slate-400 font-bold uppercase">{q.customer.name}</p></div>
                  </td>
                  <td className="px-6 py-4"><p className="text-sm font-bold text-gray-900">{q.customer.email}</p><p className="text-[10px] text-slate-400 font-medium">{q.customer.phone}</p></td>
                  <td className="px-6 py-4">
                    {formations.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {formations.map((f, i) => (
                          <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 rounded-full text-[10px] font-extrabold text-primary uppercase border border-primary/10">
                            <GraduationCap size={12} /> {f}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-300 font-bold italic">Aucune</span>
                    )}
                  </td>
                  <td className="px-6 py-4"><span className="px-3 py-1.5 bg-slate-50 rounded-full text-[10px] font-extrabold text-primary uppercase border border-slate-100">{quotes.filter(oq => oq.customer.email === q.customer.email).length} Devis</span></td>
                  <td className="px-6 py-4 font-bold text-slate-400 text-sm">{q.date}</td>
                </tr>
                );
              }}
            />
          )}

          {activeTab === 'sessions' && (
            <DataTable
              title="Sessions de Formation"
              data={sessions}
              columns={['Date', 'Sujet', 'Module', 'Durée / Lieu', 'Places', 'Actions']}
              onAdd={() => openModal('session')}
              renderRow={(s: Session) => (
                <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center"><Calendar size={18} /></div>
                      <p className="font-extrabold text-gray-900 text-sm">{s.date}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4"><p className="font-extrabold text-gray-900 text-sm">{s.subject}</p></td>
                  <td className="px-6 py-4"><span className="px-3 py-1.5 bg-primary/5 text-primary rounded-full text-[9px] font-extrabold uppercase tracking-widest">{s.module}</span></td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 text-sm">{s.duration}</p>
                    <p className="text-[10px] text-slate-400 font-bold mt-0.5">{s.location}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`font-black text-base ${s.places === 0 ? 'text-red-500' : 'text-primary'}`}>{s.places}</span>
                      <span className="text-slate-300 text-xs">/</span>
                      <span className="font-bold text-slate-400 text-sm">{s.total}</span>
                    </div>
                    {s.places === 0 && <span className="text-[9px] font-extrabold text-red-500 uppercase">Complet</span>}
                  </td>
                  <td className="px-6 py-4 print:hidden">
                    <div className="flex gap-2">
                      <button onClick={() => openModal('session', s)} className="size-9 rounded-lg bg-slate-50 text-slate-400 hover:bg-primary/10 hover:text-primary transition-all flex items-center justify-center"><Edit2 size={15} /></button>
                      <button onClick={() => handleDeleteItem(s.id, 'session')} className="size-9 rounded-lg bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              )}
            />
          )}

          {activeTab === 'messages' && (
            <DataTable
              title="Messages de Contact"
              data={contactMessages}
              columns={['Expéditeur', 'Objet', 'Message', 'Date', 'Statut']}
              renderRow={(msg: ContactMessage) => (
                <tr key={msg.id} className={`hover:bg-slate-50/50 transition-colors ${!msg.read ? 'bg-primary/[0.02]' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {!msg.read && <div className="size-2.5 rounded-full bg-primary shrink-0"></div>}
                      <div>
                        <p className={`text-sm leading-none mb-1 ${!msg.read ? 'font-extrabold text-gray-900' : 'font-bold text-gray-700'}`}>{msg.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{msg.email}</p>
                        {msg.phone && <p className="text-[10px] text-slate-400 font-medium">{msg.phone}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1.5 bg-slate-50 rounded-full text-[10px] font-extrabold text-gray-600 uppercase border border-slate-100">{msg.subject}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 font-medium truncate max-w-xs" title={msg.message}>{msg.message}</p>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-400 text-sm whitespace-nowrap">
                    {new Date(msg.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${msg.read ? 'bg-slate-50 text-slate-400 border border-slate-100' : 'bg-primary/10 text-primary border border-primary/20'}`}>
                      {msg.read ? 'Lu' : 'Nouveau'}
                    </span>
                  </td>
                </tr>
              )}
            />
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black font-display text-gray-900 tracking-tight">Toutes les Notifications</h2>
                  <p className="text-slate-400 text-sm font-medium mt-1">{unreadCount} non lue{unreadCount > 1 ? 's' : ''} sur {notifications.length} au total</p>
                </div>
                <div className="flex gap-3">
                  {['all', 'message', 'quote', 'inscription'].map(f => (
                    <button key={f} className="px-5 py-2.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all bg-white border border-slate-100 text-slate-500 hover:border-primary/20 hover:text-primary [&.active]:bg-primary [&.active]:text-white [&.active]:border-primary" onClick={(e) => {
                      // Toggle filter via data attribute
                      const btn = e.currentTarget;
                      btn.closest('.flex')?.querySelectorAll('button').forEach(b => b.classList.remove('active'));
                      btn.classList.add('active');
                      // Filter by showing/hiding rows
                      const container = btn.closest('.space-y-8')?.querySelector('[data-notif-list]');
                      if (container) {
                        container.querySelectorAll('[data-notif-type]').forEach((el) => {
                          (el as HTMLElement).style.display = f === 'all' || (el as HTMLElement).dataset.notifType === f ? '' : 'none';
                        });
                      }
                    }}>
                      {f === 'all' ? 'Tout' : f === 'message' ? 'Contact' : f === 'quote' ? 'Devis' : 'Formation'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-[40px] border border-slate-100 shadow-premium overflow-hidden" data-notif-list>
                {notifications.length === 0 ? (
                  <div className="p-20 text-center">
                    <Bell size={48} className="mx-auto text-slate-200 mb-4" />
                    <p className="text-lg font-bold text-slate-400">Aucune notification</p>
                    <p className="text-sm text-slate-300 mt-1">Les notifications des formulaires publics apparaitront ici.</p>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      data-notif-type={n.type}
                      className={`flex items-start gap-6 px-10 py-6 border-b border-slate-50 last:border-b-0 hover:bg-slate-50/50 transition-colors cursor-pointer ${!n.read ? 'bg-primary/[0.02]' : ''}`}
                      onClick={() => {
                        if (!n.read && (n.type === 'message' || n.type === 'inscription')) {
                          const msgId = parseInt(n.id.replace('msg-', ''));
                          if (!isNaN(msgId)) markMessageRead(msgId);
                        }
                        if (n.type === 'quote') navigateTab('quotes');
                        else if (n.type === 'inscription') navigateTab('clients');
                        else navigateTab('messages');
                      }}
                    >
                      <div className={`size-12 rounded-2xl flex items-center justify-center shrink-0 mt-1 ${
                        n.type === 'message' ? 'bg-blue-50 text-blue-500' :
                        n.type === 'quote' ? 'bg-amber-50 text-amber-500' :
                        'bg-primary/10 text-primary'
                      }`}>
                        {n.type === 'message' ? <MessageSquare size={20} /> :
                         n.type === 'quote' ? <ShoppingCart size={20} /> :
                         <GraduationCap size={20} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          {!n.read && <div className="size-2.5 rounded-full bg-primary shrink-0"></div>}
                          <p className={`text-base ${!n.read ? 'font-extrabold text-gray-900' : 'font-bold text-gray-600'}`}>{n.title}</p>
                        </div>
                        <p className="text-sm text-slate-400 font-medium mt-1">{n.subtitle}</p>
                      </div>
                      <div className="text-right shrink-0 space-y-2">
                        <span className={`inline-block px-3 py-1.5 rounded-lg text-[9px] font-extrabold uppercase tracking-widest ${
                          n.type === 'message' ? 'bg-blue-50 text-blue-500' :
                          n.type === 'quote' ? 'bg-amber-50 text-amber-500' :
                          'bg-primary/10 text-primary'
                        }`}>
                          {n.type === 'message' ? 'Contact' : n.type === 'quote' ? 'Devis' : 'Formation'}
                        </span>
                        <p className="text-[11px] text-slate-300 font-bold">
                          {new Date(n.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <DataTable
              title="Comptes Utilisateurs"
              data={users}
              columns={['Agent', 'Email', 'Accès', 'Actions']}
              onAdd={() => openModal('user')}
              renderRow={(u: User) => (
                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-extrabold text-base">{u.name[0]}</div>
                    <p className="font-extrabold text-gray-900 text-sm">{u.name}</p>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-500 text-sm">{u.email}</td>
                  <td className="px-6 py-4"><span className={`px-3 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${u.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-500'}`}>{u.role}</span></td>
                  <td className="px-6 py-4 print:hidden">
                    <div className="flex gap-2">
                      <button onClick={() => openModal('user', u)} className="size-9 rounded-lg bg-slate-50 text-slate-400 hover:bg-primary/10 hover:text-primary transition-all flex items-center justify-center"><Edit2 size={15} /></button>
                      {u.id !== '1' && <button onClick={() => handleDeleteItem(u.id, 'user')} className="size-9 rounded-lg bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center"><Trash2 size={15} /></button>}
                    </div>
                  </td>
                </tr>
              )}
            />
          )}

          {activeTab === 'configuration' && (
            <div className="space-y-12 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black font-display text-gray-900 tracking-tight">Configuration Plateforme</h2>
                  <p className="text-slate-400 text-sm font-medium mt-1">Paramètres généraux de l'application</p>
                </div>
              </div>

              <div className="bg-white rounded-[40px] border border-slate-100 shadow-premium overflow-hidden">
                <div className="p-10 border-b border-slate-50 bg-slate-50/50">
                  <h3 className="font-extrabold text-xs uppercase tracking-[0.2em] text-gray-900 flex items-center gap-4">
                    <Package size={20} className="text-primary" /> Affichage des Prix
                  </h3>
                </div>
                <div className="p-10 space-y-8">
                  <div className="flex items-center justify-between p-8 bg-slate-50/50 rounded-[28px] border border-slate-100">
                    <div className="space-y-2">
                      <p className="font-extrabold text-gray-900 text-sm">Afficher les prix produits</p>
                      <p className="text-[11px] text-slate-400 font-medium leading-relaxed max-w-md">
                        Lorsque cette option est activée, les prix des produits sont visibles sur le catalogue et les fiches produit. Sinon, un bouton «&nbsp;Demander un devis&nbsp;» est affiché.
                      </p>
                    </div>
                    <button
                      onClick={async () => {
                        setSavingSettings(true);
                        try {
                          await updateSettings({ show_product_prices: !settings.show_product_prices });
                        } finally {
                          setSavingSettings(false);
                        }
                      }}
                      disabled={savingSettings}
                      className={`relative w-16 h-9 rounded-full transition-all duration-300 shrink-0 ${settings.show_product_prices ? 'bg-primary shadow-glow' : 'bg-slate-200'} ${savingSettings ? 'opacity-60' : ''}`}
                    >
                      <span className={`absolute top-1 left-1 size-7 rounded-full bg-white shadow-lg transition-transform duration-300 ${settings.show_product_prices ? 'translate-x-7' : 'translate-x-0'}`}></span>
                    </button>
                  </div>
                  <p className="text-[10px] font-bold text-slate-300 text-center">
                    Les modifications prennent effet immédiatement sur le site public.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-brand-dark/50 backdrop-blur-md animate-fade-in">
          <div className={`bg-white w-full ${modalType === 'quote' ? 'max-w-4xl' : 'max-w-2xl'} rounded-[48px] shadow-2xl p-12 lg:p-16 relative animate-slide-up max-h-[90vh] overflow-y-auto no-scrollbar border border-white/10`}>
            <button onClick={() => { setIsModalOpen(false); setEditingItem(null); }} className="absolute top-12 right-12 size-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all border border-slate-100"><X size={28} /></button>

            <h3 className="text-3xl font-black font-display mb-12 text-gray-900">
              {modalType === 'quote' ? 'Détails de la demande' : modalType === 'profile' ? 'Mon Profil' : editingItem ? 'Modifier' : 'Ajouter'}
              {modalType === 'product' ? ' un produit' : modalType === 'category' ? ' un rayon' : modalType === 'user' ? ' un collaborateur' : modalType === 'session' ? ' une session' : modalType === 'profile' ? '' : ''}
            </h3>

            {modalType === 'quote' && editingItem && (
              <div className="space-y-16">
                <div className="grid grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.4em] text-slate-400">Client / Société</p>
                    <div className="space-y-3">
                      <p className="text-3xl font-extrabold text-gray-900 tracking-tight">{editingItem.customer.name}</p>
                      <p className="text-xl font-bold text-primary">{editingItem.customer.company || "Particulier"}</p>
                      <div className="pt-6 space-y-3 border-t border-slate-50">
                        <p className="text-sm font-medium text-slate-600 flex items-center gap-4"><Mail size={16} className="text-slate-300" /> {editingItem.customer.email}</p>
                        <p className="text-sm font-medium text-slate-600 flex items-center gap-4"><Phone size={16} className="text-slate-300" /> {editingItem.customer.phone}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.4em] text-slate-400">Notes d'étude</p>
                    <div className="p-10 bg-slate-50 rounded-[32px] text-sm font-medium leading-relaxed italic border border-slate-100 relative">
                      <MessageSquare className="absolute -top-4 -left-4 size-10 text-primary/10" />
                      "{editingItem.notes || "Aucune note particulière spécifiée."}"
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.4em] text-slate-400">Configuration Panier</p>
                  <div className="grid grid-cols-1 gap-6">
                    {editingItem.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-8 bg-slate-50/50 rounded-[32px] border border-slate-100 group hover:bg-white transition-all">
                        <div className="flex items-center gap-8">
                          <img src={item.product.image} className="size-20 rounded-2xl bg-white p-3 object-contain border border-slate-100" alt="" />
                          <div>
                            <p className="font-extrabold text-gray-900 text-lg leading-none mb-2">{item.product.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.product.brand} &bull; {item.product.ref}</p>
                            {item.product.price != null && <p className="text-sm font-black text-primary mt-1">{formatPrice(item.product.price)}</p>}
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          {item.product.price != null && item.quantity > 1 && <p className="text-sm font-bold text-slate-400">{formatPrice(item.product.price * item.quantity)}</p>}
                          <div className="text-center px-8 border-l border-slate-100"><p className="text-4xl font-black font-display text-primary">x{item.quantity}</p></div>
                        </div>
                      </div>
                    ))}
                    {editingItem.items.some((i: any) => i.product.price != null) && (
                      <div className="flex items-center justify-between p-8 bg-primary/5 rounded-[28px] border border-primary/10 mt-2">
                        <span className="text-xs font-extrabold text-gray-900 uppercase tracking-widest">Total estimé</span>
                        <span className="text-3xl font-black text-primary font-display">
                          {formatPrice(editingItem.items.reduce((sum: number, i: any) => sum + (i.product.price ?? 0) * i.quantity, 0))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {modalType !== 'quote' && (
              <form onSubmit={handleSave} className="space-y-10">
                {modalType === 'product' && (
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2"><label className="text-[11px] font-extrabold uppercase text-slate-400 ml-4">Désignation</label><input required name="name" defaultValue={editingItem?.name} className="w-full h-20 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold text-gray-900" /></div>
                    <div className="space-y-2"><label className="text-[11px] font-extrabold uppercase text-slate-400 ml-4">Référence</label><input required name="ref" defaultValue={editingItem?.ref} className="w-full h-20 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold text-gray-900" /></div>
                    <div className="space-y-2"><label className="text-[11px] font-extrabold uppercase text-slate-400 ml-4">Marque</label><input required name="brand" defaultValue={editingItem?.brand} className="w-full h-20 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold text-gray-900" /></div>
                    <div className="space-y-2"><label className="text-[11px] font-extrabold uppercase text-slate-400 ml-4">Rayon</label><select required name="category" value={formCategory} onChange={e => setFormCategory(e.target.value)} className="w-full h-20 px-8 rounded-2xl bg-slate-50 outline-none font-bold text-gray-900 cursor-pointer"><option value="">— Sélectionner —</option>{categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}</select></div>
                    <div className="space-y-2 col-span-2"><label className="text-[11px] font-extrabold uppercase text-slate-400 ml-4">Prix (FCFA)</label><input name="price" type="number" step="1" min="0" defaultValue={editingItem?.price ?? ''} placeholder="Laisser vide = sur devis" className="w-full h-20 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold text-gray-900" /></div>
                    {/* Image Principale - Upload ou URL */}
                    <div className="col-span-2 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-extrabold uppercase text-slate-400 ml-4">Image Principale</label>
                        <div className="flex gap-2">
                          <button type="button" onClick={() => { setMainImageMode('upload'); setMainImageFile(null); setMainImagePreview(null); }} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-extrabold uppercase tracking-widest transition-all ${mainImageMode === 'upload' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>
                            <Upload size={12} /> Upload
                          </button>
                          <button type="button" onClick={() => { setMainImageMode('url'); setMainImageFile(null); setMainImagePreview(null); }} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-extrabold uppercase tracking-widest transition-all ${mainImageMode === 'url' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>
                            <Link size={12} /> URL
                          </button>
                        </div>
                      </div>
                      {mainImageMode === 'url' ? (
                        <input name="image" defaultValue={editingItem?.image} placeholder="https://images.unsplash.com/..." className="w-full h-20 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold text-gray-900" />
                      ) : (
                        <div className="flex items-center gap-4">
                          <input ref={mainImageInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > 5 * 1024 * 1024) { Swal.fire({ icon: 'error', title: 'Fichier trop volumineux', text: 'Max 5 Mo.', customClass: { popup: 'rounded-3xl' } }); return; }
                              setMainImageFile(file);
                              setMainImagePreview(URL.createObjectURL(file));
                            }
                          }} />
                          <button type="button" onClick={() => mainImageInputRef.current?.click()} className="flex-1 h-20 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 hover:border-primary/30 flex items-center justify-center gap-3 transition-all cursor-pointer">
                            {mainImagePreview ? (
                              <div className="flex items-center gap-4 px-6">
                                <img src={mainImagePreview} className="size-14 rounded-xl object-contain bg-white p-1 border border-slate-100" alt="" />
                                <span className="text-sm font-bold text-gray-900 truncate max-w-[200px]">{mainImageFile?.name}</span>
                              </div>
                            ) : (
                              <>
                                <Upload size={18} className="text-slate-400" />
                                <span className="text-sm font-bold text-slate-400">Choisir une image (max 5 Mo)</span>
                              </>
                            )}
                          </button>
                          {mainImagePreview && (
                            <button type="button" onClick={() => { setMainImageFile(null); setMainImagePreview(null); }} className="size-12 rounded-xl bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-500 flex items-center justify-center transition-all shrink-0">
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      )}
                      {/* Aperçu image actuelle */}
                      {editingItem?.image && !mainImagePreview && mainImageMode === 'upload' && (
                        <div className="flex items-center gap-3 pl-4">
                          <img src={editingItem.image} className="size-10 rounded-lg object-contain bg-slate-50 p-1 border border-slate-100" alt="" />
                          <span className="text-[10px] text-slate-400 font-medium">Image actuelle (sera conservée si aucun upload)</span>
                        </div>
                      )}
                    </div>

                    {/* Multi-image gallery management */}
                    <div className="col-span-2 space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-extrabold uppercase text-slate-400 ml-4 flex items-center gap-2">
                          <ImageIcon size={14} /> Galerie Photos ({imageUrls.length})
                        </label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => galleryInputRef.current?.click()}
                            disabled={uploading}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-[10px] font-extrabold uppercase tracking-widest hover:bg-primary/20 transition-all disabled:opacity-50"
                          >
                            {uploading ? <><div className="size-3 border-2 border-primary border-t-transparent rounded-full animate-spin"></div> Upload...</> : <><Upload size={14} /> Upload</>}
                          </button>
                          <button
                            type="button"
                            onClick={() => setImageUrls([...imageUrls, ''])}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-500 text-[10px] font-extrabold uppercase tracking-widest hover:bg-slate-200 transition-all"
                          >
                            <Link size={14} /> URL
                          </button>
                        </div>
                        <input ref={galleryInputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={(e) => {
                          if (e.target.files?.length) { handleGalleryUpload(e.target.files); e.target.value = ''; }
                        }} />
                      </div>
                      <div className="space-y-3">
                        {imageUrls.map((url, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            {url.trim() && (
                              <img src={url} className="size-12 rounded-xl bg-slate-50 object-contain p-1 border border-slate-100 shrink-0" alt="" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                            )}
                            <input
                              type="text"
                              value={url}
                              onChange={(e) => {
                                const newUrls = [...imageUrls];
                                newUrls[idx] = e.target.value;
                                setImageUrls(newUrls);
                              }}
                              placeholder={`URL photo ${idx + 1}`}
                              className="flex-1 h-14 px-6 rounded-xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold text-gray-900 text-sm"
                            />
                            <button
                              type="button"
                              onClick={() => setImageUrls(imageUrls.filter((_, i) => i !== idx))}
                              className="size-10 rounded-xl bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-500 flex items-center justify-center transition-all shrink-0"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                        {imageUrls.length === 0 && (
                          <p className="text-xs text-slate-400 italic pl-4">Aucune photo dans la galerie.</p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-2 space-y-2"><label className="text-[11px] font-extrabold uppercase text-slate-400 ml-4">Description</label><textarea required name="description" defaultValue={editingItem?.description} className="w-full h-32 p-8 rounded-2xl bg-slate-50 outline-none font-bold text-gray-900 resize-none" /></div>
                    <div className="col-span-2 space-y-2"><label className="text-[11px] font-extrabold uppercase text-slate-400 ml-4">Caractéristiques (séparées par virgule)</label><input name="features" defaultValue={editingItem?.features?.join(', ')} className="w-full h-20 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold text-gray-900" /></div>
                    <div className="flex items-center gap-5 pl-4"><input type="checkbox" name="stock" defaultChecked={editingItem?.stock} className="size-8 accent-primary cursor-pointer" /><label className="font-extrabold text-sm text-gray-900 uppercase tracking-widest">En Stock Permanent CI</label></div>
                  </div>
                )}

                {modalType === 'category' && (
                  <div className="space-y-10">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2"><label className="text-[11px] font-extrabold uppercase text-slate-400 ml-4">Nom du rayon</label><input required name="name" defaultValue={editingItem?.name} className="w-full h-20 px-8 rounded-2xl bg-slate-50 outline-none font-bold text-gray-900" /></div>
                      <div className="space-y-2"><label className="text-[11px] font-extrabold uppercase text-slate-400 ml-4">Icône</label><input required name="icon" defaultValue={editingItem?.icon} className="w-full h-20 px-8 rounded-2xl bg-slate-50 outline-none font-bold text-gray-900" placeholder="ex: lan, query_stats" /></div>
                    </div>
                    <div className="space-y-2"><label className="text-[11px] font-extrabold uppercase text-slate-400 ml-4">Description</label><textarea required name="description" defaultValue={editingItem?.description} className="w-full h-32 p-8 rounded-2xl bg-slate-50 outline-none font-bold text-gray-900 resize-none" /></div>
                  </div>
                )}

                {modalType === 'user' && (
                  <div className="space-y-10">
                    <div className="space-y-2"><label className="text-[11px] font-extrabold uppercase text-slate-400 ml-4">Nom Complet</label><input required name="name" defaultValue={editingItem?.name} className="w-full h-20 px-8 rounded-2xl bg-slate-50 outline-none font-bold text-gray-900" /></div>
                    <div className="space-y-2"><label className="text-[11px] font-extrabold uppercase text-slate-400 ml-4">Email</label><input required type="email" name="email" defaultValue={editingItem?.email} className="w-full h-20 px-8 rounded-2xl bg-slate-50 outline-none font-bold text-gray-900" /></div>
                    <div className="space-y-2"><label className="text-[11px] font-extrabold uppercase text-slate-400 ml-4">Rôle</label><select name="role" defaultValue={editingItem?.role || 'editor'} className="w-full h-20 px-8 rounded-2xl bg-slate-50 outline-none font-bold text-gray-900"><option value="admin">Administrateur</option><option value="editor">Éditeur</option></select></div>
                  </div>
                )}

                {modalType === 'session' && (
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2"><label className="text-[11px] font-extrabold uppercase text-slate-400 ml-4">Date</label><input required name="date" defaultValue={editingItem?.date} placeholder="ex: 12 Juin 2026" className="w-full h-20 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold text-gray-900" /></div>
                    <div className="space-y-2"><label className="text-[11px] font-extrabold uppercase text-slate-400 ml-4">Durée</label><input required name="duration" defaultValue={editingItem?.duration} placeholder="ex: 5 jours" className="w-full h-20 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold text-gray-900" /></div>
                    <div className="col-span-2 space-y-2"><label className="text-[11px] font-extrabold uppercase text-slate-400 ml-4">Sujet de la session</label><input required name="subject" defaultValue={editingItem?.subject} placeholder="ex: Soudure Fibre Optique Expert" className="w-full h-20 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold text-gray-900" /></div>
                    <div className="col-span-2 space-y-2"><label className="text-[11px] font-extrabold uppercase text-slate-400 ml-4">Module de formation</label><input required name="module" defaultValue={editingItem?.module} placeholder="ex: Expertise Fibre Optique" className="w-full h-20 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold text-gray-900" /></div>
                    <div className="col-span-2 space-y-2"><label className="text-[11px] font-extrabold uppercase text-slate-400 ml-4">Lieu</label><input required name="location" defaultValue={editingItem?.location} placeholder="ex: Abidjan Zone 4" className="w-full h-20 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold text-gray-900" /></div>
                    <div className="space-y-2"><label className="text-[11px] font-extrabold uppercase text-slate-400 ml-4">Places restantes</label><input required type="number" name="places" min="0" defaultValue={editingItem?.places ?? 0} className="w-full h-20 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold text-gray-900" /></div>
                    <div className="space-y-2"><label className="text-[11px] font-extrabold uppercase text-slate-400 ml-4">Places totales</label><input required type="number" name="total" min="1" defaultValue={editingItem?.total ?? 10} className="w-full h-20 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold text-gray-900" /></div>
                  </div>
                )}

                {modalType === 'profile' && currentUser && (
                  <div className="space-y-10">
                    <div className="flex flex-col items-center gap-5 pb-10 border-b border-slate-100">
                      <div className="relative group">
                        <div className="size-28 rounded-3xl bg-slate-50 border-2 border-slate-100 overflow-hidden shadow-inner">
                          <img src={avatarPreview || storageUrl(currentUser.avatar) || `https://i.pravatar.cc/150?u=${currentUser.id}`} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <button
                          type="button"
                          onClick={() => avatarInputRef.current?.click()}
                          className="absolute inset-0 rounded-3xl bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all cursor-pointer"
                        >
                          <ImagePlus size={28} className="text-white" />
                        </button>
                        <input
                          ref={avatarInputRef}
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > 2 * 1024 * 1024) {
                                Swal.fire({ icon: 'error', title: 'Fichier trop volumineux', text: 'La taille maximale est de 2 Mo.', customClass: { popup: 'rounded-3xl' } });
                                return;
                              }
                              setAvatarFile(file);
                              setAvatarPreview(URL.createObjectURL(file));
                            }
                          }}
                        />
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <span className={`px-4 py-2 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${currentUser.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-500'}`}>{currentUser.role === 'admin' ? 'Administrateur' : 'Éditeur'}</span>
                        <button type="button" onClick={() => avatarInputRef.current?.click()} className="text-[10px] font-extrabold uppercase tracking-widest text-primary hover:underline mt-1">Changer la photo</button>
                        {avatarFile && <p className="text-[10px] text-slate-400 font-medium">{avatarFile.name}</p>}
                      </div>
                    </div>
                    <div className="space-y-2"><label className="text-[11px] font-extrabold uppercase text-slate-400 ml-4">Nom Complet</label><input required name="name" defaultValue={currentUser.name} className="w-full h-20 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold text-gray-900" /></div>
                    <div className="space-y-2"><label className="text-[11px] font-extrabold uppercase text-slate-400 ml-4">Adresse Email</label><input required type="email" name="email" defaultValue={currentUser.email} className="w-full h-20 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold text-gray-900" /></div>

                    <div className="pt-6 border-t border-slate-100 space-y-6">
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-400 ml-4">Modifier le mot de passe</p>
                      <div className="space-y-2"><label className="text-[11px] font-extrabold uppercase text-slate-400 ml-4">Mot de passe actuel</label><input type="password" name="current_password" className="w-full h-20 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold text-gray-900" placeholder="Laisser vide pour ne pas changer" /></div>
                      <div className="space-y-2"><label className="text-[11px] font-extrabold uppercase text-slate-400 ml-4">Nouveau mot de passe</label><input type="password" name="new_password" minLength={6} className="w-full h-20 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold text-gray-900" placeholder="Minimum 6 caractères" /></div>
                      <div className="space-y-2"><label className="text-[11px] font-extrabold uppercase text-slate-400 ml-4">Confirmer le nouveau mot de passe</label><input type="password" name="confirm_password" minLength={6} className="w-full h-20 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold text-gray-900" placeholder="Répétez le mot de passe" /></div>
                    </div>
                  </div>
                )}

                <button type="submit" disabled={saving} className="w-full h-20 bg-primary text-white rounded-[24px] font-extrabold uppercase tracking-widest text-sm shadow-glow hover:bg-primary-dark transition-all flex items-center justify-center gap-4 disabled:opacity-60">
                  {saving ? (<><div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Enregistrement...</>) : modalType === 'profile' ? 'Sauvegarder le profil' : 'Valider les modifications'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
