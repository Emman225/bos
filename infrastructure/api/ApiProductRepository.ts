import { Product } from '../../domain/entities/Product';
import { ProductRepository } from '../../domain/ports/ProductRepository';
import { apiClient } from './ApiClient';

export class ApiProductRepository implements ProductRepository {
  async getAll(): Promise<Product[]> {
    return apiClient.get<Product[]>('/products');
  }

  async getById(id: string): Promise<Product | undefined> {
    try {
      return await apiClient.get<Product>(`/products/${id}`);
    } catch {
      return undefined;
    }
  }

  async save(product: Product): Promise<void> {
    const { id, ...body } = product;
    await apiClient.post('/products', body);
  }

  async update(id: string, product: Product): Promise<void> {
    const { id: _, ...body } = product;
    await apiClient.put(`/products/${id}`, body);
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  }
}
