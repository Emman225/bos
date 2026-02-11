import { QuoteRequest } from '../../domain/entities/QuoteRequest';
import { QuoteRepository } from '../../domain/ports/QuoteRepository';

export class LocalStorageQuoteRepository implements QuoteRepository {
  private readonly KEY = 'bos_db_quotes';

  async getAll(): Promise<QuoteRequest[]> {
    const data = localStorage.getItem(this.KEY);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      console.error('Données devis corrompues dans le localStorage.');
      return [];
    }
  }

  async getById(id: string): Promise<QuoteRequest | undefined> {
    return (await this.getAll()).find(q => q.id === id);
  }

  async save(quote: QuoteRequest): Promise<QuoteRequest> {
    const quotes = await this.getAll();
    quotes.unshift(quote);
    this.persist(quotes);
    return quote;
  }

  async updateStatus(id: string, status: QuoteRequest['status']): Promise<void> {
    const quotes = (await this.getAll()).map(q => (q.id === id ? { ...q, status } : q));
    this.persist(quotes);
  }

  async delete(id: string): Promise<void> {
    const quotes = (await this.getAll()).filter(q => q.id !== id);
    this.persist(quotes);
  }

  private persist(quotes: QuoteRequest[]): void {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(quotes));
    } catch (error: unknown) {
      console.error('Erreur de sauvegarde localStorage (quota dépassé ?):', error);
    }
  }
}
