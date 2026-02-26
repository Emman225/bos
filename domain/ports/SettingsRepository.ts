import { AppSettings } from '../entities/Settings';

export interface SettingsRepository {
  getAll(): Promise<AppSettings>;
  update(settings: Partial<AppSettings>): Promise<AppSettings>;
}
