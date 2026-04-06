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
            { id: 401, preGap: "Der", postGap: "Hund spielt im Garten.", answer: "kleine", translation: "Küçük köpek bahçede oynuyor.", hint: "Weak - Nom - masc" },
            { id: 402, preGap: "Das", postGap: "Auto ist sehr teuer.", answer: "neue", translation: "Yeni araba çok pahalı.", hint: "Weak - Nom - neut" },
            { id: 403, preGap: "Die", postGap: "Frau arbeitet hier.", answer: "schöne", translation: "Güzel kadın burada çalışıyor.", hint: "Weak - Nom - fem" },
            { id: 404, preGap: "Ich kaufe den", postGap: "Anzug.", answer: "blauen", translation: "Mavi takımı satın alıyorum.", hint: "Weak - Akk - masc" },
            { id: 405, preGap: "Ein", postGap: "Freund hilft mir.", answer: "guter", translation: "İyi bir arkadaş bana yardım ediyor.", hint: "Mixed - Nom - masc" },
            { id: 406, preGap: "Eine", postGap: "Kollegin kommt morgen.", answer: "nette", translation: "Nazik bir meslektaş yarın geliyor.", hint: "Mixed - Nom - fem" },
            { id: 407, preGap: "Ich lese ein", postGap: "Buch.", answer: "altes", translation: "Eski bir kitap okuyorum.", hint: "Mixed - Akk - neut" },
            { id: 408, preGap: "Er möchte einen", postGap: "Kaffee.", answer: "heißen", translation: "O sıcak bir kahve istiyor.", hint: "Mixed - Akk - masc" },
            { id: 409, preGap: "Wir fahren mit einem", postGap: "Auto.", answer: "alten", translation: "Eski bir arabayla gidiyoruz.", hint: "Mixed - Dat - neut" },
            { id: 410, preGap: "Ich danke der", postGap: "Lehrerin.", answer: "netten", translation: "Nazik öğretmene teşekkür ederim.", hint: "Weak - Dat - fem" },
            { id: 411, preGap: "Haben Sie", postGap: "Brot?", answer: "frisches", translation: "Taze ekmeğiniz var mı?", hint: "Strong - Akk - neut" },
            { id: 412, preGap: "Sie trägt ein", postGap: "Kleid.", answer: "weißes", translation: "Beyaz bir elbise giyiyor.", hint: "Mixed - Akk - neut" },
            { id: 413, preGap: "Das ist mein", postGap: "Computer.", answer: "neuer", translation: "Bu benim yeni bilgisayarım.", hint: "Mixed - Nom - masc" },
            { id: 414, preGap: "Wir suchen", postGap: "Wohnungen.", answer: "billige", translation: "Ucuz daireler arıyoruz.", hint: "Strong - Akk - plural" },
            { id: 415, preGap: "Ich sehe die", postGap: "Kinder.", answer: "lustigen", translation: "Komik çocukları görüyorum.", hint: "Weak - Akk - plural" },
            { id: 416, preGap: "Gefällt dir der", postGap: "Rock?", answer: "kurze", translation: "Kısa etek hoşuna gidiyor mu?", hint: "Weak - Nom - masc" },
            { id: 417, preGap: "Er sucht seinen", postGap: "Schlüssel.", answer: "schwarzen", translation: "Siyah anahtarını arıyor.", hint: "Mixed - Akk - masc" },
            { id: 418, preGap: "Mit", postGap: "Hilfe schaffen wir es.", answer: "großer", translation: "Büyük bir yardımla bunu başarabiliriz.", hint: "Strong - Dat - fem" },
            { id: 419, preGap: "Ich brauche ein", postGap: "Zimmer.", answer: "ruhiges", translation: "Sakin bir odaya ihtiyacım var.", hint: "Mixed - Akk - neut" },
            { id: 420, preGap: "Wo ist das", postGap: "Heft?", answer: "grüne", translation: "Yeşil defter nerede?", hint: "Weak - Nom - neut" }
        ];

        if (level === 'B1') {
            const b1Questions: Question[] = [
                { id: 501, preGap: "Wegen des", postGap: "Wetters bleiben wir hier.", answer: "schlechten", translation: "Kötü hava nedeniyle burada kalıyoruz.", hint: "Weak - Gen - neut" },
                { id: 502, preGap: "Trotz der", postGap: "Preise kauft er das Handy.", answer: "hohen", translation: "Yüksek fiyatlara rağmen telefonu satın alıyor.", hint: "Weak - Gen - plural" },
                { id: 503, preGap: "Während unseres", postGap: "Urlaubs hat es geregnet.", answer: "langen", translation: "Uzun tatilimiz boyunca yağmur yağdı.", hint: "Mixed - Gen - masc" },
                { id: 504, preGap: "Dank seiner", postGap: "Hilfe war ich erfolgreich.", answer: "guten", translation: "İyi yardımı sayesinde başarılı oldum.", hint: "Mixed - Gen - fem" },
                { id: 505, preGap: "Die Farbe des", postGap: "Hauses gefällt mir.", answer: "alten", translation: "Eski evin rengi hoşuma gidiyor.", hint: "Weak - Gen - neut" },
                { id: 506, preGap: "Anstatt eines", postGap: "Handys kaufte o bir Tablet.", answer: "neuen", translation: "Yeni bir telefon yerine tablet aldı.", hint: "Mixed - Gen - masc" },
                { id: 507, preGap: "Wir trinken", postGap: "Wein.", answer: "italienischen", translation: "İtalyan şarabı içiyoruz.", hint: "Strong - Akk - masc" },
                { id: 508, preGap: "Ich freue mich auf die", postGap: "Reise.", answer: "nächste", translation: "Bir sonraki seyahati dört gözle bekliyorum.", hint: "Weak - Akk - fem" },
                { id: 509, preGap: "Er ist ein", postGap: "Mensch.", answer: "erfolgreicher", translation: "O başarılı bir insandır.", hint: "Mixed - Nom - masc" },
                { id: 510, preGap: "Eine Frau mit", postGap: "Haaren kam herein.", answer: "langen", translation: "Uzun saçlı bir kadın içeri girdi.", hint: "Strong - Dat - Plural" },
                { id: 511, preGap: "Innerhalb einer", postGap: "Woche müssen biz fertig sein.", answer: "kurzen", translation: "Kısa bir hafta içinde hazır olmalıyız.", hint: "Mixed - Gen - fem" },
                { id: 512, preGap: "Trotz", postGap: "Regens gingen biz spazieren.", answer: "starken", translation: "Şiddetli yağmura rağmen yürüyüşe çıktık.", hint: "Strong - Gen - masc" },
                { id: 513, preGap: "Das ist die Meinung", postGap: "Leute.", answer: "viler", translation: "Bu birçok insanın fikri.", hint: "Strong - Gen - plural" },
                { id: 514, preGap: "Ich suche eine", postGap: "Wohnung.", answer: "gemütliche", translation: "Rahat bir daire arıyorum.", hint: "Mixed - Akk - fem" },
                { id: 515, preGap: "Wir gratulieren dem", postGap: "Sieger.", answer: "glücklichen", translation: "Mutlu kazananı tebrik ediyoruz.", hint: "Weak - Dat - masc" },
                { id: 516, preGap: "Sie mag", postGap: "Schokolade.", answer: "dunkle", translation: "Bitter (koyu) çikolatayı sever.", hint: "Strong - Akk - fem" },
                { id: 517, preGap: "Das", postGap: "Gespräch war sehr wichtig.", answer: "gestrige", translation: "Dünkü konuşma çok önemliydi.", hint: "Weak - Nom - neut" },
                { id: 518, preGap: "Aufgrund einer", postGap: "Verspätung kam er zu spät.", answer: "kleinen", translation: "Küçük bir gecikme nedeniyle geç kaldı.", hint: "Mixed - Gen - fem" },
                { id: 519, preGap: "Mit den", postGap: "Grüßen verabschiedete er sich.", answer: "besten", translation: "En iyi dileklerle vedalaştı.", hint: "Weak - Dat - plural" },
                { id: 520, preGap: "Wir wohnen in einem", postGap: "Viertel.", answer: "ruhigen", translation: "Sakin bir mahallede yaşıyoruz.", hint: "Mixed - Dat - neut" }
            ];
            const combined = [...b1Questions, ...a2Questions];
            return combined.sort(() => Math.random() - 0.5).slice(0, 20);
        }
        return a2Questions.sort(() => Math.random() - 0.5).slice(0, 20);
    }
};
