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
      return data;
    }
    throw new Error("Boş yanıt döndü.");

  } catch (error) {
    console.error("Gemini API Error, using fallback data:", error);

    // Fallback Data (20 A2 Level Questions)
    const fallbackQuestions: Question[] = [
      { id: 1, preGap: "Das ist", postGap: "Buch.", answer: "mein", translation: "Bu benim kitabım.", hint: "ich (Nominativ)" },
      { id: 2, preGap: "Ist das", postGap: "Katze?", answer: "deine", translation: "Bu senin kedin mi?", hint: "du (Nominativ)" },
      { id: 3, preGap: "Wir besuchen", postGap: "Oma.", answer: "unsere", translation: "Biz büyükannemizi ziyaret ediyoruz.", hint: "wir (Akkusativ)" },
      { id: 4, preGap: "Herr Müller, wo ist", postGap: "Auto?", answer: "Ihr", translation: "Bay Müller, arabanız nerede?", hint: "Sie (Nominativ)" },
      { id: 5, preGap: "Sie gibt", postGap: "Bruder ein Geschenk.", answer: "ihrem", translation: "O, erkek kardeşine bir hediye veriyor.", hint: "sie (Dativ)" },
      { id: 6, preGap: "Wo wohnt", postGap: "Familie?", answer: "eure", translation: "Aileniz nerede yaşıyor?", hint: "ihr (Nominativ)" },
      { id: 7, preGap: "Er sucht", postGap: "Schlüssel.", answer: "seinen", translation: "O, anahtarını arıyor.", hint: "er (Akkusativ)" },
      { id: 8, preGap: "Das Kind spielt mit", postGap: "Ball.", answer: "seinem", translation: "Çocuk topuyla oynuyor.", hint: "es (Dativ)" },
      { id: 9, preGap: "Ich helfe", postGap: "Mutter.", answer: "meiner", translation: "Anneme yardım ediyorum.", hint: "ich (Dativ)" },
      { id: 10, preGap: "Kennst du", postGap: "Lehrer?", answer: "seinen", translation: "Onun (erkek) öğretmenini tanıyor musun?", hint: "er (Akkusativ)" },
      { id: 11, preGap: "Wir essen", postGap: "Apfel.", answer: "unseren", translation: "Biz elmamızı yiyoruz.", hint: "wir (Akkusativ)" },
      { id: 12, preGap: "Hast du", postGap: "Hausaufgaben gemacht?", answer: "deine", translation: "Ödevlerini yaptın mı?", hint: "du (Akkusativ)" },
      { id: 13, preGap: "Sie liebt", postGap: "Hund.", answer: "ihren", translation: "O, köpeğini seviyor.", hint: "sie (Akkusativ)" },
      { id: 14, preGap: "Lisa, nimm", postGap: "Tasche!", answer: "deine", translation: "Lisa, çantanı al!", hint: "du (Akkusativ)" },
      { id: 15, preGap: "Die Schüler öffnen", postGap: "Bücher.", answer: "ihre", translation: "Öğrenciler kitaplarını açıyorlar.", hint: "sie (çoğul) (Akkusativ)" },
      { id: 16, preGap: "Ich fahre mit", postGap: "Fahrrad.", answer: "mein", translation: "Bisikletimle gidiyorum.", hint: "ich (Dativ - mit + Dativ ama das Fahrrad, mein -> meinem olmalıydı, basitleştirilmiş olabilir mi? Kontrol: mit meinem Fahrrad. A2 kuralı. Düzeltiyorum: meinem)" },
      { id: 17, preGap: "Wir gratulieren", postGap: "Vater.", answer: "unserem", translation: "Babamızı tebrik ediyoruz.", hint: "wir (Dativ)" },
      { id: 18, preGap: "Ist das", postGap: "Stift?", answer: "dein", translation: "Bu senin kalemin mi?", hint: "du (Nominativ)" },
      { id: 19, preGap: "Sie (Onlar) besuchen", postGap: "Freunde.", answer: "ihre", translation: "Onlar arkadaşlarını ziyaret ediyorlar.", hint: "sie (çoğul) (Akkusativ)" },
      { id: 20, preGap: "Er dankt", postGap: "Lehrerin.", answer: "seiner", translation: "O, öğretmenine teşekkür ediyor.", hint: "er (Dativ)" }
    ];

    // Correction for question 16 in place within data if needed, but array literal is cleaner.
    // Overwriting fix for 16 just to be safe and accurate grammar:
    fallbackQuestions[15].answer = "meinem";

    return fallbackQuestions;
  }
};