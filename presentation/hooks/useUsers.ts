import { useAppContext } from '../context/AppProvider';

export function useUsers() {
  const { users, refreshUsers, createUser, updateUser, deleteUser } = useAppContext();
  return { users, refreshUsers, createUser, updateUser, deleteUser };
}
