import { User } from '../entities/User';

export interface UserRepository {
  getAll(): Promise<User[]>;
  getByEmail(email: string): Promise<User | undefined>;
  save(user: User): Promise<void>;
  update(id: string, user: User): Promise<void>;
  delete(id: string): Promise<void>;
}
