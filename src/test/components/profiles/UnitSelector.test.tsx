import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import * as UP from "../../../code/profiles/UnitProfile";
import UnitSelector from "components/profiles/UnitSelector";

describe("UnitSelector", () => {
  it("matches the snapshot", () => {
    const onUnitChange = jest.fn();
    const units = UP.getUnits().filter(
      (u) => u.faction === UP.Faction.empire && u.rank === UP.Rank.corps
    );
    const unit = units.filter((u) => u.name === "DF-90 Mortar Trooper")[0];

    const { container } = render(
      <UnitSelector
        id="my-unit-selector"
        selectedUnit={unit}
        units={units}
        onUnitChange={onUnitChange}
      ></UnitSelector>
    );
    expect(container).toMatchSnapshot();
  });

  it("matches the snapshot with subtitle", () => {
    const onUnitChange = jest.fn();
    const units = UP.getUnits().filter(
      (u) => u.faction === UP.Faction.rebel && u.rank === UP.Rank.operative
    );
    const unit = units.filter((u) => u.name === "Luke Skywalker")[0];

    const { container } = render(
      <UnitSelector
        id="my-unit-selector"
        selectedUnit={unit}
        units={units}
        onUnitChange={onUnitChange}
      ></UnitSelector>
    );
    expect(container).toMatchSnapshot();
  });

  it("matches the snapshot when multiple units have same name", () => {
    const onUnitChange = jest.fn();
    const units = UP.getUnits().filter(
      (u) =>
        u.faction === UP.Faction.republic && u.rank === UP.Rank.specialForces
    );
    const unit = units.filter((u) => u.name === "ARC Troopers")[1];

    const { container } = render(
      <UnitSelector
        id="my-unit-selector"
        selectedUnit={unit}
        units={units}
        onUnitChange={onUnitChange}
      ></UnitSelector>
    );
    expect(container).toMatchSnapshot();
  });

  it("handles unit change", () => {
    const units = UP.getUnits().filter(
      (u) => u.faction === UP.Faction.rebel && u.rank === UP.Rank.commander
    );
    let unit = units[0];
    const targetUnit = units.filter((u) => u.name === "Han Solo")[0];
    expect(unit).not.toEqual(targetUnit);

    const onUnitChange = (newUnit: UP.UnitProfile) => {
      unit = newUnit;
    };

    render(
      <UnitSelector
        id="my-unit-selector"
        selectedUnit={unit}
        units={units}
        onUnitChange={onUnitChange}
      ></UnitSelector>
    );

    fireEvent.change(screen.getByRole("combobox", { name: "Unit name" }), {
      target: { value: targetUnit.name },
    });
    expect(unit).toEqual(targetUnit);
  });

  it("handles unit change to one with multiple of the same name", () => {
    const units = UP.getUnits().filter(
      (u) => u.faction === UP.Faction.empire && u.rank === UP.Rank.specialForces
    );
    let unit = units[0];
    const targetUnit = units.filter(
      (u) => u.name === "Imperial Special Forces"
    )[0];
    expect(unit).not.toEqual(targetUnit);

    const onUnitChange = (newUnit: UP.UnitProfile) => {
      unit = newUnit;
    };

    render(
      <UnitSelector
        id="my-unit-selector"
        selectedUnit={unit}
        units={units}
        onUnitChange={onUnitChange}
      ></UnitSelector>
    );

    fireEvent.change(screen.getByRole("combobox", { name: "Unit name" }), {
      target: { value: targetUnit.name },
    });
    expect(unit).toEqual(targetUnit);
  });

  it("handles unit change to via subtitle", () => {
    const units = UP.getUnits().filter(
      (u) =>
        u.faction === UP.Faction.republic && u.rank === UP.Rank.specialForces
    );
    let unit = units.filter((u) => u.name === "ARC Troopers")[0];
    const targetUnit = units.filter((u) => u.name === "ARC Troopers")[1];
    expect(unit).not.toEqual(targetUnit);

    const onUnitChange = (newUnit: UP.UnitProfile) => {
      unit = newUnit;
    };

    render(
      <UnitSelector
        id="my-unit-selector"
        selectedUnit={unit}
        units={units}
        onUnitChange={onUnitChange}
      ></UnitSelector>
    );

    fireEvent.change(screen.getByRole("combobox", { name: "Unit name" }), {
      target: { value: targetUnit.name },
    });
    if (targetUnit.subtitle) {
      fireEvent.change(
        screen.getByRole("combobox", { name: "Unit subtitle" }),
        { target: { value: targetUnit.subtitle } }
      );
    }
    expect(unit).toEqual(targetUnit);
  });
});
