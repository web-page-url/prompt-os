import { GoogleGenAI } from "@google/genai";
import { Framework } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize Gemini client
const ai = new GoogleGenAI({ apiKey });

export const optimizePrompt = async (
  rawPrompt: string,
  framework: Framework
): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const frameworkStructure = framework.components.map(c => `${c.label} (${c.description})`).join(', ');

  const systemInstruction = `
    You are an elite Prompt Engineering AI named 'Prompt Alpha'.
    Your goal is to take a raw, often vague user request and rewrite it into a highly effective, structured prompt using the ${framework.name} framework.

    Framework Details:
    Name: ${framework.name} (${framework.fullName})
    Structure components: ${frameworkStructure}
    
    Instruction:
    1. Analyze the user's raw prompt to understand their core intent.
    2. Fill in the specific components of the ${framework.name} framework based on the user's intent. If the user didn't provide enough info for a specific component, creatively infer it to make the prompt robust (but keep it realistic).
    3. Output the final result.

    Output Format:
    Return the response in Markdown.
    Start with a clear breakdown of how you filled the framework slots, then provide the "Final Optimized Prompt" in a code block for easy copying.
    
    Example Output Structure:
    ### Framework Breakdown
    **${framework.components[0].label}:** [Content]
    **${framework.components[1].label}:** [Content]
    ...

    ### Optimized Prompt
    \`\`\`text
    [The full complete prompt goes here]
    \`\`\`
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: rawPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7, // Creativity allowed to fill in gaps
      }
    });

    return response.text || "Failed to generate prompt. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to connect to the neural core. Please check your connection or API key.");
  }
};