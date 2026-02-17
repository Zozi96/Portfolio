/**
 * Analytics Event Properties
 */
export interface AnalyticsEventProperties {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Analytics Page View Properties
 */
export interface PageViewProperties {
  pageTitle?: string;
  pagePath?: string;
  pageLocation?: string;
}

/**
 * Analytics Service Interface
 * Defines the contract for analytics service implementations
 */
export interface IAnalyticsService {
  /**
   * Initialize the analytics service
   */
  initialize(): void;

  /**
   * Track a page view
   */
  trackPageView(properties?: PageViewProperties): void;

  /**
   * Track a custom event
   */
  trackEvent(eventName: string, properties?: AnalyticsEventProperties): void;

  /**
   * Check if analytics is enabled
   */
  isEnabled(): boolean;
}
