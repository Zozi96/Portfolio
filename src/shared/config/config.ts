import { envSchema, type EnvSchema } from './env.schema';

/**
 * Application Configuration Singleton
 * Provides type-safe access to validated environment variables
 */
export class AppConfig {
  private static instance: AppConfig;
  private config: EnvSchema;

  private constructor() {
    this.config = this.loadAndValidate();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }

  /**
   * Load and validate environment variables
   */
  private loadAndValidate(): EnvSchema {
    try {
      const env = {
        // API Configuration
        VITE_API_URL: import.meta.env.VITE_API_URL,
        VITE_API_KEY: import.meta.env.VITE_API_KEY,
        VITE_SEND_EMAIL_PATH: import.meta.env.VITE_SEND_EMAIL_PATH,

        // Feature Flags
        VITE_USE_MOCK_SERVICES: import.meta.env.VITE_USE_MOCK_SERVICES,
        VITE_ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS,
        VITE_ENABLE_DEBUG_MODE: import.meta.env.VITE_ENABLE_DEBUG_MODE,

        // Analytics Configuration
        VITE_GOOGLE_ANALYTICS_ID: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,

        // App Metadata
        VITE_APP_VERSION: import.meta.env.VITE_APP_VERSION,
        VITE_APP_NAME: import.meta.env.VITE_APP_NAME,

        // Environment Variables
        MODE: import.meta.env.MODE,
        DEV: import.meta.env.DEV,
        PROD: import.meta.env.PROD,
      };

      const result = envSchema.safeParse(env);

      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        const errorMessages = Object.entries(errors)
          .map(([key, messages]) => `  - ${key}: ${(messages || []).join(', ')}`)
          .join('\n');

        throw new Error(
          `❌ Environment variable validation failed:\n${errorMessages}\n\n` +
            `Please check your .env file and ensure all required variables are set correctly.`
        );
      }

      return result.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      throw error;
    }
  }

  /**
   * Get API configuration
   */
  public get api() {
    return {
      url: this.config.VITE_API_URL,
      key: this.config.VITE_API_KEY,
      emailPath: this.config.VITE_SEND_EMAIL_PATH,
      fullEmailUrl: `${this.config.VITE_API_URL}${this.config.VITE_SEND_EMAIL_PATH}`,
    };
  }

  /**
   * Get feature flags
   */
  public get features() {
    return {
      useMockServices: this.config.VITE_USE_MOCK_SERVICES,
      enableAnalytics: this.config.VITE_ENABLE_ANALYTICS,
      debugMode: this.config.VITE_ENABLE_DEBUG_MODE,
    };
  }

  /**
   * Get environment configuration
   */
  public get environment() {
    return {
      mode: this.config.MODE,
      isDevelopment: this.config.DEV,
      isProduction: this.config.PROD,
    };
  }

  /**
   * Get analytics configuration
   */
  public get analytics() {
    return {
      googleAnalyticsId: this.config.VITE_GOOGLE_ANALYTICS_ID,
    };
  }

  /**
   * Get app metadata
   */
  public get app() {
    return {
      version: this.config.VITE_APP_VERSION,
      name: this.config.VITE_APP_NAME,
    };
  }

  /**
   * Debug method for troubleshooting
   * Only logs in debug mode or development
   */
  public debug(): void {
    if (this.config.VITE_ENABLE_DEBUG_MODE || this.config.DEV) {
      console.group('🔧 Application Configuration');
      console.log('API:', this.api);
      console.log('Features:', this.features);
      console.log('Environment:', this.environment);
      console.log('Analytics:', this.analytics);
      console.log('App:', this.app);
      console.groupEnd();
    }
  }

  /**
   * Get all configuration (use with caution)
   */
  public getAll(): EnvSchema {
    return { ...this.config };
  }
}

// Export singleton instance
export const appConfig = AppConfig.getInstance();
