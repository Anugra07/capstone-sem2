// backend/src/utils/gemini.js

/**
 * getGeminiResponse - Utility to call Gemini AI API with a prompt.
 * @param {string} prompt - The prompt/question to send to Gemini.
 * @returns {Promise<string>} - The AI's response as a string.
 */
export async function getGeminiResponse(prompt) {
  // TODO: Integrate with Gemini API using fetch/axios and your API key
  // For now, return a mock response for development
  return `Gemini mock response for prompt: ${prompt}`;
} 