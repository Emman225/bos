import { Session } from '../../domain/entities/Session';
import { SessionRepository } from '../../domain/ports/SessionRepository';
import { apiClient } from './ApiClient';

export class ApiSessionRepository implements SessionRepository {
  async getAll(): Promise<Session[]> {
    return apiClient.get<Session[]>('/sessions');
  }

  async getById(id: string): Promise<Session | undefined> {
    try {
      return await apiClient.get<Session>(`/sessions/${id}`);
    } catch {
      return undefined;
    }
  }

  async save(session: Session): Promise<void> {
    const { id, ...body } = session;
    await apiClient.post('/sessions', body);
  }

  async update(id: string, session: Session): Promise<void> {
    const { id: _, ...body } = session;
    await apiClient.put(`/sessions/${id}`, body);
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/sessions/${id}`);
  }
}
