import { TopicId } from '../../types';
import { TopicStrategy } from './types';
import { possessivpronomenStrategy } from './possessivpronomen';
import { prepositionenStrategy } from './prepositionen';

export const topicRegistry: Record<TopicId, TopicStrategy> = {
    'possessivpronomen': possessivpronomenStrategy,
    'prepositionen': prepositionenStrategy,
};

export const getTopicStrategy = (id: TopicId): TopicStrategy => {
    const strategy = topicRegistry[id];
    if (!strategy) {
        throw new Error(`Topic strategy not found for id: ${id}`);
    }
    return strategy;
};

export const getAllTopics = () => Object.values(topicRegistry).map(s => s.metadata);
