import { QuoteRequest } from '../../domain/entities/QuoteRequest';
import { QuoteRepository } from '../../domain/ports/QuoteRepository';
import { apiClient } from './ApiClient';

export class ApiQuoteRepository implements QuoteRepository {
  async getAll(): Promise<QuoteRequest[]> {
    return apiClient.get<QuoteRequest[]>('/quotes');
  }

  async getById(id: string): Promise<QuoteRequest | undefined> {
    try {
      return await apiClient.get<QuoteRequest>(`/quotes/${id}`);
    } catch {
      return undefined;
    }
  }

  async save(quote: QuoteRequest): Promise<QuoteRequest> {
    return apiClient.post<QuoteRequest>('/quotes', {
      customer: quote.customer,
      items: quote.items.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
      notes: quote.notes,
    });
  }

  async updateStatus(id: string, status: QuoteRequest['status']): Promise<void> {
    await apiClient.patch(`/quotes/${id}/status`, { status });
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/quotes/${id}`);
  }
}
