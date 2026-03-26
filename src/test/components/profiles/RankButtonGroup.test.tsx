import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import * as UP from "../../../code/profiles/UnitProfile";
import RankButtonGroup from "../../../components/profiles/RankButtonGroup";

describe("RankButtonGroup", () => {
  it("matches the snapshot", () => {
    const onRankChange = jest.fn();
    const rank = UP.Rank.commander;

    const { container } = render(
      <RankButtonGroup
        rank={rank}
        onRankChange={onRankChange}
      ></RankButtonGroup>
    );
    expect(container).toMatchSnapshot();
  });

  it("handles being clicked", () => {
    let rank = UP.Rank.commander;
    function onRankChange(newRank: UP.Rank) {
      rank = newRank;
    }

    render(
      <RankButtonGroup
        rank={rank}
        onRankChange={onRankChange}
      ></RankButtonGroup>
    );

    fireEvent.click(screen.getByTitle("Special Forces"));
    expect(rank).toEqual(UP.Rank.specialForces);
  });
});
