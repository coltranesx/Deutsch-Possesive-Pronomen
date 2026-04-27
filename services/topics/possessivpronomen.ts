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
        - İpucu alanları:
           - "hint1": Sadece Kasus veya çekim tipi (Örn: "Nominativ", "Akkusativ", "Dativ", "Genitiv")
           - "hint2": Hangi zamir veya bağlamla ilişkili olduğu (Örn: "Zamir: ich", "Zamir: du")
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
            { id: 1, preGap: "Das ist", postGap: "Buch.", answer: "mein", translation: "Bu benim kitabım.", hint1: "Nominativ", hint2: "Zamir: ich" },
            { id: 2, preGap: "Ist das", postGap: "Katze?", answer: "deine", translation: "Bu senin kedin mi?", hint1: "Nominativ", hint2: "Zamir: du" },
            { id: 3, preGap: "Wir besuchen", postGap: "Oma.", answer: "unsere", translation: "Biz büyükannemizi ziyaret ediyoruz.", hint1: "Akkusativ", hint2: "Zamir: wir" },
            { id: 4, preGap: "Herr Müller, wo ist", postGap: "Auto?", answer: "Ihr", translation: "Bay Müller, arabanız nerede?", hint1: "Nominativ", hint2: "Zamir: Sie" },
            { id: 5, preGap: "Sie gives", postGap: "Bruder ein Geschenk.", answer: "ihrem", translation: "O, erkek kardeşine bir hediye veriyor.", hint1: "Dativ", hint2: "Zamir: sie" },
            { id: 6, preGap: "Wo wohnt", postGap: "Familie?", answer: "eure", translation: "Aileniz nerede yaşıyor?", hint1: "Nominativ", hint2: "Zamir: ihr" },
            { id: 7, preGap: "Er sucht", postGap: "Schlüssel.", answer: "seinen", translation: "O, anahtarını arıyor.", hint1: "Akkusativ", hint2: "Zamir: er" },
            { id: 8, preGap: "Das Kind spielt mit", postGap: "Ball.", answer: "seinem", translation: "Çocuk topuyla oynuyor.", hint1: "Dativ", hint2: "Zamir: es" },
            { id: 9, preGap: "Ich helfe", postGap: "Mutter.", answer: "meiner", translation: "Anneme yardım ediyorum.", hint1: "Dativ", hint2: "Zamir: ich" },
            { id: 10, preGap: "Kennst du", postGap: "Lehrer?", answer: "seinen", translation: "Onun (erkek) öğretmenini tanıyor musun?", hint1: "Akkusativ", hint2: "Zamir: er" },
            { id: 11, preGap: "Wir essen", postGap: "Apfel.", answer: "unseren", translation: "Biz elmamızı yiyoruz.", hint1: "Akkusativ", hint2: "Zamir: wir" },
            { id: 12, preGap: "Hast du", postGap: "Hausaufgaben gemacht?", answer: "deine", translation: "Ödevlerini yaptın mı?", hint1: "Akkusativ", hint2: "Zamir: du" },
            { id: 13, preGap: "Sie liebt", postGap: "Hund.", answer: "ihren", translation: "O, köpeğini seviyor.", hint1: "Akkusativ", hint2: "Zamir: sie" },
            { id: 14, preGap: "Lisa, nimm", postGap: "Tasche!", answer: "deine", translation: "Lisa, çantanı al!", hint1: "Akkusativ", hint2: "Zamir: du" },
            { id: 15, preGap: "Die Schüler öffnen", postGap: "Bücher.", answer: "ihre", translation: "Öğrenciler kitaplarını açıyorlar.", hint1: "Akkusativ", hint2: "Zamir: sie (çoğul)" },
            { id: 16, preGap: "Ich fahre mit", postGap: "Fahrrad.", answer: "meinem", translation: "Bisikletimle gidiyorum.", hint1: "Dativ", hint2: "Zamir: ich" },
            { id: 17, preGap: "Wir gratulieren", postGap: "Vater.", answer: "unserem", translation: "Babamımızı tebrik ediyoruz.", hint1: "Dativ", hint2: "Zamir: wir" },
            { id: 18, preGap: "Ist das", postGap: "Stift?", answer: "dein", translation: "Bu senin kalemin mi?", hint1: "Nominativ", hint2: "Zamir: du" },
            { id: 19, preGap: "Sie (Onlar) besuchen", postGap: "Freunde.", answer: "ihre", translation: "Onlar arkadaşlarını ziyaret ediyorlar.", hint1: "Akkusativ", hint2: "Zamir: sie (çoğul)" },
            { id: 20, preGap: "Er dankt", postGap: "Lehrerin.", answer: "seiner", translation: "O, öğretmenine teşekkür ediyor.", hint1: "Dativ", hint2: "Zamir: er" },
            { id: 21, preGap: "Ich habe", postGap: "Ausweis vergessen.", answer: "meinen", translation: "Kimliğimi unuttum.", hint1: "Akkusativ", hint2: "Zamir: ich" },
            { id: 22, preGap: "Wo sind", postGap: "Kinder?", answer: "eure", translation: "Çocuklarınız nerede?", hint1: "Nominativ", hint2: "Zamir: ihr (çoğul)" },
            { id: 23, preGap: "Er hilft", postGap: "Nachbarn.", answer: "seinen", translation: "Komşularına yardım ediyor.", hint1: "Dativ", hint2: "Zamir: er (çoğul)" },
            { id: 24, preGap: "Wir feiern", postGap: "Geburtstag.", answer: "unseren", translation: "Doğum günümüzü kutluyoruz.", hint1: "Akkusativ", hint2: "Zamir: wir" },
            { id: 25, preGap: "Sie sucht", postGap: "Brille.", answer: "ihre", translation: "Gözlüğünü arıyor.", hint1: "Akkusativ", hint2: "Zamir: sie" },
            { id: 26, preGap: "Hast du", postGap: "Pass dabei?", answer: "deinen", translation: "Pasaportun yanında mı?", hint1: "Akkusativ", hint2: "Zamir: du" },
            { id: 27, preGap: "Das Kind vermisst", postGap: "Teddybär.", answer: "seinen", translation: "Çocuk oyuncak ayısını özlüyor.", hint1: "Akkusativ", hint2: "Zamir: es" },
            { id: 28, preGap: "Frau Schmidt, ist das", postGap: "Regenschirm?", answer: "Ihr", translation: "Bayan Schmidt, bu sizin şemsiyeniz mi?", hint1: "Nominativ", hint2: "Zamir: Sie" },
            { id: 29, preGap: "Ich antworte", postGap: "Chef.", answer: "meinem", translation: "Patronuma cevap veriyorum.", hint1: "Dativ", hint2: "Zamir: ich" },
            { id: 30, preGap: "Wir verkaufen", postGap: "Haus.", answer: "unser", translation: "Evimizi satıyoruz.", hint1: "Akkusativ", hint2: "Zamir: wir" },
            { id: 31, preGap: "Sie zeigen", postGap: "Urkunden.", answer: "ihre", translation: "Sertifikalarını gösteriyorlar.", hint1: "Akkusativ", hint2: "Zamir: sie (çoğul)" },
            { id: 32, preGap: "Wann kommt", postGap: "Zug?", answer: "dein", translation: "Trenin ne zaman geliyor?", hint1: "Nominativ", hint2: "Zamir: du" },
            { id: 33, preGap: "Er erklärt", postGap: "Plan.", answer: "seinen", translation: "Planını açıklıyor.", hint1: "Akkusativ", hint2: "Zamir: er" },
            { id: 34, preGap: "Gefällt euch", postGap: "neue Wohnung?", answer: "eure", translation: "Yeni daireniz hoşunuza gidiyor mu?", hint1: "Nominativ", hint2: "Zamir: ihr" },
            { id: 35, preGap: "Ich danke", postGap: "Eltern.", answer: "meinen", translation: "Ebeveynlerime teşekkür ederim.", hint1: "Dativ", hint2: "Zamir: ich (çoğul)" },
            { id: 36, preGap: "Haben Sie", postGap: "Termin bestätigt?", answer: "Ihren", translation: "Randevunuzu onayladınız mı?", hint1: "Akkusativ", hint2: "Zamir: Sie" },
            { id: 37, preGap: "Das Mädchen spielt mit", postGap: "Puppe.", answer: "seiner", translation: "Kız bebeğiyle oynuyor.", hint1: "Dativ", hint2: "Zamir: es/sie" },
            { id: 38, preGap: "Wir brauchen", postGap: "Hilfe.", answer: "eure", translation: "Yardımınıza ihtiyacımız var.", hint1: "Akkusativ", hint2: "Zamir: ihr" },
            { id: 39, preGap: "Er brings", postGap: "Hund mit.", answer: "seinen", translation: "Köpeğini beraberinde getiriyor.", hint1: "Akkusativ", hint2: "Zamir: er" },
            { id: 40, preGap: "Ich liebe", postGap: "Heimat.", answer: "meine", translation: "Vatanımı seviyorum.", hint1: "Akkusativ", hint2: "Zamir: ich" }
        ];

        if (level === 'B1') {
            const b1Questions: Question[] = [
                { id: 101, preGap: "Wegen", postGap: "Krankheit konnte er nicht kommen.", answer: "seiner", translation: "Hastalığı yüzünden gelemedi.", hint1: "Genitiv", hint2: "Edat: wegen + Genitiv" },
                { id: 102, preGap: "Während", postGap: "Urlaubs hat es viel geregnet.", answer: "unseres", translation: "Tatilimiz boyunca çok yağmur yağdı.", hint1: "Genitiv", hint2: "Zamir: wir" },
                { id: 103, preGap: "Ich weiß nicht, ob ich", postGap: "Meinung ändern soll.", answer: "meine", translation: "Fikrimi değiştirip değiştirmemem gerektiğini bilmiyorum.", hint1: "Akkusativ", hint2: "Zamir: ich" },
                { id: 104, preGap: "Das ist die Frau, die", postGap: "Mann sucht.", answer: "ihren", translation: "Bu, kocasını arayan kadın.", hint1: "Akkusativ", hint2: "Zamir: sie" },
                { id: 105, preGap: "Trotz", postGap: "Bemühungen war der Erfolg klein.", answer: "ihrer", translation: "Çabalarına (onların) rağmen başarı küçüktü.", hint1: "Genitiv", hint2: "Zamir: sie (çoğul)" },
                { id: 106, preGap: "Er ist stolz auf", postGap: "beruflichen Erfolg.", answer: "seinen", translation: "Mesleki başarısıyla gurur duyuyor.", hint1: "Akkusativ", hint2: "Fiil: stolz auf + Akkusativ" },
                { id: 107, preGap: "Wir freuen uns über", postGap: "neue Projekt.", answer: "unser", translation: "Yeni projemizden dolayı mutluyuz.", hint1: "Akkusativ", hint2: "Zamir: wir" },
                { id: 108, preGap: "Anstatt", postGap: "Wortes gab er mir ein Zeichen.", answer: "seines", translation: "Sözü yerine bana bir işaret verdi.", hint1: "Genitiv", hint2: "Zamir: er" },
                { id: 109, preGap: "Kümmerst du dich um", postGap: "Angelegenheiten?", answer: "deine", translation: "Meselelerinle ilgileniyor musun?", hint1: "Akkusativ", hint2: "Zamir: du" },
                { id: 110, preGap: "Dank", postGap: "Unterstützung haben wir es geschafft.", answer: "Ihrer", translation: "Desteğiniz sayesinde başardık.", hint1: "Genitiv/Dativ", hint2: "Zamir: Sie" },
                { id: 111, preGap: "Sie zweifelt an", postGap: "Entscheidung.", answer: "ihrer", translation: "Kararından şüphe ediyor.", hint1: "Dativ", hint2: "Fiil: zweifeln an + Dativ" },
                { id: 112, preGap: "Ich erinnere mich an", postGap: "Kindheit.", answer: "meine", translation: "Çocukluğumu hatırlıyorum.", hint1: "Akkusativ", hint2: "Zamir: ich" },
                { id: 113, preGap: "Aufgrund", postGap: "Aussage wurde er freigesprochen.", answer: "seiner", translation: "İfadesi temelinde beraat etti.", hint1: "Genitiv", hint2: "Zamir: er" },
                { id: 114, preGap: "Wir hoffen auf", postGap: "baldige Genesung.", answer: "ihre", translation: "Onun (kadın) tez zamanda iyileşmesini umuyoruz.", hint1: "Akkusativ", hint2: "Zamir: sie" },
                { id: 115, preGap: "Er spricht mit", postGap: "Vorgesetzten.", answer: "seinem", translation: "Üstüyle (müdürüyle) konuşuyor.", hint1: "Dativ", hint2: "Zamir: er" },
                { id: 116, preGap: "Das ist das Kind, um", postGap: "Erziehung Eltern sich sorgen.", answer: "seine", translation: "Bu, ebeveynlerinin eğitimiyle ilgilendiği çocuktur.", hint1: "Akkusativ", hint2: "Zamir: es" },
                { id: 117, preGap: "Unter", postGap: "Leitung wurde die Firma groß.", answer: "seiner", translation: "Onun yönetimi altında şirket büyüdü.", hint1: "Dativ", hint2: "Zamir: er" },
                { id: 118, preGap: "Ich verlasse mich auf", postGap: "Kollegen.", answer: "meine", translation: "Meslektaşlarıma güveniyorum.", hint1: "Akkusativ", hint2: "Zamir: ich (çoğul)" },
                { id: 119, preGap: "Trotz", postGap: "Alters ist sie sehr fit.", answer: "ihres", translation: "Yaşına rağmen çok zinde.", hint1: "Genitiv", hint2: "Zamir: sie" },
                { id: 120, preGap: "Wir diskutieren über", postGap: "Zukunft.", answer: "unsere", translation: "Geleceğimiz hakkında tartışıyoruz.", hint1: "Akkusativ", hint2: "Zamir: wir" }
            ];
            const combined = [...b1Questions, ...fallbackQuestions];
            return combined.sort(() => Math.random() - 0.5).slice(0, 20);
        }
        return fallbackQuestions.sort(() => Math.random() - 0.5).slice(0, 20);
    }
};
