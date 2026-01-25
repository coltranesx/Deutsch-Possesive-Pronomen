import { GoogleGenAI, Type } from "@google/genai";
import { Question } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateQuestions = async (): Promise<Question[]> => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    Sen uzman bir Almanca öğretmenisin. A2 seviyesindeki öğrenciler için "Possessivpronomen" (İyelik Zamirleri) konusunda 20 adet alıştırma cümlesi hazırla.
    
    Kurallar:
    1. Cümleler A2 seviyesine uygun olmalı.
    2. Nominativ, Akkusativ ve Dativ durumlarını (kasus) karıştırarak kullan.
    3. Her cümle bir boşluk içermeli ve bu boşluğa doğru iyelik zamiri (mein, deine, seinem, nseren, vb.) gelmeli.
    4. Cevap sadece iyelik zamiri olmalı.
    5. Türkçe çevirisini de ekle.
    6. İpucu olarak hangi kişi zamirine atıfta bulunulduğunu belirt (örneğin: "ich -> ?", "wir -> ?").
    
    Çıktıyı kesinlikle JSON formatında ver.
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
              answer: { type: Type.STRING, description: "The correct possessive pronoun" },
              translation: { type: Type.STRING, description: "Turkish translation of the full sentence" },
              hint: { type: Type.STRING, description: "Hint indicating the owner, e.g. 'er (Dativ)'" }
            },
            required: ["id", "preGap", "postGap", "answer", "translation", "hint"]
          }
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text) as Question[];
      // Ensure specific characters are handled if necessary, but JSON parse should handle unicode.
      return data;
    }
    throw new Error("Boş yanıt döndü.");

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};