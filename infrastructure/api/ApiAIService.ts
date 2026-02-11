import { AIService } from '../../domain/ports/AIService';
import { apiClient } from './ApiClient';

export class ApiAIService implements AIService {
  async getRecommendation(userNeeds: string): Promise<string> {
    try {
      const result = await apiClient.post<{ recommendation: string }>('/ai/recommend', { userNeeds });
      return result.recommendation;
    } catch {
      return "Désolé, nos experts IA sont momentanément indisponibles. Veuillez contacter notre agence en Zone 4.";
    }
  }
}
