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
            "Yemek ve Mutfak", "Şehir Hayatı", "Doğa ve Çevre", "Kültür ve Sanat"
        ];
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];

        const commonRules = `
        Genel Kurallar:
        - Her seferinde FARKLI cümle yapıları ve kelimeler kullan. 
        - "Das ist mein Buch" gibi çok basit ve tekrarlanan örneklerden kaçın.
        - Cümleler doğal ve günlük hayattan olsun.
        - Sadece bir boşluk bırak ve o boşluk iyelik zamiri olsun.
        `;

        if (level === 'A2') {
            return `
        Konu: ${randomTopic}
        A2 seviyesindeki öğrenciler için "Possessivpronomen" (İyelik Zamirleri) konusunda 20 adet YARATICI alıştırma cümlesi hazırla.
        ${commonRules}
        1. Nominativ, Akkusativ ve Dativ durumlarını dengeli dağıt (Örn: mit meinem Freund, ohne seine Hilfe).
        2. Karakterlere isimler vererek hikayeleştir.
      `;
        } else {
            return `
        Konu: ${randomTopic}
        B1 seviyesindeki öğrenciler için "Possessivpronomen" (İyelik Zamirleri) konusunda 20 adet ÜST SEVİYE alıştırma cümlesi hazırla.
        ${commonRules}
        1. Bağlaçlar (weil, obwohl, damit) ve yan cümleler kullan.
        2. Genitiv yapısını (wegen meines Jobs, während unseres Urlaubs) mutlaka dahil et.
        3. Akademik veya profesyonel bir dil kullanmaya özen göster.
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
            { id: 17, preGap: "Wir gratulieren", postGap: "Vater.", answer: "unserem", translation: "Babamımızı tebrik ediyoruz.", hint: "wir (Dativ)" },
            { id: 18, preGap: "Ist das", postGap: "Stift?", answer: "dein", translation: "Bu senin kalemin mi?", hint: "du (Nominativ)" },
            { id: 19, preGap: "Sie (Onlar) besuchen", postGap: "Freunde.", answer: "ihre", translation: "Onlar arkadaşlarını ziyaret ediyorlar.", hint: "sie (çoğul) (Akkusativ)" },
            { id: 20, preGap: "Er dankt", postGap: "Lehrerin.", answer: "seiner", translation: "O, öğretmenine teşekkür ediyor.", hint: "er (Dativ)" },
            { id: 21, preGap: "Ich habe", postGap: "Ausweis vergessen.", answer: "meinen", translation: "Kimliğimi unuttum.", hint: "ich (Akkusativ)" },
            { id: 22, preGap: "Wo sind", postGap: "Kinder?", answer: "eure", translation: "Çocuklarınız nerede?", hint: "ihr (Nominativ - Çoğul)" },
            { id: 23, preGap: "Er hilft", postGap: "Nachbarn.", answer: "seinen", translation: "Komşularına yardım ediyor.", hint: "er (Dativ - Çoğul)" },
            { id: 24, preGap: "Wir feiern", postGap: "Geburtstag.", answer: "unseren", translation: "Doğum günümüzü kutluyoruz.", hint: "wir (Akkusativ)" },
            { id: 25, preGap: "Sie sucht", postGap: "Brille.", answer: "ihre", translation: "Gözlüğünü arıyor.", hint: "sie (Akkusativ)" },
            { id: 26, preGap: "Hast du", postGap: "Pass dabei?", answer: "deinen", translation: "Pasaportun yanında mı?", hint: "du (Akkusativ)" },
            { id: 27, preGap: "Das Kind vermisst", postGap: "Teddybär.", answer: "seinen", translation: "Çocuk oyuncak ayısını özlüyor.", hint: "es (Akkusativ)" },
            { id: 28, preGap: "Frau Schmidt, ist das", postGap: "Regenschirm?", answer: "Ihr", translation: "Bayan Schmidt, bu sizin şemsiyeniz mi?", hint: "Sie (Nominativ)" },
            { id: 29, preGap: "Ich antworte", postGap: "Chef.", answer: "meinem", translation: "Patronuma cevap veriyorum.", hint: "ich (Dativ)" },
            { id: 30, preGap: "Wir verkaufen", postGap: "Haus.", answer: "unser", translation: "Evimizi satıyoruz.", hint: "wir (Akkusativ)" },
            { id: 31, preGap: "Sie zeigen", postGap: "Urkunden.", answer: "ihre", translation: "Sertifikalarını gösteriyorlar.", hint: "sie (çoğul) (Akkusativ)" },
            { id: 32, preGap: "Wann kommt", postGap: "Zug?", answer: "dein", translation: "Trenin ne zaman geliyor?", hint: "du (Nominativ)" },
            { id: 33, preGap: "Er erklärt", postGap: "Plan.", answer: "seinen", translation: "Planını açıklıyor.", hint: "er (Akkusativ)" },
            { id: 34, preGap: "Gefällt euch", postGap: "neue Wohnung?", answer: "eure", translation: "Yeni daireniz hoşunuza gidiyor mu?", hint: "ihr (Nominativ)" },
            { id: 35, preGap: "Ich danke", postGap: "Eltern.", answer: "meinen", translation: "Ebeveynlerime teşekkür ederim.", hint: "ich (Dativ - Çoğul)" },
            { id: 36, preGap: "Haben Sie", postGap: "Termin bestätigt?", answer: "Ihren", translation: "Randevunuzu onayladınız mı?", hint: "Sie (Akkusativ)" },
            { id: 37, preGap: "Das Mädchen spielt mit", postGap: "Puppe.", answer: "seiner", translation: "Kız bebeğiyle oynuyor.", hint: "es/sie (Dativ)" },
            { id: 38, preGap: "Wir brauchen", postGap: "Hilfe.", answer: "eure", translation: "Yardımınıza ihtiyacımız var.", hint: "ihr (Akkusativ)" },
            { id: 39, preGap: "Er bringt", postGap: "Hund mit.", answer: "seinen", translation: "Köpeğini beraberinde getiriyor.", hint: "er (Akkusativ)" },
            { id: 40, preGap: "Ich liebe", postGap: "Heimat.", answer: "meine", translation: "Vatanımı seviyorum.", hint: "ich (Akkusativ)" }
        ];

        if (level === 'B1') {
            const b1Questions: Question[] = [
                { id: 101, preGap: "Wegen", postGap: "Krankheit konnte er nicht kommen.", answer: "seiner", translation: "Hastalığı yüzünden gelemedi.", hint: "er (Genitiv - wegen + Gen)" },
                { id: 102, preGap: "Während", postGap: "Urlaubs hat es viel geregnet.", answer: "unseres", translation: "Tatilimiz boyunca çok yağmur yağdı.", hint: "wir (Genitiv)" },
                { id: 103, preGap: "Ich weiß nicht, ob ich", postGap: "Meinung ändern soll.", answer: "meine", translation: "Fikrimi değiştirip değiştirmemem gerektiğini bilmiyorum.", hint: "ich (Akkusativ)" },
                { id: 104, preGap: "Das ist die Frau, die", postGap: "Mann sucht.", answer: "ihren", translation: "Bu, kocasını arayan kadın.", hint: "sie (Akkusativ)" },
                { id: 105, preGap: "Trotz", postGap: "Bemühungen war der Erfolg klein.", answer: "ihrer", translation: "Çabalarına (onların) rağmen başarı küçüktü.", hint: "sie çoğul (Genitiv)" },
                { id: 106, preGap: "Er ist stolz auf", postGap: "beruflichen Erfolg.", answer: "seinen", translation: "Mesleki başarısıyla gurur duyuyor.", hint: "er (Akkusativ - stolz auf + Akk)" },
                { id: 107, preGap: "Wir freuen uns über", postGap: "neue Projekt.", answer: "unser", translation: "Yeni projemizden dolayı mutluyuz.", hint: "wir (Akkusativ)" },
                { id: 108, preGap: "Anstatt", postGap: "Wortes gab er mir ein Zeichen.", answer: "seines", translation: "Sözü yerine bana bir işaret verdi.", hint: "er (Genitiv)" },
                { id: 109, preGap: "Kümmerst du dich um", postGap: "Angelegenheiten?", answer: "deine", translation: "Meselelerinle ilgileniyor musun?", hint: "du (Akkusativ)" },
                { id: 110, preGap: "Dank", postGap: "Unterstützung haben wir es geschafft.", answer: "Ihrer", translation: "Desteğiniz sayesinde başardık.", hint: "Sie (Genitiv/Dativ)" },
                { id: 111, preGap: "Sie zweifelt an", postGap: "Entscheidung.", answer: "ihrer", translation: "Kararından şüphe ediyor.", hint: "sie (Dativ - zweifeln an + Dat)" },
                { id: 112, preGap: "Ich erinnere mich an", postGap: "Kindheit.", answer: "meine", translation: "Çocukluğumu hatırlıyorum.", hint: "ich (Akkusativ)" },
                { id: 113, preGap: "Aufgrund", postGap: "Aussage wurde er freigesprochen.", answer: "seiner", translation: "İfadesi temelinde beraat etti.", hint: "er (Genitiv)" },
                { id: 114, preGap: "Wir hoffen auf", postGap: "baldige Genesung.", answer: "ihre", translation: "Onun (kadın) tez zamanda iyileşmesini umuyoruz.", hint: "sie (Akkusativ)" },
                { id: 115, preGap: "Er spricht mit", postGap: "Vorgesetzten.", answer: "seinem", translation: "Üstüyle (müdürüyle) konuşuyor.", hint: "er (Dativ)" },
                { id: 116, preGap: "Das ist das Kind, um", postGap: "Erziehung Eltern sich sorgen.", answer: "seine", translation: "Bu, ebeveynlerinin eğitimiyle ilgilendiği çocuktur.", hint: "es (Akkusativ)" },
                { id: 117, preGap: "Unter", postGap: "Leitung wurde die Firma groß.", answer: "seiner", translation: "Onun yönetimi altında şirket büyüdü.", hint: "er (Dativ)" },
                { id: 118, preGap: "Ich verlasse mich auf", postGap: "Kollegen.", answer: "meine", translation: "Meslektaşlarıma güveniyorum.", hint: "ich (Akkusativ - Plural)" },
                { id: 119, preGap: "Trotz", postGap: "Alters ist sie sehr fit.", answer: "ihres", translation: "Yaşına rağmen çok zinde.", hint: "sie (Genitiv)" },
                { id: 120, preGap: "Wir diskutieren über", postGap: "Zukunft.", answer: "unsere", translation: "Geleceğimiz hakkında tartışıyoruz.", hint: "wir (Akkusativ)" }
            ];
            const combined = [...b1Questions, ...fallbackQuestions];
            return combined.sort(() => Math.random() - 0.5).slice(0, 20);
        }
        return fallbackQuestions.sort(() => Math.random() - 0.5).slice(0, 20);
    }
};
