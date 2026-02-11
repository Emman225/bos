import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/ports/UserRepository';
import { apiClient } from './ApiClient';

export class ApiUserRepository implements UserRepository {
  async getAll(): Promise<User[]> {
    return apiClient.get<User[]>('/users');
  }

  async getByEmail(email: string): Promise<User | undefined> {
    const users = await this.getAll();
    return users.find(u => u.email === email);
  }

  async save(user: User): Promise<void> {
    await apiClient.post('/users', user);
  }

  async update(id: string, user: User): Promise<void> {
    await apiClient.put(`/users/${id}`, user);
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  }
}
