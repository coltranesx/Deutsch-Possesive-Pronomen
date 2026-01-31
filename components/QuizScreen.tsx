import React, { useState, useRef, useEffect } from 'react';
import { playSuccessSound, playErrorSound } from '../utils/sound';
import { useQuizStore, useQuizActions } from '../store/useQuizStore';

export const QuizScreen: React.FC = () => {
  // Global State
  const questions = useQuizStore(state => state.questions);
  const currentQuestionIndex = useQuizStore(state => state.currentQuestionIndex);
  const score = useQuizStore(state => state.score);

  const { recordAnswer, nextQuestion } = useQuizActions();

  // Local UI State
  const [inputValue, setInputValue] = useState('');
  const [feedbackState, setFeedbackState] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  const question = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  useEffect(() => {
    // Reset state for new question
    setInputValue('');
    setFeedbackState('idle');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentQuestionIndex]); // Depend on index instead of question object for stability

  if (!question) return null; // Safety check

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If we are already showing feedback, this button/enter acts as "Next"
    if (feedbackState !== 'idle') {
      nextQuestion();
      return;
    }

    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    // Determine correctness
    const isCorrect = trimmedInput.toLocaleLowerCase('de') === question.answer.toLocaleLowerCase('de');

    if (isCorrect) {
      setFeedbackState('correct');
      playSuccessSound();
    } else {
      setFeedbackState('incorrect');
      playErrorSound();
    }

    // Inform parent to update score/history
    recordAnswer(trimmedInput);
  };

  const progressPercentage = ((currentQuestionIndex) / totalQuestions) * 100;

  // Dynamic styles based on feedback
  let inputBorderClass = "border-slate-300 focus:border-indigo-600 text-indigo-700 bg-slate-50";
  if (feedbackState === 'correct') {
    inputBorderClass = "border-green-500 text-green-700 bg-green-50";
  } else if (feedbackState === 'incorrect') {
    inputBorderClass = "border-red-500 text-red-700 bg-red-50";
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-2 md:p-4 flex flex-col h-full justify-start pt-2 md:justify-center">
      {/* Top Bar */}
      {/* Top Bar - Super Compact Row */}
      <div className="flex justify-between items-center mb-2 md:mb-6 bg-white px-3 py-2 md:p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 md:gap-4 md:flex-col md:items-start">
          <span className="text-xs md:text-sm text-slate-500 font-bold uppercase tracking-wider">Soru</span>
          <span className="text-base md:text-2xl font-bold text-slate-800">{currentQuestionIndex + 1} <span className="text-slate-400 text-xs md:text-lg">/ {totalQuestions}</span></span>
        </div>
        <div className="h-6 w-px bg-slate-200 md:hidden mx-2"></div>
        <div className="flex items-center gap-2 md:gap-4 md:flex-col md:items-end">
          <span className="text-xs md:text-sm text-slate-500 font-bold uppercase tracking-wider">Puan</span>
          <span className={`text-base md:text-2xl font-bold transition-colors duration-300 ${score >= 0 ? 'text-indigo-600' : 'text-red-500'}`}>
            {score}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 rounded-full h-1.5 md:h-2.5 mb-2 md:mb-10">
        <div
          className="bg-indigo-600 h-1.5 md:h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-xl p-3 md:p-12 mb-2 md:mb-8 relative overflow-hidden transition-all duration-300">
        {/* Status indicator bar on the left */}
        <div className={`absolute top-0 left-0 w-2 h-full transition-colors duration-300 ${feedbackState === 'idle' ? 'bg-indigo-500' :
          feedbackState === 'correct' ? 'bg-green-500' : 'bg-red-500'
          }`}></div>

        <div className="mb-2 md:mb-6 text-sm bg-indigo-50 text-indigo-700 inline-block px-3 py-1 rounded-full font-medium">
          İpucu: {question.hint}
        </div>

        <form onSubmit={handleSubmit} className="text-lg md:text-3xl leading-relaxed text-slate-800 font-medium">
          <span>{question.preGap} </span>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={feedbackState !== 'idle'}
            className={`border-b-4 outline-none px-2 py-1 mx-1 w-24 md:w-40 text-center transition-colors placeholder:text-slate-300 rounded ${inputBorderClass}`}
            placeholder="___"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
          />
          <span> {question.postGap}</span>

          <button type="submit" className="hidden">Submit</button>
        </form>

        {/* Translation */}
        <div className="mt-4 md:mt-8 pt-4 md:pt-6 border-t border-slate-100">
          <p className="text-slate-500 italic">
            "{question.translation}"
          </p>
        </div>

        {/* Feedback Section (Visible after submit) */}
        {feedbackState !== 'idle' && (
          <div className={`mt-6 p-4 rounded-lg flex items-start gap-3 animate-fade-in ${feedbackState === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
            <div className="text-2xl">
              {feedbackState === 'correct' ? '🎉' : '⚠️'}
            </div>
            <div>
              <p className="font-bold text-lg">
                {feedbackState === 'correct' ? 'Harika! Doğru cevap.' : 'Üzgünüm, yanlış.'}
              </p>
              {feedbackState === 'incorrect' && (
                <p className="mt-1">
                  Doğru cevap: <span className="font-bold underline">{question.answer}</span>
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <button
        onClick={handleSubmit}
        disabled={feedbackState === 'idle' && !inputValue.trim()}
        className={`w-full py-2 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-md transition-all transform active:scale-95 ${feedbackState === 'idle'
          ? inputValue.trim()
            ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-1'
            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          : feedbackState === 'correct'
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'bg-indigo-600 text-white hover:bg-indigo-700' // Continue button style
          }`}
      >
        {feedbackState === 'idle' ? 'Yanıtla' : 'Devam Et'}
      </button>

      {feedbackState !== 'idle' && (
        <p className="text-center mt-2 text-slate-400 text-sm">Devam etmek için ENTER tuşuna basabilirsin</p>
      )}
    </div>
  );
}