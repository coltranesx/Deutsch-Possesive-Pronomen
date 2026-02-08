export interface Question {
  id: number;
  preGap: string;    // Text before the input
  postGap: string;   // Text after the input
  answer: string;    // The correct word (possessive pronoun or preposition)
  translation: string; // Turkish translation for context
  hint?: string;     // Optional hint (e.g., "Nom. ich" or "aus + Dativ")
}

export interface AnswerRecord {
  questionId: number;
  question: Question;
  userInput: string;
  isCorrect: boolean;
}

export enum GameState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED',
  ERROR = 'ERROR'
}

export type UserLevel = 'A2' | 'B1';

export type TopicId = 'possessivpronomen' | 'prepositionen';

export interface Topic {
  id: TopicId;
  title: string;
  description: string;
  icon: string; // Emoji
}