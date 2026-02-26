import { AppSettings } from '../domain/entities/Settings';
import { SettingsRepository } from '../domain/ports/SettingsRepository';

export class SettingsUseCases {
  constructor(private repo: SettingsRepository) {}

  async getAll(): Promise<AppSettings> {
    try {
      return await this.repo.getAll();
    } catch (error: unknown) {
      console.error('Erreur lors du chargement des paramètres:', error);
      return { show_product_prices: false };
    }
  }

  async update(settings: Partial<AppSettings>): Promise<AppSettings> {
    try {
      return await this.repo.update(settings);
    } catch (error: unknown) {
      console.error('Erreur lors de la mise à jour des paramètres:', error);
      throw error;
    }
  }
}
