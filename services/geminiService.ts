import { GoogleGenAI, Type } from "@google/genai";
import { Question, UserLevel, TopicId } from "../types";
import { getTopicStrategy } from "./topics/registry";

const getApiKey = () => {
  return import.meta.env.VITE_API_KEY || process.env.API_KEY;
};

export const generateQuestions = async (level: UserLevel = 'A2', topicId: TopicId = 'possessivpronomen'): Promise<Question[]> => {
  const apiKey = getApiKey();
  const strategy = getTopicStrategy(topicId);

  // If no API key is set, return fallback data immediately (Mock Mode for Dev)
  if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
    console.warn("No valid API Key found. Using fallback data for testing.");
    return strategy.getFallbackQuestions(level);
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = "gemini-2.0-flash-exp";

  const levelPrompt = strategy.getPrompt(level);

  const prompt = `
    Sen uzman bir Almanca öğretmenisin.
    ${levelPrompt}
    Genel Kurallar:
    1. Hedef kelime dışında farklı bir kelime BOŞLUK OLAMAZ.
    2. Cevap SADECE hedef kelime olmalı (iyelik zamiri veya edat).
    3. Türkçe çevirisini ekle.
    4. İpucu mutlaka dilbilgisi kuralını (Kasus) belirtmeli.
    
    Çıktıyı kesinlikle belirtilen JSON şemasında ver.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.INTEGER },
              preGap: { type: Type.STRING, description: "Text before the blank space" },
              postGap: { type: Type.STRING, description: "Text after the blank space (including punctuation)" },
              answer: { type: Type.STRING, description: "The correct word to fill in" },
              translation: { type: Type.STRING, description: "Turkish translation of the full sentence" },
              hint: { type: Type.STRING, description: "Hint indicating the case or rule" }
            },
            required: ["id", "preGap", "postGap", "answer", "translation", "hint"]
          }
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text) as Question[];
      // Assign unique IDs based on timestamp to avoid collisions if merging history later
      return data.map((q, index) => ({ ...q, id: Date.now() + index }));
    }
    throw new Error("Boş yanıt döndü.");

  } catch (error) {
    console.error("Gemini API Error, using fallback data:", error);
    return strategy.getFallbackQuestions(level);
  }
};