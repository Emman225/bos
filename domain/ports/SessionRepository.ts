import { Session } from '../entities/Session';

export interface SessionRepository {
  getAll(): Promise<Session[]>;
  getById(id: string): Promise<Session | undefined>;
  save(session: Session): Promise<void>;
  update(id: string, session: Session): Promise<void>;
  delete(id: string): Promise<void>;
}
