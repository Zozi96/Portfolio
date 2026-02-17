import { z } from 'zod';

/**
 * Environment Variable Schema
 * Validates all required environment variables with Zod
 */
export const envSchema = z.object({
  // API Configuration
  VITE_API_URL: z.string().url('API URL must be a valid URL').default('http://127.0.0.1:8000'),
  VITE_API_KEY: z.string().min(1, 'API Key is required'),
  VITE_SEND_EMAIL_PATH: z.string().default('/notifications/send-email'),

  // Feature Flags
  VITE_USE_MOCK_SERVICES: z
    .string()
    .optional()
    .default('false')
    .transform((val) => val === 'true'),
  VITE_ENABLE_ANALYTICS: z
    .string()
    .optional()
    .default('false')
    .transform((val) => val === 'true'),
  VITE_ENABLE_DEBUG_MODE: z
    .string()
    .optional()
    .default('false')
    .transform((val) => val === 'true'),

  // Analytics Configuration
  VITE_GOOGLE_ANALYTICS_ID: z.string().optional(),

  // App Metadata
  VITE_APP_VERSION: z.string().default('1.0.0'),
  VITE_APP_NAME: z.string().default('Portfolio'),

  // Environment Variables
  MODE: z.enum(['development', 'production', 'test']).default('development'),
  DEV: z.boolean().optional().default(true),
  PROD: z.boolean().optional().default(false),
});

export type EnvSchema = z.infer<typeof envSchema>;
