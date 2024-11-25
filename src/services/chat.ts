import { Message, ChatError, ChatErrorType } from '../types/chat';
import { useDevTools } from '../store/devToolsStore';
import { getMockResponse } from './mockResponses';
import config from '../config';
import { useAuthStore } from '../store/authStore';

export class UDCitoChat {
  private baseUrl: string;
  private history: Message[] = [];

  constructor(baseUrl = config.api.baseUrl) {
    this.baseUrl = baseUrl;
  }

  private async makeRequest(endpoint: string, options?: RequestInit) {
    const devTools = useDevTools.getState();
    const { isDevelopmentMode } = useAuthStore.getState();
    const { useMockApi, setLastRequest, setLastResponse, setLastError } = devTools;

    try {
      const requestInfo = {
        url: `${this.baseUrl}${endpoint}`,
        ...options,
      };
      
      setLastRequest(requestInfo);

      if (isDevelopmentMode && useMockApi) {
        const mockType = endpoint === config.api.endpoints.health ? 'health' : 'chat';
        const mockResponse = getMockResponse(mockType);
        setLastResponse(mockResponse);
        return mockResponse;
      }

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        signal: controller.signal,
      }).catch((error) => {
        if (error.name === 'AbortError') {
          throw new ChatError(
            ChatErrorType.TIMEOUT,
            'La conexión tardó demasiado. Verifica que la API esté funcionando.',
            408
          );
        }
        throw new ChatError(
          ChatErrorType.NETWORK,
          `Error de conexión: ${error.message}. Verifica que la API esté corriendo en ${this.baseUrl}`,
          0
        );
      });

      clearTimeout(timeout);

      let data;
      try {
        data = await response.json();
      } catch (error) {
        throw new ChatError(
          ChatErrorType.SERVER,
          `Error al procesar la respuesta: ${error.message}. La API no devolvió un JSON válido.`,
          response.status
        );
      }

      if (isDevelopmentMode) {
        setLastResponse({
          status: response.status,
          data,
          headers: Object.fromEntries(response.headers.entries()),
        });
      }

      if (!response.ok) {
        throw new ChatError(
          response.status === 429 ? ChatErrorType.SERVER : ChatErrorType.SERVER,
          response.status === 429 
            ? 'Demasiadas solicitudes. Por favor, espera un momento.'
            : `Error del servidor (${response.status}): ${data.message || 'Sin mensaje de error'}`,
          response.status
        );
      }

      return data;
    } catch (error) {
      const errorInfo = {
        type: error instanceof ChatError ? error.type : ChatErrorType.UNKNOWN,
        message: error.message,
        status: error instanceof ChatError ? error.status : undefined,
        stack: isDevelopmentMode ? error.stack : undefined,
        originalError: isDevelopmentMode ? error : undefined,
      };

      if (isDevelopmentMode) {
        setLastError(errorInfo);
      }
      
      throw error instanceof ChatError ? error : new ChatError(
        ChatErrorType.UNKNOWN,
        `Error inesperado: ${error.message}`,
        0
      );
    }
  }

  async checkHealth(): Promise<boolean> {
    try {
      const data = await this.makeRequest(config.api.endpoints.health);
      return data.overall_status === 'healthy';
    } catch (error) {
      throw new ChatError(
        ChatErrorType.NETWORK,
        `Error al verificar el estado de la API: ${error.message}`
      );
    }
  }

  async sendMessage(question: string): Promise<string> {
    try {
      const data = await this.makeRequest(config.api.endpoints.chat, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          history: this.history
        })
      });
      
      if (!data || typeof data.reply !== 'string') {
        throw new ChatError(
          ChatErrorType.VALIDATION,
          'La API no devolvió una respuesta válida',
          200
        );
      }

      this.history.push(
        { role: 'user', content: question },
        { role: 'assistant', content: data.reply }
      );

      return data.reply;
    } catch (error) {
      if (error instanceof ChatError) throw error;
      throw new ChatError(
        ChatErrorType.NETWORK,
        `Error de conexión: ${error.message}`
      );
    }
  }

  getHistory(): Message[] {
    return [...this.history];
  }

  clearHistory(): void {
    this.history = [];
  }
}