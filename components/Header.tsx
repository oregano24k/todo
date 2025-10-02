
import React from 'react';
import { ApiStatusIndicator } from './ApiStatusIndicator';

interface HeaderProps {
  apiStatus: 'idle' | 'connected' | 'disconnected';
}

const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-emerald-500">
    <path d="M11 20A7 7 0 0 1 4 13H2a10 10 0 0 0 10 10v-2a3 3 0 0 1-3-3zM2 13h2a7 7 0 0 1 7-7V4a10 10 0 0 0-10 9z"></path>
    <path d="M12 21a9 9 0 0 0 9-9h-2a7 7 0 0 1-7 7v2z"></path>
    <path d="M12 4V2a10 10 0 0 1 10 10h-2a8 8 0 0 0-8-8z"></path>
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-slate-500 group-hover:text-slate-800 transition-colors">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);


export const Header: React.FC<HeaderProps> = ({ apiStatus }) => {
  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <LeafIcon />
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 ml-2">
            Calorie Vision <span className="text-emerald-500">AI</span>
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <ApiStatusIndicator status={apiStatus} />
          {/* Reemplaza este enlace con la URL de tu repositorio de GitHub */}
          <a href="https://oregano24k.github.io/todo" target="_blank" rel="noopener noreferrer" className="group" aria-label="View source code on GitHub">
            <GitHubIcon />
          </a>
        </div>
      </div>
    </header>
  );
};
