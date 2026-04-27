# 📝 İpucu Sistemi Uygulama Planı (Multi-Tiered Hint System)

> **Son Güncelleme:** 27.04.2026  
> **Durum:** Kullanıcı onayı bekleniyor  
> **Etki Alanı:** types.ts, useQuizStore.ts, QuizScreen.tsx, ResultScreen.tsx, api/generate.ts, services/topics/*.ts, utils/sound.ts, tailwind.config.js, index.css

---

## Genel Bakış

Mevcut sistemde her sorunun üzerinde tek bir statik `hint` metni (örn. `"ich (Nominativ)"`) ücretsiz olarak gösterilmektedir. Bu plan, mevcut ücretsiz ipucunu kaldırıp yerine **iki aşamalı, ücretli (puan cezalı) ipucu sistemi** kurmayı hedefler.

### Puanlama Mantığı
| Eylem | Puan Etkisi |
|---|---|
| Doğru cevap | **+10** |
| Yanlış cevap | **-5** |
| İpucu 1 kullanımı | **-3** |
| İpucu 2 kullanımı | **-3** |

> En kötü senaryo: Oyuncu her iki ipucunu açar (-6) ve yanlış cevap verir (-5) → Toplam **-11** puan.  
> En iyi senaryo: Oyuncu ipucu kullanmadan doğru cevap verir → Toplam **+10** puan.

---

## Adım 1: Veri Modeli Güncellemesi

### [MODIFY] [types.ts](file:///Users/korhanulusoy/Desktop/Development/GitHub/deutsch-meister---possessivpronomen/types.ts)

`Question` arayüzündeki eski `hint?: string` alanı kaldırılacak, yerine iki yeni alan eklenecek:

```typescript
export interface Question {
  id: number;
  preGap: string;
  postGap: string;
  answer: string;
  translation: string;
  // ESKİ: hint?: string;                     ← SİL
  hint1?: string; // Dilbilgisi çekimi ipucu (Kasus/Deklination bilgisi)
  hint2?: string; // İçerik/Kullanım ipucu (Fiil, Sıfat, Bağlam)
}
```

> [!IMPORTANT]
> Eski `hint` alanı tamamen silinmelidir. Geçici olarak ikisinin birlikte bulunması (backward compat) **kabul edilmez** — yama kod yasak.

`AnswerRecord` arayüzüne ipucu kullanım bilgisi eklenecek (ResultScreen'de istatistik göstermek için):

```typescript
export interface AnswerRecord {
  questionId: number;
  question: Question;
  userInput: string;
  isCorrect: boolean;
  hintsUsed: { hint1: boolean; hint2: boolean }; // YENİ
}
```

---

## Adım 2: Ses Efekti Eklenmesi

### [MODIFY] [sound.ts](file:///Users/korhanulusoy/Desktop/Development/GitHub/deutsch-meister---possessivpronomen/utils/sound.ts)

Yeni bir `playHintSound` fonksiyonu eklenecek. Kısa, bilgilendirici bir "reveal" sesi (örn. hızlı ascending chime). Mevcut `playSuccessSound` ve `playErrorSound` ile aynı Web Audio API pattern'i kullanılacak.

```typescript
/** İpucu açıldığında çalan bilgilendirici ses efekti */
export const playHintSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, ctx.currentTime);       // A4
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {
    console.error('Hint audio failed', e);
  }
};
```

> [!NOTE]
> Mevcut `playSuccessSound` ve `playErrorSound` fonksiyonlarındaki `(window as any)` cast'leri de `as unknown as` pattern'ine dönüştürülmelidir (Sıfır `any` kuralı).

---

## Adım 3: CSS Animasyonu Eklenmesi

### [MODIFY] [tailwind.config.js](file:///Users/korhanulusoy/Desktop/Development/GitHub/deutsch-meister---possessivpronomen/tailwind.config.js)

`theme.extend` altına ipucu açılma ve puan düşme animasyonları eklenecek:

```javascript
theme: {
  extend: {
    keyframes: {
      'fade-in-down': {
        '0%': { opacity: '0', transform: 'translateY(-8px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      'float-up': {
        '0%': { opacity: '1', transform: 'translateY(0)' },
        '100%': { opacity: '0', transform: 'translateY(-24px)' },
      },
    },
    animation: {
      'fade-in-down': 'fade-in-down 0.3s ease-out',
      'float-up': 'float-up 0.8s ease-out forwards',
    },
  },
},
```

### [MODIFY] [index.css](file:///Users/korhanulusoy/Desktop/Development/GitHub/deutsch-meister---possessivpronomen/index.css)

`@layer base` bloğunun **dışına**, mevcut `animate-fade-in` ve yeni animasyonlar için utility class'ları eklenecek (eğer `animate-fade-in` henüz tanımlı değilse):

```css
@layer utilities {
  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }
}
```

---

## Adım 4: State Yönetimi (Zustand Store)

### [MODIFY] [useQuizStore.ts](file:///Users/korhanulusoy/Desktop/Development/GitHub/deutsch-meister---possessivpronomen/store/useQuizStore.ts)

#### 4.1 Yeni State Alanı

```typescript
interface QuizState {
  // ... mevcut alanlar
  currentHintsUsed: { hint1: boolean; hint2: boolean }; // YENİ
  // ...
}
```

Başlangıç değeri:
```typescript
currentHintsUsed: { hint1: false, hint2: false },
```

#### 4.2 Yeni Action: `useHint`

`actions` nesnesine eklenecek:

```typescript
useHint: (hintType: 1 | 2) => {
  const { currentHintsUsed } = get();
  const key = hintType === 1 ? 'hint1' : 'hint2';

  // Zaten açılmışsa tekrar puan düşürme
  if (currentHintsUsed[key]) return;

  set(state => ({
    score: state.score - 3,
    currentHintsUsed: {
      ...state.currentHintsUsed,
      [key]: true,
    },
  }));
},
```

#### 4.3 Güncellenmesi Gereken Mevcut Action'lar

**`startGame`:** Başlangıçta `currentHintsUsed` sıfırlanmalı:
```typescript
currentHintsUsed: { hint1: false, hint2: false },
```

**`nextQuestion`:** Yeni soruya geçerken `currentHintsUsed` sıfırlanmalı:
```typescript
set({ 
  currentQuestionIndex: currentQuestionIndex + 1,
  currentHintsUsed: { hint1: false, hint2: false }, // RESET
});
```

**`restartGame`:** `currentHintsUsed` sıfırlanmalı:
```typescript
currentHintsUsed: { hint1: false, hint2: false },
```

**`recordAnswer`:** `AnswerRecord` objesine `hintsUsed` eklenmeli:
```typescript
history: [...state.history, {
  questionId: currentQuestion.id,
  question: currentQuestion,
  userInput: userAnswer,
  isCorrect,
  hintsUsed: { ...state.currentHintsUsed }, // YENİ
}],
```

#### 4.4 Action Tip Güncellemesi

`actions` tipine eklenmeli:
```typescript
actions: {
  // ... mevcut
  useHint: (hintType: 1 | 2) => void; // YENİ
};
```

---

## Adım 5: Arayüz (QuizScreen.tsx)

### [MODIFY] [QuizScreen.tsx](file:///Users/korhanulusoy/Desktop/Development/GitHub/deutsch-meister---possessivpronomen/components/QuizScreen.tsx)

#### 5.1 Store'dan Yeni Değerleri Çekme

```typescript
const currentHintsUsed = useQuizStore(state => state.currentHintsUsed);
const { recordAnswer, nextQuestion, useHint } = useQuizActions();
```

#### 5.2 Mevcut Ücretsiz İpucu Alanını Kaldırma

QuizScreen'de **satır 102-104** arasındaki eski ipucu badge'i (`İpucu: {question.hint}`) **tamamen silinecek**.

#### 5.3 Yeni İpucu Butonları (Soru kartının hemen üstüne)

Progress bar ile soru kartı arasına iki buton eklenecek. Butonlar bir `div` container içinde yan yana duracak:

```
[--- İlerleme Çubuğu ---]
[💡 İpucu 1: Çekim (-3p)] [🔍 İpucu 2: Kelime (-3p)]
   → (Tıklanınca altında metin açılır)
