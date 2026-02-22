import { appConfig } from "../shared/config/config";
import { SentryMonitoringAdapter } from "../shared/services/monitoring/adapters/sentry.adapter";
import { ConsoleMonitoringAdapter } from "../shared/services/monitoring/adapters/console.adapter";
import type { IMonitoringService } from "../shared/services/monitoring/monitoring.service.interface";

let monitoringService: IMonitoringService | null = null;

export function initMonitoring(): void {
  const { glitchtipDsn } = appConfig.monitoring;

  if (glitchtipDsn && appConfig.environment.isProduction) {
    monitoringService = new SentryMonitoringAdapter(
      glitchtipDsn,
      appConfig.environment.mode,
      appConfig.app.version,
    );
  } else {
    monitoringService = new ConsoleMonitoringAdapter(appConfig.environment.isDevelopment);
  }

  monitoringService.initialize();
}

/** Retrieve the active monitoring service instance (lazy-initialised). */
export function getMonitoringService(): IMonitoringService {
  if (!monitoringService) {
    monitoringService = new ConsoleMonitoringAdapter(false);
  }
  return monitoringService;
}
