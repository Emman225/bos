export interface AIService {
  getRecommendation(userNeeds: string): Promise<string>;
}
