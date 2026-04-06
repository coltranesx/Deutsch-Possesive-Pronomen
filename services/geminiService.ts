import { Question, UserLevel, TopicId } from "../types";
import { getTopicStrategy } from "./topics/registry";

/**
 * Generates questions using the Serverless Proxy Function.
 * This hides the API key from the browser.
 */
export const generateQuestions = async (level: UserLevel = 'A2', topicId: TopicId = 'possessivpronomen'): Promise<Question[]> => {
  const strategy = getTopicStrategy(topicId);

  try {
    // 1. Call our local API proxy instead of Google GenAI directly 
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ level, topicId }),
    });

    if (!response.ok) {
      console.warn("API proxy returned error, using fallback data.");
      return strategy.getFallbackQuestions(level);
    }

    const data = await response.json();
    
    // 2. Assign unique IDs based on timestamp to avoid collisions
    if (Array.isArray(data)) {
        return data.map((q, index) => ({ ...q, id: Date.now() + index }));
    }
    
    throw new Error("Invalid response format from proxy.");

  } catch (error) {
    console.error("Fetch Error, using fallback data:", error);
    // 3. Robust fallback: Never let the app crash if internet or API fails
    return strategy.getFallbackQuestions(level);
  }
};