[         Soru Kartı         ]
```

**Buton Davranışları:**
- **Tıklanmadan önce**: Indigo gradient arka plan, hover efekti, "💡 İpucu 1 (-3 Puan)" metni.
- **Tıklandığında**: 
  1. `useHint(1)` veya `useHint(2)` çağrılır.
  2. `playHintSound()` tetiklenir.
  3. Butonun üzerinde "-3" yazısı `animate-float-up` ile yukarı uçar ve kaybolur.
  4. Buton disabled/pasif renklere geçer (slate-400, cursor-not-allowed).
  5. Butonun altında ipucu metni `animate-fade-in-down` ile açılır.

**Tasarım Detayları (Premium UI):**
- **Aktif buton**: `bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all`
- **Pasif buton**: `bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed`
- **İpucu metni**: `text-sm bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 px-3 py-2 rounded-lg`

#### 5.4 Lokal "-3 Puan" Animasyon State'i

Bu animasyon tamamen lokal UI state'tir, Zustand'a eklenmez:

```typescript
const [floatingPenalty, setFloatingPenalty] = useState<1 | 2 | null>(null);

const handleUseHint = (type: 1 | 2) => {
  useHint(type);
  playHintSound();
  setFloatingPenalty(type);
  setTimeout(() => setFloatingPenalty(null), 800);
};
```

#### 5.5 Cevap Sonrası İpucu Butonlarının Gizlenmesi

Kullanıcı cevabı verdikten sonra (`feedbackState !== 'idle'`) ipucu butonları **gizlenecek** (artık açmaya gerek yok), ancak daha önce açılmış ipucu metinleri gösterilmeye devam edecek.

---

## Adım 6: Sonuç Ekranı Güncellenmesi

### [MODIFY] [ResultScreen.tsx](file:///Users/korhanulusoy/Desktop/Development/GitHub/deutsch-meister---possessivpronomen/components/ResultScreen.tsx)

#### 6.1 İpucu Kullanım İstatistiği

Summary Cards bölümüne (grid) 4. bir kart eklenecek (grid `md:grid-cols-4` olacak):

```typescript
const hintCount = history.filter(h => h.hintsUsed.hint1 || h.hintsUsed.hint2).length;
```

```
📊 İpucu Kullanımı
   {hintCount} / {totalQuestions}
