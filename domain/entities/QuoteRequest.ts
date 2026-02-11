import { Product } from './Product';

export interface QuoteItem {
  product: Product;
  quantity: number;
}

export interface QuoteRequest {
  id: string;
  date: string;
  customer: {
    company: string;
    name: string;
    email: string;
    phone: string;
  };
  items: QuoteItem[];
  status: 'pending' | 'processed' | 'cancelled';
  notes?: string;
}
