import { Telemetry } from "../../tools/Telemetry";

describe("Telemetry", () => {
  it("trackEvent does not throw", () => {
    expect(() => Telemetry.trackEvent("test", { a: "a" })).not.toThrow();
  });

  it("trackEvent does not throw with undefined data", () => {
    expect(() => Telemetry.trackEvent("test", undefined)).not.toThrow();
  });

  it("logError does not throw", () => {
    expect(() => Telemetry.logError("file", "myFunction", "test error")).not.toThrow();
  });
});
