import * as Sentry from "@sentry/browser";
import { appConfig } from "../shared/config/config";

export function initMonitoring(): void {
  const { glitchtipDsn } = appConfig.monitoring;

  if (!glitchtipDsn || !appConfig.environment.isProduction) {
    return;
  }

  Sentry.init({
    dsn: glitchtipDsn,
    environment: appConfig.environment.mode,
    release: appConfig.app.version,
  });
}
