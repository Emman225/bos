import { GoogleGenAI } from "@google/genai";
import { AIService } from '../../domain/ports/AIService';

export class GeminiAIService implements AIService {
  async getRecommendation(userNeeds: string): Promise<string> {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `En tant qu'expert ingénieur télécom pour BOS-CI (leader en Côte d'Ivoire), analyse ce besoin client : "${userNeeds}".
        Suggère une liste d'équipements précis (ex: soudeuse Fujikura 90S+, réflectomètre VIAVI SmartOTDR) et justifie tes choix en mettant l'accent sur la qualité, le support local et le calibrage labo.
        Réponds en français de manière concise, technique et professionnelle. Ne dépasse pas 150 mots.`,
        config: {
          temperature: 0.6,
        },
      });

      return response.text || "Erreur de connexion.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Désolé, nos experts IA sont momentanément indisponibles. Veuillez contacter notre agence en Zone 4.";
    }
  }
}
