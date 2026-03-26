import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import * as UP from "../../../code/profiles/UnitProfile";

import FactionButtonGroup from "../../../components/profiles/FactionButtonGroup";

describe("FactionButtonGroup", () => {
  it("matches the snapshot", () => {
    const onFactionChange = jest.fn();
    const faction = UP.Faction.rebel;

    const { container } = render(
      <FactionButtonGroup
        faction={faction}
        onFactionChange={onFactionChange}
      ></FactionButtonGroup>
    );
    expect(container).toMatchSnapshot();
  });

  it("handles being clicked", () => {
    let faction = UP.Faction.rebel;
    function onFactionChange(newFaction: UP.Faction) {
      faction = newFaction;
    }

    render(
      <FactionButtonGroup
        faction={faction}
        onFactionChange={onFactionChange}
      ></FactionButtonGroup>
    );

    fireEvent.click(screen.getByTitle("Separatist"));
    expect(faction).toEqual(UP.Faction.separatist);
  });
});
