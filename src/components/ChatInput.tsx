import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic, StopCircle } from 'lucide-react';
import config from '../config';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend(input);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = '40px';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Resetear altura para obtener el scrollHeight correcto
      textarea.style.height = '40px';
      
      // Calcular nueva altura basada en el contenido
      const newHeight = Math.min(
        Math.max(textarea.scrollHeight, 40), // Mínimo 40px
        150 // Máximo 150px
      );
      
      textarea.style.height = `${newHeight}px`;
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    adjustTextareaHeight();
  };

  // Ajustar altura inicial y en cambios de ventana
  useEffect(() => {
    adjustTextareaHeight();
    window.addEventListener('resize', adjustTextareaHeight);
    return () => window.removeEventListener('resize', adjustTextareaHeight);
  }, []);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t border-gray-200 bg-white">
      {config.features.fileUpload && (
        <button
          type="button"
          className="flex-shrink-0 p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          title="Adjuntar archivo"
        >
          <Paperclip className="w-5 h-5" />
        </button>
      )}

      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu pregunta..."
          disabled={disabled}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-none min-h-[40px] max-h-[150px] leading-normal"
          maxLength={1000}
          style={{ height: '40px' }}
        />
        <div className="absolute right-2 bottom-2 text-xs text-gray-400">
          {input.length}/1000
        </div>
      </div>

      {config.features.audioInput && (
        <button
          type="button"
          onClick={toggleRecording}
          disabled={disabled}
          className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
            isRecording 
              ? 'text-red-500 hover:text-red-600 hover:bg-red-50' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
          title={isRecording ? 'Detener grabación' : 'Grabar mensaje'}
        >
          {isRecording ? (
            <StopCircle className="w-5 h-5" />
          ) : (
            <Mic className="w-5 h-5" />
          )}
        </button>
      )}

      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className="flex-shrink-0 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
};