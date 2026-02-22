export type MonitoringLevel = "info" | "warning" | "error" | "fatal";

export interface MonitoringContext {
  [key: string]: unknown;
}

/**
 * IMonitoringService – port/interface that decouples UI and domain logic
 * from any specific error-tracking implementation (Sentry, GlitchTip, etc.).
 */
export interface IMonitoringService {
  /** Bootstrap the monitoring provider (load scripts, configure DSN, etc.). */
  initialize(): void;

  /** Capture a thrown Error, optionally enriched with extra context. */
  captureError(error: Error, context?: MonitoringContext): void;

  /** Capture a diagnostic message at a given severity level. */
  captureMessage(message: string, level?: MonitoringLevel): void;

  /** Returns true when the service is active and will forward events. */
  isEnabled(): boolean;
}