```

#### 6.2 Detaylı Tablo Güncellemesi

Tablo başlığına "İpucu" kolonu eklenecek. Her satırda ipucu kullanıldıysa `💡` (bir ipucu) veya `💡💡` (iki ipucu) ikonu gösterilecek, kullanılmadıysa `—` gösterilecek.

---

## Adım 7: API Prompt Güncellemesi (Gemini Serverless)

### [MODIFY] [generate.ts](file:///Users/korhanulusoy/Desktop/Development/GitHub/deutsch-meister---possessivpronomen/api/generate.ts)

#### 7.1 JSON Format Değişikliği

Prompt'taki örnek JSON çıktısı güncellenmeli. **Eski:**
```json
[{"id": 1, ..., "hint": "ich (Nominativ)"}]
```

**Yeni:**
```json
[{"id": 1, ..., "hint1": "Nominativ", "hint2": "Zamir: ich"}]
```

#### 7.2 Prompt Talimatları

Mevcut prompt şablonuna (`satır 76-86`) şu talimat eklenecek:

```
3. İpucu alanları:
   - "hint1": Sadece Kasus veya çekim tipi (Örn: "Akkusativ", "Dativ", "Weak - Nom - masc")
   - "hint2": Hangi kelimeyle ilişkili olduğu (Örn: "Zamir: ich", "Fiil: helfen + Dativ", "Sıfat: gut")
