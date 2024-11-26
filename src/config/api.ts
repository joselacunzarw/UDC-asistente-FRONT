export const apiConfig = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  endpoints: {
    health: '/health',
    chat: '/consultar',
  },
};