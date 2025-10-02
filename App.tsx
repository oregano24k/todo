import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { CalorieResults } from './components/CalorieResults';
import { LoadingSpinner } from './components/LoadingSpinner';
import { WelcomeMessage } from './components/WelcomeMessage';
import { ErrorDisplay } from './components/ErrorDisplay';
import { analyzeFoodImage } from './services/geminiService';
import type { AnalysisResult } from './types';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
    } catch (err) {
      console.error("Analysis failed:", err);
      setError("No se pudo analizar la imagen. Por favor, inténtalo de nuevo con una imagen más clara o diferente.");
    } finally {
      setIsLoading(false);
    }
  }, [imageFile]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
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