
import { GoogleGenAI, Type } from "@google/genai";
import type { TranslationResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const translationSchema = {
  type: Type.OBJECT,
  properties: {
    professional: {
      type: Type.STRING,
      description: "A concise, action-oriented bullet point for a civilian resume. It must be short, civilian-friendly, and ATS-ready.",
    },
    casual: {
      type: Type.STRING,
      description: "A plain-English paragraph explaining the role and accomplishments. It should bridge the gap between military and civilian terminology for someone unfamiliar with the military.",
    },
    ats: {
      type: Type.STRING,
      description: "A keyword-rich expansion tailored for ATS. Industry-neutral unless the input strongly implies a domain.",
    },
  },
  required: ["professional", "casual", "ats"],
};

export const translateJargon = async (text: string): Promise<TranslationResult> => {
  const prompt = `
    Translate the following military text into three distinct formats for civilian job applications.

    Military Text:
    "${text}"

    Provide the output in a structured JSON format according to the schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: translationSchema,
        temperature: 0.3,
      },
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);

    // Basic validation
    if (
      typeof result.professional === 'string' &&
      typeof result.casual === 'string' &&
      typeof result.ats === 'string'
    ) {
      return result;
    } else {
      throw new Error("Invalid JSON structure received from API");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to fetch or parse translation from Gemini API.");
  }
};
