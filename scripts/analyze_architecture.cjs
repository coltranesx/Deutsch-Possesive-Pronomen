const fs = require('fs');
const path = require('path');

/**
 * Deutsch Meister — Mimari Analiz Scripti
 * Bu script projenin mevcut yapısını tarar ve docs/ARCHITECTURE_MAP.md dosyasını oluşturur.
 */

const ARCH_MAP_PATH = path.join(__dirname, '../docs/ARCHITECTURE_MAP.md');
const DOCS_DIR = path.join(__dirname, '../docs');

function analyzeArchitecture() {
  console.log('Mimari analiz başlatılıyor...');

  if (!fs.existsSync(DOCS_DIR)) {
    fs.mkdirSync(DOCS_DIR);
    console.log('docs/ klasörü oluşturuldu.');
  }

  const content = `# 🏗️ Deutsch Meister — Mimari Harita (Architecture Map)

Bu döküman, projenin teknik yapısını ve bileşenler arasındaki ilişkileri özetler. Yeni agent'lar ve geliştiriciler için bir pusula görevi görür.

---

## 🛠️ Genel Mimari (Mermaid Şeması)

\`\`\`mermaid
graph TD
    UI[Arayüz Katmanı - Components] --> Store[Global State - Zustand]
    UI --> Services[İçerik Servisleri - Topics]
    Store --> Services
    Services --> Registry[Topic Registry]
    Registry --> Data[Gramer Konuları]
    UI --> Utils[Yardımcı Fonksiyonlar]
\`\`\`

---

## 📂 Klasör ve Bileşen Detayları

### 1. **Global State (/store)**
- \`useQuizStore.ts\`: Tüm uygulamanın ana durum yönetimi. Quiz akışı, puanlama ve kullanıcı tercihlerini tutar.
- **Zorunlu Kurallar**: Global state sadece burada tutulur.

### 2. **İçerik Servisleri (/services/topics)**
- \`registry.ts\`: Tüm gramer konularının kaydedildiği merkezi fabrika.
- \`types.ts\`: Konu bazlı veri yapıları ve tipleri.
- **Konular**:
    - \`possessivpronomen.ts\`: İyelik zamirleri veri seti ve mantığı.
    - \`prepositionen.ts\`: Edatlar veri seti.

### 3. **Bileşenler (/components)**
- \`StartScreen.tsx\`: Giriş ekranı ve konu seçimi.
- \`QuizScreen.tsx\`: Soru-cevap döngüsünün gerçekleştiği ana oyun alanı.
- \`ResultScreen.tsx\`: Sonuç raporlama ve tekrar deneme ekranı.
- \`ui/\`: Button, Card gibi atomik UI bileşenleri.

### 4. **Yardımcı Araçlar (/utils)**
- \`cn.ts\`: Tailwind sınıf birleştirme (clsx + tailwind-merge).
- \`sound.ts\`: Ses efektleri (başarı/hata) yönetimi.

---

## 🚀 Yeni Agent İçin Başlangıç Protokolü

1. İlk olarak \`Gemini.md\` dosyasını oku.
2. \`docs/ARCHITECTURE_MAP.md\` dosyasını (bu dosya) incele.
3. \`/services/topics/registry.ts\` dosyasındaki konu kayıt sistemine bak.
4. \`/store/useQuizStore.ts\` içindeki state yapısını anla.

---

*Son Güncelleme: ${new Date().toLocaleString('tr-TR')}*
`;

  fs.writeFileSync(ARCH_MAP_PATH, content);
  console.log('✅ Mimari harita başarıyla oluşturuldu: docs/ARCHITECTURE_MAP.md');
}

analyzeArchitecture();
