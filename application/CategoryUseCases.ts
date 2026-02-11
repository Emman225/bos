import { Category } from '../domain/entities/Category';
import { CategoryRepository } from '../domain/ports/CategoryRepository';

export class CategoryUseCases {
  constructor(private repo: CategoryRepository) {}

  async getAll(): Promise<Category[]> {
    try {
      return await this.repo.getAll();
    } catch (error: unknown) {
      console.error('Erreur lors du chargement des catégories:', error);
      return [];
    }
  }

  async getById(id: string): Promise<Category | undefined> {
    if (!id?.trim()) throw new Error('L\'identifiant de la catégorie est requis.');
    try {
      return await this.repo.getById(id);
    } catch (error: unknown) {
      console.error(`Erreur lors du chargement de la catégorie ${id}:`, error);
      return undefined;
    }
  }

  async create(category: Category): Promise<void> {
    if (!category.name?.trim()) throw new Error('Le nom de la catégorie est requis.');
    if (!category.description?.trim()) throw new Error('La description est requise.');
    try {
      return await this.repo.save(category);
    } catch (error: unknown) {
      console.error('Erreur lors de la création de la catégorie:', error);
      throw error;
    }
  }

  async update(id: string, category: Category): Promise<void> {
    if (!id?.trim()) throw new Error('L\'identifiant de la catégorie est requis.');
    if (!category.name?.trim()) throw new Error('Le nom de la catégorie est requis.');
    try {
      return await this.repo.update(id, category);
    } catch (error: unknown) {
      console.error(`Erreur lors de la mise à jour de la catégorie ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    if (!id?.trim()) throw new Error('L\'identifiant de la catégorie est requis.');
    try {
      return await this.repo.delete(id);
    } catch (error: unknown) {
      console.error(`Erreur lors de la suppression de la catégorie ${id}:`, error);
      throw error;
    }
  }
}
