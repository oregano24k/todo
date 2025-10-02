
import React from 'react';
import { ApiStatusIndicator } from './ApiStatusIndicator';

interface HeaderProps {
  apiStatus: boolean;
}

const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-emerald-500">
    <path d="M11 20A7 7 0 0 1 4 13H2a10 10 0 0 0 10 10v-2a3 3 0 0 1-3-3zM2 13h2a7 7 0 0 1 7-7V4a10 10 0 0 0-10 9z"></path>
    <path d="M12 21a9 9 0 0 0 9-9h-2a7 7 0 0 1-7 7v2z"></path>
    <path d="M12 4V2a10 10 0 0 1 10 10h-2a8 8 0 0 0-8-8z"></path>
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
        <ApiStatusIndicator isConnected={apiStatus} />
      </div>
    </header>
  );
};