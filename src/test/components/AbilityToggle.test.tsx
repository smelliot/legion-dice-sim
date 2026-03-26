import React from "react";

import { render, fireEvent } from "@testing-library/react";

import AbilityToggle from "../../components/AbilityToggle";

describe("AbilityToggle", () => {
  it("matches the snapshot", () => {
    const onActiveChanged = jest.fn();

    const { container } = render(
      <AbilityToggle
        id="testAbility"
        label="Test"
        visible={true}
        active={true}
        onActiveChanged={onActiveChanged}
      ></AbilityToggle>
    );
    expect(container).toMatchSnapshot();
  });

  it("matches the snapshot when not visible", () => {
    const onActiveChanged = jest.fn();

    const { container } = render(
      <AbilityToggle
        id="testAbility"
        label="Test"
        visible={false}
        active={true}
        onActiveChanged={onActiveChanged}
      ></AbilityToggle>
    );
    expect(container).toMatchSnapshot();
  });

  it("handles active changed", () => {
    let isActive = false;
    const onActiveChanged = jest.fn((newisActive) => {
      isActive = newisActive;
    });

    const { container } = render(
      <AbilityToggle
        id="testAbility"
        label="Test"
        visible={true}
        active={false}
        onActiveChanged={onActiveChanged}
      ></AbilityToggle>
    );

    const input = container.querySelector(
      ".custom-control-input"
    ) as HTMLInputElement;
    fireEvent.click(input);
    expect(onActiveChanged).toHaveBeenCalledTimes(1);
    expect(isActive).toEqual(true);
  });
});
