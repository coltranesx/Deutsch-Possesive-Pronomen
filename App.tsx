import React from 'react';
import { GameState } from './types';
import { StartScreen } from './components/StartScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { useQuizStore } from './store/useQuizStore';
import { useUIStore } from './store/useUIStore';
import { Header } from './components/Header';

export default function App() {
  const gameState = useQuizStore(state => state.gameState);
  const isDarkMode = useUIStore(state => state.isDarkMode);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.backgroundColor = '#0f172a'; // slate-900 override for overscroll area
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.backgroundColor = '#f8fafc'; // slate-50 override
    }
  }, [isDarkMode]);

  return (
    <div className="h-full w-full bg-slate-50 dark:bg-slate-900 flex flex-col transition-colors duration-300">
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