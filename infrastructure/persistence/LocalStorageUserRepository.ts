import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/ports/UserRepository';

export class LocalStorageUserRepository implements UserRepository {
  private readonly KEY = 'bos_db_users';

  constructor() {
    if (!localStorage.getItem(this.KEY)) {
      const defaultUsers: User[] = [
        { id: '1', name: 'Admin BOS', email: 'admin@bos-ci.com', role: 'admin' },
      ];
      localStorage.setItem(this.KEY, JSON.stringify(defaultUsers));
    }
  }

  async getAll(): Promise<User[]> {
    const data = localStorage.getItem(this.KEY);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      console.error('Données utilisateurs corrompues dans le localStorage.');
      return [];
    }
  }

  async getByEmail(email: string): Promise<User | undefined> {
    return (await this.getAll()).find(u => u.email === email);
  }

  async save(user: User): Promise<void> {
    const users = await this.getAll();
    users.unshift(user);
    this.persist(users);
  }

  async update(id: string, user: User): Promise<void> {
    const users = (await this.getAll()).map(u => (u.id === id ? user : u));
    this.persist(users);
  }

  async delete(id: string): Promise<void> {
    const users = (await this.getAll()).filter(u => u.id !== id);
    this.persist(users);
  }

  private persist(users: User[]): void {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(users));
    } catch (error: unknown) {
      console.error('Erreur de sauvegarde localStorage (quota dépassé ?):', error);
    }
  }
}
