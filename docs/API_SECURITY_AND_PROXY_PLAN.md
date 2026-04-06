# 🛡️ API Güvenliği ve Serverless Proxy Planı

Bu doküman, projede istemci tarafında (Client-Side) açıkta bulunan Google Gemini API anahtarının gizlenmesi ve projenin üretim (Production) ortamına uygun profesyonel bir mimariye geçirilmesi için adım adım uygulama rehberidir.

Herhangi bir agent veya geliştirici bu adımları sırasıyla uygulayarak projeyi güvenli hale getirebilir.

---

## 🏗️ Mimari Vizyon (Vercel Serverless Functions)
Şu anda `services/geminiService.ts` doğrudan Google'a istek atıyor. Bu, API anahtarının tarayıcı Network sekmesinde görünmesine neden olur.
Bunu çözmek için araya bir **"Proxy Katmanı (Sunucu)"** koyacağız. 

**Yeni Akış:**
UI (Tarayıcı) --> `POST /api/generate` (Konu ve Seviye gönderilir) --> Vercel Serverless Function (API Key burada gizlidir) --> Google Gemini API

*(Not: Front-end'den API'ye "prompt" Metnini DOĞRUDAN göndermeyeceğiz. Yoksa kötü niyetli biri kendi promptunu gönderip bizim kotamızı harcayabilir. Prompt oluşturma mantığı sunucuda çalışacak şekilde tasarlanacaktır.)*

---

## BÖLÜM 1: Serverless Fonksiyonun (Backend) Oluşturulması

Proje kök dizinine `api` adında bir klasör açın ve içine `generate.ts` dosyasını oluşturun.

### ADIM 1.1: `api/generate.ts` Dosyasının Kodlanması
Bu dosya Node.js ortamında çalışacaktır.

**Gereksinimler:**
1. Sadece `POST` isteklerini kabul etmeli.
2. Gelen gövdedeki (body) `level` ve `topicId` değerlerini okumalı.
3. `services/topics/registry.ts` dosyasından ilgili konunun promptunu almalı.
4. `@google/genai` kütüphanesini kullanarak Gemini'den JSON yanıt almalı ve bunu frontend'e döndürmeli.
5. `CORS` (Cross-Origin Resource Sharing) başlıkları eklenmeli ki sadece sizin domaininizden gelen isteklere yanıt versin.

> **Önemli:** API anahtarı bu dosyada `process.env.VITE_API_KEY` (veya `process.env.GEMINI_API_KEY`) üzerinden, sunucu ortamından okunmalıdır.

---

## BÖLÜM 2: Frontend'in (geminiService.ts) Güncellenmesi

İstemci tarafındaki servis dosyamızı, artık Google'a değil, kendi oluşturduğumuz backend url'ine istek atacak şekilde güncelleyeceğiz.

### ADIM 2.1: `services/geminiService.ts` Refaktörü
1. `@google/genai` importunu tamamen kaldırın (Frontend'in bundle boyutunu da küçültmüş olacağız!).
2. Fonksiyon içini şu şekilde değiştirin:
   ```typescript
   export const generateQuestions = async (level: UserLevel = 'A2', topicId: TopicId = 'possessivpronomen'): Promise<Question[]> => {
     try {
       // Kendi proxy sunucumuza istek atıyoruz
       const response = await fetch('/api/generate', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ level, topicId })
       });

       if (!response.ok) {
           throw new Error('API Hatası');
       }
       
       const data = await response.json();
       // ID'leri benzersiz yapıp döndür
       return data.map((q: any, index: number) => ({ ...q, id: Date.now() + index }));
       
     } catch (error) {
       console.error("Fetch Error, using fallback data:", error);
       const strategy = getTopicStrategy(topicId);
       return strategy.getFallbackQuestions(level);
     }
   };
   ```

---

## BÖLÜM 3: Temizlik, Log Optimizasyonu ve Güvenlik Sıkılaştırma

### ADIM 3.1: Konsol Log Temizliği (Log Hygiene)
Üretim ortamına(Production) çıkan bir kodda unutulmuş `console.log()` komutları hem kirli görünür hem de veri sızdırabilir.
- Projede `console.log` araması (`grep`) yapın.
- Hata ayıklama (`console.error` ve `console.warn`) dışındaki bilgisel (informative) logları silin veya sadece geliştirme modundayken çalışacak şekilde (`import.meta.env.DEV`) sarmalayın.

### ADIM 3.2: Paket Bağımlılıkları (Dependencies)
- `@google/genai` paketi artık frontend bundle'ına dahil edilmemelidir. Ancak Vercel Serverless Functions Node ortamında çalıştığı için `package.json` içindeki `dependencies` altında kalabilir. Özel bir müdahale gerekmez.

### ADIM 3.3: Geliştirme (Local) Ortam Testi
- Vercel CLI yüklü değilse (`npm i -g vercel`), lokal ortamda `/api/` rotalarının çalışması için Vercel Dev server'ı kullanabilirsiniz (terminalde `vercel dev` komutu ile). Vite'in yerleşik sunucusu standart olarak `/api/` klasörünü node.js olarak derlemez, ancak Vercel ortamına yüklendiğinde otomatik çalışacaktır.

*(Alternatif Local Çözüm: `vite.config.ts` dosyasına proxy ekleyerek `/api` isteklerinin lokal bir node sunucusuna yönlendirilmesi veya testler için fallback yapısına güvenilmesi.)*

---

## BÖLÜM 4: Son Kontroller ve Gelişmiş Koruma (Gelecek Vizyonu)

Bu adımlar uygulandıktan sonra:
1. **GitHub'da Açık Kaynak:** Kodlarınızı GitHub'a herkese açık (Public) olarak yükleseniz bile API anahtarınız `generate.ts` içinde `process.env` kullanılarak çağrılacağı ve .env dosyası zaten commitlenmediği için %100 güvende olacaktır.
2. **Kötüye Kullanımı Engelleme (Rate Limiting):** Vercel veya Cloudflare tarafında, IP başına dakikada 5 istek (`X-RateLimit`) kısıtlaması ekleyebilirsiniz. Böylece botların sisteminize defalarca istek atması engellenmiş olur.
3. **CORS Koruması:** `api/generate.ts` dosyasının sadece "https://deutsch-meister.com" veya kendi Vercel linkinizden gelen `OPTIONS` ve `POST` isteklerini kabul edecek şekilde Strict CORS kurallarıyla kodlandığından emin olun.

---

> [!CAUTION] 
> **UYARI (IMPLEMENTASYON AGENT'I İÇİN):**
> `geminiService.ts` dosyasını güncellerken `TopicStrategy` mantığını (yani fallback devreye girme mekanizmasını) ASLA bozmayın. Fetch başarısız olduğunda veya sunucu hata döndüğünde çevrimdışı 40+ soruluk fallback listesi kusursuz çalışmaya devam etmelidir!
