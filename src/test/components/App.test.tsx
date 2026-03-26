import React from "react";

jest.mock("highcharts", () => ({
  chart: jest.fn(),
  setOptions: jest.fn(),
}));
jest.mock("highcharts-react-official", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="highcharts-mock" />,
  };
});
jest.mock("highcharts/modules/exporting", () => jest.fn());
jest.mock("highcharts/modules/offline-exporting", () => jest.fn());

import { render, screen, fireEvent } from "@testing-library/react";

import App from "components/App";

describe("App", () => {
  it("matches the snapshot", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it("handles simple view", () => {
    const { container } = render(<App />);
    const toggle = container.querySelector(
      "#showSimplifiedViewToggle"
    ) as HTMLInputElement;
    fireEvent.change(toggle, { target: { checked: true } });

    expect(container).toMatchSnapshot();
  });
});
