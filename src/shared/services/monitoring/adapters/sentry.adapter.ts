import type { IMonitoringService, MonitoringContext, MonitoringLevel } from "../monitoring.service.interface";

/**
 * Sentry/GlitchTip Monitoring Adapter
 *
 * Wraps @sentry/browser behind the IMonitoringService port so that
 * UI components and domain services never import Sentry directly.
 */
export class SentryMonitoringAdapter implements IMonitoringService {
  private readonly dsn: string;
  private readonly environment: string;
  private readonly release: string;
  private enabled = false;

  constructor(dsn: string, environment: string, release: string) {
    this.dsn = dsn;
    this.environment = environment;
    this.release = release;
  }

  initialize(): void {
    if (!this.dsn) return;

    import("@sentry/browser")
      .then(({ init }) => {
        init({
          dsn: this.dsn,
          environment: this.environment,
          release: this.release,
        });
        this.enabled = true;
      })
      .catch((err: unknown) => {
        console.error("Failed to initialize Sentry:", err);
      });
  }

  captureError(error: Error, context?: MonitoringContext): void {
    if (!this.enabled) return;

    import("@sentry/browser")
      .then(({ captureException, withScope }) => {
        if (context) {
          withScope((scope) => {
            scope.setExtras(context);
            captureException(error);
          });
        } else {
          captureException(error);
        }
      })
      .catch(() => {});
  }

  captureMessage(message: string, level: MonitoringLevel = "info"): void {
    if (!this.enabled) return;

    import("@sentry/browser")
      .then(({ captureMessage }) => {
        captureMessage(message, level as Parameters<typeof captureMessage>[1]);
      })
      .catch(() => {});
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}
