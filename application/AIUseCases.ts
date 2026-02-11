import { AIService } from '../domain/ports/AIService';

export class AIUseCases {
  constructor(private service: AIService) {}

  async getRecommendation(userNeeds: string): Promise<string> {
    if (!userNeeds?.trim()) throw new Error('Veuillez décrire votre besoin.');
    try {
      return await this.service.getRecommendation(userNeeds);
    } catch (error: unknown) {
      console.error('Erreur lors de la recommandation IA:', error);
      return 'Désolé, le service de recommandation est temporairement indisponible.';
    }
  }
}
