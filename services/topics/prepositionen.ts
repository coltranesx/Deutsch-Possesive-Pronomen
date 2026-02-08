import { Question, UserLevel } from '../../types';
import { TopicStrategy } from './types';

export const prepositionenStrategy: TopicStrategy = {
    metadata: {
        id: 'prepositionen',
        title: 'Edatlar (Präpositionen)',
        description: 'Aus, bei, mit, nach, von, zu...',
        icon: '📍',
    },
    getPrompt: (level: UserLevel) => {
        const topics = [
            "Şehirde Yön Bulma", "Seyahat Planları", "Günlük Ulaşım", "Ev ve Konum",
            "İş ve Toplantılar", "Randevular", "Tatil Anıları"
        ];
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];

        if (level === 'A2') {
            return `
        Konu: ${randomTopic}
        A2 seviyesindeki öğrenciler için "Präpositionen mit Dativ" (Dativ Alan Edatlar) ve "Wechselpräpositionen" (Değişken Edatlar) konusunda 20 adet alıştırma cümlesi hazırla.
        Odaklanılacak Edatlar: aus, bei, mit, nach, seid, von, zu, in, an, auf.
        Kurallar:
        1. Cümleler A2 seviyesine uygun, ${randomTopic} bağlamında olmalı.
        2. Cevaplar SADECE edat (Präposition) olmalı.
        3. İpucu kısmında hangi Kasus (Dativ/Akkusativ) olduğu belirtilmeli.
      `;
        } else {
            return `
        Konu: ${randomTopic}
        B1 seviyesindeki öğrenciler için "Präpositionen" (Tüm Edatlar) konusunda 20 adet orta-zorlukta alıştırma cümlesi hazırla.
        Odaklanılacak Edatlar: wegen, trotz, während (Genitiv), ayrıca Dativ ve Akkusativ edatları.
        Kurallar:
        1. Cümleler B1 seviyesine uygun, ${randomTopic} bağlamında daha karmaşık olmalı.
        2. Genitiv edatlarını (wegen, trotz) mutlaka içermeli.
        3. Cevaplar SADECE edat olmalı.
        4. İpucu kısmında hangi Kasus olduğu belirtilmeli.
      `;
        }
    },
    getFallbackQuestions: (level: UserLevel) => {
        const fallbackQuestions: Question[] = [
            { id: 201, preGap: "Ich komme", postGap: "der Türkei.", answer: "aus", translation: "Türkiye'den geliyorum.", hint: "Dativ (köken)" },
            { id: 202, preGap: "Er fährt", postGap: "dem Bus zur Arbeit.", answer: "mit", translation: "İşe otobüsle gidiyor.", hint: "Dativ (araç)" },
            { id: 203, preGap: "Wir sind", postGap: "Hause.", answer: "zu", translation: "Evdeyiz. (İstisna: zu Hause)", hint: "Dativ (konum)" },
            { id: 204, preGap: "Ich gehe", postGap: "der Schule.", answer: "nach", translation: "Okuldan sonra (eve gidiyorum anlamında değil, zaman anlamında ise 'nach', mekan ise 'zu/in'). Basit: Eve gidiyorum -> nach Hause.", hint: "Dativ (yön)" },
            // Düzeltme: "Ich gehe nach der Schule" (Okuldan sonra) veya "Ich gehe zur Schule". 
            // Basit örnekler verelim.
            { id: 205, preGap: "Das Geschenk ist", postGap: "dich.", answer: "für", translation: "Hediye senin için.", hint: "Akkusativ" },
            { id: 206, preGap: "Der Tisch steht", postGap: "dem Fenster.", answer: "neben", translation: "Masa pencerenin yanında duruyor.", hint: "Dativ (konum)" },
            { id: 207, preGap: "Ich warte", postGap: "den Bus.", answer: "auf", translation: "Otobüsü bekliyorum.", hint: "Akkusativ (warten auf)" },
            { id: 208, preGap: "Er wohnt", postGap: "seinem Onkel.", answer: "bei", translation: "Amcasının yanında kalıyor.", hint: "Dativ" },
            { id: 209, preGap: "Wir gehen", postGap: "den Park.", answer: "in", translation: "Parka gidiyoruz.", hint: "Akkusativ (yön)" },
            { id: 210, preGap: "Das Buch liegt", postGap: "dem Tisch.", answer: "auf", translation: "Kitap masanın üzerinde.", hint: "Dativ (konum)" },
            { id: 211, preGap: "Sie kommt", postGap: "München.", answer: "aus", translation: "Münih'ten geliyor.", hint: "Dativ" },
            { id: 212, preGap: "Wir sprechen", postGap: "das Wetter.", answer: "über", translation: "Hava hakkında konuşuyoruz.", hint: "Akkusativ" },
            { id: 213, preGap: "Er geht", postGap: "den Arzt.", answer: "zu", translation: "Doktora gidiyor.", hint: "Dativ (kişiye yön)" },
            { id: 214, preGap: "Der Zug fährt", postGap: "Berlin.", answer: "nach", translation: "Tren Berlin'e gidiyor.", hint: "Dativ (şehir/ülke)" },
            { id: 215, preGap: "Ich trinke Kaffee", postGap: "Zucker.", answer: "ohne", translation: "Şekersiz kahve içiyorum.", hint: "Akkusativ" },
            { id: 216, preGap: "Das Bild hängt", postGap: "der Wand.", answer: "an", translation: "Resim duvarda asılı.", hint: "Dativ (konum)" },
            { id: 217, preGap: "Wir fahren", postGap: "dem Auto.", answer: "mit", translation: "Arabayla gidiyoruz.", hint: "Dativ" },
            { id: 218, preGap: "Er kommt", postGap: "10 Minuten.", answer: "in", translation: "10 dakika içinde geliyor.", hint: "Dativ (zaman)" },
            { id: 219, preGap: "Sie arbeitet", postGap: "einer Bank.", answer: "bei", translation: "Bir bankada çalışıyor.", hint: "Dativ" },
            { id: 220, preGap: "Gehen wir", postGap: "Kino?", answer: "ins", translation: "Sinemaya gidelim mi?", hint: "Akkusativ (in das)" }
        ];

        if (level === 'B1') {
            const b1Questions: Question[] = [
                { id: 301, preGap: "Wir bleiben", postGap: "des Regens zu Hause.", answer: "wegen", translation: "Yağmur nedeniyle evde kalıyoruz.", hint: "Genitiv" },
                { id: 302, preGap: "Er kam", postGap: "seiner Erkältung zur Arbeit.", answer: "trotz", translation: "Soğuk algınlığına rağmen işe geldi.", hint: "Genitiv" },
                { id: 303, preGap: "", postGap: "der Ferien habe ich viel gelesen.", answer: "Während", translation: "Tatil boyunca çok okudum.", hint: "Genitiv" },
                { id: 304, preGap: "Sie wohnt", postGap: "der Stadtgrenze.", answer: "außerhalb", translation: "Şehir sınırının dışında yaşıyor.", hint: "Genitiv" },
                { id: 305, preGap: "Der Parkplatz ist", postGap: "des Hotels.", answer: "innerhalb", translation: "Otopark otelin içinde/dahilinde.", hint: "Genitiv" }
            ];

            const combined = [...b1Questions, ...fallbackQuestions];
            return combined.sort(() => Math.random() - 0.5).slice(0, 20);
        }

        return fallbackQuestions.sort(() => Math.random() - 0.52);
    }
};
