import { Question, UserLevel } from '../../types';
import { TopicStrategy } from './types';

export const possessivpronomenStrategy: TopicStrategy = {
    metadata: {
        id: 'possessivpronomen',
        title: 'İyelik Zamirleri',
        description: 'Mein, dein, sein, ihr...',
        icon: '👤',
    },
    getPrompt: (level: UserLevel) => {
        const topics = [
            "Seyahat ve Tatil", "İş Hayatı ve Ofis", "Günlük Rutin", "Alışveriş ve Moda",
            "Sağlık ve Spor", "Eğitim ve Okul", "Teknoloji", "Aile ve Arkadaşlar",
            "Yemek ve Mutfak", "Şehir Hayatı"
        ];
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];

        if (level === 'A2') {
            return `
        Konu: ${randomTopic}
        A2 seviyesindeki öğrenciler için "Possessivpronomen" (İyelik Zamirleri) konusunda 20 adet alıştırma cümlesi hazırla.
        Kurallar:
        1. Cümleler A2 seviyesine uygun, ${randomTopic} bağlamında olmalı.
        2. Nominativ, Akkusativ ve Dativ durumlarını karışık kullan.
        3. Basit ve anlaşılır cümleler kur.
      `;
        } else {
            return `
        Konu: ${randomTopic}
        B1 seviyesindeki öğrenciler için "Possessivpronomen" (İyelik Zamirleri) konusunda 20 adet ZORLU alıştırma cümlesi hazırla.
        Kurallar:
        1. Cümleler B1 seviyesine uygun, ${randomTopic} bağlamında daha karmaşık ve uzun olmalı.
        2. Yan cümleler (Nebensätze), ilgi cümleleri (Relativsätze) ve bağlaçlar (weil, dass, wenn, obwol) kullan.
        3. Genitiv yapısını da (nadiren de olsa) dahil et.
        4. Kelime dağarcığı B1 seviyesinde olsun.
      `;
        }
    },
    getFallbackQuestions: (level: UserLevel) => {
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
            { id: 16, preGap: "Ich fahre mit", postGap: "Fahrrad.", answer: "meinem", translation: "Bisikletimle gidiyorum.", hint: "ich (Dativ)" },
            { id: 17, preGap: "Wir gratulieren", postGap: "Vater.", answer: "unserem", translation: "Babamızı tebrik ediyoruz.", hint: "wir (Dativ)" },
            { id: 18, preGap: "Ist das", postGap: "Stift?", answer: "dein", translation: "Bu senin kalemin mi?", hint: "du (Nominativ)" },
            { id: 19, preGap: "Sie (Onlar) besuchen", postGap: "Freunde.", answer: "ihre", translation: "Onlar arkadaşlarını ziyaret ediyorlar.", hint: "sie (çoğul) (Akkusativ)" },
            { id: 20, preGap: "Er dankt", postGap: "Lehrerin.", answer: "seiner", translation: "O, öğretmenine teşekkür ediyor.", hint: "er (Dativ)" }
        ];

        if (level === 'B1') {
            const b1Questions: Question[] = [
                { id: 101, preGap: "Wegen", postGap: "Krankheit konnte er nicht kommen.", answer: "seiner", translation: "Hastalığı yüzünden gelemedi.", hint: "er (Genitiv - wegen + Gen)" },
                { id: 102, preGap: "Während", postGap: "Urlaubs hat es viel geregnet.", answer: "unseres", translation: "Tatilimiz boyunca çok yağmur yağdı.", hint: "wir (Genitiv)" },
                { id: 103, preGap: "Ich weiß nicht, ob ich", postGap: "Meinung ändern soll.", answer: "meine", translation: "Fikrimi değiştirip değiştirmemem gerektiğini bilmiyorum.", hint: "ich (Akkusativ)" },
                { id: 104, preGap: "Das ist die Frau, die", postGap: "Mann sucht.", answer: "ihren", translation: "Bu, kocasını arayan kadın.", hint: "sie (Akkusativ)" },
                { id: 105, preGap: "Trotz", postGap: "Bemühungen war der Erfolg klein.", answer: "ihrer", translation: "Çabalarına (onların) rağmen başarı küçüktü.", hint: "sie çoğul (Genitiv)" }
            ];
            // Combine and shuffle
            const combined = [...b1Questions, ...fallbackQuestions];
            return combined.sort(() => Math.random() - 0.5).slice(0, 20);
        }
        return fallbackQuestions.sort(() => Math.random() - 0.5);
    }
};
