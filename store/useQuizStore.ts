import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Question, AnswerRecord, GameState, UserLevel, TopicId } from '../types';
import { generateQuestions } from '../services/geminiService';

interface QuizState {
    questions: Question[];
    currentQuestionIndex: number;
    score: number;
    history: AnswerRecord[];
    userLevel: UserLevel;
    selectedTopic: TopicId;
    gameState: GameState;
    error: string | null;
    currentHintsUsed: { hint1: boolean; hint2: boolean }; // YENİ

    actions: {
        startGame: () => Promise<void>;
        restartGame: () => void;
        recordAnswer: (userAnswer: string) => void;
        nextQuestion: () => void;
        setLevel: (level: UserLevel) => void;
        setTopic: (topic: TopicId) => void;
        useHint: (hintType: 1 | 2) => void; // YENİ
    };
}

export const useQuizStore = create<QuizState>()(
    persist(
        (set, get) => ({
            questions: [],
            currentQuestionIndex: 0,
            score: 0,
            history: [],
            userLevel: 'A2',
            selectedTopic: 'possessivpronomen', // Default topic
            gameState: GameState.IDLE,
            error: null,
            currentHintsUsed: { hint1: false, hint2: false },

            actions: {
                startGame: async () => {
                    set({ gameState: GameState.LOADING, error: null });
                    try {
                        const { userLevel, selectedTopic } = get();
                        const fetchedQuestions = await generateQuestions(userLevel, selectedTopic);
                        set({
                            questions: fetchedQuestions,
                            currentQuestionIndex: 0,
                            score: 0,
                            history: [],
                            gameState: GameState.PLAYING,
                            currentHintsUsed: { hint1: false, hint2: false },
                        });
                    } catch (e) {
                        set({ error: "Sorular yüklenirken bir sorun oluştu.", gameState: GameState.IDLE });
                    }
                },
                restartGame: () => {
                    set({
                        gameState: GameState.IDLE,
                        questions: [],
                        score: 0,
                        history: [],
                        currentQuestionIndex: 0,
                        currentHintsUsed: { hint1: false, hint2: false },
                    });
                },
                recordAnswer: (userAnswer: string) => {
                    const { questions, currentQuestionIndex } = get();
                    const currentQuestion = questions[currentQuestionIndex];

                    if (!currentQuestion) return;

                    const isCorrect = userAnswer.trim().toLocaleLowerCase('de') === currentQuestion.answer.trim().toLocaleLowerCase('de');
                    const points = isCorrect ? 10 : -5;

                    set(state => ({
                        score: state.score + points,
                        history: [...state.history, {
                            questionId: currentQuestion.id,
                            question: currentQuestion,
                            userInput: userAnswer,
                            isCorrect,
                            hintsUsed: { ...state.currentHintsUsed }
                        }]
                    }));
                },
                nextQuestion: () => {
                    const { currentQuestionIndex, questions } = get();
                    if (currentQuestionIndex + 1 < questions.length) {
                        set({ 
                            currentQuestionIndex: currentQuestionIndex + 1,
                            currentHintsUsed: { hint1: false, hint2: false } 
                        });
                    } else {
                        set({ gameState: GameState.FINISHED });
                    }
                },
                setLevel: (level: UserLevel) => set({ userLevel: level }),
                setTopic: (topic: TopicId) => set({ selectedTopic: topic }),
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
            }
        }),
        {
            name: 'deutsch-meister-storage',
            partialize: (state) => ({
                userLevel: state.userLevel,
                selectedTopic: state.selectedTopic // Persist selected topic
            }),
        }
    )
);

export const useQuizActions = () => useQuizStore((state) => state.actions);
