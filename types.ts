export interface Question {
  id: number;
  preGap: string;    // Text before the input
  postGap: string;   // Text after the input
  answer: string;    // The correct word (possessive pronoun or preposition)
  translation: string; // Turkish translation for context
  hint1?: string;    // Dilbilgisi çekimi ipucu (Kasus/Deklination bilgisi)
  hint2?: string;    // İçerik/Kullanım ipucu (Fiil, Sıfat, Bağlam)
}

export interface AnswerRecord {
  questionId: number;
  question: Question;
  userInput: string;
  isCorrect: boolean;
  hintsUsed: { hint1: boolean; hint2: boolean };
}

export enum GameState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED',
  ERROR = 'ERROR'
}

export type UserLevel = 'A2' | 'B1';

export type TopicId = string;

export type TopicCategory = 'Gramer' | 'Kelime Bilgisi' | 'Fiil Çekimi' | 'Okuma';

export interface Topic {
  id: TopicId;
  title: string;
  description: string;
  icon: string; // Emoji
  category?: TopicCategory;
}