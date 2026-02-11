import { User } from '../domain/entities/User';
import { UserRepository } from '../domain/ports/UserRepository';

export class AuthUseCases {
  constructor(private repo: UserRepository) {}

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.repo.getAll();
    } catch (error: unknown) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
      return [];
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    if (!email?.trim()) throw new Error('L\'email est requis.');
    try {
      return await this.repo.getByEmail(email);
    } catch (error: unknown) {
      console.error(`Erreur lors de la recherche de l'utilisateur ${email}:`, error);
      return undefined;
    }
  }

  async createUser(user: User): Promise<void> {
    if (!user.name?.trim()) throw new Error('Le nom est requis.');
    if (!user.email?.trim()) throw new Error('L\'email est requis.');
    if (!user.role) throw new Error('Le rôle est requis.');
    try {
      return await this.repo.save(user);
    } catch (error: unknown) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      throw error;
    }
  }

  async updateUser(id: string, user: User): Promise<void> {
    if (!id?.trim()) throw new Error('L\'identifiant est requis.');
    if (!user.name?.trim()) throw new Error('Le nom est requis.');
    if (!user.email?.trim()) throw new Error('L\'email est requis.');
    try {
      return await this.repo.update(id, user);
    } catch (error: unknown) {
      console.error(`Erreur lors de la mise à jour de l'utilisateur ${id}:`, error);
      throw error;
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    if (!id?.trim()) throw new Error('L\'identifiant est requis.');
    const users = await this.repo.getAll();
    const user = users.find(u => u.id === id);
    if (user?.role === 'admin' && users.filter(u => u.role === 'admin').length <= 1) {
      return false;
    }
    try {
      await this.repo.delete(id);
      return true;
    } catch (error: unknown) {
      console.error(`Erreur lors de la suppression de l'utilisateur ${id}:`, error);
      throw error;
    }
  }
}
