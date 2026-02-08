import React from 'react';
import { useQuizStore, useQuizActions } from '../store/useQuizStore';
import { GameState } from '../types';
import { BookOpen, Trophy, RotateCcw } from 'lucide-react';
import { Button } from './ui/Button';
import { getTopicStrategy } from '../services/topics/registry';

export const Header: React.FC = () => {
    const userLevel = useQuizStore(state => state.userLevel);
    const score = useQuizStore(state => state.score);
    const gameState = useQuizStore(state => state.gameState);
    const selectedTopic = useQuizStore(state => state.selectedTopic);

    // We import actions but only use restartGame here
    const restartGame = useQuizStore(state => state.actions.restartGame);

    const topicMetadata = getTopicStrategy(selectedTopic).metadata;

    const handleNewGame = () => {
        if (confirm('Yeni bir oyuna başlamak istediğine emin misin? Mevcut ilerlemen kaybolacak.')) {
            restartGame();
        }
    };

    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 py-3 px-4 md:px-6 flex justify-between items-center sticky top-0 z-50">
            <div className="flex items-center gap-2 md:gap-3">
                <div className="bg-indigo-600 p-2 rounded-lg shadow-sm text-white">
                    {topicMetadata.icon ? <span>{topicMetadata.icon}</span> : <BookOpen className="w-5 h-5" />}
                </div>
                <div>
                    <h1 className="font-bold text-lg md:text-xl text-slate-800 leading-none">Deutsch Meister</h1>
                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{topicMetadata.title}</p>
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                {/* Level Badge */}
                <div className="hidden md:flex flex-col items-end">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Seviye</span>
                    <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                        {userLevel}
                    </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {gameState === GameState.PLAYING && (
                        <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100 mr-2">
                            <Trophy className="w-4 h-4 text-amber-500" />
                            <span className="font-bold text-amber-700 text-sm">{score}</span>
                        </div>
                    )}

                    <Button
                        onClick={handleNewGame}
                        variant="ghost"
                        size="icon"
                        title="Yeni Oyun Başlat"
                        className="text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </header>
    );
};
