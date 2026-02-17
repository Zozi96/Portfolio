import type {
  EmailPayload,
  EmailServiceConfig,
  EmailServiceResponse,
  IEmailService,
} from './email.service.interface';

/**
 * Mock Email Service Implementation
 * Simulates email sending for development and testing
 * 
 * @param config - Email service configuration
 * @param simulatedDelay - Delay in milliseconds before response (default: 1500ms)
 * @param successRate - Success rate between 0 and 1 (default: 0.95)
 */
export class MockEmailService implements IEmailService {
  private config: EmailServiceConfig;
  private emailHistory: Array<{ timestamp: Date; payload: EmailPayload }> = [];
  private simulatedDelay: number;
  private successRate: number;

  constructor(
    config: EmailServiceConfig, 
    simulatedDelay = 1500,
    successRate = 0.95
  ) {
    this.config = config;
    this.simulatedDelay = simulatedDelay;
    this.successRate = successRate;
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

    // Simulate success rate (default 95%)
    const isSuccess = Math.random() < this.successRate;

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

  /**
   * Set success rate (0.0 to 1.0)
   */
  setSuccessRate(rate: number): void {
    if (rate < 0 || rate > 1) {
      throw new Error('Success rate must be between 0 and 1');
    }
    this.successRate = rate;
  }
}
