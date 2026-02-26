export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  ref: string;
  image: string;
  images?: string[];
  description: string;
  features: string[];
  stock: boolean;
  isNew?: boolean;
  price?: number | null;
}
