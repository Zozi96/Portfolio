/**
 * Triggers a short haptic vibration on devices that support the Vibration API.
 * Silently no-ops on unsupported browsers/devices.
 *
 * @param duration - Vibration duration in milliseconds (default: 10ms)
 */
export function vibrate(duration: number = 10): void {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(duration);
  }
}
