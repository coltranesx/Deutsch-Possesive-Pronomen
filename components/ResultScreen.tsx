import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useQuizStore, useQuizActions } from '../store/useQuizStore';

export const ResultScreen: React.FC = () => {
  const score = useQuizStore(state => state.score);
  const history = useQuizStore(state => state.history);
  const questions = useQuizStore(state => state.questions);

  const { restartGame } = useQuizActions();

  const totalQuestions = questions.length;
  const correctCount = history.filter(h => h.isCorrect).length;
  const incorrectCount = totalQuestions - correctCount;

  const data = [
    { name: 'Doğru', value: correctCount },
    { name: 'Yanlış', value: incorrectCount },
  ];

  const COLORS = ['#4ade80', '#f87171'];

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto p-4 md:p-8 overflow-y-auto">
      <h2 className="text-3xl font-bold text-slate-800 mb-2 text-center">Sonuç Raporu</h2>
      <p className="text-slate-500 text-center mb-8">Harika bir pratikti! İşte istatistiklerin.</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-slate-100">
          <div className="text-sm text-slate-500 uppercase font-semibold">Toplam Puan</div>
          <div className="text-4xl font-bold text-indigo-600">{score}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-slate-100">
          <div className="text-sm text-slate-500 uppercase font-semibold">Doğruluk Oranı</div>
          <div className="text-4xl font-bold text-slate-700">
            {totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0}%
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-slate-100 flex items-center justify-center">
          <div className="w-full h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={40}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="ml-4 text-left text-xs text-slate-500">
            <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400"></span> {correctCount} Doğru</div>
            <div className="flex items-center gap-1 mt-1"><span className="w-2 h-2 rounded-full bg-red-400"></span> {incorrectCount} Yanlış</div>
          </div>
        </div>
      </div>

      {/* Mistake Report */}
      <div className="bg-white rounded-xl shadow-lg flex-1 overflow-hidden flex flex-col mb-8">
        <div className="p-6 border-b border-slate-100 bg-slate-50">
          <h3 className="font-bold text-lg text-slate-800">Detaylı Cevap Analizi</h3>
        </div>
        <div className="overflow-y-auto p-0">
          {history.length === 0 ? (
            <p className="p-6 text-slate-500">Henüz kayıt yok.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase sticky top-0">
                <tr>
                  <th className="p-4 font-semibold">Durum</th>
                  <th className="p-4 font-semibold">Soru</th>
                  <th className="p-4 font-semibold">Senin Cevabın</th>
                  <th className="p-4 font-semibold">Doğru Cevap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {history.map((record, idx) => (
                  <tr key={idx} className={record.isCorrect ? 'bg-white' : 'bg-red-50'}>
                    <td className="p-4">
                      {record.isCorrect ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-600 rounded-full">✓</span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-red-100 text-red-600 rounded-full">✕</span>
                      )}
                    </td>
                    <td className="p-4 text-slate-700">
                      <span className="text-slate-400 mr-2">{record.question.preGap}</span>
                      <span className="font-bold border-b border-slate-300">___</span>
                      <span className="text-slate-400 ml-2">{record.question.postGap}</span>
                      <div className="text-xs text-slate-400 mt-1">{record.question.translation}</div>
                    </td>
                    <td className={`p-4 font-medium ${record.isCorrect ? 'text-green-600' : 'text-red-600 line-through'}`}>
                      {record.userInput}
                    </td>
                    <td className="p-4 text-slate-800 font-bold">
                      {record.question.answer}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="flex justify-center pb-8">
        <button
          onClick={shuffleAndRestart}
          className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold shadow-lg hover:bg-indigo-700 transition-transform transform hover:-translate-y-1 active:translate-y-0"
        >
          Tekrar Oyna
        </button>
      </div>
    </div>
  );

  function shuffleAndRestart() {
    restartGame();
  }
};