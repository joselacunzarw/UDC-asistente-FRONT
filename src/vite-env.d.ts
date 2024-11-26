/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_GOOGLE_CLIENT_ID: string
  readonly VITE_APP_NAME: string
  readonly VITE_ORGANIZATION_NAME: string
  readonly VITE_LOGO_BG_COLOR: string
  readonly VITE_LOGO_TEXT_COLOR: string
  readonly VITE_FEATURE_AUDIO_INPUT: string
  readonly VITE_FEATURE_FILE_UPLOAD: string
  readonly VITE_FEATURE_LIKE_BUTTON: string
  readonly VITE_FEATURE_DISLIKE_BUTTON: string
  readonly VITE_FEATURE_COPY_BUTTON: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}