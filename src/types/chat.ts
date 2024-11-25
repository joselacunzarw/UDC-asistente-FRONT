export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  question: string;
  history: Message[];
}

export interface ChatResponse {
  reply: string;
}

export enum ChatErrorType {
  NETWORK = 'NETWORK_ERROR',
  SERVER = 'SERVER_ERROR',
  TIMEOUT = 'TIMEOUT_ERROR',
  VALIDATION = 'VALIDATION_ERROR',
  UNKNOWN = 'UNKNOWN_ERROR'
}

export class ChatError extends Error {
  constructor(
    public type: ChatErrorType,
    public message: string,
    public status?: number
  ) {
    super(message);
    this.name = 'ChatError';
  }
}