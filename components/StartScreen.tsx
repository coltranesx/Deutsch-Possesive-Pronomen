import React from 'react';

interface StartScreenProps {
  onStart: () => void;
  isLoading: boolean;
  error?: string | null;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart, isLoading, error }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 text-center max-w-2xl mx-auto">
      <div className="mb-8">
        <span className="text-6xl">🇩🇪</span>
      </div>
      <h1 className="text-4xl font-bold text-slate-800 mb-4">
        Almanca İyelik Zamirleri Testi
      </h1>
      <p className="text-lg text-slate-600 mb-8">
        A2 seviyesinde 20 cümlelik bir alıştırma. 
        <br />
        <span className="font-semibold text-green-600">Doğru: +10 Puan</span> | <span className="font-semibold text-red-500">Yanlış: -5 Puan</span>
      </p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 w-full">
          <p className="font-bold">Hata oluştu:</p>
          <p>{error}</p>
        </div>
      )}

      <button
        onClick={onStart}
        disabled={isLoading}
        className={`px-8 py-4 rounded-full text-xl font-semibold shadow-lg transition-all transform hover:scale-105 active:scale-95 ${
          isLoading
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