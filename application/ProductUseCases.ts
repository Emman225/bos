import { Product } from '../domain/entities/Product';
import { ProductRepository } from '../domain/ports/ProductRepository';

export class ProductUseCases {
  constructor(private repo: ProductRepository) {}

  async getAll(): Promise<Product[]> {
    try {
      return await this.repo.getAll();
    } catch (error: unknown) {
      console.error('Erreur lors du chargement des produits:', error);
      return [];
    }
  }

  async getById(id: string): Promise<Product | undefined> {
    if (!id?.trim()) throw new Error('L\'identifiant du produit est requis.');
    try {
      return await this.repo.getById(id);
    } catch (error: unknown) {
      console.error(`Erreur lors du chargement du produit ${id}:`, error);
      return undefined;
    }
  }

  async create(product: Product): Promise<void> {
    if (!product.name?.trim()) throw new Error('Le nom du produit est requis.');
    if (!product.category?.trim()) throw new Error('La catégorie est requise.');
    if (!product.brand?.trim()) throw new Error('La marque est requise.');
    if (!product.ref?.trim()) throw new Error('La référence est requise.');
    try {
      return await this.repo.save(product);
    } catch (error: unknown) {
      console.error('Erreur lors de la création du produit:', error);
      throw error;
    }
  }

  async update(id: string, product: Product): Promise<void> {
    if (!id?.trim()) throw new Error('L\'identifiant du produit est requis.');
    if (!product.name?.trim()) throw new Error('Le nom du produit est requis.');
    try {
      return await this.repo.update(id, product);
    } catch (error: unknown) {
      console.error(`Erreur lors de la mise à jour du produit ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    if (!id?.trim()) throw new Error('L\'identifiant du produit est requis.');
    try {
      return await this.repo.delete(id);
    } catch (error: unknown) {
      console.error(`Erreur lors de la suppression du produit ${id}:`, error);
      throw error;
    }
  }
}
