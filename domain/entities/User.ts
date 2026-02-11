export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
  avatar?: string;
  mustChangePassword?: boolean;
  lastLogin?: string;
}
