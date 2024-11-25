const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
    endpoints: {
      health: '/health',
      chat: '/consultar',
    },
  },
  auth: {
    googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  },
  branding: {
    name: import.meta.env.VITE_APP_NAME || 'Asistente UDC',
    organization: import.meta.env.VITE_ORGANIZATION_NAME || 'Universidad del Chubut',
    logo: {
      backgroundColor: import.meta.env.VITE_LOGO_BG_COLOR || '#004A98',
      textColor: import.meta.env.VITE_LOGO_TEXT_COLOR || '#FFFFFF',
    },
  },
  features: {
    audioInput: import.meta.env.VITE_FEATURE_AUDIO_INPUT === 'true',
    fileUpload: import.meta.env.VITE_FEATURE_FILE_UPLOAD === 'true',
    likeButton: import.meta.env.VITE_FEATURE_LIKE_BUTTON !== 'false',
    dislikeButton: import.meta.env.VITE_FEATURE_DISLIKE_BUTTON !== 'false',
    copyButton: import.meta.env.VITE_FEATURE_COPY_BUTTON !== 'false',
  },
  development: {
    mockEnabled: import.meta.env.VITE_MOCK_ENABLED === 'true',
    devToolsEnabled: import.meta.env.VITE_DEV_TOOLS_ENABLED === 'true',
  },
};

export default config;