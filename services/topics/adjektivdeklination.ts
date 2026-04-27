import { Question, UserLevel } from '../../types';
import { TopicStrategy } from './types';

export const adjektivdeklinationStrategy: TopicStrategy = {
    metadata: {
        id: 'adjektivdeklination',
        title: 'Sıfat Çekimleri',
        description: 'Der gute Mann, ein großes Haus...',
        icon: '🎨',
        category: 'Gramer',
    },
    getPrompt: (level: UserLevel) => {
        const topics = [
            "Moda ve Giyim", "Ev Arayışı", "Restoran ve Yemek", "Hava Durumu", 
            "Tatil ve Gezi", "İnsanları Tanımlama", "Alışveriş", "Teknoloji Duyuruları"
        ];
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];

        const commonRules = `
        Genel Kurallar:
        - Her seferinde FARKLI cümle yapıları ve kelimeler kullan. 
        - Cümleler doğal ve günlük hayattan olsun.
        - Sadece bir boşluk bırak ve o boşluk çekimlenmiş sıfat olsun.
        - Boşluktan hemen önce veya sonra mutlaka bir isim (Nomen) olmalı.
        - İpucu alanları:
           - "hint1": Çekim tipi ve Durum (Örn: "Zayıf Çekim - Nominativ")
           - "hint2": Cinsiyet ve İsim (Örn: "Maskulin - der Hund")
        `;

        if (level === 'A2') {
            return `
        Konu: ${randomTopic}
        A2 seviyesindeki öğrenciler için "Adjektivdeklination" (Sıfat Çekimleri) konusunda 20 adet alıştırma cümlesi hazırla.
        ${commonRules}
        1. Belirli, Belirsiz ve Artikelsiz çekimleri (Schwache, Gemischte, Starke Deklination) dengeli dağıt.
        2. Nominativ, Akkusativ ve Dativ durumlarına odaklan.
        3. Basit ve net bağlamlar seç.
      `;
        } else {
            return `
        Konu: ${randomTopic}
        B1 seviyesindeki öğrenciler için "Adjektivdeklination" (Sıfat Çekimleri) konusunda 20 adet ZORLU alıştırma cümlesi hazırla.
        ${commonRules}
        1. Genitiv durumunu (des/der/eines/einer + -en) mutlaka dahil et.
        2. Karmaşık sıfat tamlamaları ve yan cümleler kullan.
        3. Profesyonel ve akademik kelime dağarcığını harmanla.
      `;
        }
    },
    getFallbackQuestions: (level: UserLevel) => {
        const a2Questions: Question[] = [
            { id: 401, preGap: "Der", postGap: "Hund spielt im Garten.", answer: "kleine", translation: "Küçük köpek bahçede oynuyor.", hint1: "Zayıf Çekim - Nominativ", hint2: "Maskulin - der Hund" },
            { id: 402, preGap: "Das", postGap: "Auto ist sehr teuer.", answer: "neue", translation: "Yeni araba çok pahalı.", hint1: "Zayıf Çekim - Nominativ", hint2: "Neutrum - das Auto" },
            { id: 403, preGap: "Die", postGap: "Frau arbeitet hier.", answer: "schöne", translation: "Güzel kadın burada çalışıyor.", hint1: "Zayıf Çekim - Nominativ", hint2: "Feminin - die Frau" },
            { id: 404, preGap: "Ich kaufe den", postGap: "Anzug.", answer: "blauen", translation: "Mavi takımı satın alıyorum.", hint1: "Zayıf Çekim - Akkusativ", hint2: "Maskulin - der Anzug" },
            { id: 405, preGap: "Ein", postGap: "Freund hilft mir.", answer: "guter", translation: "İyi bir arkadaş bana yardım ediyor.", hint1: "Karma Çekim - Nominativ", hint2: "Maskulin - ein Freund" },
            { id: 406, preGap: "Eine", postGap: "Kollegin kommt morgen.", answer: "nette", translation: "Nazik bir meslektaş yarın geliyor.", hint1: "Karma Çekim - Nominativ", hint2: "Feminin - eine Kollegin" },
            { id: 407, preGap: "Ich lese ein", postGap: "Buch.", answer: "altes", translation: "Eski bir kitap okuyorum.", hint1: "Karma Çekim - Akkusativ", hint2: "Neutrum - ein Buch" },
            { id: 408, preGap: "Er möchte einen", postGap: "Kaffee.", answer: "heißen", translation: "O sıcak bir kahve istiyor.", hint1: "Karma Çekim - Akkusativ", hint2: "Maskulin - ein Kaffee" },
            { id: 409, preGap: "Wir fahren mit einem", postGap: "Auto.", answer: "alten", translation: "Eski bir arabayla gidiyoruz.", hint1: "Karma Çekim - Dativ", hint2: "Neutrum - ein Auto" },
            { id: 410, preGap: "Ich danke der", postGap: "Lehrerin.", answer: "netten", translation: "Nazik öğretmene teşekkür ederim.", hint1: "Zayıf Çekim - Dativ", hint2: "Feminin - die Lehrerin" },
            { id: 411, preGap: "Haben Sie", postGap: "Brot?", answer: "frisches", translation: "Taze ekmeğiniz var mı?", hint1: "Güçlü Çekim - Akkusativ", hint2: "Neutrum - das Brot (Artikelsiz)" },
            { id: 412, preGap: "Sie trägt ein", postGap: "Kleid.", answer: "weißes", translation: "Beyaz bir elbise giyiyor.", hint1: "Karma Çekim - Akkusativ", hint2: "Neutrum - ein Kleid" },
            { id: 413, preGap: "Das ist mein", postGap: "Computer.", answer: "neuer", translation: "Bu benim yeni bilgisayarım.", hint1: "Karma Çekim - Nominativ", hint2: "Maskulin - mein Computer" },
            { id: 414, preGap: "Wir suchen", postGap: "Wohnungen.", answer: "billige", translation: "Ucuz daireler arıyoruz.", hint1: "Güçlü Çekim - Akkusativ", hint2: "Plural - Wohnungen (Artikelsiz)" },
            { id: 415, preGap: "Ich sehe die", postGap: "Kinder.", answer: "lustigen", translation: "Komik çocukları görüyorum.", hint1: "Zayıf Çekim - Akkusativ", hint2: "Plural - die Kinder" },
            { id: 416, preGap: "Gefällt dir der", postGap: "Rock?", answer: "kurze", translation: "Kısa etek hoşuna gidiyor mu?", hint1: "Zayıf Çekim - Nominativ", hint2: "Maskulin - der Rock" },
            { id: 417, preGap: "Er sucht seinen", postGap: "Schlüssel.", answer: "schwarzen", translation: "Siyah anahtarını arıyor.", hint1: "Karma Çekim - Akkusativ", hint2: "Maskulin - sein Schlüssel" },
            { id: 418, preGap: "Mit", postGap: "Hilfe schaffen wir es.", answer: "großer", translation: "Büyük bir yardımla bunu başarabiliriz.", hint1: "Güçlü Çekim - Dativ", hint2: "Feminin - die Hilfe (Artikelsiz)" },
            { id: 419, preGap: "Ich brauche ein", postGap: "Zimmer.", answer: "ruhiges", translation: "Sakin bir odaya ihtiyacım var.", hint1: "Karma Çekim - Akkusativ", hint2: "Neutrum - ein Zimmer" },
            { id: 420, preGap: "Wo ist das", postGap: "Heft?", answer: "grüne", translation: "Yeşil defter nerede?", hint1: "Zayıf Çekim - Nominativ", hint2: "Neutrum - das Heft" }
        ];

        if (level === 'B1') {
            const b1Questions: Question[] = [
                { id: 501, preGap: "Wegen des", postGap: "Wetters bleiben wir hier.", answer: "schlechten", translation: "Kötü hava nedeniyle burada kalıyoruz.", hint1: "Zayıf Çekim - Genitiv", hint2: "Neutrum - das Wetter" },
                { id: 502, preGap: "Trotz der", postGap: "Preise kauft er das Handy.", answer: "hohen", translation: "Yüksek fiyatlara rağmen telefonu satın alıyor.", hint1: "Zayıf Çekim - Genitiv", hint2: "Plural - die Preise" },
                { id: 503, preGap: "Während unseres", postGap: "Urlaubs hat es geregnet.", answer: "langen", translation: "Uzun tatilimiz boyunca yağmur yağdı.", hint1: "Karma Çekim - Genitiv", hint2: "Maskulin - unser Urlaub" },
                { id: 504, preGap: "Dank seiner", postGap: "Hilfe war ich erfolgreich.", answer: "guten", translation: "İyi yardımı sayesinde başarılı oldum.", hint1: "Karma Çekim - Genitiv", hint2: "Feminin - seine Hilfe" },
                { id: 505, preGap: "Die Farbe des", postGap: "Hauses gefällt mir.", answer: "alten", translation: "Eski evin rengi hoşuma gidiyor.", hint1: "Zayıf Çekim - Genitiv", hint2: "Neutrum - das Haus" },
                { id: 506, preGap: "Anstatt eines", postGap: "Handys kaufte er ein Tablet.", answer: "neuen", translation: "Yeni bir telefon yerine tablet aldı.", hint1: "Karma Çekim - Genitiv", hint2: "Neutrum - ein Handy" },
                { id: 507, preGap: "Wir trinken", postGap: "Wein.", answer: "italienischen", translation: "İtalyan şarabı içiyoruz.", hint1: "Güçlü Çekim - Akkusativ", hint2: "Maskulin - der Wein (Artikelsiz)" },
                { id: 508, preGap: "Ich freue mich auf die", postGap: "Reise.", answer: "nächste", translation: "Bir sonraki seyahati dört gözle bekliyorum.", hint1: "Zayıf Çekim - Akkusativ", hint2: "Feminin - die Reise" },
                { id: 509, preGap: "Er ist ein", postGap: "Mensch.", answer: "erfolgreicher", translation: "O başarılı bir insandır.", hint1: "Karma Çekim - Nominativ", hint2: "Maskulin - ein Mensch" },
                { id: 510, preGap: "Eine Frau mit", postGap: "Haaren kam herein.", answer: "langen", translation: "Uzun saçlı bir kadın içeri girdi.", hint1: "Güçlü Çekim - Dativ", hint2: "Plural - die Haare (Artikelsiz)" },
                { id: 511, preGap: "Innerhalb einer", postGap: "Woche müssen wir fertig sein.", answer: "kurzen", translation: "Kısa bir hafta içinde hazır olmalıyız.", hint1: "Karma Çekim - Genitiv", hint2: "Feminin - eine Woche" },
                { id: 512, preGap: "Trotz", postGap: "Regens gingen wir spazieren.", answer: "starken", translation: "Şiddetli yağmura rağmen yürüyüşe çıktık.", hint1: "Güçlü Çekim - Genitiv", hint2: "Maskulin - der Regen (Artikelsiz)" },
                { id: 513, preGap: "Das ist die Meinung", postGap: "Leute.", answer: "vieler", translation: "Bu birçok insanın fikri.", hint1: "Güçlü Çekim - Genitiv", hint2: "Plural - die Leute (Artikelsiz)" },
                { id: 514, preGap: "Ich suche eine", postGap: "Wohnung.", answer: "gemütliche", translation: "Rahat bir daire arıyorum.", hint1: "Karma Çekim - Akkusativ", hint2: "Feminin - eine Wohnung" },
                { id: 515, preGap: "Wir gratulieren dem", postGap: "Sieger.", answer: "glücklichen", translation: "Mutlu kazananı tebrik ediyoruz.", hint1: "Zayıf Çekim - Dativ", hint2: "Maskulin - der Sieger" },
                { id: 516, preGap: "Sie mag", postGap: "Schokolade.", answer: "dunkle", translation: "Bitter (koyu) çikolatayı sever.", hint1: "Güçlü Çekim - Akkusativ", hint2: "Feminin - die Schokolade (Artikelsiz)" },
                { id: 517, preGap: "Das", postGap: "Gespräch war sehr wichtig.", answer: "gestrige", translation: "Dünkü konuşma çok önemliydi.", hint1: "Zayıf Çekim - Nominativ", hint2: "Neutrum - das Gespräch" },
                { id: 518, preGap: "Aufgrund einer", postGap: "Verspätung kam er zu spät.", answer: "kleinen", translation: "Küçük bir gecikme nedeniyle geç kaldı.", hint1: "Karma Çekim - Genitiv", hint2: "Feminin - eine Verspätung" },
                { id: 519, preGap: "Mit den", postGap: "Grüßen verabschiedete er sich.", answer: "besten", translation: "En iyi dileklerle vedalaştı.", hint1: "Zayıf Çekim - Dativ", hint2: "Plural - die Grüße" },
                { id: 520, preGap: "Wir wohnen in einem", postGap: "Viertel.", answer: "ruhigen", translation: "Sakin bir mahallede yaşıyoruz.", hint1: "Karma Çekim - Dativ", hint2: "Neutrum - ein Viertel" }
            ];
            const combined = [...b1Questions, ...a2Questions];
            return combined.sort(() => Math.random() - 0.5).slice(0, 20);
        }
        return a2Questions.sort(() => Math.random() - 0.5).slice(0, 20);
    }
};
