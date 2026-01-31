import React from 'react';
import { useQuizStore, useQuizActions } from '../store/useQuizStore';
import { UserLevel } from '../types';

export const StartScreen: React.FC = () => {
  const gameState = useQuizStore(state => state.gameState);
  const error = useQuizStore(state => state.error);
  const userLevel = useQuizStore(state => state.userLevel);
  const isLoading = gameState === 'LOADING';

  const { startGame, setLevel } = useQuizActions();

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 text-center max-w-2xl mx-auto">
      <div className="mb-0 md:mb-8">
        <span className="text-xl md:text-6xl">🇩🇪</span>
      </div>
      <h1 className="text-lg md:text-4xl font-bold text-slate-800 mb-0.5 md:mb-4">
        Almanca İyelik Zamirleri Testi
      </h1>
      <p className="text-sm md:text-lg text-slate-600 mb-3 md:mb-8">
        Seviyeni seç ve pratik yapmaya başla.
        <br />
        <span className="font-semibold text-green-600 text-sm">Doğru: +10</span> | <span className="font-semibold text-red-500 text-sm">Yanlış: -5</span>
      </p>

      {/* Level Selector */}
      <div className="flex gap-4 mb-6 md:mb-8 bg-slate-100 p-2 rounded-xl">
        {(['A2', 'B1'] as UserLevel[]).map((level) => (
          <button
            key={level}
            onClick={() => setLevel(level)}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${userLevel === level
              ? 'bg-white text-indigo-600 shadow-md'
              : 'text-slate-400 hover:text-slate-600'
              }`}
          >
            Seviye {level}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-3 w-full text-sm">
          <p className="font-bold">Hata oluştu:</p>
          <p>{error}</p>
        </div>
      )}

      <button
        onClick={() => startGame()}
        disabled={isLoading}
        className={`px-6 py-2 md:px-8 md:py-4 rounded-full text-lg md:text-xl font-semibold shadow-lg transition-all transform hover:scale-105 active:scale-95 ${isLoading
          ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
          : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sorular Hazırlanıyor...
          </div>
        ) : (
          'Alıştırmaya Başla'
        )}
      </button>

      {!isLoading && (
        <p className="mt-4 text-sm text-slate-400">
          Sorular Google Gemini AI tarafından anlık olarak oluşturulur.
        </p>
      )}
    </div>
  );
};