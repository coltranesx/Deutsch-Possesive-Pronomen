# Deutsch Meister — Geliştirme Protokolü ve Agent Rehberi (Gemini.md)

Bu belge, **Deutsch Meister** projesinin uzun vadeli başarısı, kod kalitesi ve modüler yapısını korumak için tasarlanmış bir yönetim ve uygulama rehberidir. Her agent ve geliştirici bu kurallara uymakla yükümlüdür.

---

## 1. ROL VE UZMANLIK ALANLARI (ROLES & EXPERTISE)

Bu projede çalışacak bir agent'ın veya geliştiricinin üstlenmesi gereken roller:

### A. Kıdemli Yazılım Mimarı (Architect)
- **Sorumluluk**: Sistemin genel yapısı, modülerlik, bağımlılık yönetimi ve performans.
- **Odak**: Kodun "donmaması" (over-engineering'den kaçınarak) ama "esnemesi" (scalable olması).

### B. Almanca Dil ve Pedagoji Uzmanı (German Language Specialist)
- **Sorumluluk**: İçerik doğruluğu, Almanca gramer kurallarının (Possessivpronomen, Präteritum vb.) doğru yapılandırılması.
- **Odak**: Dil öğrenme mantığına uygun soru setleri ve pedagojik geri bildirimler.

### C. UI/UX Estetik ve Deneyim Uzmanı (Visual Excellence)
- **Sorumluluk**: Premium görsel deneyim, mikro-animasyonlar, modern renk paletleri.
- **Odak**: "Wow" efekti yaratacak, modern ve akıcı bir kullanıcı arayüzü tasarımı.

### D. Clean Code Mühendisi (Clean Code Specialist)
- **Sorumluluk**: Temiz kod, TypeScript strict mod, yüksek test edilebilirliğe sahip bileşenler.
- **Odak**: SOLID prensipleri, DRY (Don't Repeat Yourself) ve KISS (Keep It Simple, Stupid).

---

## 2. MODÜLER KOD VE CLEAN CODE PRENSİPLERİ

### 1. Modülerlik (Modularity)
- Her gramer konusu (Topic) bağımsız bir servis/modül olarak tasarlanmalıdır. 
- Örnek: `services/topics/possessivpronomen.ts`. Bu yapılar merkezi bir `registry.ts` veya `factory` üzerinden yönetilmelidir.
- İş mantığı (logic) arayüzden (UI) kesinlikle ayrılmalıdır. Zustand store'ları temiz tutulmalı, karmaşık hesaplamalar dış fonksiyonlarda yapılmalıdır.

### 2. SIFIR `any` KURALI (Zero 'any' Policy)
- TypeScript'in gücü sonuna kadar kullanılmalıdır.
- Tip tanımları (`interface`/`type`) her zaman dosyanın başında veya merkezi bir `@types` dosyasında bulunmalıdır.

### 3. Görsel Standartlar (Premium Design)
- Basit ve "default" görünümlerden kaçınılmalıdır. 
- Modern tipografi (Google Fonts), akıcı geçişler (Framer Motion/CSS transitions) ve derinlik katan gölge/cam efektleri (Glassmorphism) kullanılmalıdır.

### 4. Sürdürülebilir Refaktor (Scalability)
- Bir özellik eklenirken "Bu yapıya yarın 10 farklı Almanca konusu daha ekleyebilir miyiz?" sorusu temel alınmalıdır.
- "Hardcoded" değerlerden kaçınılmalı, tüm içerik modüllerden (services/topics) çekilmelidir.

### 5. Global State (Zustand) Bağımlılığı
- **Tek Kaynak (Single Source of Truth)**: Global state yönetimi için sadece **Zustand** kullanılacaktır. Redux, React Context (global ölçekte) veya diğer kütüphaneler kesinlikle kullanılmamalıdır.
- **Store Yapısı**: Tüm global state tanımları `/store` klasörü altında toplanmalıdır.
- **Modüler Store**: Karmaşık state yapıları "Slice" mantığı ile bölünmeli ve her biri kendi görev alanına (UI state, Quiz state, Auth vb.) sahip olmalıdır.

---

## 3. UZMANLIK TALİMATLARI (INSTRUCTIONS)

### **Mimar İçin:**
- Proje kökünde bulunan `Gemini.md` ve `RULES.md` dosyalarını her zaman önceliklendir.
- Yeni bir özellik eklemeden önce mevcut `/store` ve `/services` yapılarını analiz et.
- Dosya hiyerarşisini bozacak, merkezi olmayan "adhoc" çözümlerden kaçın.

### **Dil Uzmanı İçin:**
- Almanca karakterler (ä, ö, ü, ß) ve isimlerin büyük harfle başlaması (Nouns) gibi kurallara %100 sadık kal.
- Yanlış cevaplarda kullanıcıya neden yanlış olduğunu anlatan kısa, öğretici ipuçları (`GrammarTips`) sağla.

### **UI Uzmanı İçin:**
- Renk paleti: Arka plan için zengin koyu tonlar (Slate-900), başarı için canlı yeşil (Emerald-500/600), hata için derin kırmızı (Rose-500) tercih et.
- Kart tabanlı tasarımlarda yumuşak kenar yuvarlamaları (border-radius) ve etkileşimli hover efektleri ekle.

### **Clean Code Mühendisi İçin:**
- Bileşenleri olabildiğince küçük ve tek görevli (SRP) tut.
- Global state manipülasyonlarını sadece **Zustand store** içindeki setter'lar (actions) ile yap. Dışarıdan doğrudan state müdahalesi yapma.
- Prop drilling'den kaçın; derin hiyerarşilerde store'dan veri okumayı tercih et.
- Kod karmaşıklığını (Cyclomatic Complexity) kontrol altında tut.

---

## 4. ÇALIŞMA AKIŞI (WORKFLOW)

1. **Analiz**: Dosya düzenlemeden önce `grep` ve `ls` ile çevre dosyaları oku.
2. **Mimari Onay**: Büyük yapısal değişikliklerden önce kullanıcıya planını sun ve onay al.
3. **Dokümantasyon**: Her büyük fonksiyon veya tip tanımı için JSDoc stilinde yorum satırları ekle.
4. **Dil**: Agent ile iletişim her zaman **Türkçe** olmalıdır.

---

> [!NOTE]
> Bu rehber, Deutsch Meister uygulamasının profesyonel bir eğitim aracına dönüşmesi için bir pusula niteliğindedir.
