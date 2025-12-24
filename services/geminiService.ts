
import { GoogleGenAI } from "@google/genai";
import { Transaction } from "../types";

export const getFinancialInsights = async (transactions: Transaction[]): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const summary = transactions.map(t => `${t.type}: ${t.amount} (${t.description})`).join(', ');
  
  const prompt = `
    Analyze these monthly transactions and provide 3-4 concise, actionable financial tips.
    Keep the tone professional and encouraging. 
    Transactions: ${summary}
    Format the response as a simple markdown list.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a world-class financial advisor expert. Provide brief, data-driven insights.",
        temperature: 0.7,
      },
    });

    return response.text || "Could not generate insights at this time. Keep tracking to see patterns!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "AI Insights currently unavailable. Check your internet connection or API key.";
  }
};
