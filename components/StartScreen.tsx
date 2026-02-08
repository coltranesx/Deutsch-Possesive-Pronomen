import React, { useEffect } from 'react';
import { useQuizStore, useQuizActions } from '../store/useQuizStore';
import { UserLevel, TopicId } from '../types';
import { getAllTopics } from '../services/topics/registry';
import { Check } from 'lucide-react';

export const StartScreen: React.FC = () => {
  const gameState = useQuizStore(state => state.gameState);
  const error = useQuizStore(state => state.error);
  const userLevel = useQuizStore(state => state.userLevel);
  const selectedTopic = useQuizStore(state => state.selectedTopic);
  const isLoading = gameState === 'LOADING';

  const { startGame, setLevel, setTopic } = useQuizActions();
  const topics = getAllTopics();

  // Ensure a default topic is set (e.g., if persist hydration failed or first load)
  useEffect(() => {
    if (!selectedTopic) {
      setTopic('possessivpronomen');
    }
  }, [selectedTopic, setTopic]);

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-4 text-center max-w-4xl mx-auto">
      <div className="mb-4 md:mb-8">
        <span className="text-4xl md:text-7xl">🇩🇪</span>
      </div>
      <h1 className="text-2xl md:text-5xl font-extrabold text-slate-800 mb-2 md:mb-6 tracking-tight">
        Almanca Pratik
      </h1>
      <p className="text-base md:text-xl text-slate-600 mb-6 md:mb-10 max-w-xl mx-auto leading-relaxed">
        Kendini geliştirmek istediğin konuyu ve seviyeni seç, yapay zeka destekli alıştırmalarla Almancanı güçlendir.
      </p>

      {/* Main Selection Area */}
      <div className="w-full grid md:grid-cols-2 gap-8 mb-8">

        {/* 1. Topic Selection */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-slate-700 text-left pl-1">1. Konu Seç</h2>
          <div className="grid grid-cols-1 gap-3">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setTopic(topic.id)}
                className={`relative flex items-center p-4 rounded-xl border-2 transition-all text-left group ${selectedTopic === topic.id
                    ? 'border-indigo-600 bg-indigo-50 shadow-md ring-2 ring-indigo-200 ring-offset-2'
                    : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm'
                  }`}
              >
                <div className="text-3xl mr-4 group-hover:scale-110 transition-transform duration-200">{topic.icon}</div>
                <div className="flex-1">
                  <h3 className={`font-bold text-lg ${selectedTopic === topic.id ? 'text-indigo-900' : 'text-slate-800'}`}>
                    {topic.title}
                  </h3>
                  <p className={`text-sm ${selectedTopic === topic.id ? 'text-indigo-700/80' : 'text-slate-500'}`}>
                    {topic.description}
                  </p>
                </div>
                {selectedTopic === topic.id && (
                  <div className="bg-indigo-600 text-white p-1 rounded-full absolute top-3 right-3 shadow-sm">
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Level Selection */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-slate-700 text-left pl-1">2. Seviye Seç</h2>
          <div className="flex gap-3 h-full">
            {(['A2', 'B1'] as UserLevel[]).map((level) => (
              <button
                key={level}
                onClick={() => setLevel(level)}
                className={`flex-1 rounded-xl border-2 flex flex-col items-center justify-center p-6 transition-all ${userLevel === level
                    ? 'border-indigo-600 bg-indigo-50 shadow-md ring-2 ring-indigo-200 ring-offset-2'
                    : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm'
                  }`}
              >
                <span className={`text-3xl font-black mb-2 ${userLevel === level ? 'text-indigo-600' : 'text-slate-300'}`}>
                  {level}
                </span>
                <span className={`text-sm font-semibold ${userLevel === level ? 'text-indigo-800' : 'text-slate-500'}`}>
                  {level === 'A2' ? 'Temel - Orta' : 'Orta - İleri'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 w-full max-w-2xl text-sm flex items-start gap-3 text-left">
          <span className="text-xl">⚠️</span>
          <div>
            <p className="font-bold">Bir hata oluştu:</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      <button
        onClick={() => startGame()}
        disabled={isLoading}
        className={`w-full max-w-md px-8 py-4 rounded-2xl text-xl font-bold shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] ${isLoading
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:shadow-indigo-500/30 ring-4 ring-transparent hover:ring-indigo-100'
          }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-6 w-6 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-indigo-900">Alıştırma Hazırlanıyor...</span>
          </div>
        ) : (
          'Başla 🚀'
        )}
      </button>

      {!isLoading && (
        <p className="mt-6 text-xs text-slate-400 font-medium">
          Google Gemini AI tarafından desteklenmektedir.
        </p>
      )}
    </div>
  );
};