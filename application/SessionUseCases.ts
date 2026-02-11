import { Session } from '../domain/entities/Session';
import { SessionRepository } from '../domain/ports/SessionRepository';

export class SessionUseCases {
  constructor(private repo: SessionRepository) {}

  async getAll(): Promise<Session[]> {
    try {
      return await this.repo.getAll();
    } catch (error: unknown) {
      console.error('Erreur lors du chargement des sessions:', error);
      return [];
    }
  }

  async getById(id: string): Promise<Session | undefined> {
    if (!id?.trim()) throw new Error('L\'identifiant de la session est requis.');
    try {
      return await this.repo.getById(id);
    } catch (error: unknown) {
      console.error(`Erreur lors du chargement de la session ${id}:`, error);
      return undefined;
    }
  }

  async create(session: Session): Promise<void> {
    if (!session.subject?.trim()) throw new Error('Le sujet de la session est requis.');
    if (!session.module?.trim()) throw new Error('Le module est requis.');
    if (!session.date?.trim()) throw new Error('La date est requise.');
    try {
      return await this.repo.save(session);
    } catch (error: unknown) {
      console.error('Erreur lors de la creation de la session:', error);
      throw error;
    }
  }

  async update(id: string, session: Session): Promise<void> {
    if (!id?.trim()) throw new Error('L\'identifiant de la session est requis.');
    if (!session.subject?.trim()) throw new Error('Le sujet de la session est requis.');
    try {
      return await this.repo.update(id, session);
    } catch (error: unknown) {
      console.error(`Erreur lors de la mise a jour de la session ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    if (!id?.trim()) throw new Error('L\'identifiant de la session est requis.');
    try {
      return await this.repo.delete(id);
    } catch (error: unknown) {
      console.error(`Erreur lors de la suppression de la session ${id}:`, error);
      throw error;
    }
  }
}
