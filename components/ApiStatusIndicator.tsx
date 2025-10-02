
import React from 'react';

interface ApiStatusIndicatorProps {
  status: 'idle' | 'connected' | 'disconnected';
}

export const ApiStatusIndicator: React.FC<ApiStatusIndicatorProps> = ({ status }) => {
  let statusColor = 'bg-slate-400';
  let statusText = 'Estado API';

  if (status === 'connected') {
    statusColor = 'bg-green-500';
    statusText = 'API Conectada';
  } else if (status === 'disconnected') {
    statusColor = 'bg-red-500';
    statusText = 'API Desconectada';
  }

  return (
    <div className="flex items-center space-x-2">
      <div className={`w-3 h-3 rounded-full ${statusColor} transition-colors duration-300`}></div>
      <span className="text-sm font-medium text-slate-600 hidden md:inline">{statusText}</span>
    </div>
  );
};
