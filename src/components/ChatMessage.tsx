import React, { useState } from 'react';
import { Message } from '../types/chat';
import { Bot, ThumbsUp, ThumbsDown, Copy, Check } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import config from '../config';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  message: Message;
  timestamp?: Date;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  timestamp = new Date() 
}) => {
  const { user } = useAuthStore();
  const isUser = message.role === 'user';
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleLike = () => {
    if (isDisliked) setIsDisliked(false);
    setIsLiked(!isLiked);
    // Aquí podrías implementar la lógica para enviar el like al backend
  };

  const handleDislike = () => {
    if (isLiked) setIsLiked(false);
    setIsDisliked(!isDisliked);
    // Aquí podrías implementar la lógica para enviar el dislike al backend
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 group`}
      role="listitem"
      aria-label={`Mensaje de ${isUser ? 'usuario' : 'asistente'}`}
    >
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} max-w-[85%] items-start gap-2`}>
        <div className="flex-shrink-0">
          {isUser ? (
            user?.picture ? (
              <img 
                src={user.picture} 
                alt={user.name}
                className="w-8 h-8 rounded-full shadow-sm"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-sm">
                <span className="text-white text-sm font-medium">
                  {user?.name?.charAt(0)}
                </span>
              </div>
            )
          ) : (
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm"
              style={{ backgroundColor: config.branding.logo.backgroundColor }}
            >
              <Bot className="w-5 h-5" style={{ color: config.branding.logo.textColor }} />
            </div>
          )}
        </div>

        <div 
          className={`relative px-4 py-3 rounded-lg shadow-sm
            ${isUser 
              ? 'bg-blue-600 text-white rounded-tr-none' 
              : 'bg-white text-gray-800 rounded-tl-none'
            }
          `}
        >
          <div className={`
            prose prose-sm max-w-none
            ${isUser ? 'prose-invert' : ''}
            prose-p:my-1
            prose-headings:my-2
            prose-ul:my-1 prose-ul:pl-4
            prose-ol:my-1 prose-ol:pl-4
            prose-li:my-0.5
            prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:my-2 prose-pre:p-3 prose-pre:rounded-lg
            prose-blockquote:my-2 prose-blockquote:pl-3
            prose-table:my-2
            ${!isUser && 'prose-code:bg-gray-100'}
            ${!isUser && 'prose-pre:bg-gray-800 prose-pre:text-gray-100'}
            ${!isUser && 'prose-blockquote:border-l-4 prose-blockquote:border-gray-300'}
            ${!isUser && 'prose-a:text-blue-600 hover:prose-a:underline'}
          `}>
            {isUser ? (
              <p>{message.content}</p>
            ) : (
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({node, ...props}) => <h1 className="text-xl font-bold" {...props}/>,
                  h2: ({node, ...props}) => <h2 className="text-lg font-bold" {...props}/>,
                  h3: ({node, ...props}) => <h3 className="text-base font-bold" {...props}/>,
                  a: ({node, ...props}) => (
                    <a 
                      className="text-blue-600 hover:underline" 
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    />
                  ),
                  code: ({node, inline, ...props}) => (
                    inline 
                      ? <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono" {...props}/>
                      : <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg text-sm font-mono overflow-x-auto">
                          <code {...props}/>
                        </pre>
                  ),
                  table: ({node, ...props}) => (
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-collapse border border-gray-300" {...props}/>
                    </div>
                  ),
                  th: ({node, ...props}) => (
                    <th className="border border-gray-300 px-3 py-1 bg-gray-50 font-semibold" {...props}/>
                  ),
                  td: ({node, ...props}) => (
                    <td className="border border-gray-300 px-3 py-1" {...props}/>
                  ),
                  blockquote: ({node, ...props}) => (
                    <blockquote className="border-l-4 border-gray-300 pl-3 italic text-gray-600" {...props}/>
                  ),
                  ul: ({node, ...props}) => <ul className="list-disc pl-4 space-y-0.5" {...props}/>,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-4 space-y-0.5" {...props}/>,
                  li: ({node, ...props}) => <li className="pl-1" {...props}/>,
                }}
              >
                {message.content}
              </ReactMarkdown>
            )}
          </div>

          {!isUser && (
            <div className="absolute bottom-0 right-0 p-2 flex gap-2">
              {config.features.likeButton && (
                <button
                  onClick={handleLike}
                  className={`p-1 rounded hover:bg-gray-100 transition-colors ${
                    isLiked ? 'text-blue-600' : 'text-gray-400'
                  }`}
                  title={isLiked ? 'Quitar me gusta' : 'Me gusta'}
                >
                  <ThumbsUp className="w-4 h-4" />
                </button>
              )}

              {config.features.dislikeButton && (
                <button
                  onClick={handleDislike}
                  className={`p-1 rounded hover:bg-gray-100 transition-colors ${
                    isDisliked ? 'text-red-600' : 'text-gray-400'
                  }`}
                  title={isDisliked ? 'Quitar no me gusta' : 'No me gusta'}
                >
                  <ThumbsDown className="w-4 h-4" />
                </button>
              )}
              
              {config.features.copyButton && (
                <button
                  onClick={handleCopy}
                  className="p-1 rounded hover:bg-gray-100 transition-colors text-gray-400"
                  title="Copiar respuesta"
                >
                  {isCopied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
          )}

          <span 
            className={`absolute ${isUser ? '-left-2' : '-right-2'} top-4 w-2 h-2 transform rotate-45
              ${isUser ? 'bg-blue-600' : 'bg-white'}
            `}
          />
          <time 
            className={`block text-xs mt-1
              ${isUser ? 'text-blue-200' : 'text-gray-500'}`}
          >
            {formatDateTime(timestamp)}
          </time>
        </div>
      </div>
    </div>
  );
};