4. JSON Liste (Array) olarak ver: [{"id": 1, "preGap": "...", "postGap": "...", "answer": "...", "translation": "...", "hint1": "...", "hint2": "..."}]
```

> [!WARNING]
> `api/generate.ts` dosyasındaki standalone `TopicId` type'ı (`satır 5`) yeni bir konu eklendiğinde buraya da eklenmesi gerektiğini unutma. Bu dosya Vercel serverless olduğu için merkezi `types.ts`'den import yapamaz.

---

## Adım 8: Statik Fallback Verilerinin Güncellenmesi

### [MODIFY] [possessivpronomen.ts](file:///Users/korhanulusoy/Desktop/Development/GitHub/deutsch-meister---possessivpronomen/services/topics/possessivpronomen.ts)

Tüm `hint: "..."` alanları `hint1` ve `hint2` olarak ikiye bölünecek.

**Dönüşüm Kuralı (Possessivpronomen):**
| Eski `hint` | Yeni `hint1` | Yeni `hint2` |
|---|---|---|
| `"ich (Nominativ)"` | `"Nominativ"` | `"Zamir: ich"` |
| `"er (Akkusativ)"` | `"Akkusativ"` | `"Zamir: er"` |
| `"sie (Dativ)"` | `"Dativ"` | `"Zamir: sie"` |
| `"er (Genitiv - wegen + Gen)"` | `"Genitiv"` | `"Edat: wegen + Genitiv"` |
| `"sie çoğul (Genitiv)"` | `"Genitiv"` | `"Zamir: sie (çoğul)"` |

**Örnekler:**
```typescript
// ESKİ:
{ id: 1, ..., hint: "ich (Nominativ)" }

