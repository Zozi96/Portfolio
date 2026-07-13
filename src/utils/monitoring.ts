import { appConfig } from "../shared/config/config";
import { ConsoleMonitoringAdapter } from "../shared/services/monitoring/adapters/console.adapter";
import type { IMonitoringService } from "../shared/services/monitoring/monitoring.service.interface";

let monitoringService: IMonitoringService = new ConsoleMonitoringAdapter(
  appConfig.environment.isDevelopment,
);

/** Fire-and-forget: doesn't block render. Sentry adapter (and @sentry/browser)
 * is only downloaded/parsed when actually needed in production. */
export function initMonitoring(): void {
  const { sentryDsn } = appConfig.monitoring;

  if (sentryDsn && appConfig.environment.isProduction) {
    import("../shared/services/monitoring/adapters/sentry.adapter")
      .then(({ SentryMonitoringAdapter }) => {
        monitoringService = new SentryMonitoringAdapter(
          sentryDsn,
          appConfig.environment.mode,
          appConfig.app.version,
        );
        monitoringService.initialize();
      })
      .catch((err: unknown) => {
        console.error("Failed to load Sentry adapter:", err);
      });
    return;
  }

  monitoringService.initialize();
}

/** Retrieve the active monitoring service instance (lazy-initialised). */
export function getMonitoringService(): IMonitoringService {
  return monitoringService;
}