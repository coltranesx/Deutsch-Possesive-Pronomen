import { Question, UserLevel, Topic } from '../../types';

export interface TopicStrategy {
    metadata: Topic;
    getPrompt: (level: UserLevel) => string;
    getFallbackQuestions: (level: UserLevel) => Question[];
}
