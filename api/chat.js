import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    // Read the system instruction (Knowledge Base) from gemini.md
    const geminiMdPath = path.join(process.cwd(), 'gemini.md');
    const systemInstruction = fs.readFileSync(geminiMdPath, 'utf8');

    // Format history for the Gemini API (excluding the current user message)
    // The @google/genai SDK requires contents array with role and parts
    const history = messages.slice(0, -1).map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const currentMessage = messages[messages.length - 1].text;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: currentMessage }] }
      ],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.2 // Keep it factual to adhere strictly to guardrails
      }
    });

    return res.status(200).json({ reply: response.text });
  } catch (error) {
    console.error('Gemini API error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
