
import React, { useState } from 'react';

interface ApiKeyPromptProps {
  onSave: (apiKey: string) => void;
}

const KeyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-amber-600"><path d="m21.73 18.24-5.4-5.4a1 1 0 0 0-1.42 0l-1.35 1.35-1.42-1.42L17.6 7.3a1 1 0 0 0 0-1.42l-1.83-1.83a1 1 0 0 0-1.42 0L2.27 16.14a1 1 0 0 0 0 1.42l1.83 1.83a1 1 0 0 0 1.42 0l11.78-11.78-1.42 1.42-1.35-1.35a1 1 0 0 0-1.42 0l-5.4 5.4a1 1 0 0 0 0 1.42l5.4 5.4a1 1 0 0 0 1.42 0l5.4-5.4a1 1 0 0 0 0-1.42z"/><path d="m15 12 1 1"/></svg>
);


export const ApiKeyPrompt: React.FC<ApiKeyPromptProps> = ({ onSave }) => {
  const [key, setKey] = useState('');

  const handleSave = () => {
    if (key.trim()) {
      onSave(key.trim());
    }
  };

  return (
    <div className="mt-6 p-6 bg-amber-100 border-2 border-amber-300 text-amber-900 rounded-lg animate-fade-in" role="alert">
      <div className="flex">
        <div className="flex-shrink-0">
          <KeyIcon />
        </div>
        <div className="ml-4 w-full">
          <h3 className="text-lg font-bold">Introduce tu Clave API de Google AI</h3>
          <div className="mt-2 text-md">
            <p className="mb-3">Para analizar imágenes, esta aplicación necesita una clave API de Google AI. Se usará solo en tu navegador y no se guardará en ningún sitio.</p>
            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">
              Obtén tu clave API gratuita en Google AI Studio
            </a>
            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <input 
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Pega tu clave API aquí"
                className="w-full flex-grow p-2 border border-amber-400 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none placeholder-amber-700/50"
                aria-label="Google AI API Key"
              />
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-amber-500 text-white font-semibold rounded-md hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                Guardar Clave
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
