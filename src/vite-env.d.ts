/// <reference types="vite/client" />

interface ImportMetaEnv {
  // API Configuration
  readonly VITE_API_URL: string
  readonly VITE_SEND_EMAIL_PATH: string
  readonly VITE_API_KEY: string

  // Feature Flags
  readonly VITE_USE_MOCK_SERVICES?: string
  readonly VITE_ENABLE_ANALYTICS?: string
  readonly VITE_ENABLE_DEBUG_MODE?: string

  // Analytics Configuration
  readonly VITE_GOOGLE_ANALYTICS_ID?: string

  // App Metadata
  readonly VITE_APP_VERSION?: string
  readonly VITE_APP_NAME?: string

  // Environment Variables
  readonly MODE: 'development' | 'production' | 'test'
  readonly DEV: boolean
  readonly PROD: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
