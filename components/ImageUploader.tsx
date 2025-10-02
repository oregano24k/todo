
import React, { useRef } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  onAnalyze: () => void;
  onReset: () => void;
  imageUrl: string | null;
  isLoading: boolean;
}

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const AnalyzeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-2"><path d="M12 2a10 10 0 1 0 10 10c0-4.42-2.87-8.15-6.84-9.44"/><path d="m12 2 .5 5L17 4l-1.84 5.56"/><path d="M22 12h-2"/><path d="m18.36 18.36-.5-5L15 17.5l-1.92-5.18"/><path d="M12 22v-2"/><path d="m5.64 5.64.5 5L9 6.5l1.92 5.18"/></svg>
);

const ResetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M21 21v-5h-5"/></svg>
);

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, onAnalyze, onReset, imageUrl, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageUpload(event.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full flex flex-col items-center">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        disabled={isLoading}
      />
      {!imageUrl && (
        <button
          onClick={handleUploadClick}
          disabled={isLoading}
          className="w-full md:w-auto flex items-center justify-center px-6 py-4 text-lg font-semibold text-white bg-emerald-500 rounded-xl hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-all duration-300 ease-in-out disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          <UploadIcon />
          Seleccionar o tomar foto
        </button>
      )}

      {imageUrl && (
        <div className="w-full flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
          <button
            onClick={onAnalyze}
            disabled={isLoading}
            className="w-full md:w-auto flex items-center justify-center px-6 py-4 text-lg font-semibold text-white bg-blue-500 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            <AnalyzeIcon />
            {isLoading ? 'Analizando...' : 'Analizar Comida'}
          </button>
           <button
            onClick={onReset}
            disabled={isLoading}
            className="w-full md:w-auto flex items-center justify-center px-6 py-4 text-lg font-semibold text-slate-700 bg-slate-200 rounded-xl hover:bg-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-300 transition-all duration-300 ease-in-out disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            <ResetIcon />
            Elegir otra imagen
          </button>
        </div>
      )}
    </div>
  );
};
