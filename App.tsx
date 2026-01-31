import React from 'react';
import { GameState } from './types';
import { StartScreen } from './components/StartScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { useQuizStore } from './store/useQuizStore';

export default function App() {
  const gameState = useQuizStore(state => state.gameState);
  const userLevel = useQuizStore(state => state.userLevel);

  return (
    <div className="h-full w-full bg-slate-50 flex flex-col">
      {/* Header / Brand */}
      <header className="bg-white border-b border-slate-200 py-2 px-4 md:py-3 md:px-6 flex justify-between items-center shrink-0">
        <h1 className="font-bold text-lg md:text-xl text-indigo-700">Deutsch Meister</h1>
        <div className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded">
          {userLevel}
        </div>
      </header>

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