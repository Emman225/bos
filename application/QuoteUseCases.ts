import { QuoteItem, QuoteRequest } from '../domain/entities/QuoteRequest';
import { Product } from '../domain/entities/Product';
import { QuoteRepository } from '../domain/ports/QuoteRepository';

export class QuoteUseCases {
  constructor(private repo: QuoteRepository) {}

  async getAll(): Promise<QuoteRequest[]> {
    try {
      return await this.repo.getAll();
    } catch (error: unknown) {
      console.error('Erreur lors du chargement des devis:', error);
      return [];
    }
  }

  async getById(id: string): Promise<QuoteRequest | undefined> {
    if (!id?.trim()) throw new Error('L\'identifiant du devis est requis.');
    try {
      return await this.repo.getById(id);
    } catch (error: unknown) {
      console.error(`Erreur lors du chargement du devis ${id}:`, error);
      return undefined;
    }
  }

  async submit(
    items: QuoteItem[],
    customer: QuoteRequest['customer'],
    notes?: string
  ): Promise<QuoteRequest> {
    if (!items || items.length === 0) throw new Error('Le devis doit contenir au moins un article.');
    if (!customer.name?.trim()) throw new Error('Le nom du client est requis.');
    if (!customer.email?.trim()) throw new Error('L\'email du client est requis.');

    const quote: QuoteRequest = {
      id: `QT-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      date: new Date().toLocaleDateString('fr-FR'),
      customer,
      items: [...items],
      status: 'pending',
      notes,
    };
    try {
      return await this.repo.save(quote);
    } catch (error: unknown) {
      console.error('Erreur lors de la soumission du devis:', error);
      throw error;
    }
  }

  async updateStatus(id: string, status: QuoteRequest['status']): Promise<void> {
    if (!id?.trim()) throw new Error('L\'identifiant du devis est requis.');
    try {
      return await this.repo.updateStatus(id, status);
    } catch (error: unknown) {
      console.error(`Erreur lors de la mise à jour du statut du devis ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    if (!id?.trim()) throw new Error('L\'identifiant du devis est requis.');
    try {
      return await this.repo.delete(id);
    } catch (error: unknown) {
      console.error(`Erreur lors de la suppression du devis ${id}:`, error);
      throw error;
    }
  }

  // These are pure client-side cart operations - stay synchronous
  addItemToCart(cart: QuoteItem[], product: Product): QuoteItem[] {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      return cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
    return [...cart, { product, quantity: 1 }];
  }

  removeItemFromCart(cart: QuoteItem[], productId: string): QuoteItem[] {
    return cart.filter(item => item.product.id !== productId);
  }

  updateItemQuantity(cart: QuoteItem[], productId: string, delta: number): QuoteItem[] {
    return cart.map(item =>
      item.product.id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
  }
}
