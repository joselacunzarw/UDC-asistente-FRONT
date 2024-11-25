import React from 'react';
import { MessageSquare, RefreshCw } from 'lucide-react';
import { UserMenu } from './UserMenu';
import config from '../config';

interface ChatHeaderProps {
  onReset: () => void;
  isResetting?: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onReset, isResetting = false }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-3">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ 
            backgroundColor: config.branding.logo.backgroundColor,
            color: config.branding.logo.textColor 
          }}
        >
          <MessageSquare className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">{config.branding.name}</h1>
          <p className="text-sm text-gray-500">{config.branding.organization}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button
          onClick={onReset}
          disabled={isResetting}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Reiniciar conversación"
        >
          <RefreshCw className={`w-4 h-4 ${isResetting ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Reiniciar</span>
        </button>
        <UserMenu />
      </div>
    </div>
  );
};