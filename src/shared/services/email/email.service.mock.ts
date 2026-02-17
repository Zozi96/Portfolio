import type {
  EmailPayload,
  EmailServiceConfig,
  EmailServiceResponse,
  IEmailService,
} from './email.service.interface';

/**
 * Mock Email Service Implementation
 * Simulates email sending for development and testing
 */
export class MockEmailService implements IEmailService {
  private config: EmailServiceConfig;
  private emailHistory: Array<{ timestamp: Date; payload: EmailPayload }> = [];
  private simulatedDelay: number;

  constructor(config: EmailServiceConfig, simulatedDelay = 1500) {
    this.config = config;
    this.simulatedDelay = simulatedDelay;
  }

  /**
   * Simulate email sending with artificial delay
   */
  async send(payload: EmailPayload): Promise<EmailServiceResponse> {
    console.group('📧 MockEmailService - Email Simulation');
    console.log('Subject:', payload.subject);
    console.log('Preview:', payload.previewText);
    console.log('Template Variables:', payload.templateVariables);
    console.log('Simulating delay:', `${this.simulatedDelay}ms`);
    console.groupEnd();

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, this.simulatedDelay));

    // Store email in history
    this.emailHistory.push({
      timestamp: new Date(),
      payload: { ...payload },
    });

    // Simulate 95% success rate
    const isSuccess = Math.random() > 0.05;

    if (isSuccess) {
      console.log('✅ Mock email sent successfully');
      return {
        success: true,
        message: 'Mock email sent successfully',
      };
    } else {
      console.error('❌ Mock email failed (simulated failure)');
      return {
        success: false,
        error: 'Simulated random failure for testing',
      };
    }
  }

  /**
   * Get service configuration
   */
  getConfig(): EmailServiceConfig {
    return { ...this.config };
  }

  /**
   * Get email history (for testing/debugging)
   */
  getHistory(): Array<{ timestamp: Date; payload: EmailPayload }> {
    return [...this.emailHistory];
  }

  /**
   * Clear email history
   */
  clearHistory(): void {
    this.emailHistory = [];
  }

  /**
   * Set simulated delay
   */
  setSimulatedDelay(delay: number): void {
    this.simulatedDelay = delay;
  }
}
