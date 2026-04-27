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
        - İpucu alanları:
           - "hint1": Sadece Kasus veya çekim tipi (Örn: "Dativ", "Akkusativ", "Genitiv")
           - "hint2": Bağlam veya fiil ilişkisi (Örn: "Bağlam: Köken", "Fiil: warten auf + Akk")
        `;

        if (level === 'A2') {
            return `
        Konu: ${randomTopic}
        A2 seviyesindeki öğrenciler için "Präpositionen mit Dativ" ve "Wechselpräpositionen" (Değişken Edatlar) konusunda 20 adet alıştırma cümlesi hazırla.
        Odaklanılacak Edatlar: aus, bei, mit, nach, von, zu, in, an, auf, unter, vor, hinter, neben, zwischen.
        ${commonRules}
        1. Nominativ, Akkusativ ve Dativ durumlarını bağlama göre belirle.
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
            { id: 201, preGap: "Ich komme", postGap: "der Türkei.", answer: "aus", translation: "Türkiye'den geliyorum.", hint1: "Dativ", hint2: "Bağlam: Köken belirtir" },
            { id: 202, preGap: "Er fährt", postGap: "dem Bus zur Arbeit.", answer: "mit", translation: "İşe otobüsle gidiyor.", hint1: "Dativ", hint2: "Bağlam: Araç/Vasıta" },
            { id: 203, preGap: "Wir sind", postGap: "Hause.", answer: "zu", translation: "Evdeyiz. (zu Hause)", hint1: "Dativ", hint2: "İstisna: zu Hause" },
            { id: 204, preGap: "Ich gehe", postGap: "der Schule nach Hause.", answer: "nach", translation: "Okuldan sonra eve gidiyorum.", hint1: "Dativ", hint2: "Bağlam: Zaman (-den sonra)" },
            { id: 205, preGap: "Das Geschenk ist", postGap: "dich.", answer: "für", translation: "Hediye senin için.", hint1: "Akkusativ", hint2: "Edat: für" },
            { id: 206, preGap: "Der Tisch steht", postGap: "dem Fenster.", answer: "neben", translation: "Masa pencerenin yanında duruyor.", hint1: "Dativ", hint2: "Bağlam: Konum (Yanında)" },
            { id: 207, preGap: "Ich warte", postGap: "den Bus.", answer: "auf", translation: "Otobüsü bekliyorum.", hint1: "Akkusativ", hint2: "Fiil: warten auf + Akk" },
            { id: 208, preGap: "Er wohnt", postGap: "seinem Onkel.", answer: "bei", translation: "Amcasının yanında kalıyor.", hint1: "Dativ", hint2: "Bağlam: Birinin yanında kalmak" },
            { id: 209, preGap: "Wir gehen", postGap: "den Park.", answer: "in", translation: "Parka gidiyoruz.", hint1: "Akkusativ", hint2: "Bağlam: Yön (Nereye?)" },
            { id: 210, preGap: "Das Buch liegt", postGap: "dem Tisch.", answer: "auf", translation: "Kitap masanın üzerinde.", hint1: "Dativ", hint2: "Bağlam: Konum (Nerede?)" },
            { id: 211, preGap: "Sie kommt", postGap: "München.", answer: "aus", translation: "Münih'ten geliyor.", hint1: "Dativ", hint2: "Bağlam: Köken" },
            { id: 212, preGap: "Wir sprechen", postGap: "das Wetter.", answer: "über", translation: "Hava hakkında konuşuyoruz.", hint1: "Akkusativ", hint2: "Fiil: sprechen über + Akk" },
            { id: 213, preGap: "Er geht", postGap: "den Arzt.", answer: "zu", translation: "Doktora gidiyor.", hint1: "Dativ", hint2: "Bağlam: Bir kişiye gitmek" },
            { id: 214, preGap: "Der Zug fährt", postGap: "Berlin.", answer: "nach", translation: "Tren Berlin'e gidiyor.", hint1: "Dativ", hint2: "Bağlam: Şehir/Ülkeye yön" },
            { id: 215, preGap: "Ich trinke Kaffee", postGap: "Zucker.", answer: "ohne", translation: "Şekersiz kahve içiyorum.", hint1: "Akkusativ", hint2: "Edat: ohne" },
            { id: 216, preGap: "Das Bild hängt", postGap: "der Wand.", answer: "an", translation: "Resim duvarda asılı.", hint1: "Dativ", hint2: "Bağlam: Konum (Duvarda)" },
            { id: 217, preGap: "Wir fahren", postGap: "dem Auto.", answer: "mit", translation: "Arabayla gidiyoruz.", hint1: "Dativ", hint2: "Edat: mit" },
            { id: 218, preGap: "Er kommt", postGap: "10 Minuten.", answer: "in", translation: "10 dakika içinde geliyor.", hint1: "Dativ", hint2: "Bağlam: Gelecek zaman" },
            { id: 219, preGap: "Sie arbeitet", postGap: "einer Bank.", answer: "bei", translation: "Bir bankada çalışıyor.", hint1: "Dativ", hint2: "Bağlam: İş yeri" },
            { id: 220, preGap: "Gehen wir", postGap: "Kino?", answer: "ins", translation: "Sinemaya gidelim mi?", hint1: "Akkusativ", hint2: "Edat: in + das (Yön)" },
            { id: 221, preGap: "Der Schlüssel liegt", postGap: "der Tasche.", answer: "in", translation: "Anahtar çantanın içinde.", hint1: "Dativ", hint2: "Bağlam: Konum (İçinde)" },
            { id: 222, preGap: "Häng das Bild", postGap: "die Wand.", answer: "an", translation: "Resmi duvara as.", hint1: "Akkusativ", hint2: "Bağlam: Yön (Duvara)" },
            { id: 223, preGap: "Das Auto steht", postGap: "der Garage.", answer: "vor", translation: "Araba garajın önünde duruyor.", hint1: "Dativ", hint2: "Bağlam: Konum (Önünde)" },
            { id: 224, preGap: "Wir laufen", postGap: "den Wald.", answer: "durch", translation: "Ormanın içinden koşuyoruz.", hint1: "Akkusativ", hint2: "Edat: durch" },
            { id: 225, preGap: "Das Restaurant ist", postGap: "dem Kino.", answer: "hinter", translation: "Restoran sinemanın arkasında.", hint1: "Dativ", hint2: "Bağlam: Konum (Arkasında)" },
            { id: 226, preGap: "Ich fahre", postGap: "meiner Freundin.", answer: "zu", translation: "Kız arkadaşıma gidiyorum.", hint1: "Dativ", hint2: "Bağlam: Birine gitmek" },
            { id: 227, preGap: "Das Kind sitzt", postGap: "seinen Eltern.", answer: "zwischen", translation: "Çocuk ebeveynlerinin arasında oturuyor.", hint1: "Dativ", hint2: "Bağlam: Arasında" },
            { id: 228, preGap: "Wir spazieren", postGap: "dem Fluss.", answer: "entlang", translation: "Nehir boyunca yürüyoruz.", hint1: "Akkusativ", hint2: "Edat: entlang" },
            { id: 229, preGap: "Er fragt", postGap: "dem Weg.", answer: "nach", translation: "Yolu soruyor.", hint1: "Dativ", hint2: "Fiil: fragen nach + Dat" },
            { id: 230, preGap: "Das Obst liegt", postGap: "dem Korb.", answer: "in", translation: "Meyveler sepetin içinde.", hint1: "Dativ", hint2: "Bağlam: İçinde" },
            { id: 231, preGap: "Ich stelle die Vase", postGap: "den Tisch.", answer: "auf", translation: "Vazoyu masanın üstüne koyuyorum.", hint1: "Akkusativ", hint2: "Bağlam: Yön (Üstüne)" },
            { id: 232, preGap: "Wir fliegen", postGap: "Spanien.", answer: "nach", translation: "İspanya'ya uçuyoruz.", hint1: "Dativ", hint2: "Bağlam: Ülkeye yön" },
            { id: 233, preGap: "Der Hund schläft", postGap: "dem Bett.", answer: "unter", translation: "Köpek yatağın altında uyuyor.", hint1: "Dativ", hint2: "Bağlam: Altında" },
            { id: 234, preGap: "Seit", postGap: "einem Monat lerne ich Deutsch.", answer: "seit", translation: "Bir aydır Almanca öğreniyorum.", hint1: "Dativ", hint2: "Bağlam: Zaman (-den beri)" },
            { id: 235, preGap: "Wir treffen uns", postGap: "dem Bahnhof.", answer: "vor", translation: "İstasyonun önünde buluşuyoruz.", hint1: "Dativ", hint2: "Bağlam: Konum (Önünde)" },
            { id: 236, preGap: "Er geht", postGap: "die Bäckerei.", answer: "in", translation: "Fırına giriyor.", hint1: "Akkusativ", hint2: "Bağlam: Yön (İçine)" },
            { id: 237, preGap: "Das Brot ist", postGap: "gestern.", answer: "von", translation: "Ekmek dünden kalma.", hint1: "Dativ", hint2: "Edat: von" },
            { id: 238, preGap: "Ich kaufe Blumen", postGap: "meine Mutter.", answer: "für", translation: "Annem için çiçek alıyorum.", hint1: "Akkusativ", hint2: "Edat: für" },
            { id: 239, preGap: "Das Kind läuft", postGap: "die Straße.", answer: "über", translation: "Çocuk sokağın karşısına koşuyor.", hint1: "Akkusativ", hint2: "Edat: über (Yön)" },
            { id: 240, preGap: "Wir sitzen", postGap: "dem Balkon.", answer: "auf", translation: "Balkonda oturuyoruz.", hint1: "Dativ", hint2: "Bağlam: Konum (Üstünde)" }
        ];

        if (level === 'B1') {
            const b1Questions: Question[] = [
                { id: 301, preGap: "Wir bleiben", postGap: "des Regens zu Hause.", answer: "wegen", translation: "Yağmur nedeniyle evde kalıyoruz.", hint1: "Genitiv", hint2: "Edat: wegen + Gen" },
                { id: 302, preGap: "Er kam", postGap: "seiner Erkältung zur Arbeit.", answer: "trotz", translation: "Soğuk algınlığına rağmen işe geldi.", hint1: "Genitiv", hint2: "Edat: trotz + Gen" },
                { id: 303, preGap: "", postGap: "der Ferien habe ich çok okudum.", answer: "Während", translation: "Tatil boyunca çok okudum.", hint1: "Genitiv", hint2: "Edat: während + Gen" },
                { id: 304, preGap: "Sie wohnt", postGap: "der Stadtgrenze.", answer: "außerhalb", translation: "Şehir sınırının dışında yaşıyor.", hint1: "Genitiv", hint2: "Edat: außerhalb + Gen" },
                { id: 305, preGap: "Der Parkplatz ist", postGap: "des Hotels.", answer: "innerhalb", translation: "Otopark otelin içinde/dahilinde.", hint1: "Genitiv", hint2: "Edat: innerhalb + Gen" },
                { id: 306, preGap: "Anstatt", postGap: "eines Briefes schrieb er eine E-Mail.", answer: "anstatt", translation: "Mektup yerine bir e-posta yazdı.", hint1: "Genitiv", hint2: "Edat: anstatt + Gen" },
                { id: 307, preGap: "Wir freuen uns", postGap: "den Besuch.", answer: "auf", translation: "Ziyareti dört gözle bekliyoruz.", hint1: "Akkusativ", hint2: "Fiil: freuen auf + Akk" },
                { id: 308, preGap: "Er interessiert sich", postGap: "Almanca.", answer: "für", translation: "Almanca ile ilgileniyor.", hint1: "Akkusativ", hint2: "Fiil: interessieren für + Akk" },
                { id: 309, preGap: "Ich danke dir", postGap: "deine Hilfe.", answer: "für", translation: "Yardımın için sana teşekkür ederim.", hint1: "Akkusativ", hint2: "Edat: für" },
                { id: 310, preGap: "Sie träumt", postGap: "einem großen Haus.", answer: "von", translation: "Büyük bir ev hayal ediyor.", hint1: "Dativ", hint2: "Fiil: träumen von + Dat" },
                { id: 311, preGap: "Wir diskutieren", postGap: "das neue Gesetz.", answer: "über", translation: "Yeni yasayı tartışıyoruz.", hint1: "Akkusativ", hint2: "Fiil: diskutieren über + Akk" },
                { id: 312, preGap: "Aufgrund", postGap: "seiner Leistung bekam er den Job.", answer: "aufgrund", translation: "Performansı nedeniyle işi aldı.", hint1: "Genitiv", hint2: "Edat: aufgrund + Gen" },
                { id: 313, preGap: "Sie ist zufrieden", postGap: "ihrem Leben.", answer: "mit", translation: "Hayatından memnun.", hint1: "Dativ", hint2: "Fiil: zufrieden mit + Dat" },
                { id: 314, preGap: "Er hat Angst", postGap: "Hunden.", answer: "vor", translation: "Köpeklerden korkuyor.", hint1: "Dativ", hint2: "Fiil: Angst vor + Dat" },
                { id: 315, preGap: "Wir achten", postGap: "die Qualität.", answer: "auf", translation: "Kaliteye dikkat ediyoruz.", hint1: "Akkusativ", hint2: "Fiil: achten auf + Akk" },
                { id: 316, preGap: "Das hängt", postGap: "dem Wetter ab.", answer: "von", translation: "Bu havaya bağlı.", hint1: "Dativ", hint2: "Fiil: abhängen von + Dat" },
                { id: 317, preGap: "Ich lade dich", postGap: "meiner Party ein.", answer: "zu", translation: "Seni partime davet ediyorum.", hint1: "Dativ", hint2: "Fiil: einladen zu + Dat" },
                { id: 318, preGap: "Trotz", postGap: "des Verbots rauchte o.", answer: "trotz", translation: "Yasağa rağmen sigara içti.", hint1: "Genitiv", hint2: "Edat: trotz + Gen" },
                { id: 319, preGap: "Wir passen", postGap: "die Kinder auf.", answer: "auf", translation: "Çocuklara göz kulak oluyoruz.", hint1: "Akkusativ", hint2: "Fiil: aufpassen auf + Akk" },
                { id: 320, preGap: "Er erinnert sich", postGap: "seinen Urlaub.", answer: "an", translation: "Tatilini hatırlıyor.", hint1: "Akkusativ", hint2: "Fiil: erinnern an + Akk" }
            ];
            const combined = [...b1Questions, ...fallbackQuestions];
            return combined.sort(() => Math.random() - 0.5).slice(0, 20);
        }

        return fallbackQuestions.sort(() => Math.random() - 0.5).slice(0, 20);
    }
};
