import { QuoteRequest } from '../entities/QuoteRequest';

export interface QuoteRepository {
  getAll(): Promise<QuoteRequest[]>;
  getById(id: string): Promise<QuoteRequest | undefined>;
  save(quote: QuoteRequest): Promise<QuoteRequest>;
  updateStatus(id: string, status: QuoteRequest['status']): Promise<void>;
  delete(id: string): Promise<void>;
}
