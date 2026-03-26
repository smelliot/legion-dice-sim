import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import * as UP from "../../../code/profiles/UnitProfile";
import ItemSelector from "../../../components/profiles/ItemSelector";

describe("ItemSelector", () => {
  it("matches the snapshot", () => {
    const onWeaponChange = jest.fn();
    const unit = UP.getUnits().filter(
      (u) => u.name === "Luke Skywalker" && u.rank === UP.Rank.commander
    )[0];
    const id = "ws-5";
    const index = 3;
    const selectedWeapon = unit.weapons[0];

    const { container } = render(
      <ItemSelector<UP.Weapon>
        id={id}
        dataIndex={index}
        ariaLabel="testSelector"
        items={unit.weapons}
        includeBlankItem={true}
        selectedItem={selectedWeapon}
        onItemChange={onWeaponChange}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("handles value change", () => {
    const unit = UP.getUnits().filter(
      (u) => u.name === "Luke Skywalker" && u.rank === UP.Rank.commander
    )[0];
    const id = "ws-5";
    const index = 3;
    const startingWeapon: UP.Weapon | null = null;
    let selectedWeapon: UP.Weapon | null = startingWeapon;
    let eventIndex = 0;

    function onWeaponChange(idx: any, newWeapon: UP.Weapon | null) {
      eventIndex = idx;
      selectedWeapon = newWeapon;
    }

    render(
      <ItemSelector<UP.Weapon>
        id={id}
        dataIndex={index}
        ariaLabel="testSelector"
        items={unit.weapons}
        includeBlankItem={true}
        selectedItem={startingWeapon}
        onItemChange={onWeaponChange}
      />
    );

    fireEvent.change(screen.getByRole("combobox", { name: "testSelector" }), {
      target: { value: unit.weapons[1].name },
    });
    expect(eventIndex).toEqual(index);
    expect(selectedWeapon).toEqual(unit.weapons[1]);
  });

  it("handles clearing value", () => {
    const unit = UP.getUnits().filter(
      (u) => u.name === "Luke Skywalker" && u.rank === UP.Rank.commander
    )[0];
    const id = "ws-5";
    const index = 3;
    const startingWeapon: UP.Weapon | null = unit.weapons[0];
    let selectedWeapon: UP.Weapon | null = startingWeapon;
    let eventIndex = 0;

    function onWeaponChange(idx: any, newWeapon: UP.Weapon | null) {
      eventIndex = idx;
      selectedWeapon = newWeapon;
    }

    render(
      <ItemSelector<UP.Weapon>
        id={id}
        dataIndex={index}
        ariaLabel="testSelector"
        items={unit.weapons}
        includeBlankItem={true}
        selectedItem={startingWeapon}
        onItemChange={onWeaponChange}
      />
    );

    fireEvent.change(screen.getByRole("combobox", { name: "testSelector" }), {
      target: { value: "" },
    });
    expect(eventIndex).toEqual(index);
    expect(selectedWeapon).toEqual(null);
  });
});
