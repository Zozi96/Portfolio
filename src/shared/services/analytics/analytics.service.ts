import type {
  AnalyticsEventProperties,
  IAnalyticsService,
  PageViewProperties,
} from './analytics.service.interface';

/**
 * Mock Analytics Service
 * Used when analytics is disabled or in development
 */
export class MockAnalyticsService implements IAnalyticsService {
  private enabled: boolean;
  private events: Array<{ type: string; name?: string; properties?: unknown }> = [];

  constructor(enabled = false) {
    this.enabled = enabled;
  }

  /**
   * Initialize (no-op for mock)
   */
  initialize(): void {
    if (this.enabled) {
      console.log('📊 MockAnalyticsService initialized (no tracking)');
    }
  }

  /**
   * Track a page view (mock)
   */
  trackPageView(properties?: PageViewProperties): void {
    if (!this.enabled) return;

    const event = {
      type: 'page_view',
      properties,
    };

    this.events.push(event);
    console.log('📊 [Mock] Page View:', properties);
  }

  /**
   * Track a custom event (mock)
   */
  trackEvent(eventName: string, properties?: AnalyticsEventProperties): void {
    if (!this.enabled) return;

    const event = {
      type: 'event',
      name: eventName,
      properties,
    };

    this.events.push(event);
    console.log(`📊 [Mock] Event "${eventName}":`, properties);
  }

  /**
   * Check if analytics is enabled
   */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Get tracked events (for testing)
   */
  getEvents(): Array<{ type: string; name?: string; properties?: unknown }> {
    return [...this.events];
  }

  /**
   * Clear tracked events
   */
  clearEvents(): void {
    this.events = [];
  }
}
