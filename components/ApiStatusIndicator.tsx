
import React from 'react';

interface ApiStatusIndicatorProps {
  isConnected: boolean;
}

export const ApiStatusIndicator: React.FC<ApiStatusIndicatorProps> = ({ isConnected }) => {
  const statusColor = isConnected ? 'bg-green-500' : 'bg-red-500';
  const statusText = isConnected ? 'API Conectada' : 'API Desconectada';

  return (
    <div className="flex items-center space-x-2">
      <div className={`w-3 h-3 rounded-full ${statusColor}`}></div>
      <span className="text-sm font-medium text-slate-600 hidden md:inline">{statusText}</span>
    </div>
  );
};
