import type { AnalysisResult } from '../types';

// Esta función auxiliar convierte un objeto File en una cadena base64
const fileToBase64 = (file: File): Promise<string> => 
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // Devuelve solo la parte base64, sin el prefijo del URI de datos
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = error => reject(error);
  });

export const analyzeFoodImage = async (imageFile: File): Promise<AnalysisResult> => {
  const imageB64 = await fileToBase64(imageFile);

  // Llama a nuestro nuevo y seguro endpoint de la función de Netlify
  const response = await fetch('/.netlify/functions/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      imageB64: imageB64,
      mimeType: imageFile.type 
    }),
  });
  
  const responseBody = await response.json();

  if (!response.ok) {
    // Vuelve a lanzar errores específicos basados en la respuesta del servidor
    // para ser capturados por el componente de la interfaz de usuario
    if (responseBody.error === 'MISSING_API_KEY') {
        throw new Error('MISSING_API_KEY');
    }
    if (responseBody.error === 'BILLING_REQUIRED') {
        throw new Error('BILLING_REQUIRED');
    }
    // Para otros errores, usa el mensaje del servidor o uno genérico
    throw new Error(responseBody.error || "Failed to get a valid response from the AI model.");
  }
  
  // En caso de éxito, el cuerpo de la respuesta es el resultado del análisis de Gemini
  return responseBody as AnalysisResult;
};
