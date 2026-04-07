import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Standalone Types - No relative imports to avoid Vercel ESM errors
type UserLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
type TopicId = 'possessivpronomen' | 'prepositionen' | 'adjektivdeklination';

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

// 2. Embedded Prompt Logic - Zero external dependencies
const getPromptForTopic = (topicId: TopicId, level: UserLevel): string => {
  const commonRules = `
    Genel Kurallar:
    - Her seferinde FARKLI cümle yapıları ve kelimeler kullan. 
    - Cümleler doğal ve günlük hayattan olsun.
    - SADECE BİR boşluk bırak.
    - Boşluk kısmına gelecek cevap (etiket) SADECE hedef dilbilgisi birimi olsun.
  `;

  if (topicId === 'possessivpronomen') {
    const topics = ["Seyahat", "İş Hayatı", "Günlük Rutin", "Alışveriş", "Sağlık", "Teknoloji", "Aile", "Yemek"];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    if (level === 'A2') {
      return `Konu: ${randomTopic}. A2 seviyesi "Possessivpronomen" (İyelik Zamirleri) 20 alıştırma. ${commonRules} Nominativ, Akkusativ, Dativ dengeli olsun.`;
    }
    return `Konu: ${randomTopic}. B1 seviyesi "Possessivpronomen" 20 ZORLU alıştırma. ${commonRules} Yan cümleler ve Genitiv dahil et.`;
  }

  if (topicId === 'prepositionen') {
    const topics = ["Yön Bulma", "Seyahat", "Ulaşım", "Konum", "Toplantılar", "Tatil"];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    if (level === 'A2') {
      return `Konu: ${randomTopic}. A2 seviyesi "Präpositionen mit Dativ" ve "Wechselpräpositionen" 20 alıştırma. ${commonRules} aus, bei, mit, nach, von, zu, in, an, auf, unter vb. kullan.`;
    }
    return `Konu: ${randomTopic}. B1 seviyesi "Präpositionen" (Genitiv dahil) 20 ZORLU alıştırma. ${commonRules} wegen, trotz, während, anstatt (Genitiv) dahil olsun.`;
  }

  if (topicId === 'adjektivdeklination') {
    const topics = ["Moda", "Ev Arayışı", "Restoran", "Hava Durumu", "İnsan Tanımlama"];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    if (level === 'A2') {
      return `Konu: ${randomTopic}. A2 seviyesi "Adjektivdeklination" (Sıfat Çekimleri) 20 alıştırma. ${commonRules} Belirli, belirsiz ve artikelsiz çekimleri dengeli dağıt.`;
    }
    return `Konu: ${randomTopic}. B1 seviyesi "Adjektivdeklination" 20 ZORLU alıştırma. ${commonRules} Genitiv çekimlerini (des/der + -en) mutlaka dahil et.`;
  }

  return "";
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { level = 'A2', topicId = 'possessivpronomen' } = req.body;

  // 3. API Key from Environment
  const apiKey = process.env.VITE_API_KEY;
  if (!apiKey) {
    console.error("Critical Error: VITE_API_KEY missing in Vercel settings.");
    return res.status(500).json({ error: 'Server Configuration Error' });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const levelPrompt = getPromptForTopic(topicId as TopicId, level as UserLevel);

  const prompt = `
    Sen uzman bir Almanca öğretmenisin.
    ${levelPrompt}
    Mecburi Çıktı Formatı (SADECE JSON):
    1. Boşluk olan yer iyelik zamiri, edat veya sıfat çekimi olmalı.
    2. Türkçe çevirisini ekle.
    3. İpucu mutlaka Kasus belirtmeli.
    
    JSON Liste (Array) olarak ver: [{"id": 1, "preGap": "Das ist ", "postGap": " Buch.", "answer": "mein", "translation": "Bu benim kitabım.", "hint": "ich (Nominativ)"}]
    Not: Markdown backticks (\`\`\`) veya açıklama istemiyorum. SADECE saf JSON.
  `;

  try {
    // gemini-2.0-flash-001 is the stable alias for new API keys
    const model = genAI.getGenerativeModel(
      { model: "gemini-2.0-flash-001" },
      { apiVersion: "v1beta" }
    );
    const result = await model.generateContent(prompt);

    let text = result.response.text();
    if (!text) throw new Error("API returned empty text");

    // Clean JSON markdown if any
    text = text.trim();
    if (text.startsWith('```')) {
      text = text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
    }
    
    const data = JSON.parse(text);
    return res.status(200).json(data);

  } catch (error: any) {
    console.error("Gemini Lambda Error:", error?.message || error);
    return res.status(500).json({ 
      error: 'Generation failed', 
      details: error?.message || 'Unknown error'
    });
  }
}
