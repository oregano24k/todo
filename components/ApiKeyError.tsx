
import React from 'react';

export const ApiKeyError: React.FC = () => {
  return (
    <div className="mt-6 p-6 bg-red-100 border-2 border-red-300 text-red-900 rounded-lg" role="alert">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-red-600">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-bold">Error de Configuración de API Key</h3>
          <div className="mt-2 text-md">
            <p className="mb-3">Parece que la clave API no está disponible para la aplicación. Por favor, sigue estos pasos en Netlify para solucionarlo:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Ve a la configuración de tu sitio en Netlify.</li>
              <li>Navega a <strong className="font-semibold">Site settings &gt; Build & deploy &gt; Environment variables</strong>.</li>
              <li>Asegúrate de que existe una variable de entorno con el nombre <strong className="font-semibold bg-red-200 px-1 rounded">API_KEY</strong>. El nombre debe ser exacto.</li>
              <li>El valor de esta variable debe ser la clave que creaste en Google AI Studio.</li>
              <li className="font-bold">Ve a la pestaña <strong className="font-semibold">"Deploys"</strong> y vuelve a desplegar tu sitio para que los cambios surtan efecto. Este paso es crucial.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
