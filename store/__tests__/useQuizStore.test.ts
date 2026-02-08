import { describe, it, expect, beforeEach } from 'vitest';
import { useQuizStore } from '../useQuizStore';
import { GameState } from '../../types';

describe('Quiz Store', () => {
    beforeEach(() => {
        useQuizStore.getState().actions.restartGame();
    });

    it('should have initial state', () => {
        const state = useQuizStore.getState();
        expect(state.gameState).toBe(GameState.IDLE);
        expect(state.score).toBe(0);
        expect(state.questions).toEqual([]);
    });

    it('should update level', () => {
        useQuizStore.getState().actions.setLevel('B1');
        expect(useQuizStore.getState().userLevel).toBe('B1');
    });

    it('should reset state on restart', () => {
        // Manually set some state
        useQuizStore.setState({ score: 50, gameState: GameState.PLAYING });

        useQuizStore.getState().actions.restartGame();

        const state = useQuizStore.getState();
        expect(state.score).toBe(0);
        expect(state.gameState).toBe(GameState.IDLE);
    });
});
