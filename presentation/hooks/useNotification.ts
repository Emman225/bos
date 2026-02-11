import { useAppContext } from '../context/AppProvider';

export function useNotification() {
  const { notification, showNotification } = useAppContext();
  return { notification, showNotification };
}
