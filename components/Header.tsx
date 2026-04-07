import React from 'react';
import { useQuizStore, useQuizActions } from '../store/useQuizStore';
import { GameState } from '../types';
import { BookOpen, Trophy, RotateCcw, Moon, Sun } from 'lucide-react';
import { Button } from './ui/Button';
import { getTopicStrategy } from '../services/topics/registry';
import { useUIStore } from '../store/useUIStore';

export const Header: React.FC = () => {
    const userLevel = useQuizStore(state => state.userLevel);
    const score = useQuizStore(state => state.score);
    const gameState = useQuizStore(state => state.gameState);
    const selectedTopic = useQuizStore(state => state.selectedTopic);
    const { isDarkMode, toggleDarkMode } = useUIStore();

    // We import actions but only use restartGame here
    const restartGame = useQuizStore(state => state.actions.restartGame);

    const topicMetadata = getTopicStrategy(selectedTopic).metadata;

    const handleNewGame = () => {
        if (confirm('Yeni bir oyuna başlamak istediğine emin misin? Mevcut ilerlemen kaybolacak.')) {
            restartGame();
        }
    };

    return (
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-3 px-4 md:px-6 flex justify-between items-center sticky top-0 z-50 transition-colors">
            <div className="flex items-center gap-2 md:gap-3">
                <div className="bg-indigo-600 p-2 rounded-lg shadow-sm text-white">
                    {topicMetadata.icon ? <span>{topicMetadata.icon}</span> : <BookOpen className="w-5 h-5" />}
                </div>
                <div>
                    <h1 className="font-bold text-lg md:text-xl text-slate-800 dark:text-slate-100 leading-none transition-colors">Deutsch Meister</h1>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider transition-colors">{topicMetadata.title}</p>
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                {/* Level Badge */}
                <div className="hidden md:flex flex-col items-end">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase transition-colors">Seviye</span>
                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded border border-indigo-100 dark:border-indigo-800/50 transition-colors">
                        {userLevel}
                    </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {gameState === GameState.PLAYING && (
                        <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-full border border-amber-100 dark:border-amber-800/50 mr-2 transition-colors">
                            <Trophy className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                            <span className="font-bold text-amber-700 dark:text-amber-500 text-sm transition-colors">{score}</span>
                        </div>
                    )}

                    <div className="flex items-center gap-1">
                        <Button
                            onClick={toggleDarkMode}
                            variant="ghost"
                            size="icon"
                            title={isDarkMode ? "Açık Temaya Geç" : "Koyu Temaya Geç"}
                            className="text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                        >
                            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </Button>

                        <Button
                            onClick={handleNewGame}
                            variant="ghost"
                            size="icon"
                            title="Yeni Oyun Başlat"
                            className="text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                        >
                            <RotateCcw className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};
