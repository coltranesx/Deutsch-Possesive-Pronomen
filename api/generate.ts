import { GoogleGenAI } from "@google/genai";
import { possessivpronomenStrategy } from '../services/topics/possessivpronomen';
import { prepositionenStrategy } from '../services/topics/prepositionen';
import { adjektivdeklinationStrategy } from '../services/topics/adjektivdeklination';
import { TopicStrategy } from '../services/topics/types';
import { UserLevel, TopicId } from '../types';

// Vercel Serverless Function types (simplified to avoid 'any')
interface VercelRequest {
  method: string;
  body: {
    level?: UserLevel;
    topicId?: TopicId;
  };
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (data: unknown) => VercelResponse;
}

const topicRegistry: Record<string, TopicStrategy> = {
  'possessivpronomen': possessivpronomenStrategy,
  'prepositionen': prepositionenStrategy,
  'adjektivdeklination': adjektivdeklinationStrategy,
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { level, topicId } = req.body;

  // 2. Validate inputs
  if (!level || !topicId) {
    return res.status(400).json({ error: 'Missing level or topicId' });
  }

  const strategy = topicRegistry[topicId];
  if (!strategy) {
    return res.status(404).json({ error: 'Topic not found' });
  }

  // 3. Get API Key from Environment
  const apiKey = process.env.VITE_API_KEY || process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found in Environment Variables.");
    return res.status(500).json({ error: 'Server Configuration Error' });
  }

  // @google/genai usage pattern
  const genAI = new GoogleGenAI({ apiKey });

  const levelPrompt = strategy.getPrompt(level);

  const prompt = `
    Sen uzman bir Almanca öğretmenisin.
    ${levelPrompt}
    Genel Kurallar:
    1. Hedef kelime dışında farklı bir kelime BOŞLUK OLAMAZ.
    2. Cevap SADECE hedef kelime olmalı (iyelik zamiri, edat veya sıfat çekimi).
    3. Türkçe çevirisini ekle.
    4. İpucu mutlaka dilbilgisi kuralını (Kasus) belirtmeli.
    
    Çıktıyı kesinlikle belirtilen JSON formatında bir liste (Array) olarak ver.
    Örnek yapı: [{"id": 1, "preGap": "Das ist ", "postGap": " Buch.", "answer": "mein", "translation": "Bu benim kitabım.", "hint": "ich (Nominativ)"}]
  `;

  try {
    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = result.text;
    if (!text) {
      throw new Error("No text returned from Gemini");
    }
    
    // Parse to ensure it's valid JSON before sending
    const data = JSON.parse(text);
    return res.status(200).json(data);

  } catch (error) {
    console.error("Gemini API Error in Serverless Function:", error);
    return res.status(500).json({ error: 'Failed to generate content' });
  }
}

