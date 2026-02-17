import { useContext } from 'react';
import { ServicesContext } from './ServiceContext';
import type { IEmailService } from '../services/email/email.service.interface';
import type { IAnalyticsService } from '../services/analytics/analytics.service.interface';
import type { IStorageRepository } from '../services/storage/storage.repository.interface';

/**
 * Services Context Type
 */
export interface ServicesContextType {
  email: IEmailService;
  analytics: IAnalyticsService;
  storage: IStorageRepository;
  isReady: boolean;
}

/**
 * Hook to access all services
 * @throws Error if used outside ServiceProvider
 */
export function useServices(): ServicesContextType {
  const context = useContext(ServicesContext);

  if (!context) {
    throw new Error('useServices must be used within a ServiceProvider');
  }

  return context;
}

/**
 * Hook to access Email Service
 * @throws Error if used outside ServiceProvider
 */
export function useEmailService(): IEmailService {
  const { email } = useServices();
  return email;
}

/**
 * Hook to access Analytics Service
 * @throws Error if used outside ServiceProvider
 */
export function useAnalyticsService(): IAnalyticsService {
  const { analytics } = useServices();
  return analytics;
}

/**
 * Hook to access Storage Repository
 * @throws Error if used outside ServiceProvider
 */
export function useStorageRepository(): IStorageRepository {
  const { storage } = useServices();
  return storage;
}
