/**
 * Email Service Configuration Interface
 */
export interface EmailServiceConfig {
  apiUrl: string;
  apiKey: string;
  emailPath: string;
}

/**
 * Email Template Variables Interface
 */
export interface EmailTemplateVariables {
  headline: string;
  body: string;
  badge?: string;
  actionUrl?: string;
  actionLabel?: string;
  footerNote?: string;
}

/**
 * Email Payload Interface
 * Represents the structure of an email to be sent
 */
export interface EmailPayload {
  subject: string;
  previewText: string;
  templateVariables: EmailTemplateVariables;
}

/**
 * Email Service Response Interface
 */
export interface EmailServiceResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Email Service Interface
 * Defines the contract for email service implementations
 */
export interface IEmailService {
  /**
   * Send an email
   * @param payload - Email payload containing subject, preview text, and template variables
   * @returns Promise with response indicating success or failure
   */
  send(payload: EmailPayload): Promise<EmailServiceResponse>;

  /**
   * Get service configuration
   */
  getConfig(): EmailServiceConfig;
}
