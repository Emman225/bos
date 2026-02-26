import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Product } from '../../domain/entities/Product';
import { Category } from '../../domain/entities/Category';
import { QuoteItem, QuoteRequest } from '../../domain/entities/QuoteRequest';
import { User } from '../../domain/entities/User';
import { Session } from '../../domain/entities/Session';
import { AppSettings } from '../../domain/entities/Settings';

import { ProductUseCases } from '../../application/ProductUseCases';
import { CategoryUseCases } from '../../application/CategoryUseCases';
import { QuoteUseCases } from '../../application/QuoteUseCases';
import { AuthUseCases } from '../../application/AuthUseCases';
import { AIUseCases } from '../../application/AIUseCases';
import { SessionUseCases } from '../../application/SessionUseCases';
import { SettingsUseCases } from '../../application/SettingsUseCases';

import { ApiProductRepository } from '../../infrastructure/api/ApiProductRepository';
import { ApiCategoryRepository } from '../../infrastructure/api/ApiCategoryRepository';
import { ApiQuoteRepository } from '../../infrastructure/api/ApiQuoteRepository';
import { ApiUserRepository } from '../../infrastructure/api/ApiUserRepository';
import { ApiAIService } from '../../infrastructure/api/ApiAIService';
import { ApiSessionRepository } from '../../infrastructure/api/ApiSessionRepository';
import { ApiSettingsRepository } from '../../infrastructure/api/ApiSettingsRepository';
import { apiClient } from '../../infrastructure/api/ApiClient';

// --- Instantiate repositories (API infrastructure) ---
const productRepo = new ApiProductRepository();
const categoryRepo = new ApiCategoryRepository();
const quoteRepo = new ApiQuoteRepository();
const userRepo = new ApiUserRepository();
const aiService = new ApiAIService();
const sessionRepo = new ApiSessionRepository();
const settingsRepo = new ApiSettingsRepository();

// --- Instantiate use cases (application) ---
const productUseCases = new ProductUseCases(productRepo);
const categoryUseCases = new CategoryUseCases(categoryRepo);
const quoteUseCases = new QuoteUseCases(quoteRepo);
const authUseCases = new AuthUseCases(userRepo);
const aiUseCases = new AIUseCases(aiService);
const sessionUseCases = new SessionUseCases(sessionRepo);
const settingsUseCases = new SettingsUseCases(settingsRepo);

// --- Notification type ---
export interface Notification {
  message: string;
  type: 'success' | 'info' | 'error';
}

// --- Context shape ---
interface AppContextValue {
  // Loading
  isLoading: boolean;

