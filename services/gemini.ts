import { GoogleGenAI } from "@google/genai";
import { ELBAPH_SYSTEM_PROMPT } from '../constants';

const apiKey = process.env.API_KEY || '';

// We use the flash model for speed and efficiency with large context
const MODEL_NAME = 'gemini-2.5-flash-latest';

export const generateSpecification = async (
  filename: string, 
  extraContext: string = ""
): Promise<string> => {
  if (!apiKey) {
    throw new Error("API_KEY environment variable is missing.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `Generate ${filename} as a full specification document. ${extraContext}`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ],
      config: {
        systemInstruction: ELBAPH_SYSTEM_PROMPT,
        temperature: 0.2, // Low temperature for engineering specs
      }
    });

    return response.text || "Error: No content generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate specification. Please check your connection or API key.");
  }
};
