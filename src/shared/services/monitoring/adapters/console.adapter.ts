import type { IMonitoringService, MonitoringContext, MonitoringLevel } from "../monitoring.service.interface";

/**
 * Console Monitoring Adapter
 *
 * Development / fallback implementation: logs events to the browser console
 * instead of sending them to a remote service.
 */
export class ConsoleMonitoringAdapter implements IMonitoringService {
  private readonly active: boolean;

  constructor(active = false) {
    this.active = active;
  }

  initialize(): void {
    if (this.active) {
      console.log("🔍 ConsoleMonitoringAdapter initialized (dev mode)");
    }
  }

  captureError(error: Error, context?: MonitoringContext): void {
    if (!this.active) return;
    console.error("[Monitoring] Error:", error, context ?? "");
  }

  captureMessage(message: string, level: MonitoringLevel = "info"): void {
    if (!this.active) return;
    let fn: typeof console.log;
    switch (level) {
      case "error":
      case "fatal":
        fn = console.error;
        break;
      case "warning":
        fn = console.warn;
        break;
      default:
        fn = console.info;
    }
    fn(`[Monitoring] ${level.toUpperCase()}: ${message}`);
  }

  isEnabled(): boolean {
    return this.active;
  }
}
