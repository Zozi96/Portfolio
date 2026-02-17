import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeServices, diContainer } from '../di';
import type { IEmailService } from '../services/email/email.service.interface';
import type { IAnalyticsService } from '../services/analytics/analytics.service.interface';
import type { IStorageRepository } from '../services/storage/storage.repository.interface';

/**
 * Services Context Type
 */
interface ServicesContextType {
  email: IEmailService;
  analytics: IAnalyticsService;
  storage: IStorageRepository;
  isReady: boolean;
}

/**
 * Services Context
 */
const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

/**
 * Service Provider Props
 */
interface ServiceProviderProps {
  children: React.ReactNode;
}

/**
 * Service Provider Component
 * Initializes and provides services to the application
 */
export function ServiceProvider({ children }: ServiceProviderProps) {
  const [isReady, setIsReady] = useState(false);
  const [services, setServices] = useState<Omit<ServicesContextType, 'isReady'> | null>(null);

  useEffect(() => {
    try {
      // Initialize services
      initializeServices();

      // Get service instances
      const email = diContainer.getEmailService();
      const analytics = diContainer.getAnalyticsService();
      const storage = diContainer.getStorageRepository();

      setServices({ email, analytics, storage });
      setIsReady(true);
    } catch (error) {
      console.error('Failed to initialize services:', error);
      // You might want to show an error UI here
    }
  }, []);

  if (!isReady || !services) {
    // You can customize this loading state
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <p>Initializing...</p>
      </div>
    );
  }

  return (
    <ServicesContext.Provider value={{ ...services, isReady }}>
      {children}
    </ServicesContext.Provider>
  );
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
