export const brandingConfig = {
  name: import.meta.env.VITE_APP_NAME || 'Asistente',
  organization: import.meta.env.VITE_ORGANIZATION_NAME || 'Banco',
  logo: {
    backgroundColor: import.meta.env.VITE_LOGO_BG_COLOR || '#004A98',
    textColor: import.meta.env.VITE_LOGO_TEXT_COLOR || '#FFFFFF',
  },
};