  // Products
  products: Product[];
  refreshProducts: () => Promise<void>;
  createProduct: (product: Product) => Promise<void>;
  updateProduct: (id: string, product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;

  // Categories
  categories: Category[];
  refreshCategories: () => Promise<void>;
  createCategory: (category: Category) => Promise<void>;
  updateCategory: (id: string, category: Category) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;

  // Quotes
  quotes: QuoteRequest[];
  refreshQuotes: () => Promise<void>;
  submitQuote: (items: QuoteItem[], customer: QuoteRequest['customer'], notes?: string) => Promise<void>;
  updateQuoteStatus: (id: string, status: QuoteRequest['status']) => Promise<void>;

  // Cart
  quoteItems: QuoteItem[];
  addToQuote: (product: Product) => void;
  removeFromQuote: (productId: string) => void;
  updateItemQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;

  // Auth
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  users: User[];
  refreshUsers: () => Promise<void>;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  createUser: (user: User) => Promise<void>;
  updateUser: (id: string, user: User) => Promise<void>;
  deleteUser: (id: string) => Promise<boolean>;
  updateProfile: (data: { name: string; email: string; avatar?: string }) => Promise<User>;
  uploadAvatar: (file: File) => Promise<User>;
  changePassword: (currentPassword: string | null, password: string, passwordConfirmation: string) => Promise<void>;

  // Sessions
  sessions: Session[];
  refreshSessions: () => Promise<void>;
  createSession: (session: Session) => Promise<void>;
  updateSession: (id: string, session: Session) => Promise<void>;
  deleteSession: (id: string) => Promise<void>;

  // Settings
  settings: AppSettings;
  refreshSettings: () => Promise<void>;
  updateSettings: (settings: Partial<AppSettings>) => Promise<void>;

  // AI
  getRecommendation: (userNeeds: string) => Promise<string>;

  // Navigation
  currentPage: string;
  navParams: any;
  navigate: (page: string, params?: any) => void;

  // Notification
  notification: Notification | null;
  showNotification: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}

const CART_KEY = 'bos_quote_items';
const SESSION_KEY = 'bos_session_user';

// --- Page metadata for URL routing ---
const PAGE_META: Record<string, { title: string; path: string }> = {
  home: { title: 'BOS-CI | Distributeur Telecom & Fibre Optique - Abidjan', path: '/' },
  catalog: { title: 'Catalogue Produits | BOS-CI', path: '/catalogue' },
  about: { title: 'A Propos | BOS-CI', path: '/a-propos' },
  formation: { title: 'Formation & Academy | BOS-CI', path: '/formation' },
  contact: { title: 'Contact | BOS-CI', path: '/contact' },
  support: { title: 'Support Technique | BOS-CI', path: '/support' },
  expertise: { title: 'Expertise & Laboratoire | BOS-CI', path: '/expertise' },
  quote: { title: 'Demande de Devis | BOS-CI', path: '/devis' },
  solar: { title: 'Configurateur Solaire | BOS-CI', path: '/solaire' },
  product: { title: 'Fiche Produit | BOS-CI', path: '/produit' },
  login: { title: 'Connexion | BOS-CI', path: '/login' },
  admin: { title: 'Administration | BOS-CI', path: '/admin' },
};

const PATH_TO_PAGE: Record<string, string> = Object.fromEntries(
  Object.entries(PAGE_META).map(([page, meta]) => [meta.path, page])
);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // --- State ---
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [currentPage, setCurrentPage] = useState('home');
  const [navParams, setNavParams] = useState<any>(null);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [settings, setSettings] = useState<AppSettings>({ show_product_prices: false });

  // --- Validate stored session on mount ---
  useEffect(() => {
    if (apiClient.getToken()) {
      apiClient.get('/auth/me').catch(() => {
        apiClient.clearToken();
        setCurrentUser(null);
        localStorage.removeItem(SESSION_KEY);
      });
    }
  }, []);

  // --- Load data from API on mount ---
  useEffect(() => {
    Promise.all([
      productUseCases.getAll().then(setProducts),
      categoryUseCases.getAll().then(setCategories),
      sessionUseCases.getAll().then(setSessions),
      settingsUseCases.getAll().then(setSettings),
    ]).finally(() => setIsLoading(false));
  }, []);

  // --- Load admin data when user logs in ---
  useEffect(() => {
    if (currentUser && apiClient.getToken()) {
      authUseCases.getAllUsers().then(setUsers).catch(() => {});
      quoteUseCases.getAll().then(setQuotes).catch(() => {});
    }
  }, [currentUser]);

