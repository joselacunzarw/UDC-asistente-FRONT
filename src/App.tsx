import React, { useState, useRef, useEffect } from 'react';
import { Message } from './types/chat';
import { UDCitoChat } from './services/chat';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { ChatHeader } from './components/ChatHeader';
import { LoginScreen } from './components/LoginScreen';
import { DevTools } from './components/DevTools';
import { useAuthStore } from './store/authStore';
import { Loader2 } from 'lucide-react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import config from './config';

const chatService = new UDCitoChat();

function App() {
  const { isAuthenticated, isDevelopmentMode } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const reply = await chatService.sendMessage(content);
      setMessages(prev => [
        ...prev,
        { role: 'user', content },
        { role: 'assistant', content: reply }
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar mensaje');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    setIsResetting(true);
    try {
      chatService.clearHistory();
      setMessages([]);
      setError(null);
    } finally {
      setIsResetting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <GoogleOAuthProvider clientId={config.auth.googleClientId}>
        <LoginScreen />
      </GoogleOAuthProvider>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="container mx-auto max-w-4xl h-full p-4">
        <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden">
          <ChatHeader onReset={handleReset} isResetting={isResetting} />
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            
            {isLoading && (
              <div className="flex items-center justify-center gap-2 text-gray-500">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Escribiendo...</span>
              </div>
            )}
            
            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
                {error}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <ChatInput onSend={handleSendMessage} disabled={isLoading || isResetting} />
        </div>
      </div>
      
      {isDevelopmentMode && <DevTools />}
    </div>
  );
}

export default App;