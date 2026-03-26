import React from "react";

import { render, fireEvent } from "@testing-library/react";

import AbilityXToggle from "../../components/AbilityXToggle";

describe("AbilityXToggle", () => {
  it("matches the snapshot", () => {
    const onActiveChanged = jest.fn();
    const onValueChanged = jest.fn();

    const { container } = render(
      <AbilityXToggle
        id="testAbility"
        label="Test"
        visible={true}
        active={true}
        onActiveChanged={onActiveChanged}
        value={1}
        onValueChanged={onValueChanged}
        maxValue={4}
      ></AbilityXToggle>
    );
    expect(container).toMatchSnapshot();
  });

  it("matches the snapshot when hidden", () => {
    const onActiveChanged = jest.fn();
    const onValueChanged = jest.fn();

    const { container } = render(
      <AbilityXToggle
        id="testAbility"
        label="Test"
        visible={false}
        active={true}
        onActiveChanged={onActiveChanged}
        value={1}
        onValueChanged={onValueChanged}
        maxValue={4}
      ></AbilityXToggle>
    );
    expect(container).toMatchSnapshot();
  });

  it("handles active changed", () => {
    let isActive = false;
    const onActiveChanged = jest.fn((newisActive) => {
      isActive = newisActive;
    });

    let value = 1;
    const onValueChanged = jest.fn((newValue) => {
      value = newValue;
    });

    const { container } = render(
      <AbilityXToggle
        id="testAbility"
        label="Test"
        visible={true}
        active={false}
        onActiveChanged={onActiveChanged}
        value={3}
        onValueChanged={onValueChanged}
        maxValue={4}
      ></AbilityXToggle>
    );
    const input = container.querySelector(
      ".custom-control-input"
    ) as HTMLInputElement;
    fireEvent.click(input);

    expect(onActiveChanged).toHaveBeenCalledTimes(1);
    expect(isActive).toEqual(true);
    expect(onValueChanged).toHaveBeenCalledTimes(0);
  });

  it("handles value changed", () => {
    let isActive = false;
    const onActiveChanged = jest.fn((newisActive) => {
      isActive = newisActive;
    });

    let value = 1;
    const onValueChanged = jest.fn((newValue) => {
      value = newValue;
    });

    const { container } = render(
      <AbilityXToggle
        id="testAbility"
        label="Test"
        visible={true}
        active={false}
        onActiveChanged={onActiveChanged}
        value={3}
        onValueChanged={onValueChanged}
        maxValue={5}
      ></AbilityXToggle>
    );
    const select = container.querySelector("select") as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 2 } });

    expect(onActiveChanged).toHaveBeenCalledTimes(0);
    expect(onValueChanged).toHaveBeenCalledTimes(1);
    expect(value).toEqual(2);
  });
});
