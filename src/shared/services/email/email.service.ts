import type {
  EmailPayload,
  EmailServiceConfig,
  EmailServiceResponse,
  IEmailService,
} from './email.service.interface';

/**
 * Real Email Service Implementation
 * Handles actual email sending via backend API
 */
export class EmailService implements IEmailService {
  private config: EmailServiceConfig;

  constructor(config: EmailServiceConfig) {
    this.config = config;
  }

  /**
   * Send an email via backend API
   */
  async send(payload: EmailPayload): Promise<EmailServiceResponse> {
    try {
      const url = `${this.config.apiUrl}${this.config.emailPath}`;

      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': this.config.apiKey,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        throw new Error(`API Error (${response.status}): ${errorText}`);
      }

      const data = await response.json().catch(() => ({}));

      return {
        success: true,
        message: data.message || 'Email sent successfully',
      };
    } catch (error) {
      console.error('EmailService Error:', error);

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send email',
      };
    }
  }

  /**
   * Get service configuration
   */
  getConfig(): EmailServiceConfig {
    return { ...this.config };
  }
}
