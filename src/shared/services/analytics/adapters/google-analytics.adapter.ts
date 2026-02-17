import type {
  AnalyticsEventProperties,
  IAnalyticsService,
  PageViewProperties,
} from '../analytics.service.interface';

/**
 * Google Analytics Configuration
 */
export interface GoogleAnalyticsConfig {
  measurementId: string;
}

/**
 * Google Analytics Adapter
 * Integrates with Google Analytics 4
 */
export class GoogleAnalyticsAdapter implements IAnalyticsService {
  private config: GoogleAnalyticsConfig;
  private initialized = false;

  constructor(config: GoogleAnalyticsConfig) {
    this.config = config;
  }

  /**
   * Initialize Google Analytics
   */
  initialize(): void {
    if (this.initialized) {
      console.warn('GoogleAnalyticsAdapter already initialized');
      return;
    }

    if (!this.config.measurementId) {
      console.warn('Google Analytics Measurement ID not provided');
      return;
    }

    try {
      // Load gtag.js script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.measurementId}`;
      document.head.appendChild(script);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
      }
      window.gtag = gtag;

      gtag('js', new Date());
      gtag('config', this.config.measurementId);

      this.initialized = true;
      console.log('✅ Google Analytics initialized:', this.config.measurementId);
    } catch (error) {
      console.error('Failed to initialize Google Analytics:', error);
    }
  }

  /**
   * Track a page view
   */
  trackPageView(properties?: PageViewProperties): void {
    if (!this.isEnabled()) return;

    try {
      window.gtag?.('event', 'page_view', {
        page_title: properties?.pageTitle,
        page_location: properties?.pageLocation || window.location.href,
        page_path: properties?.pagePath || window.location.pathname,
      });
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }

  /**
   * Track a custom event
   */
  trackEvent(eventName: string, properties?: AnalyticsEventProperties): void {
    if (!this.isEnabled()) return;

    try {
      window.gtag?.('event', eventName, properties);
    } catch (error) {
      console.error(`Failed to track event "${eventName}":`, error);
    }
  }

  /**
   * Check if analytics is enabled and initialized
   */
  isEnabled(): boolean {
    return this.initialized && typeof window.gtag === 'function';
  }
}

// Extend Window interface for gtag
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
