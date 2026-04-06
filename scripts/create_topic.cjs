const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.length < 2) {
    console.error('Usage: npm run create-topic -- <topicId> "<title>" "<icon>" "<category>"');
    process.exit(1);
}

const topicId = args[0];
const title = args[1];
const icon = args[2] || '📝';
const category = args[3] || 'Gramer';

const topicFilePath = path.join(__dirname, '..', 'services', 'topics', `${topicId}.ts`);
const registryPath = path.join(__dirname, '..', 'services', 'topics', 'registry.ts');

const template = `import { Question, UserLevel } from '../../types';
import { TopicStrategy } from './types';

export const ${topicId}Strategy: TopicStrategy = {
    metadata: {
        id: '${topicId}',
        title: '${title}',
        description: '${title} alıştırmaları.',
        icon: '${icon}',
        category: '${category}',
    },
    getPrompt: (level: UserLevel) => {
        const topics = [
            "Günlük Yaşam", "İş ve Kariyer", "Seyahat", "Sağlık", "Teknoloji", "Sosyal Medya"
        ];
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];

        const commonRules = \`
        Genel Kurallar:
        - Her seferinde FARKLI cümle yapıları ve kelimeler kullan. 
        - Cümleler doğal ve günlük hayattan olsun.
        - Sadece bir boşluk bırak ve o boşluk hedef kelime olsun.
        \`;

        if (level === 'A2') {
            return \`
        Konu: \${randomTopic}
        A2 seviyesindeki öğrenciler için "${title}" konusunda 20 adet alıştırma cümlesi hazırla.
        \${commonRules}
        1. A2 seviyesine uygun kelime dağarcığı kullan.
      \`;
        } else {
            return \`
        Konu: \${randomTopic}
        B1 seviyesindeki öğrenciler için "${title}" konusunda 20 adet ZORLU alıştırma cümlesi hazırla.
        \${commonRules}
        1. B1 seviyesine uygun karmaşık yapılar ve bağlaçlar kullan.
      \`;
        }
    },
    getFallbackQuestions: (level: UserLevel) => {
        const a2Questions: Question[] = [
            { id: 1, preGap: "Das ist ein", postGap: ".", answer: "Test", translation: "Bu bir testtir.", hint: "A2 Örneği" }
        ];

        if (level === 'B1') {
            const b1Questions: Question[] = [
                { id: 101, preGap: "Obwohl es", postGap: ", gingen wir spazieren.", answer: "regnete", translation: "Yağmur yağmasına rağmen yürüyüşe çıktık.", hint: "B1 Örneği" }
            ];
            const combined = [...b1Questions, ...a2Questions];
            return combined.sort(() => Math.random() - 0.5).slice(0, 20);
        }
        return a2Questions.sort(() => Math.random() - 0.5).slice(0, 20);
    }
};
`;

// 1. Create the topic file
if (!fs.existsSync(topicFilePath)) {
    fs.writeFileSync(topicFilePath, template);
    console.log(`✅ Topic file created: ${topicFilePath}`);
} else {
    console.warn(`⚠️ Warning: Topic file already exists: ${topicFilePath}`);
}

// 2. Update registry.ts
let registryContent = fs.readFileSync(registryPath, 'utf8');

// Add import if not exists
const importLine = `import { ${topicId}Strategy } from './${topicId}';\n`;
if (!registryContent.includes(importLine)) {
    const importMark = "import { prepositionenStrategy } from './prepositionen';\n";
    registryContent = registryContent.replace(importMark, importMark + importLine);
}

// Add to registry object
const registryEntry = `    '${topicId}': ${topicId}Strategy,\n`;
if (!registryContent.includes(`'${topicId}':`)) {
    const registryMark = "    'prepositionen': prepositionenStrategy,\n";
    registryContent = registryContent.replace(registryMark, registryMark + registryEntry);
}

fs.writeFileSync(registryPath, registryContent);
console.log(`✅ registry.ts updated.`);
