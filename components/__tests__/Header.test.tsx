import { render, screen } from '@testing-library/react';
import { Header } from '../Header';
import { describe, it, expect, vi } from 'vitest';
import { GameState } from '../../types';

// Mock the store
vi.mock('../../store/useQuizStore', () => ({
    useQuizStore: (selector: any) => selector({
        userLevel: 'A2',
        score: 100,
        gameState: GameState.PLAYING,
        selectedTopic: 'possessivpronomen',
        actions: { restartGame: vi.fn() }
    }),
    useQuizActions: () => ({ restartGame: vi.fn() })
}));

describe('Header Component', () => {
    it('renders correctly with title and level', () => {
        render(<Header />);
        expect(screen.getByText('Deutsch Meister')).toBeDefined();
        expect(screen.getByText('A2')).toBeDefined();
    });

    it('shows score when playing', () => {
        render(<Header />);
        expect(screen.getByText('100')).toBeDefined();
    });
});
