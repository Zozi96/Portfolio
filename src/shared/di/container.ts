import type { IEmailService } from '../services/email/email.service.interface';
import type { IAnalyticsService } from '../services/analytics/analytics.service.interface';
import type { IStorageRepository } from '../services/storage/storage.repository.interface';
import { ServiceFactory } from './service-factory';

/**
 * Service Registry Type
 */
type ServiceType = 'email' | 'analytics' | 'storage';

/**
 * Dependency Injection Container
 * Manages service lifecycle and dependency resolution
 */
export class DIContainer {
  private static instance: DIContainer;
  private services: Map<ServiceType, unknown> = new Map();
  private initialized = false;

  private constructor() {}

  /**
   * Get singleton instance
   */
  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  /**
   * Initialize all services
   */
  initialize(): void {
    if (this.initialized) {
      console.warn('DIContainer already initialized');
      return;
    }

    console.group('🚀 Initializing Services');

    try {
      // Register email service
      this.register('email', ServiceFactory.createEmailService());

      // Register analytics service
      const analyticsService = ServiceFactory.createAnalyticsService();
      this.register('analytics', analyticsService);

      // Initialize analytics
      analyticsService.initialize();

      // Register storage repository
      this.register('storage', ServiceFactory.createStorageRepository());

      this.initialized = true;
      console.log('✅ All services initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize services:', error);
      throw error;
    } finally {
      console.groupEnd();
    }
  }

  /**
   * Register a service
   */
  register<T>(type: ServiceType, service: T): void {
    this.services.set(type, service);
    console.log(`✅ Registered: ${type}`);
  }

  /**
   * Resolve a service by type
   */
  resolve<T>(type: ServiceType): T {
    if (!this.initialized) {
      throw new Error('DIContainer not initialized. Call initialize() first.');
    }

    const service = this.services.get(type) as T;

    if (!service) {
      throw new Error(`Service "${type}" not found in container`);
    }

    return service;
  }

  /**
   * Get Email Service
   */
  getEmailService(): IEmailService {
    return this.resolve<IEmailService>('email');
  }

  /**
   * Get Analytics Service
   */
  getAnalyticsService(): IAnalyticsService {
    return this.resolve<IAnalyticsService>('analytics');
  }

  /**
   * Get Storage Repository
   */
  getStorageRepository(): IStorageRepository {
    return this.resolve<IStorageRepository>('storage');
  }

  /**
   * Check if container is initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Reset container (for testing)
   * Note: After calling reset(), initialize() must be called again before using the container
   */
  reset(): void {
    this.services.clear();
    this.initialized = false;
    console.warn('DIContainer reset. Call initialize() before using services.');
  }
}

/**
 * Initialize all services
 * Should be called once at application startup
 */
export function initializeServices(): DIContainer {
  const container = DIContainer.getInstance();
  container.initialize();
  return container;
}

// Export singleton instance
export const diContainer = DIContainer.getInstance();
