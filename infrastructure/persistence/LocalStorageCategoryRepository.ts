import { Category } from '../../domain/entities/Category';
import { CategoryRepository } from '../../domain/ports/CategoryRepository';
import { CATEGORIES } from '../seed/constants';

export class LocalStorageCategoryRepository implements CategoryRepository {
  private readonly KEY = 'bos_db_categories';

  constructor() {
    if (!localStorage.getItem(this.KEY)) {
      localStorage.setItem(this.KEY, JSON.stringify(CATEGORIES));
    }
  }

  async getAll(): Promise<Category[]> {
    const data = localStorage.getItem(this.KEY);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      console.error('Données catégories corrompues dans le localStorage.');
      return [];
    }
  }

  async getById(id: string): Promise<Category | undefined> {
    return (await this.getAll()).find(c => c.id === id);
  }

  async save(category: Category): Promise<void> {
    const categories = await this.getAll();
    categories.unshift(category);
    this.persist(categories);
  }

  async update(id: string, category: Category): Promise<void> {
    const categories = (await this.getAll()).map(c => (c.id === id ? category : c));
    this.persist(categories);
  }

  async delete(id: string): Promise<void> {
    const categories = (await this.getAll()).filter(c => c.id !== id);
    this.persist(categories);
  }

  private persist(categories: Category[]): void {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(categories));
    } catch (error: unknown) {
      console.error('Erreur de sauvegarde localStorage (quota dépassé ?):', error);
    }
  }
}
