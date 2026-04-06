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
            "İş ve Toplantılar", "Randevular", "Tatil Anıları", "Alışveriş ve Market",
            "Okul ve Eğitim", "Sağlık ve Hastanede"
        ];
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];

        const commonRules = `
        Genel Kurallar:
        - Her seferinde FARKLI cümle yapıları ve kelimeler kullan. 
        - Cümleler doğal ve günlük hayattan olsun.
        - Sadece bir boşluk bırak ve o boşluk edat (Präposition) olsun.
        `;

        if (level === 'A2') {
            return `
        Konu: ${randomTopic}
        A2 seviyesindeki öğrenciler için "Präpositionen mit Dativ" ve "Wechselpräpositionen" (Değişken Edatlar) konusunda 20 adet alıştırma cümlesi hazırla.
        Odaklanılacak Edatlar: aus, bei, mit, nach, von, zu, in, an, auf, unter, vor, hinter, neben, zwischen.
        ${commonRules}
        1. Nominativ, Akkusativ ve Dativ durumlarını bağlama göre belirle.
        2. İpucu kısmında Kasus (Dativ/Akkusativ) belirtilmeli.
      `;
        } else {
            return `
        Konu: ${randomTopic}
        B1 seviyesindeki öğrenciler için "Präpositionen" (Genitiv dahil tüm edatlar) konusunda 20 adet ZORLU alıştırma cümlesi hazırla.
        Odaklanılacak Edatlar: wegen, trotz, während, anstatt, außerhalb, innerhalb (Genitiv), ayrıca Dativ ve Akkusativ edatları.
        ${commonRules}
        1. B1 seviyesine uygun, karmaşık cümle yapıları kullan.
        2. Genitiv edatlarını (wegen, trotz, während) mutlaka dahil et.
      `;
        }
    },
    getFallbackQuestions: (level: UserLevel) => {
        const fallbackQuestions: Question[] = [
            { id: 201, preGap: "Ich komme", postGap: "der Türkei.", answer: "aus", translation: "Türkiye'den geliyorum.", hint: "Dativ (köken)" },
            { id: 202, preGap: "Er fährt", postGap: "dem Bus zur Arbeit.", answer: "mit", translation: "İşe otobüsle gidiyor.", hint: "Dativ (araç)" },
            { id: 203, preGap: "Wir sind", postGap: "Hause.", answer: "zu", translation: "Evdeyiz. (zu Hause)", hint: "Dativ (İstisna)" },
            { id: 204, preGap: "Ich gehe", postGap: "der Schule nach Hause.", answer: "nach", translation: "Okuldan sonra eve gidiyorum.", hint: "Dativ (zaman)" },
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
            { id: 220, preGap: "Gehen wir", postGap: "Kino?", answer: "ins", translation: "Sinemaya gidelim mi?", hint: "Akkusativ (in das)" },
            { id: 221, preGap: "Der Schlüssel liegt", postGap: "der Tasche.", answer: "in", translation: "Anahtar çantanın içinde.", hint: "Dativ (nerede?)" },
            { id: 222, preGap: "Häng das Bild", postGap: "die Wand.", answer: "an", translation: "Resmi duvara as.", hint: "Akkusativ (nereye?)" },
            { id: 223, preGap: "Das Auto steht", postGap: "der Garage.", answer: "vor", translation: "Araba garajın önünde duruyor.", hint: "Dativ" },
            { id: 224, preGap: "Wir laufen", postGap: "den Wald.", answer: "durch", translation: "Ormanın içinden koşuyoruz.", hint: "Akkusativ" },
            { id: 225, preGap: "Das Restaurant ist", postGap: "dem Kino.", answer: "hinter", translation: "Restoran sinemanın arkasında.", hint: "Dativ" },
            { id: 226, preGap: "Ich fahre", postGap: "meiner Freundin.", answer: "zu", translation: "Kız arkadaşıma gidiyorum.", hint: "Dativ (kişiye yön)" },
            { id: 227, preGap: "Das Kind sitzt", postGap: "seinen Eltern.", answer: "zwischen", translation: "Çocuk ebeveynlerinin arasında oturuyor.", hint: "Dativ" },
            { id: 228, preGap: "Wir spazieren", postGap: "dem Fluss.", answer: "entlang", translation: "Nehir boyunca yürüyoruz.", hint: "Akkusativ (genelde arkasından gelir)" },
            { id: 229, preGap: "Er fragt", postGap: "dem Weg.", answer: "nach", translation: "Yolu soruyor.", hint: "Dativ (fragen nach)" },
            { id: 230, preGap: "Das Obst liegt", postGap: "dem Korb.", answer: "in", translation: "Meyveler sepetin içinde.", hint: "Dativ" },
            { id: 231, preGap: "Ich stelle die Vase", postGap: "den Tisch.", answer: "auf", translation: "Vazoyu masanın üstüne koyuyorum.", hint: "Akkusativ (nereye?)" },
            { id: 232, preGap: "Wir fliegen", postGap: "Spanien.", answer: "nach", translation: "İspanya'ya uçuyoruz.", hint: "Dativ" },
            { id: 233, preGap: "Der Hund schläft", postGap: "dem Bett.", answer: "unter", translation: "Köpek yatağın altında uyuyor.", hint: "Dativ" },
            { id: 234, preGap: "Seit", postGap: "einem Monat lerne ich Deutsch.", answer: "seit", translation: "Bir aydır Almanca öğreniyorum.", hint: "Dativ (zaman)" },
            { id: 235, preGap: "Wir treffen uns", postGap: "dem Bahnhof.", answer: "vor", translation: "İstasyonun önünde buluşuyoruz.", hint: "Dativ" },
            { id: 236, preGap: "Er geht", postGap: "die Bäckerei.", answer: "in", translation: "Fırına giriyor.", hint: "Akkusativ (yön)" },
            { id: 237, preGap: "Das Brot ist", postGap: "gestern.", answer: "von", translation: "Ekmek dünden kalma.", hint: "Dativ" },
            { id: 238, preGap: "Ich kaufe Blumen", postGap: "meine Mutter.", answer: "für", translation: "Annem için çiçek alıyorum.", hint: "Akkusativ" },
            { id: 239, preGap: "Das Kind läuft", postGap: "die Straße.", answer: "über", translation: "Çocuk sokağın karşısına koşuyor.", hint: "Akkusativ" },
            { id: 240, preGap: "Wir sitzen", postGap: "dem Balkon.", answer: "auf", translation: "Balkonda oturuyoruz.", hint: "Dativ (konum)" }
        ];

        if (level === 'B1') {
            const b1Questions: Question[] = [
                { id: 301, preGap: "Wir bleiben", postGap: "des Regens zu Hause.", answer: "wegen", translation: "Yağmur nedeniyle evde kalıyoruz.", hint: "Genitiv" },
                { id: 302, preGap: "Er kam", postGap: "seiner Erkältung zur Arbeit.", answer: "trotz", translation: "Soğuk algınlığına rağmen işe geldi.", hint: "Genitiv" },
                { id: 303, preGap: "", postGap: "der Ferien habe ich çok okudum.", answer: "Während", translation: "Tatil boyunca çok okudum.", hint: "Genitiv" },
                { id: 304, preGap: "Sie wohnt", postGap: "der Stadtgrenze.", answer: "außerhalb", translation: "Şehir sınırının dışında yaşıyor.", hint: "Genitiv" },
                { id: 305, preGap: "Der Parkplatz ist", postGap: "des Hotels.", answer: "innerhalb", translation: "Otopark otelin içinde/dahilinde.", hint: "Genitiv" },
                { id: 306, preGap: "Anstatt", postGap: "eines Briefes schrieb er eine E-Mail.", answer: "anstatt", translation: "Mektup yerine bir e-posta yazdı.", hint: "Genitiv" },
                { id: 307, preGap: "Wir freuen uns", postGap: "den Besuch.", answer: "auf", translation: "Ziyareti dört gözle bekliyoruz.", hint: "Akkusativ (freuen auf)" },
                { id: 308, preGap: "Er interessiert sich", postGap: "Almanca.", answer: "für", translation: "Almanca ile ilgileniyor.", hint: "Akkusativ (interessieren für)" },
                { id: 309, preGap: "Ich danke dir", postGap: "deine Hilfe.", answer: "für", translation: "Yardımın için sana teşekkür ederim.", hint: "Akkusativ" },
                { id: 310, preGap: "Sie träumt", postGap: "einem großen Haus.", answer: "von", translation: "Büyük bir ev hayal ediyor.", hint: "Dativ (träumen von)" },
                { id: 311, preGap: "Wir diskutieren", postGap: "das neue Gesetz.", answer: "über", translation: "Yeni yasayı tartışıyoruz.", hint: "Akkusativ" },
                { id: 312, preGap: "Aufgrund", postGap: "seiner Leistung bekam er den Job.", answer: "aufgrund", translation: "Performansı nedeniyle işi aldı.", hint: "Genitiv" },
                { id: 313, preGap: "Sie ist zufrieden", postGap: "ihrem Leben.", answer: "mit", translation: "Hayatından memnun.", hint: "Dativ" },
                { id: 314, preGap: "Er hat Angst", postGap: "Hunden.", answer: "vor", translation: "Köpeklerden korkuyor.", hint: "Dativ (Angst vor)" },
                { id: 315, preGap: "Wir achten", postGap: "die Qualität.", answer: "auf", translation: "Kaliteye dikkat ediyoruz.", hint: "Akkusativ (achten auf)" },
                { id: 316, preGap: "Das hängt", postGap: "dem Wetter ab.", answer: "von", translation: "Bu havaya bağlı.", hint: "Dativ (abhängen von)" },
                { id: 317, preGap: "Ich lade dich", postGap: "meiner Party ein.", answer: "zu", translation: "Seni partime davet ediyorum.", hint: "Dativ (einladen zu)" },
                { id: 318, preGap: "Trotz", postGap: "des Verbots rauchte o.", answer: "trotz", translation: "Yasağa rağmen sigara içti.", hint: "Genitiv" },
                { id: 319, preGap: "Wir passen", postGap: "die Kinder auf.", answer: "auf", translation: "Çocuklara göz kulak oluyoruz.", hint: "Akkusativ (aufpassen auf)" },
                { id: 320, preGap: "Er erinnert sich", postGap: "seinen Urlaub.", answer: "an", translation: "Tatilini hatırlıyor.", hint: "Akkusativ (erinnern an)" }
            ];
            const combined = [...b1Questions, ...fallbackQuestions];
            return combined.sort(() => Math.random() - 0.5).slice(0, 20);
        }

        return fallbackQuestions.sort(() => Math.random() - 0.5).slice(0, 20);
    }
};
