import React, { useState, useCallback } from 'react';
import { GameState, Question, AnswerRecord } from './types';
import { generateQuestions } from './services/geminiService';
import { StartScreen } from './components/StartScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';

export default function App() {
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<AnswerRecord[]>([]);
  const [error, setError] = useState<string | null>(null);

  const startGame = async () => {
    setGameState(GameState.LOADING);
    setError(null);
    try {
      const fetchedQuestions = await generateQuestions();
      setQuestions(fetchedQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setHistory([]);
      setGameState(GameState.PLAYING);
    } catch (e) {
      setError("Sorular yüklenirken bir sorun oluştu. Lütfen tekrar deneyin.");
      setGameState(GameState.IDLE);
    }
  };

  const restartGame = () => {
    setGameState(GameState.IDLE);
    setQuestions([]);
    setScore(0);
    setHistory([]);
  };

  // Only updates score and history
  const handleRecordAnswer = useCallback((userAnswer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Normalize logic: strict but case-insensitive for A2 friendliness
    const isCorrect = userAnswer.trim().toLocaleLowerCase('de') === currentQuestion.answer.trim().toLocaleLowerCase('de');

    // Calculate score
    const points = isCorrect ? 10 : -5;
    
    setScore(prev => prev + points);
    
    // Record history
    setHistory(prev => [
      ...prev,
      {
        questionId: currentQuestion.id,
        question: currentQuestion,
        userInput: userAnswer,
        isCorrect
      }
    ]);
  }, [currentQuestionIndex, questions]);

  // Moves to next question or finishes game
  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setGameState(GameState.FINISHED);
    }
  }, [currentQuestionIndex, questions.length]);

  return (
    <div className="h-full w-full bg-slate-50 flex flex-col">
      {/* Header / Brand */}
      <header className="bg-white border-b border-slate-200 py-3 px-6 flex justify-between items-center shrink-0">
        <h1 className="font-bold text-xl text-indigo-700">Deutsch Meister</h1>
        {gameState === GameState.PLAYING && (
           <div className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded">
             A2: Possessivpronomen
           </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative">
        {gameState === GameState.IDLE || gameState === GameState.LOADING ? (
          <StartScreen 
            onStart={startGame} 
            isLoading={gameState === GameState.LOADING} 
            error={error}
          />
        ) : gameState === GameState.PLAYING ? (
          <QuizScreen
            question={questions[currentQuestionIndex]}
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            currentScore={score}
            onRecordAnswer={handleRecordAnswer}
            onNextQuestion={handleNextQuestion}
          />
        ) : gameState === GameState.FINISHED ? (
          <ResultScreen
            score={score}
            totalQuestions={questions.length}
            history={history}
            onRestart={restartGame}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-red-500">
            Beklenmeyen bir hata oluştu.
          </div>
        )}
      </main>
    </div>
  );
}