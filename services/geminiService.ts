
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const analyzeFoodImage = async (imageFile: File): Promise<AnalysisResult> => {
  if (!process.env.API_KEY) {
    throw new Error("MISSING_API_KEY");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const imagePart = await fileToGenerativePart(imageFile);

  const prompt = `
    Analiza la siguiente imagen de comida. Actúa como un experto nutricionista.
    1. Identifica cada alimento en la imagen.
    2. Estima el tamaño de la porción para cada alimento (p. ej., "1 taza", "100g", "1 filete mediano").
    3. Calcula las calorías, proteínas, carbohidratos y grasas estimadas para cada alimento.
    4. Suma los totales de todos los alimentos.
    5. Proporciona una puntuación de confianza (0-1) sobre la precisión de tu análisis.
    6. Ofrece un breve comentario o consejo nutricional basado en la comida.
    
    Devuelve la respuesta EXCLUSIVAMENTE en el formato JSON especificado. No incluyas ningún otro texto o explicación fuera del objeto JSON.
  `;
  
  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      foods: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "Nombre del alimento" },
            calories: { type: Type.NUMBER, description: "Calorías estimadas" },
            protein: { type: Type.NUMBER, description: "Proteínas en gramos" },
            carbs: { type: Type.NUMBER, description: "Carbohidratos en gramos" },
            fats: { type: Type.NUMBER, description: "Grasas en gramos" },
            servingSize: { type: Type.STRING, description: "Tamaño de la porción estimada" }
          },
          required: ["name", "calories", "protein", "carbs", "fats", "servingSize"]
        }
      },
      totalCalories: { type: Type.NUMBER, description: "Suma total de calorías" },
      totalProtein: { type: Type.NUMBER, description: "Suma total de proteínas" },
      totalCarbs: { type: Type.NUMBER, description: "Suma total de carbohidratos" },
      totalFats: { type: Type.NUMBER, description: "Suma total de grasas" },
      confidenceScore: { type: Type.NUMBER, description: "Puntuación de confianza (0-1)" },
      feedback: { type: Type.STRING, description: "Comentario nutricional" }
    },
    required: ["foods", "totalCalories", "totalProtein", "totalCarbs", "totalFats", "confidenceScore", "feedback"]
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, { text: prompt }] },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema
      }
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    return result as AnalysisResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && /billing|quota/i.test(error.message)) {
      throw new Error("BILLING_REQUIRED");
    }
    throw new Error("Failed to get a valid response from the AI model.");
  }
};