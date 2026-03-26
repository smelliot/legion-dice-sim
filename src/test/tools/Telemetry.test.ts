jest.mock("@microsoft/applicationinsights-web", () => {
  return {
    ApplicationInsights: class {
      loadAppInsights = jest.fn();
      trackPageView = jest.fn();
      trackEvent = jest.fn();
    },
  };
});

import { Telemetry } from "../../tools/Telemetry";

describe("Telemetry", () => {
  beforeEach(() => {
    // Reset Telemetry's internal state so initialize() runs fresh each test
    (Telemetry as any)._initialized = false;
    (Telemetry as any)._appInsights = undefined;
  });

  it("App Insights initialized", () => {
    Telemetry.trackEvent("init", {});
    const ai = (Telemetry as any)._appInsights;
    expect(ai.loadAppInsights).toHaveBeenCalledTimes(1);
    expect(ai.trackPageView).toHaveBeenCalledTimes(1);
  });

  it("logs event data when provided", () => {
    Telemetry.trackEvent("unit test data", { a: "a", b: "b" });
    const ai = (Telemetry as any)._appInsights;
    expect(ai.trackEvent).toHaveBeenCalledTimes(1);
    expect(ai.trackEvent).toHaveBeenCalledWith(
      { name: "unit test data" },
      { a: "a", b: "b" }
    );
  });

  it("does not log event data when not provided", () => {
    Telemetry.trackEvent("unit test data", undefined);
    const ai = (Telemetry as any)._appInsights;
    expect(ai).toBeUndefined();
  });

  it("logs errors as expected", () => {
    Telemetry.logError("file", "myFunction", "test error");
    const ai = (Telemetry as any)._appInsights;
    expect(ai.trackEvent).toHaveBeenCalledWith(
      { name: "Error" },
      { File: "file", Function: "myFunction", Error: "test error" }
    );
  });
});
