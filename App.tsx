import React from 'react';
import { GameState } from './types';
import { StartScreen } from './components/StartScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { useQuizStore } from './store/useQuizStore';
import { Header } from './components/Header';

export default function App() {
  const gameState = useQuizStore(state => state.gameState);

  return (
    <div className="h-full w-full bg-slate-50 flex flex-col">
      {/* Header / Brand */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative">
        {gameState === GameState.IDLE || gameState === GameState.LOADING ? (
          <StartScreen />
        ) : gameState === GameState.PLAYING ? (
          <QuizScreen />
        ) : gameState === GameState.FINISHED ? (
          <ResultScreen />
        ) : (
          <div className="flex items-center justify-center h-full text-red-500">
            Beklenmeyen bir hata oluştu.
          </div>
        )}
      </main>
    </div>
  );
}