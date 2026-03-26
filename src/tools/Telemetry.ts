export class Telemetry {
  // TODO: Re-implement with a telemetry provider
  public static trackEvent(eventName: string, data: any): void {
    // eslint-disable-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  }

  public static logError(file: string, func: string, info: string): void {}
}
