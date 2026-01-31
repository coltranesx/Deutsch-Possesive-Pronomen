import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Question, AnswerRecord, GameState, UserLevel } from '../types';
import { generateQuestions } from '../services/geminiService';

interface QuizState {
    questions: Question[];
    currentQuestionIndex: number;
    score: number;
    history: AnswerRecord[];
    userLevel: UserLevel;
    gameState: GameState;
    error: string | null;

    actions: {
        startGame: () => Promise<void>;
        restartGame: () => void;
        recordAnswer: (userAnswer: string) => void;
        nextQuestion: () => void;
        setLevel: (level: UserLevel) => void;
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
            gameState: GameState.IDLE,
            error: null,

            actions: {
                startGame: async () => {
                    set({ gameState: GameState.LOADING, error: null });
                    try {
                        const { userLevel } = get();
                        // @ts-ignore - generateQuestions will be updated to accept level
                        const fetchedQuestions = await generateQuestions(userLevel);
                        set({
                            questions: fetchedQuestions,
                            currentQuestionIndex: 0,
                            score: 0,
                            history: [],
                            gameState: GameState.PLAYING
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
                        currentQuestionIndex: 0
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
                            isCorrect
                        }]
                    }));
                },
                nextQuestion: () => {
                    const { currentQuestionIndex, questions } = get();
                    if (currentQuestionIndex + 1 < questions.length) {
                        set({ currentQuestionIndex: currentQuestionIndex + 1 });
                    } else {
                        set({ gameState: GameState.FINISHED });
                    }
                },
                setLevel: (level: UserLevel) => set({ userLevel: level }),
            }
        }),
        {
            name: 'deutsch-meister-storage',
            partialize: (state) => ({ userLevel: state.userLevel }), // Persist only user level
        }
    )
);

export const useQuizActions = () => useQuizStore((state) => state.actions);
