import { Product } from '../entities/Product';

export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<Product | undefined>;
  save(product: Product): Promise<void>;
  update(id: string, product: Product): Promise<void>;
  delete(id: string): Promise<void>;
}
