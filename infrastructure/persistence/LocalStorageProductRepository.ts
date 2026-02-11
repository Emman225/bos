import { Product } from '../../domain/entities/Product';
import { ProductRepository } from '../../domain/ports/ProductRepository';
import { PRODUCTS } from '../seed/constants';

export class LocalStorageProductRepository implements ProductRepository {
  private readonly KEY = 'bos_db_products';

  constructor() {
    if (!localStorage.getItem(this.KEY)) {
      localStorage.setItem(this.KEY, JSON.stringify(PRODUCTS));
    }
  }

  async getAll(): Promise<Product[]> {
    const data = localStorage.getItem(this.KEY);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      console.error('Données produits corrompues dans le localStorage.');
      return [];
    }
  }

  async getById(id: string): Promise<Product | undefined> {
    return (await this.getAll()).find(p => p.id === id);
  }

  async save(product: Product): Promise<void> {
    const products = await this.getAll();
    products.unshift(product);
    this.persist(products);
  }

  async update(id: string, product: Product): Promise<void> {
    const products = (await this.getAll()).map(p => (p.id === id ? product : p));
    this.persist(products);
  }

  async delete(id: string): Promise<void> {
    const products = (await this.getAll()).filter(p => p.id !== id);
    this.persist(products);
  }

  private persist(products: Product[]): void {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(products));
    } catch (error: unknown) {
      console.error('Erreur de sauvegarde localStorage (quota dépassé ?):', error);
    }
  }
}
