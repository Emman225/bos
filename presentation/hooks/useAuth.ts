import { useAppContext } from '../context/AppProvider';

export function useAuth() {
  const { currentUser, login, logout, navigate } = useAppContext();

  const loginAndRedirect = async (email: string, password: string): Promise<boolean> => {
    const user = await login(email, password);
    if (user) {
      navigate('admin');
      return true;
    }
    return false;
  };

  const logoutAndRedirect = () => {
    logout();
    navigate('home');
  };

  return { currentUser, login: loginAndRedirect, logout: logoutAndRedirect };
}
