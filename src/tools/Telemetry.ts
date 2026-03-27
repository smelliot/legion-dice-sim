export class Telemetry {
  // TODO: Re-implement with a telemetry provider
  public static trackEvent(_eventName: string, _data: unknown): void {
    // eslint-disable-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  }

  public static logError(_file: string, _func: string, _info: string): void {}
}