  // --- Persist cart ---
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(quoteItems));
  }, [quoteItems]);

  // --- Products ---
  const refreshProducts = useCallback(async () => {
    const data = await productUseCases.getAll();
    setProducts(data);
  }, []);
  const createProduct = useCallback(async (product: Product) => {
    await productUseCases.create(product);
    await refreshProducts();
  }, [refreshProducts]);
  const updateProduct = useCallback(async (id: string, product: Product) => {
    await productUseCases.update(id, product);
    await refreshProducts();
  }, [refreshProducts]);
  const deleteProduct = useCallback(async (id: string) => {
    await productUseCases.delete(id);
    await refreshProducts();
  }, [refreshProducts]);

  // --- Categories ---
  const refreshCategories = useCallback(async () => {
    const data = await categoryUseCases.getAll();
    setCategories(data);
  }, []);
  const createCategory = useCallback(async (category: Category) => {
    await categoryUseCases.create(category);
    await refreshCategories();
  }, [refreshCategories]);
  const updateCategory = useCallback(async (id: string, category: Category) => {
    await categoryUseCases.update(id, category);
    await refreshCategories();
  }, [refreshCategories]);
  const deleteCategory = useCallback(async (id: string) => {
    await categoryUseCases.delete(id);
    await refreshCategories();
  }, [refreshCategories]);

  // --- Sessions ---
  const refreshSessions = useCallback(async () => {
    const data = await sessionUseCases.getAll();
    setSessions(data);
  }, []);
  const createSession = useCallback(async (session: Session) => {
    await sessionUseCases.create(session);
    await refreshSessions();
  }, [refreshSessions]);
  const updateSession = useCallback(async (id: string, session: Session) => {
    await sessionUseCases.update(id, session);
    await refreshSessions();
  }, [refreshSessions]);
  const deleteSession = useCallback(async (id: string) => {
    await sessionUseCases.delete(id);
    await refreshSessions();
  }, [refreshSessions]);

  // --- Settings ---
  const refreshSettings = useCallback(async () => {
    const data = await settingsUseCases.getAll();
    setSettings(data);
  }, []);
  const updateSettings = useCallback(async (newSettings: Partial<AppSettings>) => {
    const data = await settingsUseCases.update(newSettings);
    setSettings(data);
  }, []);

  // --- Quotes ---
  const refreshQuotes = useCallback(async () => {
    const data = await quoteUseCases.getAll();
    setQuotes(data);
  }, []);
  const submitQuote = useCallback(async (items: QuoteItem[], customer: QuoteRequest['customer'], notes?: string) => {
    await quoteUseCases.submit(items, customer, notes);
    setQuoteItems([]);
    await refreshQuotes();
  }, [refreshQuotes]);
  const updateQuoteStatus = useCallback(async (id: string, status: QuoteRequest['status']) => {
    await quoteUseCases.updateStatus(id, status);
    await refreshQuotes();
  }, [refreshQuotes]);

  // --- Cart ---
  const addToQuote = useCallback((product: Product) => {
    setQuoteItems(prev => quoteUseCases.addItemToCart(prev, product));
  }, []);
  const removeFromQuote = useCallback((productId: string) => {
    setQuoteItems(prev => quoteUseCases.removeItemFromCart(prev, productId));
  }, []);
  const updateItemQuantity = useCallback((productId: string, delta: number) => {
    setQuoteItems(prev => quoteUseCases.updateItemQuantity(prev, productId, delta));
  }, []);
  const clearCart = useCallback(() => setQuoteItems([]), []);

  // --- Auth ---
  const refreshUsers = useCallback(async () => {
    const data = await authUseCases.getAllUsers();
    setUsers(data);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<User | null> => {
    try {
      const response = await apiClient.post<{ access_token: string; user: User }>('/auth/login', { email, password });
      apiClient.setToken(response.access_token);
      setCurrentUser(response.user);
      localStorage.setItem(SESSION_KEY, JSON.stringify(response.user));
      return response.user;
    } catch {
      return null;
    }
  }, []);

  const logout = useCallback(() => {
    apiClient.post('/auth/logout').catch(() => {});
    apiClient.clearToken();
    setCurrentUser(null);
    localStorage.removeItem(SESSION_KEY);
  }, []);

  const createUser = useCallback(async (user: User) => {
    await authUseCases.createUser(user);
    await refreshUsers();
  }, [refreshUsers]);
  const updateUser = useCallback(async (id: string, user: User) => {
    await authUseCases.updateUser(id, user);
    await refreshUsers();
  }, [refreshUsers]);
  const deleteUser = useCallback(async (id: string): Promise<boolean> => {
    const result = await authUseCases.deleteUser(id);
    if (result) await refreshUsers();
    return result;
  }, [refreshUsers]);

  // --- Profile ---
  const updateProfile = useCallback(async (data: { name: string; email: string; avatar?: string }): Promise<User> => {
    const updated = await apiClient.put<User>('/auth/profile', data);
    setCurrentUser(updated);
    localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
    return updated;
  }, []);

  const uploadAvatar = useCallback(async (file: File): Promise<User> => {
    const fd = new FormData();
    fd.append('avatar', file);
    const updated = await apiClient.postFormData<User>('/auth/avatar', fd);
    setCurrentUser(updated);
    localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
    return updated;
  }, []);

  const changePassword = useCallback(async (currentPassword: string | null, password: string, passwordConfirmation: string): Promise<void> => {
    const body: any = { password, password_confirmation: passwordConfirmation };
    if (currentPassword) body.current_password = currentPassword;
    await apiClient.put('/auth/password', body);
  }, []);

  // --- AI ---
  const getRecommendation = useCallback((userNeeds: string) => {
    return aiUseCases.getRecommendation(userNeeds);
  }, []);

  // --- Navigation ---
  const navigate = useCallback((page: string, params: any = null) => {
    setCurrentPage(page);
    setNavParams(params);
    const meta = PAGE_META[page] || { title: 'BOS-CI', path: '/' + page };
    document.title = meta.title;
    window.history.pushState({ page, params }, '', meta.path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      const state = e.state;
      if (state?.page) {
        setCurrentPage(state.page);
        setNavParams(state.params || null);
        const meta = PAGE_META[state.page] || { title: 'BOS-CI', path: '/' + state.page };
        document.title = meta.title;
      } else {
        setCurrentPage('home');
        setNavParams(null);
        document.title = PAGE_META.home.title;
      }
    };
    window.addEventListener('popstate', onPopState);

    // Resolve initial page from current URL path
    const pathname = window.location.pathname;
    const initialPage = PATH_TO_PAGE[pathname] || (pathname.startsWith('/admin') ? 'admin' : 'home');
    setCurrentPage(initialPage);
    const initialMeta = PAGE_META[initialPage] || PAGE_META.home;
    document.title = initialMeta.title;
    // Preserve full path for admin sub-routes (e.g. /admin/produits)
    const initialPath = initialPage === 'admin' ? pathname : initialMeta.path;
    window.history.replaceState({ page: initialPage, params: null }, '', initialPath);

    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // --- Notification ---
  const showNotification = useCallback((message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), type === 'error' ? 5000 : 3000);
  }, []);

  const value = useMemo<AppContextValue>(() => ({
    isLoading,
    products, refreshProducts, createProduct, updateProduct, deleteProduct,
    categories, refreshCategories, createCategory, updateCategory, deleteCategory,
    quotes, refreshQuotes, submitQuote, updateQuoteStatus,
    sessions, refreshSessions, createSession, updateSession, deleteSession,
    settings, refreshSettings, updateSettings,
    quoteItems, addToQuote, removeFromQuote, updateItemQuantity, clearCart,
    currentUser, setCurrentUser, users, refreshUsers, login, logout, createUser, updateUser, deleteUser, updateProfile, uploadAvatar, changePassword,
    getRecommendation,
    currentPage, navParams, navigate,
    notification, showNotification,
  }), [
    isLoading,
    products, refreshProducts, createProduct, updateProduct, deleteProduct,
    categories, refreshCategories, createCategory, updateCategory, deleteCategory,
    quotes, refreshQuotes, submitQuote, updateQuoteStatus,
    sessions, refreshSessions, createSession, updateSession, deleteSession,
    settings, refreshSettings, updateSettings,
    quoteItems, addToQuote, removeFromQuote, updateItemQuantity, clearCart,
    currentUser, setCurrentUser, users, refreshUsers, login, logout, createUser, updateUser, deleteUser, updateProfile, uploadAvatar, changePassword,
    getRecommendation,
    currentPage, navParams, navigate,
    notification, showNotification,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
