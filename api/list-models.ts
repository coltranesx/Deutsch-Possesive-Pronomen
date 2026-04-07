import { GoogleGenerativeAI } from "@google/generative-ai";

interface VercelRequest {
  method: string;
  body: Record<string, string>;
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (data: unknown) => VercelResponse;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const apiKey = process.env.VITE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'No API Key' });
  }

  // List all available models for this API key
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
    { method: 'GET' }
  );
  const data = await response.json() as { models?: Array<{ name: string; supportedGenerationMethods?: string[] }> };
  const generateModels = (data.models ?? [])
    .filter(m => m.supportedGenerationMethods?.includes('generateContent'))
    .map(m => m.name);

  return res.status(200).json({ available: generateModels });
}
