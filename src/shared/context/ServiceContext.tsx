import React, { createContext, useMemo } from 'react';
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
// eslint-disable-next-line react-refresh/only-export-components
export const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

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
  // Initialize services once and memoize
  const contextValue = useMemo<ServicesContextType | null>(() => {
    try {
      // Initialize services
      initializeServices();

      // Get service instances
      const email = diContainer.getEmailService();
      const analytics = diContainer.getAnalyticsService();
      const storage = diContainer.getStorageRepository();

      return { email, analytics, storage, isReady: true };
    } catch (error) {
      console.error('Failed to initialize services:', error);
      return null;
    }
  }, []);

  if (!contextValue) {
    // Error state - services failed to initialize
    return (
      <div
        role="alert"
        aria-live="assertive"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '1rem',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Service Initialization Failed
          </h1>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Failed to initialize services. Please refresh the page to try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
            }}
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <ServicesContext.Provider value={contextValue}>
      {children}
    </ServicesContext.Provider>
  );
}