// YENİ:
{ id: 1, ..., hint1: "Nominativ", hint2: "Zamir: ich" }
```

### [MODIFY] [prepositionen.ts](file:///Users/korhanulusoy/Desktop/Development/GitHub/deutsch-meister---possessivpronomen/services/topics/prepositionen.ts)

**Dönüşüm Kuralı (Prepositionen):**
| Eski `hint` | Yeni `hint1` | Yeni `hint2` |
|---|---|---|
| `"Dativ (köken)"` | `"Dativ"` | `"Bağlam: Köken belirtir"` |
| `"Akkusativ (warten auf)"` | `"Akkusativ"` | `"Fiil: warten auf + Akk"` |
| `"Dativ (konum)"` | `"Dativ"` | `"Bağlam: Konum (wo?)"` |
| `"Akkusativ (yön)"` | `"Akkusativ"` | `"Bağlam: Yön (wohin?)"` |
| `"Genitiv"` | `"Genitiv"` | `"Edat: Genitiv grubu"` |

### [MODIFY] [adjektivdeklination.ts](file:///Users/korhanulusoy/Desktop/Development/GitHub/deutsch-meister---possessivpronomen/services/topics/adjektivdeklination.ts)

**Dönüşüm Kuralı (Adjektivdeklination):**
| Eski `hint` | Yeni `hint1` | Yeni `hint2` |
|---|---|---|
| `"Weak - Nom - masc"` | `"Nominativ - maskulin"` | `"Çekim: Schwache Deklination (der/die/das)"` |
| `"Mixed - Akk - neut"` | `"Akkusativ - neutral"` | `"Çekim: Gemischte Deklination (ein/eine)"` |
| `"Strong - Dat - fem"` | `"Dativ - feminin"` | `"Çekim: Starke Deklination (ohne Artikel)"` |

---

## Adım 9: TopicStrategy Prompt Güncellemesi

### [MODIFY] [possessivpronomen.ts](file:///Users/korhanulusoy/Desktop/Development/GitHub/deutsch-meister---possessivpronomen/services/topics/possessivpronomen.ts) — `getPrompt` metodu

Her topic strategy'nin `getPrompt` içindeki talimat metni, AI'dan `hint1` ve `hint2` alanlarını üretmesini isteyecek şekilde güncellenmeli.

> [!NOTE]
> Bu güncelleme, `api/generate.ts` dosyasındaki embedded prompt'u kullanmayan local/dev ortamları için önemlidir. `getPrompt()` hem `api/generate.ts` tarafından hem de potansiyel olarak doğrudan servis tarafından çağrılır.

---

## Uygulama Sırası (Önemli!)

Aşağıdaki sıra, bağımlılıkları doğru karşılamak için zorunludur:

```
1. types.ts           → Temel veri yapıları (tüm dosyalar buna bağlı)
2. tailwind.config.js → Animasyon tanımları (UI buna bağlı)
3. index.css          → Ek CSS utilities
4. utils/sound.ts     → playHintSound fonksiyonu
5. useQuizStore.ts    → State ve action'lar (UI buna bağlı)
6. QuizScreen.tsx     → Ana ipucu arayüzü
7. ResultScreen.tsx   → İstatistik gösterimi
8. api/generate.ts    → API prompt güncellemesi
9. services/topics/*  → Tüm fallback verileri (hint → hint1 + hint2)
```

---

## Doğrulama Kontrol Listesi

- [ ] `types.ts`: Eski `hint` alanı silindi, `hint1`/`hint2` eklendi
- [ ] `types.ts`: `AnswerRecord`'a `hintsUsed` eklendi
- [ ] `sound.ts`: `playHintSound` fonksiyonu çalışıyor
- [ ] `sound.ts`: Mevcut `any` kullanımları `as unknown as` ile değiştirildi
- [ ] `tailwind.config.js`: `fade-in-down` ve `float-up` animasyonları tanımlı
- [ ] `useQuizStore.ts`: `currentHintsUsed` state'i eklendi
- [ ] `useQuizStore.ts`: `useHint` action'ı eklendi, mükerrer çağrıda puan düşmüyor
- [ ] `useQuizStore.ts`: `startGame`, `nextQuestion`, `restartGame` sıfırlıyor
- [ ] `useQuizStore.ts`: `recordAnswer` ipucu kullanım bilgisini kaydediyor
- [ ] `QuizScreen.tsx`: Eski ücretsiz ipucu badge'i kaldırıldı
- [ ] `QuizScreen.tsx`: İki ipucu butonu doğru çalışıyor
- [ ] `QuizScreen.tsx`: Buton tıklandığında "-3" animasyonu görünüyor
- [ ] `QuizScreen.tsx`: Buton pasifleştikten sonra ipucu metni açılıyor
- [ ] `QuizScreen.tsx`: Cevap verildikten sonra butonlar gizleniyor
- [ ] `ResultScreen.tsx`: İpucu kullanım istatistiği gösteriliyor
- [ ] `ResultScreen.tsx`: Tabloda ipucu kolonu çalışıyor
- [ ] `api/generate.ts`: Prompt `hint1`/`hint2` formatını istiyor
- [ ] `possessivpronomen.ts`: Tüm fallback veriler `hint1`/`hint2` formatında
- [ ] `prepositionen.ts`: Tüm fallback veriler `hint1`/`hint2` formatında
- [ ] `adjektivdeklination.ts`: Tüm fallback veriler `hint1`/`hint2` formatında
- [ ] Projenin TypeScript strict modda hatasız derleniyor (`npx tsc --noEmit`)
- [ ] Mobil ve masaüstü görünümde estetik duruyor
- [ ] Dark mode'da tüm yeni bileşenler doğru renkte

---

## Kapsam Dışı (Bu plana dahil değil)

- Yeni gramer konusu eklenmesi
- Genel UI/UX refaktörü
- Test dosyalarının güncellenmesi (mevcut testler bu özelliği kapsamıyor)
