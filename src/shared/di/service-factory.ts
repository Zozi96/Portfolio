import { appConfig } from '../config';
import type { IEmailService } from '../services/email/email.service.interface';
import { EmailService } from '../services/email/email.service';
import { MockEmailService } from '../services/email/email.service.mock';
import type { IAnalyticsService } from '../services/analytics/analytics.service.interface';
import { MockAnalyticsService } from '../services/analytics/analytics.service';
import { GoogleAnalyticsAdapter } from '../services/analytics/adapters/google-analytics.adapter';
import type { IStorageRepository } from '../services/storage/storage.repository.interface';
import { LocalStorageRepository } from '../services/storage/local-storage.repository';

/**
 * Service Factory
 * Creates service instances based on configuration and feature flags
 */
export class ServiceFactory {
  /**
   * Create Email Service based on configuration
   */
  static createEmailService(): IEmailService {
    const config = appConfig;
    const emailConfig = {
      apiUrl: config.api.url,
      apiKey: config.api.key,
      emailPath: config.api.emailPath,
    };

    if (config.features.useMockServices) {
      console.log('🔧 Using MockEmailService');
      return new MockEmailService(emailConfig);
    }

    console.log('🔧 Using EmailService');
    return new EmailService(emailConfig);
  }

  /**
   * Create Analytics Service based on configuration
   */
  static createAnalyticsService(): IAnalyticsService {
    const config = appConfig;

    if (!config.features.enableAnalytics) {
      console.log('🔧 Analytics disabled');
      return new MockAnalyticsService(false);
    }

    const analyticsId = config.analytics.googleAnalyticsId;

    if (!analyticsId) {
      console.warn('🔧 Analytics enabled but no Google Analytics ID provided, using mock');
      return new MockAnalyticsService(true);
    }

    console.log('🔧 Using GoogleAnalyticsAdapter');
    return new GoogleAnalyticsAdapter({ measurementId: analyticsId });
  }

  /**
   * Create Storage Repository
   */
  static createStorageRepository(prefix = 'portfolio_'): IStorageRepository {
    return new LocalStorageRepository(prefix);
  }
}
