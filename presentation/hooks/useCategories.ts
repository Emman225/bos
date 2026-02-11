import { useAppContext } from '../context/AppProvider';

export function useCategories() {
  const { categories, refreshCategories, createCategory, updateCategory, deleteCategory } = useAppContext();
  return { categories, refreshCategories, createCategory, updateCategory, deleteCategory };
}
