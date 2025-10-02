import { GoogleGenAI, Type } from "@google/genai";

// Definimos una interfaz simple para el evento de Netlify
interface NetlifyEvent {
  httpMethod: string;
  body: string;
}

// Esta es una función sin servidor de Netlify.
// Actúa como un backend seguro para manejar la llamada a la API de Gemini.
export async function handler(event: NetlifyEvent) {
  // Solo permitir solicitudes POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Acceder de forma segura a la clave API desde las variables de entorno en el servidor.
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("La variable de entorno API_KEY no está configurada.");
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: 'MISSING_API_KEY' }) 
    };
  }
  
  const ai = new GoogleGenAI({ apiKey });

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
    const { imageB64, mimeType } = JSON.parse(event.body);
    if (!imageB64 || !mimeType) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Faltan datos de la imagen en la solicitud.' }) };
    }

    const imagePart = {
      inlineData: { data: imageB64, mimeType: mimeType },
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, { text: prompt }] },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema
      }
    });

    const jsonText = response.text.trim();
    
    return { 
      statusCode: 200, 
      headers: { 'Content-Type': 'application/json' },
      body: jsonText 
    };

  } catch (error: any) {
    console.error("Error al llamar a la API de Gemini desde la función de Netlify:", error);
    if (error instanceof Error && /billing|quota/i.test(error.message)) {
      return { 
        statusCode: 400,
        body: JSON.stringify({ error: 'BILLING_REQUIRED' }) 
      };
    }
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: 'No se pudo obtener una respuesta válida del modelo de IA.' }) 
    };
  }
}
