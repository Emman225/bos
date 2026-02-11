import { useAppContext } from '../context/AppProvider';

export function useProducts() {
  const { products, refreshProducts, createProduct, updateProduct, deleteProduct } = useAppContext();
  return { products, refreshProducts, createProduct, updateProduct, deleteProduct };
}
