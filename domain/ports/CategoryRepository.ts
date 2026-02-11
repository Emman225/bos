import { Category } from '../entities/Category';

export interface CategoryRepository {
  getAll(): Promise<Category[]>;
  getById(id: string): Promise<Category | undefined>;
  save(category: Category): Promise<void>;
  update(id: string, category: Category): Promise<void>;
  delete(id: string): Promise<void>;
}
