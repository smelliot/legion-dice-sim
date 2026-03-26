import React from "react";

jest.mock("highcharts", () => ({
  chart: jest.fn(),
  setOptions: jest.fn(),
}));
jest.mock("highcharts-react-official", () => ({
  __esModule: true,
  default: () => <div data-testid="highcharts-mock" />,
}));
jest.mock("highcharts/modules/exporting", () => jest.fn());
jest.mock("highcharts/modules/offline-exporting", () => jest.fn());

import { render } from "@testing-library/react";

import * as T from "../../code/Types";
import DiceResults from "../../components/DiceResults";

function createEmptyOutput(): T.CombinedAttackOutput {
  return {
    firstAttack: {
      attack: {
        criticals: 0,
        hits: 0,
        surges: 0,
        misses: 0,
      },
      defense: {
        blocks: 0,
        surges: 0,
        blanks: 0,
        forcedSaves: 0,
        wounds: 0,
      },
    },
    summary: {
      critical: [],
      hit: [],
      attackSurge: [],
      attackCount: 0,
      blocks: [],
      defenseSurge: [],
      forcedSaves: [],
      wounds: [],
      forcedSaveStats: {
        mean: 0,
        median: 0,
        stddev: 0,
      },
      woundStats: {
        mean: 0,
        median: 0,
        stddev: 0,
      },
    },
  };
}

describe("DiceResults", () => {
  it("matches the snapshot when not visible", () => {
    const output: T.CombinedAttackOutput = createEmptyOutput();

    const { container } = render(
      <DiceResults
        showExpectedRange={true}
        visibility={T.ResultOutput.None}
        results={output}
      ></DiceResults>
    );

    expect(container).toMatchSnapshot();
  });

  it("matches the snapshot when showing single result", () => {
    const output: T.CombinedAttackOutput = createEmptyOutput();

    const { container } = render(
      <DiceResults
        showExpectedRange={true}
        visibility={T.ResultOutput.Single}
        results={output}
      ></DiceResults>
    );

    expect(container).toMatchSnapshot();
  });

  it("matches the snapshot when showing graph result", () => {
    const output: T.CombinedAttackOutput = createEmptyOutput();

    const { container } = render(
      <DiceResults
        showExpectedRange={true}
        visibility={T.ResultOutput.Graph}
        results={output}
      ></DiceResults>
    );

    expect(container).toMatchSnapshot();
  });
});
