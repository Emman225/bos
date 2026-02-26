import { AppSettings } from '../../domain/entities/Settings';
import { SettingsRepository } from '../../domain/ports/SettingsRepository';
import { apiClient } from './ApiClient';

export class ApiSettingsRepository implements SettingsRepository {
  async getAll(): Promise<AppSettings> {
    return apiClient.get<AppSettings>('/settings');
  }

  async update(settings: Partial<AppSettings>): Promise<AppSettings> {
    return apiClient.put<AppSettings>('/settings', { settings });
  }
}
