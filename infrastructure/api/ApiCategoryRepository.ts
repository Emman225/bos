import { Category } from '../../domain/entities/Category';
import { CategoryRepository } from '../../domain/ports/CategoryRepository';
import { apiClient } from './ApiClient';

export class ApiCategoryRepository implements CategoryRepository {
  async getAll(): Promise<Category[]> {
    return apiClient.get<Category[]>('/categories');
  }

  async getById(id: string): Promise<Category | undefined> {
    try {
      return await apiClient.get<Category>(`/categories/${id}`);
    } catch {
      return undefined;
    }
  }

  async save(category: Category): Promise<void> {
    const { id, ...body } = category;
    await apiClient.post('/categories', body);
  }

  async update(id: string, category: Category): Promise<void> {
    const { id: _, ...body } = category;
    await apiClient.put(`/categories/${id}`, body);
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/categories/${id}`);
  }
}
