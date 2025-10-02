
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { CalorieResults } from './components/CalorieResults';
import { LoadingSpinner } from './components/LoadingSpinner';
import { WelcomeMessage } from './components/WelcomeMessage';
import { ErrorDisplay } from './components/ErrorDisplay';
import { analyzeFoodImage } from './services/geminiService';
import type { AnalysisResult } from './types';

type ApiStatus = 'idle' | 'connected' | 'disconnected';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<ApiStatus>('idle');

  const handleImageUpload = (file: File) => {
    setImageFile(file);
    setAnalysisResult(null);
    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleReset = () => {
    setImageFile(null);
    setImageUrl(null);
    setAnalysisResult(null);
    setError(null);
    setIsLoading(false);
  };

  const handleAnalyzeClick = useCallback(async () => {
    if (!imageFile) {
      setError("Por favor, sube una imagen primero.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeFoodImage(imageFile);
      setAnalysisResult(result);
      setApiStatus('connected');
    } catch (err) {
      console.error("Analysis failed:", err);
      setApiStatus('disconnected');
      if (err instanceof Error) {
        if (err.message === 'MISSING_API_KEY') {
          setError("Error de configuración: La clave API de Google no está configurada. Por favor, asegúrate de haberla añadido como una variable de entorno en tu servicio de hosting (ej. Netlify) y haber vuelto a desplegar el sitio.");
        } else if (err.message === 'BILLING_REQUIRED') {
          setError("Error de API: Tu proyecto de Google Cloud requiere que se configure la facturación para usar la API. Por favor, haz clic en 'Configurar la facturación' en tu panel de Google AI Studio.");
        }
        else {
          setError("No se pudo analizar la imagen. Por favor, inténtalo de nuevo con una imagen más clara o diferente.");
        }
      } else {
        setError("Ocurrió un error inesperado. Por favor, inténtalo de nuevo.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [imageFile]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header apiStatus={apiStatus} />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-slate-200">
          {!analysisResult && (
            <ImageUploader
              onImageUpload={handleImageUpload}
              onAnalyze={handleAnalyzeClick}
              onReset={handleReset}
              imageUrl={imageUrl}
              isLoading={isLoading}
            />
          )}

          {error && <ErrorDisplay message={error} />}

          {isLoading && <LoadingSpinner />}
          
          {!isLoading && !analysisResult && !imageUrl && <WelcomeMessage />}

          {!isLoading && analysisResult && (
            <CalorieResults result={analysisResult} imageUrl={imageUrl!} />
          )}
        </div>
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>Potenciado por Gemini AI. Las estimaciones nutricionales pueden variar.</p>
      </footer>
    </div>
  );
};

export default App;